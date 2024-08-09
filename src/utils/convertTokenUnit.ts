import type { TokenOptionType } from '@/constants/ChainOptions';

export const convertToTokenUnit = (
  options: TokenOptionType[],
  address: string,
  amount: bigint | string,
): string => {
  const token = options.find((option) => option.address === address);
  if (!token || token.decimals === undefined) {
    throw new Error('Token not found or decimal places not defined.');
  }

  const factor = 10 ** token.decimals;
  const amountInWei = BigInt(Math.round(Number(amount) * factor));
  return amountInWei.toString();
};

export const convertFromTokenUnit = (
  options: TokenOptionType[],
  address: string,
  amountInWei: bigint | string,
): string => {
  const token = options.find(
    (option) =>
      option.address?.toLocaleLowerCase() === address?.toLocaleLowerCase(),
  );
  if (!token) {
    throw new Error('Token not found or decimal places not defined.');
  }

  const power = BigInt(10) ** BigInt(token.decimals);
  const baseUnitAmount = BigInt(amountInWei) / power;
  const remainder = BigInt(amountInWei) % power;

  const decimalLimit = 6;
  let remainderStr = remainder.toString().padStart(token.decimals, '0');
  remainderStr = remainderStr.slice(0, decimalLimit);

  remainderStr = remainderStr.padEnd(decimalLimit, '0');

  if (remainder === BigInt(0)) {
    return baseUnitAmount.toString();
  }
  const decimalPart = remainderStr.substring(0, decimalLimit);
  return `${baseUnitAmount}.${decimalPart}`;
};
