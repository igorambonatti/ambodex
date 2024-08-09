import React, { useMemo } from 'react';

import type { SwapType } from '@/context/CreateSwap/types';
import { useChain } from '@/hooks/useChain';
import { convertFromTokenUnit } from '@/utils/convertTokenUnit';

import { MinerTable } from '../Table/MinerTable';

interface MinorsInfoProps {
  miners?: any[];
  swapDetails: SwapType;
}

const MinorsInfo: React.FC<MinorsInfoProps> = ({ miners, swapDetails }) => {
  const { selectedChain } = useChain();

  const minersData = useMemo(() => {
    return miners?.map((item, index) => ({
      id: item.bidder + index,
      miner: item.bidder,
      selected:
        item.bidder.toLowerCase() ===
        swapDetails?.winnerBidder?.bidder.toLowerCase(),
      input: {
        amount: swapDetails.inputAmount,
        token: swapDetails.tokens.inputToken,
      },
      output: {
        amount: convertFromTokenUnit(
          selectedChain.availableTokens,
          swapDetails.tokens.outputToken.address,
          item.bidAmount.toString(),
        ),
        token: swapDetails.tokens.outputToken,
      },
    }));
  }, [swapDetails, miners, selectedChain.availableTokens]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-[32px] font-semibold text-white">Miner Bid Info</h1>
      </div>
      <MinerTable miners={minersData || []} />
    </div>
  );
};

export default MinorsInfo;
