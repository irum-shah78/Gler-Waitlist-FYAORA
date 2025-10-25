'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { FilterState } from '@/types';
import Image from 'next/image';
import LogoIcon from "@/assets/images/Logo.png";

interface SidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters
}) => {

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleDateChange = (key: 'dateStart' | 'dateEnd', value: string) => {
    handleFilterChange(key, value);
  };

  return (
    <div className="w-full xl:w-[288px] lg:w-[220px] bg-[#F4F7F9] p-4 h-full overflow-y-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center">
            <Image
              src={LogoIcon}
              alt="Logo"
              width={48}
              height={39}
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-[#1A78F2]">Admin Panel</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-[#D3D8DD] rounded-lg p-2">
          <p className="text-[16px] font-bold text-[#000000] ms-4">User Management</p>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-8 p-3">
        <div>
          <Input
            label="Postcode"
            placeholder="ZIP"
            value={filters.postcode}
            onChange={(e) => handleFilterChange('postcode', e.target.value)}
          />
        </div>

        <div>
          <label className="text-[16px] font-bold mb-2 block" style={{ color: '#324054' }}>
            Registration Status
          </label>
          <div className="space-y-2">
            <Checkbox
              label="Onboarded"
              checked={filters.registrationStatus === 'Onboarded'}
              onChange={(e) => handleFilterChange('registrationStatus', e.target.checked ? 'Onboarded' : '')}
            />
            <Checkbox
              label="Rejected"
              checked={filters.registrationStatus === 'Rejected'}
              onChange={(e) => handleFilterChange('registrationStatus', e.target.checked ? 'Rejected' : '')}
            />
          </div>
        </div>

        <div>
          <label className="text-[16px] font-bold mb-4 block" style={{ color: '#324054' }}>
            Date Registered
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <div className="relative">
                <input
                  type="date"
                  value={filters.dateStart}
                  onChange={(e) => handleDateChange('dateStart', e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  style={{ fontSize: '16px' }}
                />
                <div className="w-full h-10 px-3 py-2 border-[3px] border-[#1A78F2] rounded-lg bg-white text-[#1C1B1B] text-xs flex items-center cursor-pointer">
                  {filters.dateStart ? new Date(filters.dateStart).toLocaleDateString() : 'Start'}
                </div>
                <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-[#1A78F2] pointer-events-none">
                  Date
                </label>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none cursor-pointer">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-[12px] text-[#4E4636] mt-1">MM/DD/YYYY</p>
            </div>

            <div className="relative">
              <div className="relative">
                <input
                  type="date"
                  value={filters.dateEnd}
                  onChange={(e) => handleDateChange('dateEnd', e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  style={{ fontSize: '16px' }}
                />
                <div className="w-full h-10 px-3 py-2 border-[3px] border-[#1A78F2] rounded-lg bg-white text-[#1C1B1B] text-xs flex items-center cursor-pointer">
                  {filters.dateEnd ? new Date(filters.dateEnd).toLocaleDateString() : 'End'}
                </div>
                <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-[#1A78F2] pointer-events-none">
                  Date
                </label>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none cursor-pointer">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-[12px] text-[#4E4636] mt-1">MM/DD/YYYY</p>
            </div>
          </div>
        </div>

        <div>
          <label className="text-[16px] font-bold mb-2 block" style={{ color: '#324054' }}>
            Vendor Type
          </label>
          <div className="space-y-2">
            <Checkbox
              label="Independent"
              checked={filters.vendorType === 'Independent'}
              onChange={(e) => handleFilterChange('vendorType', e.target.checked ? 'Independent' : '')}
            />
            <Checkbox
              label="Company"
              checked={filters.vendorType === 'Company'}
              onChange={(e) => handleFilterChange('vendorType', e.target.checked ? 'Company' : '')}
            />
          </div>
        </div>

        <div>
          <label className="text-[16px] font-bold mb-2 block" style={{ color: '#324054' }}>
            Service Offering
          </label>
          <div className="space-y-2">
            <Checkbox
              label="Housekeeping"
              checked={filters.serviceOffering === 'Housekeeping'}
              onChange={(e) => handleFilterChange('serviceOffering', e.target.checked ? 'Housekeeping' : '')}
            />
            <Checkbox
              label="Window Cleaning"
              checked={filters.serviceOffering === 'Window Cleaning'}
              onChange={(e) => handleFilterChange('serviceOffering', e.target.checked ? 'Window Cleaning' : '')}
            />
            <Checkbox
              label="Car Valet"
              checked={filters.serviceOffering === 'Car Valet'}
              onChange={(e) => handleFilterChange('serviceOffering', e.target.checked ? 'Car Valet' : '')}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 w-full flex items-center justify-center gap-3">
        <Button
          variant="primary"
          onClick={onApplyFilters}
          className="w-[107px] h-[50px]"
        >
          Filter
        </Button>
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-[107px] h-[50px]"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};
