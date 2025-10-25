'use client';

import React, { useEffect } from 'react';
import { X, Mail, Phone, MapPin, Calendar, User, MessageSquare } from 'lucide-react';
import { ServiceProvider } from '@/types';
import { Button } from './Button';
import Image from 'next/image';
import EditIcon from '../../assets/icons/edit.svg';
import UserIcon from '../../assets/icons/user.svg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: ServiceProvider | null;
  onOnboard: (id: string) => void;
  onReject: (id: string) => void;
  onEditNotes: (id: string) => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  provider,
  onOnboard,
  onReject,
  onEditNotes
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !provider) return null;


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        <div className="relative bg-white px-4 sm:px-6 py-3 space-y-3 rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto mx-4 sm:mx-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image src={UserIcon} alt="User" width={15} height={17} />
              <h2 className="text-[18px] font-medium text-[#000000] mt-1">User Details</h2>
            </div>
            <button
              onClick={onClose}
              className="text-[#000000] hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 border-b border-[#E0E0E0] pb-2">
              <div className='flex flex-col flex-1 min-w-0'>
                <h3 className="text-lg sm:text-[20px] font-semibold text-[#000000] break-words">
                  {provider.name || 'CleanPro Solutions'}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Mail className="h-4 w-4 text-[#7F7F7F] flex-shrink-0" />
                  <span className="text-sm sm:text-[15px] text-[#AEAEAE] break-words">{provider.email}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-gray-100 text-gray-800">
                  Customer
                </span>
                <span className="inline-flex px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-gray-100 text-gray-800">
                  invited
                </span>
              </div>
            </div>

            <div className="border-b border-[#E0E0E0] pb-2 pt-2">
              <h4 className="text-[17px] font-semibold text-[#000000] mb-1">Contact Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#000000] flex-shrink-0" />
                <span className="text-sm text-[#7F7F7F] break-words">{provider.contactEmail || provider.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#000000] flex-shrink-0" />
                <span className="text-sm text-[#7F7F7F] break-words">{provider.phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-[#000000] flex-shrink-0" />
                <span className="text-sm text-[#7F7F7F] break-words">{provider.location || 'United Kingdom'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-[#000000] flex-shrink-0" />
                <span className="text-sm text-[#7F7F7F] break-words">Signed up {provider.signupDate}</span>
              </div>
            </div>
            </div>

            <div className="pb-2">
              <h4 className="text-[17px] font-semibold text-[#000000] mb-1">Customer Details</h4>
              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-[#000000]" />
                <span className="text-sm text-[#7F7F7F]">{provider.vendorType.toLowerCase()}</span>
              </div>
            </div>

            <div className="pb-2 border-b border-[#E0E0E0]">
              <h4 className="text-[17px] font-medium text-[#000000] mb-1">User Details</h4>
              <div className="flex flex-wrap gap-2">
                {provider.serviceOffering.split(',').map((service, index) => (
                  <span key={index} className="text-sm text-[#7F7F7F]">
                    {service.trim().toLowerCase()}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-[#000000]" />
                  <h4 className="text-[17px] font-medium text-[#000000] mb-1">Internal Notes</h4>
                </div>
                <button
                  onClick={() => onEditNotes(provider.id)}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Image src={EditIcon} alt="Edit" width={14} height={14} />
                  <span className="text-[15px] font-medium text-[#000000]">Edit</span>
                </button>
              </div>
              <textarea
                className="w-full h-[100px] p-3 border border-[#E9E9E9] rounded bg-[#E9E9E9] text-sm text-[#7F7F7F] resize-none"
                placeholder="No Note Added yet"
                value={provider.internalNotes || ''}
                readOnly
              />
            </div>
          </div>

            <div className="flex items-center justify-center gap-4 sm:gap-10 space-x-3 flex-col sm:flex-row">
              <Button
                variant="primary"
                onClick={() => onOnboard(provider.id)}
                className="w-full sm:w-[107px] h-[50px]"
              >
                Onboard
              </Button>
              <Button
                variant="destructive"
                onClick={() => onReject(provider.id)}
                className="w-full sm:w-[107px] h-[50px]"
              >
                Reject
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
};
