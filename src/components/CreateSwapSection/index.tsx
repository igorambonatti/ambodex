'use client';

import './styles.scss';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import baseApi from '@/app/api/baseApi';
// import { options } from '@/constants/CoinOptions';
import type { TokensState } from '@/context/CreateSwap/types';
import { useChain } from '@/hooks/useChain';
import { useCreateSwap } from '@/hooks/useCreateSwap';
import { useWallet } from '@/hooks/useWallet';
import {
  convertFromTokenUnit,
  convertToTokenUnit,
} from '@/utils/convertTokenUnit';

import CoinButton from '../Button/CoinButton';
import SwapButton from '../Button/SwapButton';
import Input from '../Input';
import type { ModalRef } from '../Modal';
import ModalInputCoin from '../Modal/ModalInputCoin';
import ModalOutputCoin from '../Modal/ModalOutputCoin';

interface CreateSwapProps {
  disabled?: boolean;
  defaultValues?: {
    inputAmount?: string;
    outputAmount?: string;
    swapId?: string;
    tokens: TokensState;
    hasWinner?: boolean;
  };
}

const CreateSwapSection: React.FC<CreateSwapProps> = ({
  disabled,
  defaultValues,
}) => {
  const modalInputRef = useRef<ModalRef>(null);
  const modalOutputRef = useRef<ModalRef>(null);
  const router = useRouter();
  const { control } = useForm();
  const { walletState, connectWallet } = useWallet();
  const {
    tokens,
    createSwap,
    setInputAmount,
    transactionProcessing,
    inputAmount,
  } = useCreateSwap();
  const { selectedChain } = useChain();
  const { swapStatus, finalizeSwap } = useCreateSwap();
  const { metaMaskConnected, connectLoading } = walletState;
  const [outputAmount, setOutputAmount] = useState<string | null>();
  const selectedTokens = defaultValues?.tokens || tokens;
  const isFormIncomplete =
    !tokens.inputToken || !tokens.outputToken || !inputAmount;

  const openInputModal = () => {
    modalInputRef.current?.open();
  };
  const openOutputModal = () => {
    modalOutputRef.current?.open();
  };

  const finishSwap = () => {
    finalizeSwap(defaultValues?.swapId!);
  };
  const handleSwapAgain = () => {
    router.push('/create-swap');
  };

  const handleApiRate = useDebouncedCallback(async (value: string) => {
    try {
      const response = await baseApi.get('/pricing', {
        params: {
          amount: convertToTokenUnit(
            selectedChain.availableTokens,
            tokens?.inputToken?.address!,
            value,
          ),
          input_token: tokens?.inputToken?.address,
          output_token: tokens?.outputToken?.address,
          network: selectedChain.value,
        },
      });
      const outputAmountParsed = convertFromTokenUnit(
        selectedChain.availableTokens,
        tokens?.outputToken?.address!,
        response.data.price,
      );
      setOutputAmount(outputAmountParsed);
    } catch (err) {
      console.log(err);
    }
  }, 1000);

  useEffect(() => {
    if (inputAmount) handleApiRate(inputAmount);
  }, [tokens.inputToken]);

  const onInputAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmount(e.target.value);
    handleApiRate(e.target.value);
  };
  return (
    <div className="flex max-h-[300px] w-full flex-1 flex-col">
      <div className="relative flex  flex-1 rounded-lg bg-[#1B1B1B] px-4 py-5">
        <div className="flex flex-col">
          <span className="mb-2 text-white">You pay</span>
          <Input
            control={control}
            name="coin"
            variant="coin"
            placeholder="0.00"
            type="number"
            defaultValue={defaultValues?.inputAmount}
            onChange={onInputAmountChange}
            disabled={disabled}
          />
          {/* <span className="mt-8 text-[#999999]">$6,685.53</span> */}
        </div>
        <div className="ml-auto flex items-center">
          <CoinButton
            onClick={openInputModal}
            disabled={disabled}
            coin={selectedTokens.inputToken}
          />
        </div>
        <div className="absolute bottom-[-19px] left-[48%] z-10 flex size-7 justify-center rounded-lg border-[3px] border-[#111111] bg-[#1B1B1B]">
          <Image
            src="/assets/icons/arrow_down.svg"
            alt="Ethereum"
            width={6}
            height={6}
            priority
          />
        </div>
      </div>
      <div className="relative mt-2 flex max-h-[88px] rounded-lg bg-[#1B1B1B] px-4 py-5">
        <div className="flex flex-1 flex-col justify-center">
          <span className="mb-2 text-white">
            {swapStatus?.status === 'Completed'
              ? 'You received'
              : 'You receive'}
          </span>
          {outputAmount || defaultValues?.outputAmount ? (
            <span className="text-2xl text-white">
              {outputAmount || defaultValues?.outputAmount}
            </span>
          ) : (
            <span className="text-2xl text-[#999]/55">0.00</span>
          )}
        </div>
        <div className="ml-auto flex items-center">
          <CoinButton
            onClick={openOutputModal}
            disabled={disabled}
            coin={selectedTokens.outputToken}
          />
        </div>
      </div>
      {!defaultValues?.hasWinner && (
        <div className="mt-2">
          <SwapButton
            metaMaskConnected={metaMaskConnected}
            disabled={!!disabled}
            swapStatus={swapStatus}
            transactionProcessing={transactionProcessing}
            isFormIncomplete={isFormIncomplete}
            connectLoading={connectLoading}
            createSwap={createSwap}
            finishSwap={finishSwap}
            handleSwapAgain={handleSwapAgain}
            connectWallet={connectWallet}
          />
        </div>
      )}
      <ModalInputCoin
        options={selectedChain.availableTokens}
        ref={modalInputRef}
      />
      <ModalOutputCoin
        options={selectedChain.availableTokens}
        ref={modalOutputRef}
      />
    </div>
  );
};

export default CreateSwapSection;
