import { useContextSelector } from 'use-context-selector';

import { CreateSwapContext } from '@/context/CreateSwap';
import type { ICreateSwapContext } from '@/context/CreateSwap/types';

export function useCreateSwap(): ICreateSwapContext {
  const tokens = useContextSelector(CreateSwapContext, (cx) => cx.tokens);
  const inputAmount = useContextSelector(
    CreateSwapContext,
    (cx) => cx.inputAmount,
  );
  const setTokens = useContextSelector(CreateSwapContext, (cx) => cx.setTokens);
  const createSwap = useContextSelector(
    CreateSwapContext,
    (cx) => cx.createSwap,
  );
  const setInputAmount = useContextSelector(
    CreateSwapContext,
    (cx) => cx.setInputAmount,
  );
  const getSwapDetails = useContextSelector(
    CreateSwapContext,
    (cx) => cx.getSwapDetails,
  );
  const transactionProcessing = useContextSelector(
    CreateSwapContext,
    (cx) => cx.transactionProcessing,
  );
  const balances = useContextSelector(CreateSwapContext, (cx) => cx.balances);
  const fetchBalances = useContextSelector(
    CreateSwapContext,
    (cx) => cx.fetchBalances,
  );
  const swapStatus = useContextSelector(
    CreateSwapContext,
    (cx) => cx.swapStatus,
  );
  const setSwapStatus = useContextSelector(
    CreateSwapContext,
    (cx) => cx.setSwapStatus,
  );
  const finalizeSwap = useContextSelector(
    CreateSwapContext,
    (cx) => cx.finalizeSwap,
  );
  const swapDetails = useContextSelector(
    CreateSwapContext,
    (cx) => cx.swapDetails,
  );

  return {
    swapDetails,
    finalizeSwap,
    swapStatus,
    setSwapStatus,
    tokens,
    inputAmount,
    setTokens,
    setInputAmount,
    createSwap,
    getSwapDetails,
    transactionProcessing,
    balances,
    fetchBalances,
  };
}
