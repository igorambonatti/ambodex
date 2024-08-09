interface ErrorMessages {
  [key: number]: string;
}

const errorMessages: ErrorMessages = {
  100: 'User denied transaction signature.',
  4902: "We couldn't find the selected blockchain network. To continue, please add this network to your wallet or select another one from the available options.",
  1206: 'Web3 not initialized',
  4001: 'User rejected the request.',
  [-32002]: 'A transaction in your wallet is currently pending.',
};

export const getErrorMessage = (code: number): string => {
  return errorMessages[code] || 'An unknown error occurred';
};
