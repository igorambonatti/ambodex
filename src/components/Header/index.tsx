'use client';

import './styles.scss';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Dropdown from '../Dropdown/DropdownChain';
import WalletButton from '../WalletButton';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const handleCreateSwapPage = () => {
    router.push('/create-swap');
  };
  return (
    <header className="header z-20">
      <button
        type="button"
        className="logo-container"
        onClick={handleCreateSwapPage}
      >
        <Image
          src="/assets/logo_ambodex.svg"
          alt="Logo"
          width={30}
          height={30}
          priority
          className="logo"
        />
        <p className="ml-3 text-white">Ambodex</p>
      </button>
      <div className="controls">
        <Dropdown />
        <WalletButton />
      </div>
    </header>
  );
};

export default Header;
