import { useContextSelector } from 'use-context-selector';

import { ChainContext } from '@/context/Chain';
import type { IChainContext } from '@/context/Chain/types';

export function useChain(): IChainContext {
  const selectedChain = useContextSelector(
    ChainContext,
    (cx) => cx.selectedChain,
  );
  const chains = useContextSelector(ChainContext, (cx) => cx.chains);
  const setSelectedChain = useContextSelector(
    ChainContext,
    (cx) => cx.setSelectedChain,
  );

  return { selectedChain, chains, setSelectedChain };
}
