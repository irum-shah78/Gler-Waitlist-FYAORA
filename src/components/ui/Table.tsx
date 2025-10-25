'use client';

import React from 'react';
import { ServiceProvider, TableState } from '@/types';
import { Checkbox } from './Checkbox';
import Image from 'next/image';
import EditIcon from '../../assets/icons/edit.svg';

interface TableProps {
  data: ServiceProvider[];
  tableState: TableState;
  onRowSelect: (id: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onSort: (column: string) => void;
  onEdit: (provider: ServiceProvider) => void;
}

export const Table: React.FC<TableProps> = ({
  data,
  tableState,
  onRowSelect,
  onSelectAll,
  onSort,
  onEdit,
}) => {
  const allSelected = data.length > 0 && data.every(item => tableState.selectedRows.includes(item.id));
  const someSelected = tableState.selectedRows.length > 0 && !allSelected;


  return (
    <div className="w-full">
      <div className="bg-white border border-black rounded-lg overflow-hidden">
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full table-fixed h-[450px]">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className='bg[#EAEEF3]'>
                <th className="px-4 py-4 text-left rounded-tl-lg w-12">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(input: HTMLInputElement | null) => {
                      if (input) input.indeterminate = someSelected;
                    }}
                    onChange={(e) => onSelectAll(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th
                  className="px-4 py-4 text-left text-[15px] font-bold text-[#2B3641] tracking-wider cursor-pointer hover:bg-gray-100 w-48"
                  onClick={() => onSort('email')}
                >
                  Email
                </th>
                <th
                  className="px-4 py-4 text-left text-[15px] font-bold text-[#2B3641] tracking-wider cursor-pointer hover:bg-gray-100 w-32"
                  onClick={() => onSort('phoneNumber')}
                >
                  Phone Number
                </th>
                <th
                  className="px-4 py-4 text-left text-[15px] font-bold text-[#2B3641] tracking-wider cursor-pointer hover:bg-gray-100 w-24"
                  onClick={() => onSort('postcode')}
                >
                  Postcode
                </th>
                <th
                  className="px-4 py-4 text-left text-[15px] font-bold text-[#2B3641] tracking-wider cursor-pointer hover:bg-gray-100 w-28"
                  onClick={() => onSort('vendorType')}
                >
                  Vendor Type
                </th>
                <th
                  className="px-4 py-4 text-left text-[15px] font-bold text-[#2B3641] tracking-wider cursor-pointer hover:bg-gray-100 w-32"
                  onClick={() => onSort('serviceOffering')}
                >
                  Service Offering
                </th>
                <th
                  className="px-4 py-4 text-left text-[15px] font-bold text-[#2B3641] tracking-wider cursor-pointer hover:bg-gray-100 w-28"
                  onClick={() => onSort('signupDate')}
                >
                  Signup Date
                </th>
                <th
                  className="px-4 py-4 text-left text-[15px] font-bold text-[#2B3641] tracking-wider cursor-pointer hover:bg-gray-100 w-24"
                  onClick={() => onSort('status')}
                >
                  Status
                </th>
                <th className="px-4 py-4 text-left text-[15px] font-bold text-[#2B3641] tracking-wider rounded-tr-lg w-20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((provider, index) => (
                <tr
                  key={provider.id}
                  className={`transition-colors text-left ${index % 2 === 0 ? 'bg-white' : 'bg-[#EAEEF3]'}`}
                >
                  <td className={`px-4 py-4 whitespace-nowrap w-12 ${index === data.length - 1 ? 'rounded-bl-lg' : ''}`}>
                    <Checkbox
                      checked={tableState.selectedRows.includes(provider.id)}
                      onChange={(e) => onRowSelect(provider.id, e.target.checked)}
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 w-48 break-words">
                    {provider.email}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 w-32 break-words">
                    {provider.phoneNumber}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 w-24">
                    {provider.postcode}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 w-28">
                    {provider.vendorType}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 w-32">
                    {provider.serviceOffering}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 w-28">
                    {provider.signupDate}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 w-24 text-center">
                    {provider.status || '-'}
                  </td>
                  <td className={`px-4 py-4 text-sm font-medium w-20 ${index === data.length - 1 ? 'rounded-br-lg' : ''}`}>
                    <button
                      onClick={() => onEdit(provider)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Image src={EditIcon} alt="Edit" width={18} height={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden">
          {data.map((provider, index) => (
            <div key={provider.id} className={`p-4 transition-colors border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-[#EAEEF3]'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={tableState.selectedRows.includes(provider.id)}
                    onChange={(e) => onRowSelect(provider.id, e.target.checked)}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 break-words leading-tight">{provider.email}</h3>
                    <p className="text-xs text-gray-500 break-words">{provider.phoneNumber}</p>
                  </div>
                </div>
                <button
                  onClick={() => onEdit(provider)}
                  className="text-blue-600 hover:text-blue-900 transition-colors p-1 flex-shrink-0"
                >
                  <Image src={EditIcon} alt="Edit" width={12} height={12} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start space-x-2">
                  <span className="text-gray-500 font-medium w-16 flex-shrink-0">Postcode:</span>
                  <p className="text-gray-900 break-words">{provider.postcode}</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-gray-500 font-medium w-16 flex-shrink-0">Type:</span>
                  <p className="text-gray-900 break-words">{provider.vendorType}</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-gray-500 font-medium w-16 flex-shrink-0">Service:</span>
                  <p className="text-gray-900 break-words">{provider.serviceOffering}</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-gray-500 font-medium w-16 flex-shrink-0">Date:</span>
                  <p className="text-gray-900 break-words">{provider.signupDate}</p>
                </div>
                <div className="flex items-start space-x-2 sm:col-span-2">
                  <span className="text-gray-500 font-medium w-16 flex-shrink-0">Status:</span>
                  <p className="text-gray-900">{provider.status || '-'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
