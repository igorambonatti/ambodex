import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';

import type { TokenOptionType } from '@/constants/ChainOptions';
import { useCreateSwap } from '@/hooks/useCreateSwap';

import CoinOption from '../CoinOption';
import Dropdown from '../Dropdown/DropdownChain';
import Input from '../Input';
import type { ModalRef } from '.';
import Modal from '.';

interface ModalSelectCoinProps {
  options: TokenOptionType[];
}

const ModalOutputCoin = forwardRef<ModalRef, ModalSelectCoinProps>(
  ({ options }, ref) => {
    const { control, watch } = useForm();
    const { setTokens } = useCreateSwap();
    const internalRef = useRef<ModalRef>(null);
    const [filteredOptions, setFilteredOptions] =
      useState<TokenOptionType[]>(options);

    const searchValue = watch('search');

    useEffect(() => {
      if (searchValue) {
        const lowercasedFilter = searchValue.toLowerCase();
        const filteredData = options.filter((option) =>
          option.symbol.toLowerCase().includes(lowercasedFilter),
        );
        setFilteredOptions(filteredData);
      } else {
        setFilteredOptions(options);
      }
    }, [searchValue, options]);

    useImperativeHandle(ref, () => ({
      open: () => internalRef.current?.open(),
      close: () => internalRef.current?.close(),
    }));

    const handleSelectCoin = (token: TokenOptionType) => {
      setTokens({ outputToken: token });
      internalRef.current?.close();
    };

    return (
      <Modal
        ref={internalRef}
        title="Select coin:"
        onClose={() => console.log('')}
      >
        <div className="flex w-[480px] flex-col">
          <div className="flex flex-col px-6">
            <div className="flex items-center gap-2">
              <Input
                name="search"
                placeholder="Search"
                search
                control={control}
              />
              <div className="ml-5 flex h-[56px] items-center rounded-lg bg-[#9999991a] px-4">
                <Dropdown />
              </div>
            </div>
            <div className="my-4 h-px bg-[#9999991a] " />
          </div>
          <div className="flex h-[350px] flex-col overflow-y-auto ">
            {filteredOptions.map((option) => (
              <CoinOption
                option={{ ...option }}
                key={option.address}
                onClick={() => handleSelectCoin(option)}
              />
            ))}
            {filteredOptions.length < 1 && (
              <div className="mx-auto mt-4 text-white">No results found.</div>
            )}
          </div>
        </div>
      </Modal>
    );
  },
);

ModalOutputCoin.displayName = 'ModalOutputCoin';

export default ModalOutputCoin;
