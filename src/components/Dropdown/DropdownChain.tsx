'use client';

import Image from 'next/image';
import type {
  DropdownIndicatorProps,
  OptionProps,
  SingleValueProps,
  StylesConfig,
} from 'react-select';
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';

import { useChain } from '@/hooks/useChain';

interface OptionType {
  value: string;
  label: string;
  icon: string;
}

const SingleValue: React.FC<SingleValueProps<OptionType, false>> = ({
  ...props
}) => {
  return (
    <components.SingleValue {...props}>
      <div className="mr-1 flex w-8 items-center">
        <Image
          src={props.data.icon}
          alt={props.data.label}
          width={28}
          height={28}
        />
      </div>
    </components.SingleValue>
  );
};
const DropdownIndicator: React.FC<DropdownIndicatorProps<OptionType>> = (
  props,
) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image
        src="/assets/icons/chevron_down.svg"
        alt="chevron_down"
        width={16}
        height={16}
      />
    </components.DropdownIndicator>
  );
};

const CustomOption: React.FC<OptionProps<OptionType>> = (props) => (
  <components.Option {...props}>
    <div className="flex items-center">
      <Image
        src={props.data.icon}
        className="mr-2 "
        alt={props.data.label}
        width={16}
        height={16}
      />
      {props.data.label.toUpperCase()}
      {props.isSelected && (
        <Image
          src="/assets/icons/icon_confirm.svg"
          className="ml-auto"
          alt="icon-confirm"
          width={16}
          height={16}
        />
      )}
    </div>
  </components.Option>
);

const customStyles: StylesConfig<OptionType> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: 'white',
    border: 'none',
    boxShadow: 'none',
    cursor: 'default',
    caretColor: 'transparent',
    '&:hover': {
      cursor: 'pointer',
    },
  }),
  menu: (provided) => ({
    ...provided,
    minWidth: '232px',
    backgroundColor: '#141414',
    padding: '16px',
    marginTop: '12px',
    left: 'calc(50% - 130px)',
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    fontWeight: isSelected ? 'bold' : 'normal',
    borderRadius: '6px',
    marginTop: '2px',
    color: 'white',
    backgroundColor: 'transparent',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'rgba(153, 153, 153, 0.10)',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
    '&:hover': {
      border: 'none',
    },
    '&:focus': {
      border: 'none',
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: 'white',
    fontWeight: 'normal',
    padding: '2px',
  }),
  singleValue: (styles) => ({
    ...styles,
    color: 'white',
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: 0,
  }),
  menuList: (styles) => ({
    ...styles,
    padding: 0,
  }),
};

const Dropdown: React.FC = () => {
  const animatedComponents = makeAnimated();
  const { chains, selectedChain, setSelectedChain } = useChain();

  return (
    <Select
      components={{
        ...animatedComponents,
        SingleValue,
        DropdownIndicator,
        Option: CustomOption,
      }}
      options={chains}
      styles={customStyles}
      placeholder=""
      isSearchable={false}
      value={selectedChain}
      onChange={(chain: any) => setSelectedChain(chain)}
      defaultValue={selectedChain}
      id="long-value-select"
      instanceId="long-value-select"
    />
  );
};

export default Dropdown;
