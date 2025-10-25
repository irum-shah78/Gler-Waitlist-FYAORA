import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'secondaryOutline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform hover:scale-105 active:scale-95';
  
  const variants = {
    primary: 'bg-[#1A78F2] text-white hover:bg-blue-700 shadow-md hover:shadow-lg rounded-[100px]',
    secondary: 'bg-[#C8D5D9] text-[#4E4636] text-sm hover:bg-gray-300 shadow-sm hover:shadow-md rounded-lg',
    destructive: 'bg-[#E11B1B] text-white hover:bg-red-700 shadow-md hover:shadow-lg rounded-[100px]',
    outline: 'border border-[#807664] bg-white text-[#4E4636] hover:bg-gray-50 shadow-sm hover:shadow-md rounded-[100px]',
    secondaryOutline: 'border border-[#807664] text-sm bg-white text-[#4E4636] hover:bg-gray-50 shadow-sm hover:shadow-md rounded-lg'
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-6 text-lg'
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
