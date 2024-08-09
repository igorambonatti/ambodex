import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createContext } from 'use-context-selector';
import Web3, { type Contract } from 'web3';

import { showErrorToast } from '@/components/Toast';
import ambodexAbi from '@/constants/ambodex.json';
import { useChain } from '@/hooks/useChain';
import { getErrorMessage } from '@/utils/errorMessages';

import {
  initialWalletState,
  type IWalletContext,
  type WalletState,
} from './types';

export const WalletContext = createContext<IWalletContext>(
  {} as IWalletContext,
);

WalletContext.displayName = 'Wallet';

export const WalletProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [walletState, setWalletState] =
    useState<WalletState>(initialWalletState);
  const { selectedChain } = useChain();

  const changeChainOnWeb3 = async (chainId: string) => {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  };

  const loadWallet = useCallback(async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await changeChainOnWeb3(selectedChain.chainId);
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });

        const deployedContract = new web3Instance.eth.Contract(
          ambodexAbi as any,
          selectedChain.ambodexContractAddress,
        );

        if (accounts.length > 0) {
          setWalletState({
            metaMaskConnected: true,
            walletAddress: accounts[0],
            contract: deployedContract,
            connectLoading: false,
          });
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  }, [selectedChain]);

  const connectWallet = useCallback(async () => {
    try {
      await changeChainOnWeb3(selectedChain.chainId);
      setWalletState((prevWalletState) => ({
        ...prevWalletState,
        connectLoading: true,
      }));

      if (!web3) throw new Error('');
      await window.ethereum.enable();
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      if (accounts.length === 0) throw new Error('No accounts found');
      setWalletState((prevWalletState) => ({
        ...prevWalletState,
        metaMaskConnected: true,
        walletAddress: accounts[0],
      }));
      if (!walletState.contract) await loadWallet();
    } catch (error: any) {
      return showErrorToast(
        'Connection Failed',
        getErrorMessage(error.code || 1206),
      );
    } finally {
      setWalletState((prevWalletState) => ({
        ...prevWalletState,
        connectLoading: false,
      }));
    }
  }, [web3, walletState.contract, loadWallet, selectedChain]);

  const getContract = useCallback(async (): Promise<
    Contract<any> | undefined
  > => {
    try {
      const web3Instance = web3 || new Web3(window.ethereum);
      if (!web3Instance) return undefined;
      return new web3Instance.eth.Contract(
        ambodexAbi as any,
        selectedChain.ambodexContractAddress,
      );
    } catch (err) {
      console.log(err);
    }
  }, [web3, selectedChain.ambodexContractAddress]);

  const disconnectWallet = useCallback(() => {
    setWalletState(initialWalletState);
  }, []);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') loadWallet();
  }, []);

  const value = useMemo(
    () => ({
      web3,
      walletState,
      setWalletState,
      connectWallet,
      getContract,
      disconnectWallet,
    }),
    [web3, walletState, connectWallet, getContract, disconnectWallet],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
