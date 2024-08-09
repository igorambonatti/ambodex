import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  ...props
}) => {
  const baseClasses =
    'text-white px-4 py-2 truncate flex w-full justify-center';

  const variantClasses = {
    primary: 'bg-primary/5 rounded-md',
    outline: 'bg-transparent rounded-md border border-[#81EEA6]',
    secondary:
      'bg-primary rounded-md text-[#111111E5] font-bold p-4 disabled:bg-[#3d754f]',
  };

  const buttonClasses = twMerge(
    baseClasses,
    variantClasses[variant],
    className,
  );

  return (
    <button type="button" className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
