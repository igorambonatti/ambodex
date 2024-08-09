import type { Contract } from 'web3';
import type Web3 from 'web3';

export const initialWalletState = {
  metaMaskConnected: false,
  walletAddress: null as string | null,
  contract: null as Contract<any> | null,
  connectLoading: false,
};

export type WalletState = typeof initialWalletState;

export type IWalletContext = {
  web3: Web3 | null;
  walletState: WalletState;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  getContract: () => Promise<Contract<any> | undefined>;
  setWalletState: React.Dispatch<React.SetStateAction<WalletState>>;
};
