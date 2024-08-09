'use client';

import './styles.scss';

import Image from 'next/image';
import type { ChangeEvent } from 'react';
import type { Control, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface CustomFormControlProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  name: string;
  required?: boolean;
  onInputChange?: () => void;
  control?: Control<FieldValues>;
  search?: boolean;
  variant?: 'primary' | 'coin';
}

export const variantClasses = {
  primary: 'input-primary-variant placeholder:text-[#999] px-4 py-2 h-[56px]',
  coin: 'w-[200px] input-coin-variant placeholder:text-[#fff] h-[30px] placeholder:opacity-25 text-2xl placeholder:p-0 ',
};

const Input: React.FC<CustomFormControlProps> = ({
  name,
  required,
  onInputChange,
  control,
  variant = 'primary',
  search = false,
  ...props
}) => {
  const baseClasses =
    'w-full rounded-lg text-white shadow-sm focus:outline-none';
  const inputClasses = twMerge(baseClasses, variantClasses[variant]);
  return (
    <Controller
      render={({ field }) => (
        <div className="relative flex flex-1">
          <input
            type="text"
            lang="us"
            className={inputClasses}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              field.onChange(e.target.value);
              if (onInputChange) onInputChange();
            }}
            {...props}
          />
          {search && (
            <Image
              alt="search_icon"
              className="Icon"
              src="/assets/icons/icon_search.svg"
              height={24}
              width={24}
            />
          )}
        </div>
      )}
      rules={(required && { required }) || {}}
      control={control}
      name={name}
      defaultValue={props.defaultValue}
      {...props}
    />
  );
};

export default Input;
