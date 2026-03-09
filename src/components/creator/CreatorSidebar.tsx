import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  VideoIcon,
  UploadIcon,
  FileTextIcon,
  PenToolIcon,
  BarChart3Icon,
  DollarSignIcon,
  UserIcon,
  SettingsIcon,
  ExternalLinkIcon,
  LogOutIcon } from
'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
const NAV_ITEMS = [
{
  name: 'Dashboard',
  path: '/creator',
  icon: LayoutDashboardIcon,
  end: true
},
{
  name: 'My Videos',
  path: '/creator/videos',
  icon: VideoIcon
},
{
  name: 'Upload Video',
  path: '/creator/upload',
  icon: UploadIcon
},
{
  name: 'My Articles',
  path: '/creator/articles',
  icon: FileTextIcon
},
{
  name: 'Write Article',
  path: '/creator/write',
  icon: PenToolIcon
},
{
  name: 'Analytics',
  path: '/creator/analytics',
  icon: BarChart3Icon
},
{
  name: 'Earnings',
  path: '/creator/earnings',
  icon: DollarSignIcon
},
{
  name: 'Profile',
  path: '/creator/profile',
  icon: UserIcon
},
{
  name: 'Settings',
  path: '/creator/settings',
  icon: SettingsIcon
}];

export function CreatorSidebar({
  isOpen,
  setIsOpen



}: {isOpen: boolean;setIsOpen: (v: boolean) => void;}) {
  const { logout, user } = useAuth();
  return (
    <>
      {/* Mobile overlay */}
      {isOpen &&
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
        onClick={() => setIsOpen(false)} />

      }

      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <svg
            width="32"
            height="32"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">

            <circle cx="50" cy="55" r="35" fill="#0891B2" />
            <path d="M50 20 C40 10, 30 20, 50 35" fill="#4ADE80" />
            <path d="M50 20 C60 10, 70 20, 50 35" fill="#22C55E" />
            <path d="M50 20 C50 5, 65 5, 50 35" fill="#16A34A" />
          </svg>
          <div>
            <span className="block font-heading font-bold text-lg leading-tight text-text-primary">
              RenewBerry
            </span>
            <span className="block text-[10px] text-primary font-bold uppercase tracking-wider">
              Creator Studio
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${isActive ? 'bg-teal-50 text-primary font-bold' : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'}`
                }>

                <Icon
                  className={`w-5 h-5 ${item.name === 'Upload Video' || item.name === 'Write Article' ? 'text-primary' : ''}`} />

                {item.name}
              </NavLink>);

          })}
        </div>

        <div className="p-4 border-t border-gray-100 space-y-2 bg-gray-50/50">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary hover:bg-white hover:shadow-sm transition-all text-sm font-medium border border-transparent hover:border-gray-200">

            <ExternalLinkIcon className="w-5 h-5" />
            View Live Site
          </Link>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-9 h-9 rounded-full border border-gray-200" />

              <div className="truncate">
                <p className="text-sm font-bold text-text-primary truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-text-muted capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout">

              <LogOutIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>
    </>);

}