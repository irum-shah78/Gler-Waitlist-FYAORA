export interface ServiceProvider {
  id: string;
  email: string;
  phoneNumber: string;
  postcode: string;
  vendorType: 'Independent' | 'Company';
  serviceOffering: 'Housekeeping' | 'Window Cleaning' | 'Car Valet';
  signupDate: string;
  status: 'Onboarded' | 'Rejected' | '';
  name?: string;
  contactEmail?: string;
  location?: string;
  services?: string[];
  internalNotes?: string;
}

export interface FilterState {
  postcode: string;
  registrationStatus: string;
  dateStart: string;
  dateEnd: string;
  vendorType: string;
  serviceOffering: string;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export interface TableState {
  selectedRows: string[];
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  searchQuery: string;
}
