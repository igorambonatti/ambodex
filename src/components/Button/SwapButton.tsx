/* eslint-disable default-case */
import Image from 'next/image';
import type { FC } from 'react';

import Button from '.';

interface SwapStatus {
  status: 'Open' | 'Expired' | 'Completed' | 'Processing';
}

interface SwapButtonProps {
  metaMaskConnected: boolean;
  disabled: boolean;
  swapStatus: SwapStatus;
  transactionProcessing: boolean;
  isFormIncomplete: boolean;
  connectLoading: boolean;
  createSwap: () => void;
  finishSwap: () => void;
  handleSwapAgain: () => void;
  connectWallet: () => void;
}

const SwapButton: FC<SwapButtonProps> = ({
  metaMaskConnected,
  disabled,
  swapStatus,
  transactionProcessing,
  isFormIncomplete,
  connectLoading,
  createSwap,
  finishSwap,
  handleSwapAgain,
  connectWallet,
}) => {
  if (metaMaskConnected && !disabled) {
    return (
      <Button
        variant="secondary"
        onClick={createSwap}
        disabled={isFormIncomplete}
        className={`${transactionProcessing ? 'bg-[#3d754f]' : ''} items-center`}
      >
        {transactionProcessing ? 'Processing...' : 'Create Swap'}
        {transactionProcessing && (
          <Image
            src="/assets/loader.gif"
            alt="Loading"
            width={16}
            height={16}
            priority
            unoptimized
            className="ml-3 opacity-60"
          />
        )}
      </Button>
    );
  }
  if (disabled) {
    switch (swapStatus.status) {
      case 'Open':
        return (
          <Button variant="secondary" onClick={finishSwap}>
            Finish Swap
          </Button>
        );
      case 'Expired':
      case 'Completed':
        return (
          <Button variant="secondary" onClick={handleSwapAgain}>
            Swap Again
          </Button>
        );
      case 'Processing':
        return (
          <Button variant="secondary" disabled className="items-center">
            Processing...
            <Image
              src="/assets/loader.gif"
              alt="Loading"
              width={16}
              height={16}
              priority
              unoptimized
              className="ml-3 opacity-60"
            />
          </Button>
        );
    }
  }

  return (
    <Button
      variant="secondary"
      onClick={connectWallet}
      disabled={connectLoading}
      className="items-center"
    >
      {connectLoading ? 'Loading...' : 'Connect Wallet'}
      {connectLoading && (
        <Image
          src="/assets/loader.gif"
          alt="Loading"
          width={16}
          height={16}
          priority
          unoptimized
          className="ml-3 opacity-60"
        />
      )}
    </Button>
  );
};

export default SwapButton;
