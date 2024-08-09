import { useCallback, useMemo, useState } from 'react';
import { createContext } from 'use-context-selector';

const LoaderContext = createContext<ILoaderContext>({} as ILoaderContext);

LoaderContext.displayName = 'Loader';

export interface ILoaderContext {
  isActive: boolean;
  showLoader(): void;
  hideLoader(): void;
}

const LoaderProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  const showLoader = useCallback(() => {
    setIsActive(true);
  }, []);

  const hideLoader = useCallback(() => {
    setIsActive(false);
  }, []);

  const contextValue = useMemo<ILoaderContext>(
    () => ({ isActive, showLoader, hideLoader }),
    [isActive, showLoader, hideLoader],
  );

  return (
    <LoaderContext.Provider value={contextValue}>
      {children}
    </LoaderContext.Provider>
  );
};

export { LoaderContext, LoaderProvider };
