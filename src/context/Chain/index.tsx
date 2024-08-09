import { useMemo, useState } from 'react';
import { createContext } from 'use-context-selector';

import { activeChains, type ChainOptionType } from '@/constants/ChainOptions';

import type { IChainContext } from './types';

const ChainContext = createContext<IChainContext>({} as IChainContext);

ChainContext.displayName = 'Chain';

const ChainProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [chains] = useState<ChainOptionType[]>(activeChains);
  const [selectedChain, setSelectedChain] = useState<ChainOptionType>(
    chains[0],
  );

  const contextValue = useMemo(
    () => ({
      selectedChain,
      chains,
      setSelectedChain,
    }),
    [selectedChain, chains, setSelectedChain],
  );

  return (
    <ChainContext.Provider value={contextValue}>
      {children}
    </ChainContext.Provider>
  );
};

export { ChainContext, ChainProvider };
