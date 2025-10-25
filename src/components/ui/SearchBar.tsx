'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search User',
  className
}) => {
  return (
    <div className={cn('relative', className)}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-5 h-[32px] border border-gray-300 rounded-sm leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
      <div className="absolute inset-y-0 right-0 pr-3 pl-3 flex items-center pointer-events-none border-l border-gray-300">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};
