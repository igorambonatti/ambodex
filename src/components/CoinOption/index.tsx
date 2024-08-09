import Image from 'next/image';
import type { ButtonHTMLAttributes } from 'react';

import type { TokenOptionType } from '@/constants/ChainOptions';

type OptionType = TokenOptionType & {
  balance?: string;
};
interface CoinOptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  option: OptionType;
}

const CoinOption: React.FC<CoinOptionProps> = ({ option, ...props }) => {
  return (
    <button
      key={option.address}
      type="button"
      className="mb-6 flex h-12 items-center p-6 hover:bg-[#99999919]"
      {...props}
    >
      <div className="flex">
        <div className="relative">
          <Image
            src={option.icon}
            alt={option.address}
            className="z-0"
            width={32}
            height={32}
          />
          <Image
            src={option.network_icon}
            alt="Network"
            width={16}
            height={16}
            className="absolute -bottom-1 -right-0.5 rounded-[4px] border border-solid border-black"
          />
        </div>
      </div>
      <div className="ml-3 flex flex-col">
        <span className="text-left leading-4 text-white">
          {option.symbol.toUpperCase()}
        </span>
        {option.balance && (
          <span className="text-sm leading-4 text-[#999999]">
            {option.balance} {option.symbol}
          </span>
        )}
      </div>
      {option.balance && (
        <span className="ml-auto text-white">{option.balance}</span>
      )}
    </button>
  );
};

export default CoinOption;
