import './styles.scss';

import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

import baseApi from '@/app/api/baseApi';
import Loader from '@/components/Loader';
import NoResults from '@/components/NoResults';
import { useChain } from '@/hooks/useChain';
import { convertToTokenUnit } from '@/utils/convertTokenUnit';

export type ExchangeRate = {
  exchange: {
    icon: string;
    label: string;
  };
  pair: string;
  price: string;
  receive: string;
};

interface ComparisonTableProps {
  props: {
    inputToken: string;
    outputToken: string;
    amount: string;
    network: string;
    classes?: string;
  };
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ props }) => {
  const { selectedChain } = useChain();
  const [rates, setRates] = useState<ExchangeRate[] | [] | null>(null);
  const { inputToken, outputToken, amount, network } = props;
  const loadData = useCallback(async () => {
    if (inputToken && outputToken && amount && network) {
      try {
        const response = await baseApi.get('/quotes', {
          params: {
            input_token: inputToken.toLowerCase(),
            output_token: outputToken.toLowerCase(),
            amount: convertToTokenUnit(
              selectedChain.availableTokens,
              inputToken,
              amount,
            ),
            network,
          },
        });
        setRates(response.data || []);
      } catch (error) {
        console.error('Failed to load exchange rates', error);
        setRates([]);
      }
    }
  }, [inputToken, outputToken, amount, network, selectedChain]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (!rates?.[0])
    return (
      <div
        className={`${props?.classes} comparison-table-container mt-4 flex rounded-lg bg-[#1B1B1B]`}
      >
        {rates ? (
          <NoResults
            title="An error occured."
            description="This might be due to a temporary connectivity issue or a problem on our end."
          />
        ) : (
          <Loader title="Loading..." description="Comparing prices..." />
        )}
      </div>
    );

  return (
    <div className="comparison-table-container mt-4 flex w-full flex-col rounded-lg bg-[#1B1B1B] p-4">
      <h1 className="mb-4 text-lg font-bold text-white">Compare to others</h1>
      <div className="comparison-top-container rounded-lg">
        <div className="comparison-container-list flex justify-between">
          <div>Exchange</div>
          <div className="text-center">Pair</div>
          <div className="mr-1 text-center">Price</div>
          <div className="text-right">You receive</div>
        </div>
      </div>
      <div className="test flex flex-col overflow-y-auto">
        {rates?.map((rate) => (
          <div
            key={Math.random()}
            className="comparison-container flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="exchange-icon mr-2">
                <Image
                  src={rate.exchange.icon}
                  alt={rate.exchange.label}
                  width={16}
                  height={16}
                />
              </div>
              <div className="exchange-name">{rate.exchange.label}</div>
            </div>
            <div className="pair-name">{rate.pair}</div>
            <div className="price">{rate.price}</div>
            <div className="receive">{rate.receive}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
