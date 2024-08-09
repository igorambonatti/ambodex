import type { TokenOptionType } from '@/constants/ChainOptions';

export interface TokensState {
  inputToken: TokenOptionType | null;
  outputToken: TokenOptionType | null;
}

export interface ICreateSwapContext {
  tokens: TokensState;
  inputAmount: string | null;
  transactionProcessing: boolean;
  setTokens: (tokens: Partial<TokensState>) => void;
  setInputAmount: (amount: string) => void;
  setSwapStatus: (status: SwapStatus) => void;
  swapStatus: SwapStatus;
  createSwap: () => Promise<any>;
  finalizeSwap: (swapId: string) => Promise<any>;
  balances: { [label: string]: string };
  fetchBalances: () => Promise<any>;
  getSwapDetails: (swapId: string) => Promise<SwapType | null>;
  swapDetails: SwapType | null;
}

export interface SwapType {
  winnerBidder: Bidder;
  topBidders: Bidder[];
  inputAmount: string;
  outputAmount: string;
  isFinalized: boolean;
  isExpired: boolean;
  timestamp: number;
  inputTokenAddress: string;
  amount: bigint;
  tokens: {
    inputToken: TokenOptionType;
    outputToken: TokenOptionType;
  };
}

export interface Bidder {
  bidder: string;
  bidAmount: bigint;
}
export interface SwapStatus {
  status: 'Expired' | 'Completed' | 'Open' | 'Processing';
}
export interface StatusMap {
  [key: string]: {
    [key: string]: SwapStatus;
  };
}
