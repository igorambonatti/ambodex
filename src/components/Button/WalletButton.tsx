import Image from 'next/image';
import type { AllHTMLAttributes } from 'react';

import { truncateString } from '@/utils/truncateString';

import Button from '.';

interface IWalletButtonProps extends AllHTMLAttributes<HTMLElement> {
  onClick: () => void;
  onClickAddress: () => void;
  isLoading: boolean;
  isConnected: boolean;
  address?: string;
}

const WalletButton: React.FC<IWalletButtonProps> = ({
  onClick,
  onClickAddress,
  isLoading,
  isConnected,
  address,
  ...props
}) => {
  return (
    <div {...props}>
      {isConnected && address ? (
        <button
          className="flex items-center"
          type="button"
          onClick={onClickAddress}
        >
          <Image
            src="/assets/metamask_logo.svg"
            alt="MetaMask"
            width={30}
            height={30}
          />
          <span className="mx-2 text-white">{`${truncateString(address)}`}</span>
        </button>
      ) : (
        <Button type="button" onClick={onClick}>
          {isLoading ? 'Loading...' : 'Connect your wallet'}
        </Button>
      )}
    </div>
  );
};

export default WalletButton;
