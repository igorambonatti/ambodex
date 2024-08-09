'use client';

import { useEffect } from 'react';

import { CreateSwapSection } from '@/components';
import Banner from '@/components/NoFees';
import { useChain } from '@/hooks/useChain';
import { useCreateSwap } from '@/hooks/useCreateSwap';

const CreateSwap = () => {
  const { transactionProcessing, setTokens } = useCreateSwap();
  const { selectedChain } = useChain();

  useEffect(() => {
    setTokens({
      inputToken: selectedChain.availableTokens[0],
      outputToken: selectedChain.availableTokens[1],
    });
  }, [selectedChain]);

  return (
    <div className="flex h-full flex-col items-center">
      <div className="my-[48px] flex flex-col text-center">
        <h1 className="text-5xl font-semibold leading-[48px] text-white">
          Swap with no fees!
        </h1>
        <h2 className="text-[32px] text-[#999]">Now real with Ambodex</h2>
      </div>
      <div className="relative mb-7 flex max-w-[450px] flex-1 flex-col items-center">
        <CreateSwapSection />
        <Banner />
      </div>
      {transactionProcessing && (
        <div className="absolute top-0 z-10 flex size-full flex-1 bg-[#000]/10" />
      )}
    </div>
  );
};

export default CreateSwap;
