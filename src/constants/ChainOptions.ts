export type TokenOptionType = {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  icon: string;
  network_icon: string;
};

export type ChainOptionType = {
  value: string;
  label: string;
  chainId: string;
  icon: string;
  rpcUrl?: string;
  chainName?: string;
  ambodexContractAddress?: string;
  ambodexAbi?: string;
  availableTokens: TokenOptionType[];
  isTestnet?: boolean;
};
export const options: ChainOptionType[] = [
  {
    value: 'bnb',
    label: 'Bnb',
    chainId: '0x38',
    icon: '/assets/icons/square/bnb.svg',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    chainName: 'Binance Smart Chain',
    ambodexContractAddress: '0x4B4f0C76CD0E21DDE7888950D5cF09bAa5a69c20',
    ambodexAbi: '',
    availableTokens: [
      {
        symbol: 'USDT',
        name: 'Tether USD',
        address: '0x55d398326f99059fF775485246999027B3197955',
        icon: '/assets/icons/square/usdt.svg',
        network_icon: '/assets/icons/square/bnb.svg',
        decimals: 18,
      },
      {
        symbol: 'ETH',
        name: 'Ether',
        address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
        icon: '/assets/icons/square/ethereum.svg',
        network_icon: '/assets/icons/square/bnb.svg',
        decimals: 18,
      },
    ],
    isTestnet: false,
  },
  {
    value: 'bnb_test',
    label: 'Bnb Test',
    chainId: '0x61',
    icon: '/assets/icons/square/bnb.svg',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    chainName: 'Binance Smart Chain Testnet',
    ambodexContractAddress: '0xe5f8E240ae436aEfBDE90CFCE698AbA970222156',
    ambodexAbi: '',
    availableTokens: [
      {
        symbol: 'USDT',
        name: 'Tether USD',
        address: '0x337610d27c682e347c9cd60bd4b3b107c9d34ddd',
        icon: '/assets/icons/square/usdt.svg',
        network_icon: '/assets/icons/square/bnb.svg',
        decimals: 18,
      },
      {
        symbol: 'WETH',
        name: 'Wrapped Ether',
        address: '0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378',
        icon: '/assets/icons/square/ethereum.svg',
        network_icon: '/assets/icons/square/bnb.svg',
        decimals: 18,
      },
    ],
    isTestnet: true,
  },
];

const getChainsByEnvironment = () => {
  const isDevelopment = process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'true';
  return options.filter((chain) =>
    isDevelopment ? chain.isTestnet : !chain.isTestnet,
  );
};

export const activeChains = getChainsByEnvironment();
