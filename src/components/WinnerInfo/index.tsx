import './styles.scss';

import Image from 'next/image';
import React from 'react';

import type { SwapType } from '@/context/CreateSwap/types';
import { useChain } from '@/hooks/useChain';
import { convertFromTokenUnit } from '@/utils/convertTokenUnit';
import { truncateString } from '@/utils/truncateString';

interface WinnerInfoProps {
  swapDetails: SwapType;
}

const WinnerInfo: React.FC<WinnerInfoProps> = ({ swapDetails }) => {
  const { selectedChain } = useChain();
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mb-4 text-sm font-bold text-white">Order info:</h1>
      <div>
        <div className="flex items-center rounded-lg border border-solid border-[#9999991A] px-4 py-2">
          <div className="bg-image">
            <Image
              src="/assets/logo_ambodex.svg"
              alt="Logo"
              width={10}
              height={10}
              priority
            />
          </div>
          <span className="ml-2 text-white">
            {truncateString(swapDetails?.winnerBidder.bidder).toLowerCase()}
          </span>
        </div>
      </div>
      <div className="winner-table-container mt-4 flex w-full flex-col rounded-lg  bg-[#7feaa30d]">
        <div className="rounded-lg">
          <div className="winner-top-container flex ">
            <div className="flex flex-col">
              <span className="mb-2 text-sm">Receive</span>
              <span className="text-[10px] text-[#81EEA6]">
                {convertFromTokenUnit(
                  selectedChain.availableTokens,
                  swapDetails?.tokens.outputToken.address,
                  swapDetails?.winnerBidder?.bidAmount!,
                )}{' '}
                {swapDetails?.tokens.outputToken.symbol}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="mb-2 text-sm">Price</span>
              <span className="text-[10px]">
                {swapDetails?.inputAmount}{' '}
                {swapDetails?.tokens.inputToken.symbol}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="mb-2 text-sm">Total quantity</span>
              <span className="text-[10px]">
                {swapDetails?.inputAmount}{' '}
                {swapDetails?.tokens.inputToken.symbol}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="mb-2 text-sm">Transaction fees</span>
              <span className="text-[10px]">0 fees</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerInfo;
