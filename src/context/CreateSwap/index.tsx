import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { createContext } from 'use-context-selector';

import baseApi from '@/app/api/baseApi';
import { showErrorToast, showSuccessToast } from '@/components/Toast';
import ERC20_ABI from '@/constants/erc20.json';
import { useChain } from '@/hooks/useChain';
import { useLoader } from '@/hooks/useLoader';
import { useWallet } from '@/hooks/useWallet';
import {
  convertFromTokenUnit,
  convertToTokenUnit,
} from '@/utils/convertTokenUnit';
import { getErrorMessage } from '@/utils/errorMessages';

import {
  type Bidder,
  type ICreateSwapContext,
  type SwapStatus,
  type SwapType,
  type TokensState,
} from './types';
import { useWalletBalances } from './useWalletBalances';

const CreateSwapContext = createContext<ICreateSwapContext>(
  {} as ICreateSwapContext,
);

CreateSwapContext.displayName = 'CreateSwap';

const CreateSwapProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const router = useRouter();
  const { walletState, connectWallet, web3, getContract } = useWallet();
  const { selectedChain } = useChain();
  const [swapDetails, setSwapDetails] = useState<SwapType | null>(null);
  const { showLoader, hideLoader } = useLoader();
  const { contract, walletAddress } = walletState;
  const [tokens, setTokensState] = useState<TokensState>({
    inputToken: null,
    outputToken: null,
  });
  const [inputAmount, setInputAmount] = useState<string | null>(null);
  const [swapStatus, setSwapStatus] = useState<SwapStatus>({
    status: 'Processing',
  });

  const [transactionProcessing, setTransactionProcessing] =
    useState<boolean>(false);

  const resetSwapForm = useCallback(() => {
    setTokensState({ inputToken: null, outputToken: null });
    setInputAmount(null);
  }, []);

  const { fetchBalances, balances } = useWalletBalances();

  const createSwap = useCallback(async () => {
    setTransactionProcessing(true);
    try {
      await connectWallet();
      const walletBalances = await fetchBalances();
      const inputTokenAddress = tokens.inputToken?.address;
      const outputTokenAddress = tokens.outputToken?.address;
      const inputAmountNormalized = convertToTokenUnit(
        selectedChain.availableTokens,
        inputTokenAddress!,
        inputAmount!,
      );
      const inputTokenLabel = tokens.inputToken?.symbol;
      const currentBalanceStandardUnit = convertToTokenUnit(
        selectedChain.availableTokens,
        inputTokenAddress!,
        walletBalances[inputTokenLabel!],
      );
      if (
        parseFloat(currentBalanceStandardUnit) <
        parseFloat(inputAmountNormalized!)
      )
        return showErrorToast(
          'Insufficient Balance',
          `You do not have enough ${inputTokenLabel}`,
        );

      if (!inputTokenAddress || !outputTokenAddress || !inputAmountNormalized) {
        throw new Error('Missing token information or amount for the swap');
      }

      const receipt = await contract!.methods
        .createSwap(
          inputTokenAddress,
          outputTokenAddress,
          inputAmountNormalized,
        )
        .send({ from: walletAddress! });
      const swapId = receipt.events?.SwapCreated?.returnValues?.swapId;
      baseApi.post('swaps/request', {
        swap_id: swapId,
        network: selectedChain.value,
      });
      setSwapDetails(null);

      showSuccessToast('Success', 'Swap created successfully');
      router.push(`/swap/${swapId}`);
      resetSwapForm();
    } catch (error: any) {
      showErrorToast(
        'Swap Failed',
        getErrorMessage(error.code || error.message),
      );
    } finally {
      setTransactionProcessing(false);
    }
  }, [
    contract,
    connectWallet,
    tokens,
    inputAmount,
    walletAddress,
    resetSwapForm,
    router,
    selectedChain,
    fetchBalances,
  ]);

  const findToken = useCallback(
    (address: string) =>
      selectedChain.availableTokens.find(
        (token) => token.address.toLowerCase() === address.toLowerCase(),
      ),
    [selectedChain.availableTokens],
  );
  const getSwapDetails = useCallback(
    async (swapId: string): Promise<any> => {
      try {
        const deployeedContract = contract || (await getContract());
        const swapRaw: any = await deployeedContract!.methods
          .swaps(swapId)
          .call();
        const isFinalized: boolean = await deployeedContract!.methods
          .isFinalized(swapId)
          .call();
        const isExpired: boolean = await deployeedContract!.methods
          .isExpired(swapId)
          .call();
        const bidders: string[] = await deployeedContract!.methods
          .getBidders(swapId)
          .call();

        const biddersInfo: Bidder[] = await Promise.all(
          bidders.map(async (bidder) => {
            const bidAmount: bigint = await deployeedContract!.methods
              .getBidInfo(swapId, bidder)
              .call();
            return { bidder, bidAmount };
          }),
        );

        const winnerBid = biddersInfo.find(
          (bid) => bid.bidder === swapRaw.topBidder1,
        );
        const inputToken = findToken(swapRaw.inputToken)!;

        const outputToken = findToken(swapRaw.outputToken)!;
        const swapFormatted: SwapType = {
          topBidders: biddersInfo,
          winnerBidder: winnerBid!,
          isFinalized,
          isExpired,
          inputTokenAddress: swapRaw.inputToken,
          amount: swapRaw.inputTokenAmount,
          inputAmount: convertFromTokenUnit(
            selectedChain.availableTokens,
            swapRaw.inputToken,
            swapRaw.inputTokenAmount,
          ),
          outputAmount: winnerBid
            ? convertFromTokenUnit(
                selectedChain.availableTokens,
                swapRaw.outputToken,
                winnerBid?.bidAmount!,
              )
            : '0',
          timestamp: swapRaw.timestamp,
          tokens: {
            inputToken,
            outputToken,
          },
        };
        setSwapDetails(swapFormatted);
        return swapFormatted;
      } catch (error: any) {
        setSwapDetails({} as SwapType);
        return {};
      }
    },
    [selectedChain.availableTokens, getContract, findToken, contract],
  );

  const finalizeSwap = useCallback(
    async (swapId: string) => {
      setSwapStatus({ status: 'Processing' });
      setTransactionProcessing(true);
      try {
        const swapDetails = await getSwapDetails(swapId);
        if (!swapDetails.inputTokenAddress) return;
        const tokenAddress = swapDetails.inputTokenAddress;
        const tokenContract = new web3!.eth.Contract(ERC20_ABI, tokenAddress);

        await tokenContract.methods
          .approve(selectedChain.ambodexContractAddress, swapDetails.amount)
          .send({ from: walletAddress! });

        const nonce: any = await web3!.eth.getTransactionCount(
          walletAddress!,
          'pending',
        );

        await contract!.methods.finalizeSwap(swapId).send({
          from: walletAddress!,
          gas: '2000000',
          gasPrice: (await web3!.eth.getGasPrice()).toString(),
          nonce,
        });
        showLoader();

        await getSwapDetails(swapId);
        showSuccessToast(
          'Success',
          'The swap has been finalized successfully.',
        );
        setSwapStatus({ status: 'Completed' });
      } catch (error: any) {
        showErrorToast('Error', getErrorMessage(error.code));
      } finally {
        hideLoader();
        setTransactionProcessing(false);
      }
    },
    [
      contract,
      walletAddress,
      web3,
      selectedChain,
      getSwapDetails,
      hideLoader,
      showLoader,
    ],
  );

  const setTokens = (newTokens: Partial<TokensState>) => {
    setTokensState((prevTokens) => ({
      inputToken:
        newTokens.inputToken &&
        newTokens.inputToken.address.toLocaleLowerCase() ===
          prevTokens.outputToken?.address.toLocaleLowerCase()
          ? newTokens.inputToken
          : prevTokens.outputToken,
      outputToken:
        newTokens.outputToken &&
        newTokens.outputToken.address.toLocaleLowerCase() ===
          prevTokens.inputToken?.address.toLocaleLowerCase()
          ? newTokens.outputToken
          : prevTokens.inputToken,
      ...newTokens,
    }));
  };

  const contextValue = useMemo(
    () => ({
      tokens,
      inputAmount,
      transactionProcessing,
      setTokens,
      setInputAmount,
      createSwap,
      getSwapDetails,
      balances,
      fetchBalances,
      setSwapStatus,
      swapStatus,
      finalizeSwap,
      swapDetails,
    }),
    [
      tokens,
      inputAmount,
      transactionProcessing,
      createSwap,
      getSwapDetails,
      balances,
      fetchBalances,
      setSwapStatus,
      swapStatus,
      finalizeSwap,
      swapDetails,
    ],
  );

  return (
    <CreateSwapContext.Provider value={contextValue}>
      {children}
    </CreateSwapContext.Provider>
  );
};

export { CreateSwapContext, CreateSwapProvider };
