'use client';

import Image from 'next/image';

import { useLoader } from '@/hooks/useLoader';

interface GlobalLoaderType extends React.PropsWithChildren {
  active?: boolean;
}

export const Loader: React.FC<React.PropsWithChildren> = () => {
  return (
    <div className="absolute left-0 top-0 z-30 flex size-full flex-1 justify-center bg-[#000]/40 backdrop-blur-sm">
      <div className="flex items-center">
        <Image
          src="/assets/loader.gif"
          alt="Logo"
          width={48}
          height={48}
          priority
          unoptimized
          className="logo ml-3 opacity-60"
        />
      </div>
    </div>
  );
};

const GlobalLoader: React.FC<GlobalLoaderType> = ({ active }) => {
  const { isActive } = useLoader();
  return isActive || active ? <Loader /> : null;
};

export default GlobalLoader;
