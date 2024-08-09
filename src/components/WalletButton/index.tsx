import './styles.scss';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { useWallet } from '@/hooks/useWallet';
import { truncateString } from '@/utils/truncateString';

import Button from '../Button';
import WalletButton from '../Button/WalletButton';

const WalletWebButton = () => {
  const [showMenuBool, setShowMenuBool] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { walletState, connectWallet, disconnectWallet } = useWallet();
  const { metaMaskConnected, walletAddress, connectLoading } = walletState;
  const handleClickOutside = (event: MouseEvent): void => {
    if (
      !(containerRef?.current as any)?.contains(event?.target) &&
      !(buttonRef?.current as any)?.contains(event?.target)
    ) {
      setShowMenuBool(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleDisconectWallet = () => {
    setShowMenuBool(false);
    disconnectWallet();
  };
  return (
    <div className="relative">
      <WalletButton
        className="wallet-button"
        onClickAddress={() => setShowMenuBool((prev) => !prev)}
        onClick={connectWallet}
        isLoading={connectLoading}
        isConnected={metaMaskConnected}
        address={walletAddress || undefined}
      />
      {showMenuBool && (
        <div ref={containerRef} className="menu-wallet absolute p-4" id="menu">
          <div className="flex items-center">
            <Image
              src="/assets/metamask_logo.svg"
              alt="MetaMask"
              width={30}
              height={30}
            />
            <span className="mx-2 text-white">{`${truncateString(walletAddress || '')}`}</span>
          </div>
          <Button
            variant="outline"
            className="mt-4 font-bold"
            onClick={handleDisconectWallet}
          >
            Disconect
          </Button>
        </div>
      )}
    </div>
  );
};
export default WalletWebButton;
