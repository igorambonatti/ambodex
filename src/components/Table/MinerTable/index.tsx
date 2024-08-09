import './styles.scss';

import Image from 'next/image';
import React from 'react';

import NoResults from '@/components/NoResults';
import type { TokenOptionType } from '@/constants/ChainOptions';
import { truncateString } from '@/utils/truncateString';

export interface Miner {
  id: string;
  miner: string;
  input: {
    amount: string;
    token: TokenOptionType;
  };
  output: {
    amount: string;
    token: TokenOptionType;
  };
  selected: boolean;
}

interface MinerTableProps {
  miners: Miner[];
}

export const MinerTable: React.FC<MinerTableProps> = ({ miners }) => {
  return (
    <div className="miner-table-container flex w-full flex-1 flex-col">
      <div className="mb-4 rounded-lg bg-[#7feaa30d]">
        <div className="top-container flex">
          <div className="w-[145px]">Miner:</div>
          <div className="w-[142px] text-center">Price:</div>
          <div className="w-[142px] text-right">You receive:</div>
        </div>
      </div>
      {!miners[0] && (
        <div className="flex flex-1 items-center">
          <NoResults
            title="No Miner"
            description="It seems that there are no miners capable of making a swap. Try to refresh the list."
          />
        </div>
      )}
      <div className="flex flex-col overflow-y-auto">
        {miners.map((miner) => (
          <div key={miner.id} className="body">
            {miner.selected && (
              <div className="top-miner">
                <span>Top miner</span>
                <Image
                  src="/assets/icons/top_minor.svg"
                  alt="Logo"
                  width={12}
                  height={12}
                  priority
                />
              </div>
            )}
            <div
              className={`container flex ${miner.selected ? 'bg-selected' : 'bg-unselected'}`}
            >
              <div className="flex w-[145px] items-center">
                <div className="bg-image">
                  <Image
                    src="/assets/logo_ambodex.svg"
                    alt="Logo"
                    width={10}
                    height={10}
                    priority
                  />
                </div>
                {truncateString(miner.miner)}
              </div>
              <div className="flex w-[142px] justify-center">
                <span className="mr-1 text-lg">{miner.input.amount} </span>
                <span className="mt-1">{miner.input.token.symbol}</span>
              </div>
              <div className="flex w-[142px]">
                <span className="ml-auto mr-1 text-lg">
                  {miner.output.amount}{' '}
                </span>
                <span className=" mt-1">{miner.output.token.symbol}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
