'use client';

import React, { useState, useMemo } from 'react';
import { TopNavigation } from '@/components/layout/TopNavigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Table } from '@/components/ui/Table';
import { SearchBar } from '@/components/ui/SearchBar';
import { Modal } from '@/components/ui/Modal';
import { sampleServiceProviders } from '@/data/sampleData';
import { ServiceProvider, FilterState, TableState } from '@/types';
import { filterServiceProviders, sortServiceProviders } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const ITEMS_PER_PAGE = 10;

export default function HomePage() {
  // Ensure body can scroll on mobile only
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'unset';
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const [filters, setFilters] = useState<FilterState>({
    postcode: '',
    registrationStatus: '',
    dateStart: '',
    dateEnd: '',
    vendorType: '',
    serviceOffering: ''
  });

  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    postcode: '',
    registrationStatus: '',
    dateStart: '',
    dateEnd: '',
    vendorType: '',
    serviceOffering: ''
  });

  const [tableState, setTableState] = useState<TableState>({
    selectedRows: [],
    sortColumn: 'signupDate',
    sortDirection: 'desc',
    searchQuery: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [activeTab, setActiveTab] = useState('Human Resources');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const filteredData = useMemo(() => {
    const filtered = filterServiceProviders(sampleServiceProviders, appliedFilters, tableState.searchQuery);
    return sortServiceProviders(filtered, tableState.sortColumn, tableState.sortDirection);
  }, [appliedFilters, tableState.searchQuery, tableState.sortColumn, tableState.sortDirection]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      postcode: '',
      registrationStatus: '',
      dateStart: '',
      dateEnd: '',
      vendorType: '',
      serviceOffering: ''
    };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setCurrentPage(1);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleSearchChange = (query: string) => {
    setTableState(prev => ({ ...prev, searchQuery: query }));
    setCurrentPage(1);
  };

  const handleRowSelect = (id: string, selected: boolean) => {
    setTableState(prev => ({
      ...prev,
      selectedRows: selected
        ? [...prev.selectedRows, id]
        : prev.selectedRows.filter(rowId => rowId !== id)
    }));
  };

  const handleSelectAll = (selected: boolean) => {
    setTableState(prev => ({
      ...prev,
      selectedRows: selected ? paginatedData.map(item => item.id) : []
    }));
  };

  const handleSort = (column: string) => {
    setTableState(prev => ({
      ...prev,
      sortColumn: column,
      sortDirection: prev.sortColumn === column && prev.sortDirection === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleEdit = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setIsModalOpen(true);
  };

  const handleOnboard = (id: string) => {
    console.log('Onboarding provider:', id);
    setIsModalOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleReject = (id: string) => {
    console.log('Rejecting provider:', id);
    setIsModalOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleEditNotes = (id: string) => {
    console.log('Editing notes for provider:', id);
  };

  return (
    <div className="min-h-screen overflow-y-auto">
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg success-message">
          Action completed successfully!
        </div>
      )}

      <TopNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {isFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsFiltersOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setIsFiltersOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <Sidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] pt-6 px-4 lg:px-6 pb-4 gap-6">
        <div className="hidden lg:block flex-shrink-0">
          <Sidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white rounded-lg lg:max-w-[calc(100vw-290px)] xl:max-w-[calc(100vw-288px)]">
          <div className="flex-shrink-0 pb-0">
            <div className="flex items-center justify-between pb-3">
              <h1 className="text-2xl sm:text-3xl lg:text-[36px] text-[#12153A]">Waitlist</h1>
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="lg:hidden flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-2 bg-gray-100 rounded-lg"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="text-sm font-medium">Filters</span>
              </button>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 px-2">
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button
                  variant="secondary"
                  className="w-full sm:w-[160px] h-[32px]"
                >
                  Service Providers
                </Button>
                <Button
                  variant="secondaryOutline"
                  className="w-full sm:w-[120px] h-[32px]"
                >
                  Customers
                </Button>
              </div>

              <div className="w-full sm:w-auto">
                <SearchBar
                  value={tableState.searchQuery}
                  onChange={handleSearchChange}
                  className="w-full sm:w-64"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto max-h-[450px]">
              <Table
                data={paginatedData}
                tableState={tableState}
                onRowSelect={handleRowSelect}
                onSelectAll={handleSelectAll}
                onSort={handleSort}
                onEdit={handleEdit}
              />
            </div>
          </div>
          
          <div className="bg-white px-4 lg:px-6 py-4 flex items-center justify-start flex-shrink-0 border-t border-gray-200">
            <div className="flex items-center space-x-1 lg:space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                const page = i + 1;
                const isActive = currentPage === page;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center text-xs lg:text-sm font-medium rounded border ${isActive
                        ? 'border-blue-500 text-blue-500 bg-white'
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                      }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        provider={selectedProvider}
        onOnboard={handleOnboard}
        onReject={handleReject}
        onEditNotes={handleEditNotes}
      />
    </div>
  );
}