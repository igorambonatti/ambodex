import { useContextSelector } from 'use-context-selector';

import { WalletContext } from '@/context/Wallet';
import type { IWalletContext } from '@/context/Wallet/types';

export function useWallet(): IWalletContext {
  const web3 = useContextSelector(WalletContext, (cx) => cx.web3);
  const walletState = useContextSelector(WalletContext, (cx) => cx.walletState);
  const connectWallet = useContextSelector(
    WalletContext,
    (cx) => cx.connectWallet,
  );
  const getContract = useContextSelector(WalletContext, (cx) => cx.getContract);
  const setWalletState = useContextSelector(
    WalletContext,
    (cx) => cx.setWalletState,
  );
  const disconnectWallet = useContextSelector(
    WalletContext,
    (cx) => cx.disconnectWallet,
  );

  return {
    web3,
    walletState,
    setWalletState,
    connectWallet,
    getContract,
    disconnectWallet,
  };
}
