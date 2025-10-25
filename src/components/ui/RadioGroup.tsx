import React from 'react';
import { cn } from '@/lib/utils';

interface RadioGroupProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  className
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="text-[16px] font-bold" style={{ color: '#324054' }}>
          {label}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              id={option.value}
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor={option.value}
              className="text-sm font-medium cursor-pointer"
              style={{ color: '#324054' }}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
