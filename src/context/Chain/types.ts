import type { ChainOptionType } from '@/constants/ChainOptions';

export interface IChainContext {
  selectedChain: ChainOptionType;
  chains: ChainOptionType[];
  setSelectedChain(chainValue: ChainOptionType): void;
}
