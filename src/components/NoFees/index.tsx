import Image from 'next/image';
import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="banner-with-gradient-border relative mt-4">
      <div className="max-w-[80%]">
        <h1 className="text-xl font-bold text-white">No fees anymore!</h1>
        <p className="mt-1 text-xs text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
          mi. Aliquam in hendrerit urna.
        </p>
      </div>
      <div className="absolute bottom-0 right-0">
        <Image
          src="/assets/icons/3D/ethereum.svg"
          alt="Ethereum"
          width={96}
          height={96}
          className="rounded-xl"
          priority
        />
      </div>
    </div>
  );
};

export default Banner;
