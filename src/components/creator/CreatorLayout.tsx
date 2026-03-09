import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import {
  MenuIcon,
  BellIcon,
  PlusIcon,
  ChevronRightIcon,
  SearchIcon } from
'lucide-react';
import { CreatorSidebar } from './CreatorSidebar';
import { useAuth } from '../../contexts/AuthContext';
export function CreatorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  // Generate breadcrumbs based on path
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentPage = pathSegments[pathSegments.length - 1] || 'dashboard';
  const pageTitle =
  currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace('-', ' ');
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-body text-text-secondary overflow-hidden">
      <CreatorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen min-w-0 transition-all duration-300">
        {/* Topbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-primary hover:bg-teal-50 rounded-lg transition-colors">

              <MenuIcon className="w-6 h-6" />
            </button>

            <div className="hidden md:flex items-center text-sm text-gray-500">
              <Link
                to="/creator"
                className="hover:text-primary font-medium transition-colors">

                Studio
              </Link>
              {pathSegments.length > 1 &&
              <>
                  <ChevronRightIcon className="w-4 h-4 mx-1" />
                  <span className="text-text-primary font-bold">
                    {pageTitle}
                  </span>
                </>
              }
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden lg:flex items-center relative mr-2">
              <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3" />
              <input
                type="text"
                placeholder="Search studio..."
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none w-48 transition-all" />

            </div>

            <Link
              to="/creator/upload"
              className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-full text-sm font-bold transition-colors shadow-sm">

              <PlusIcon className="w-4 h-4" /> Create
            </Link>

            <div className="flex items-center gap-3 border-l border-gray-200 pl-3 sm:pl-5">
              <button className="relative p-2 text-gray-500 hover:text-primary hover:bg-teal-50 rounded-full transition-colors">
                <BellIcon className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
              </button>

              <Link to="/creator/profile" className="hidden sm:block">
                <img
                  src={user?.avatar || 'https://i.pravatar.cc/150?img=32'}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border border-gray-200 object-cover hover:ring-2 hover:ring-primary/50 transition-all" />

              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>);

}