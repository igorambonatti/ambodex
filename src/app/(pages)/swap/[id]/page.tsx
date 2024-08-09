'use client';

import './styles.scss';

import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useUpdateEffect } from 'react-use';

import { Button, CreateSwapSection, GlobalLoader } from '@/components';
import MinorsInfo from '@/components/MinorsInfo';
import Banner from '@/components/NoFees';
import { ComparisonTable } from '@/components/Table/ComparisonTable';
import TimerComponent from '@/components/Timer';
import { showErrorToast } from '@/components/Toast';
import type { SwapStatus } from '@/context/CreateSwap/types';
import { useChain } from '@/hooks/useChain';
import { useCreateSwap } from '@/hooks/useCreateSwap';
import { useWallet } from '@/hooks/useWallet';
import { truncateString } from '@/utils/truncateString';

interface SwapProps {
  params: {
    id: string;
  };
}

const Swap: React.FC<SwapProps> = ({ params: { id } }) => {
  const {
    getSwapDetails,
    swapDetails,
    setSwapStatus,
    swapStatus,
    transactionProcessing,
  } = useCreateSwap();
  const {
    walletState: { contract },
  } = useWallet();
  const router = useRouter();
  const { selectedChain } = useChain();

  const [loading, setLoading] = useState(true);
  const fiveMinutes = 5 * 60 * 1000;

  const loadSwapDetails = useCallback(async () => {
    try {
      await getSwapDetails(id);
    } catch (error: any) {
      showErrorToast('Error', 'Failed to load swap details');
    } finally {
      setLoading(false);
    }
  }, [id, setLoading, getSwapDetails]);

  useUpdateEffect(() => {
    let status: SwapStatus['status'] = 'Processing';
    const validTime =
      Date.now() - Number(swapDetails?.timestamp) * 1000 < fiveMinutes;
    if (swapDetails?.isFinalized) {
      status = 'Completed';
    } else if (swapDetails?.isExpired || !validTime) {
      status = 'Expired';
    } else if (swapDetails?.topBidders?.[0] && !transactionProcessing)
      status = 'Open';
    setSwapStatus({ status });
  }, [swapDetails]);

  useEffect(() => {
    const validTime =
      Date.now() - Number(swapDetails?.timestamp) * 1000 < fiveMinutes;
    const interval = setInterval(() => {
      if (
        (validTime && swapStatus.status === 'Open') ||
        swapStatus.status === 'Processing'
      ) {
        loadSwapDetails();
      } else {
        clearInterval(interval);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [
    swapDetails?.timestamp,
    contract,
    loadSwapDetails,
    fiveMinutes,
    swapStatus,
  ]);

  useEffect(() => {
    loadSwapDetails();
  }, [contract]);

  const handleSwapAgain = () => {
    router.push('/create-swap');
  };

  return (
    <div className="swap-detail-container flex w-full flex-1 justify-center">
      <div className="mr-4 flex size-full w-full max-w-[620px] flex-1 flex-col">
        <GlobalLoader active={!swapDetails} />
        {loading && <div className="top-loader" />}
        <div className="flex max-h-full flex-1 flex-col rounded-lg bg-[#1B1B1B] px-4 pt-6">
          {!loading && (
            <MinorsInfo
              miners={swapDetails?.topBidders}
              swapDetails={swapDetails!}
            />
          )}
          {/* {swapDetails?.isFinalized && (
            <WinnerInfo swapDetails={swapDetails!} />
          )} */}
        </div>
        <ComparisonTable
          props={{
            amount: swapDetails?.inputAmount!,
            inputToken: swapDetails?.tokens?.inputToken.address!,
            outputToken: swapDetails?.tokens?.outputToken.address!,
            network: selectedChain.value,
          }}
        />
      </div>
      <div className="details-container relative flex w-[450px] flex-col">
        <div>
          <div className="flex min-h-[174px] flex-col">
            {loading && <div className="top-loader" />}
            <CreateSwapSection
              disabled
              defaultValues={{
                inputAmount: swapDetails?.inputAmount,
                outputAmount: swapDetails?.outputAmount,
                tokens: swapDetails?.tokens!,
                swapId: id,
                hasWinner: swapDetails?.isFinalized,
              }}
            />
          </div>
        </div>
        <div className="mt-4 flex h-24 flex-1 flex-col items-center justify-center rounded-lg bg-[#1B1B1B] p-4">
          <TimerComponent
            timestamp={Number(swapDetails?.timestamp) * 1000}
            hasWinner={swapDetails?.isFinalized}
            isExpired={swapDetails?.isExpired}
          />
          <div className="mt-6 flex w-full justify-between">
            <span className="text-sm text-[#71797D]">Fees:</span>
            <span className="text-sm text-white">No fees</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="text-sm text-[#71797D]">Transaction ID:</span>
            <span className="text-sm text-white">#{truncateString(id)}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="text-sm text-[#71797D]">Status:</span>
            <span className="text-sm text-white">{swapStatus.status}</span>
          </div>
          {swapDetails?.isFinalized && (
            <div className="flex w-full justify-between">
              <span className="text-sm text-[#71797D]">Miner:</span>
              <span className="text-sm text-white">
                {truncateString(swapDetails.winnerBidder.bidder)}
              </span>
            </div>
          )}
        </div>
        {swapDetails?.isFinalized ? (
          <Button
            variant="secondary"
            className="mt-4"
            onClick={handleSwapAgain}
          >
            Back to Swap
          </Button>
        ) : (
          <Banner />
        )}
      </div>
    </div>
  );
};

export default Swap;
