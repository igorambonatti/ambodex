import { useContextSelector } from 'use-context-selector';

import type { ILoaderContext } from '@/context/Loader';
import { LoaderContext } from '@/context/Loader';

export function useLoader(): ILoaderContext {
  const isActive = useContextSelector(LoaderContext, (cx) => cx.isActive);
  const showLoader = useContextSelector(LoaderContext, (cx) => cx.showLoader);
  const hideLoader = useContextSelector(LoaderContext, (cx) => cx.hideLoader);

  return { isActive, showLoader, hideLoader };
}
