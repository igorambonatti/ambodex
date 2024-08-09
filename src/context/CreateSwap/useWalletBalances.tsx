import { useCallback, useState } from 'react';

import type { TokenOptionType } from '@/constants/ChainOptions';
import ERC20_ABI from '@/constants/erc20.json';
import { useChain } from '@/hooks/useChain';
import { useWallet } from '@/hooks/useWallet';
import { convertFromTokenUnit } from '@/utils/convertTokenUnit';

export const useWalletBalances = () => {
  const { walletState, web3 } = useWallet();
  const { selectedChain } = useChain();
  const { walletAddress } = walletState;
  const [balances, setBalances] = useState<{ [key: string]: string }>({});

  const fetchBalances = useCallback(async (): Promise<any> => {
    if (!selectedChain?.availableTokens?.length || !web3 || !walletAddress) {
      setBalances({});
      return {};
    }

    const balancePromises = selectedChain.availableTokens.map(
      async (option: TokenOptionType) => {
        const tokenContract = new web3.eth.Contract(ERC20_ABI, option.address);
        try {
          const balanceWei: string = await tokenContract.methods
            .balanceOf(walletAddress)
            .call();
          const balance = convertFromTokenUnit(
            selectedChain.availableTokens,
            option.address,
            balanceWei,
          );
          return { label: option.symbol, balance };
        } catch (error) {
          return { label: option.symbol, balance: '0' };
        }
      },
    );

    const balancesResults = await Promise.all(balancePromises);
    const newBalances = balancesResults.reduce(
      (acc, { label, balance }) => ({ ...acc, [label]: balance }),
      {},
    );

    setBalances(newBalances);
    return newBalances;
  }, [web3, walletAddress, selectedChain.availableTokens]);

  return { fetchBalances, balances };
};
