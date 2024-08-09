'use client';

import { ChainProvider } from './Chain';
import { CreateSwapProvider } from './CreateSwap';
import { LoaderProvider } from './Loader';
import { WalletProvider } from './Wallet';

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <LoaderProvider>
      <ChainProvider>
        <WalletProvider>
          <CreateSwapProvider>{children}</CreateSwapProvider>
        </WalletProvider>
      </ChainProvider>
    </LoaderProvider>
  );
};

export default AppProvider;
