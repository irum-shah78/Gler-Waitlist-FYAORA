import { type ClassValue, clsx } from "clsx";
import { ServiceProvider, FilterState } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export function parseDate(dateString: string): Date | null {
  if (dateString.includes('-')) {
    return new Date(dateString);
  }

  const [day, month, year] = dateString.split('/');
  if (day && month && year) {
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
  return null;
}

export function filterServiceProviders(
  providers: ServiceProvider[],
  filters: FilterState,
  searchQuery: string
): ServiceProvider[] {
  return providers.filter(provider => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        provider.email.toLowerCase().includes(query) ||
        provider.phoneNumber.includes(query) ||
        provider.postcode.toLowerCase().includes(query) ||
        provider.name?.toLowerCase().includes(query) ||
        provider.vendorType.toLowerCase().includes(query) ||
        provider.serviceOffering.toLowerCase().includes(query);

      if (!matchesSearch) return false;
    }

    if (filters.postcode) {
      if (!provider.postcode.toLowerCase().includes(filters.postcode.toLowerCase())) {
        return false;
      }
    }

    if (filters.registrationStatus) {
      if (provider.status !== filters.registrationStatus) {
        return false;
      }
    }

    if (filters.dateStart || filters.dateEnd) {
      const providerDate = parseDate(provider.signupDate);
      if (!providerDate) return false;

      if (filters.dateStart) {
        const startDate = new Date(filters.dateStart);
        if (providerDate < startDate) return false;
      }

      if (filters.dateEnd) {
        const endDate = new Date(filters.dateEnd);
        if (providerDate > endDate) return false;
      }
    }

    if (filters.vendorType) {
      if (provider.vendorType !== filters.vendorType) {
        return false;
      }
    }

    if (filters.serviceOffering) {
      if (provider.serviceOffering !== filters.serviceOffering) {
        return false;
      }
    }

    return true;
  });
}

export function sortServiceProviders(
  providers: ServiceProvider[],
  sortColumn: string,
  sortDirection: 'asc' | 'desc'
): ServiceProvider[] {
  return [...providers].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortColumn) {
      case 'email':
        aValue = a.email;
        bValue = b.email;
        break;
      case 'phoneNumber':
        aValue = a.phoneNumber;
        bValue = b.phoneNumber;
        break;
      case 'postcode':
        aValue = a.postcode;
        bValue = b.postcode;
        break;
      case 'vendorType':
        aValue = a.vendorType;
        bValue = b.vendorType;
        break;
      case 'serviceOffering':
        aValue = a.serviceOffering;
        bValue = b.serviceOffering;
        break;
      case 'signupDate':
        aValue = parseDate(a.signupDate)?.getTime() || 0;
        bValue = parseDate(b.signupDate)?.getTime() || 0;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      default:
        return 0;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}
