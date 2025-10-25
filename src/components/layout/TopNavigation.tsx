'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import BellIcon from "@/assets/icons/Notifications.svg";
import MessageIcon from "@/assets/icons/forum.svg";
import UserImage from "@/assets/images/profile-img.svg";
import { Menu, X } from 'lucide-react';

interface TopNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab = 'Human Resources',
  onTabChange
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigationItems = [
    'Service Dashboard',
    'Finance Forecast',
    'Human Resources',
    'Users',
    'Compliances & Verification'
  ];

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-[#F4F7F9] sticky top-0 z-40">
      <div className="px-4 sm:px-8 lg:px-14 py-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-2"
          >
            <Menu className="h-5 w-5" />
            <span className="text-sm font-medium">Menu</span>
          </button>

          <nav className="hidden lg:flex space-x-4">
            {navigationItems.map((item) => (
              <button
                key={item}
                onClick={() => handleTabClick(item)}
                className={cn(
                  'px-3 py-2 text-sm font-medium transition-colors duration-200',
                  activeTab === item
                    ? 'text-[#1A78F2]'
                    : 'text-[#313030] hover:text-gray-700'
                )}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-6">
            <button
              onClick={() => console.log('Notifications clicked')}
              className="relative p-1 sm:p-2 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:bg-gray-100 rounded-full hover:scale-105"
            >
              <Image
                src={BellIcon}
                alt="Notifications"
                width={20}
                height={20}
                className="sm:w-6 sm:h-6 object-contain"
              />
            </button>

            <button
              onClick={() => console.log('Messages clicked')}
              className="relative p-1 sm:p-2 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:bg-gray-100 rounded-full hover:scale-105"
            >
              <Image
                src={MessageIcon}
                alt="Messages"
                width={18}
                height={18}
                className="sm:w-5 sm:h-5 object-contain"
              />
            </button>
            
            <div className="flex items-center space-x-2 sm:space-x-3 pl-1 sm:pl-2">
              <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-1 transition-colors">
                <div className="relative">
                  <Image
                    src={UserImage}
                    alt="Max Smith"
                    width={32}
                    height={32}
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                </div>

                <div className="hidden md:block">
                  <div className="flex items-center space-x-1">
                    <h3 className="text-sm text-[#324054]">Max Smith</h3>
                  </div>
                  <p className="text-xs text-[#4F6071]">London, UK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Navigation</h2>
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleTabClick(item)}
                    className={cn(
                      'px-4 py-3 text-left text-sm font-medium transition-colors duration-200 rounded-lg',
                      activeTab === item
                        ? 'text-[#1A78F2] bg-blue-50'
                        : 'text-[#313030] hover:text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
