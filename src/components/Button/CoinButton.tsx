'use client';

import Image from 'next/image';

import type { TokenOptionType } from '@/constants/ChainOptions';

interface CoinButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  coin?: TokenOptionType | null;
}

const CoinButton: React.FC<CoinButtonProps> = ({ coin, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      type="button"
      className="flex h-[48px] w-[180px] items-center justify-between rounded-lg border border-solid border-[#242424] bg-[#131313] p-2"
    >
      <div className="flex items-center">
        <div className="relative">
          {coin && (
            <>
              <Image
                src={coin.icon}
                alt={coin.address}
                width={32}
                height={32}
                priority
              />
              <Image
                src={coin.network_icon}
                alt="Network"
                width={16}
                height={16}
                className="absolute -bottom-1 -right-0.5 rounded-[4px] border border-solid border-black"
                priority
              />
            </>
          )}
        </div>
        <span className="ml-3 font-bold text-white">
          {coin && coin.symbol.toUpperCase()}
        </span>
      </div>
      {!buttonProps.disabled && (
        <Image
          src="/assets/icons/chevron_down.svg"
          alt="chevron_down"
          className="size-4"
          width={16}
          height={16}
        />
      )}
    </button>
  );
};

export default CoinButton;
