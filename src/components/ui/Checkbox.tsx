import React from 'react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
  ...props
}) => {
  return (
    <div className="flex items-center space-x-6">
      <input
        type="checkbox"
        className={cn(
          'h-4 w-4 border border-[#000000] rounded-lg text-[#000000] focus:ring-[#000000] cursor-pointer',
          className
        )}
        {...props}
      />
      {label && (
        <label className="text-sm font-medium" style={{ color: '#324054' }}>
          {label}
        </label>
      )}
    </div>
  );
};
