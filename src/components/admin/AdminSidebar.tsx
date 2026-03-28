import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  VideoIcon,
  FileTextIcon,
  UsersIcon,
  Users2Icon,
  ImageIcon,
  FolderIcon,
  BookOpenIcon,
  MegaphoneIcon,
  BarChart3Icon,
  SettingsIcon,
  SparklesIcon,
  ExternalLinkIcon,
  LogOutIcon } from
'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
const NAV_ITEMS = [
{
  name: 'Dashboard',
  path: '/admin',
  icon: LayoutDashboardIcon,
  end: true
},
{
  name: 'Pro Editor',
  path: '/pro-editor',
  icon: SparklesIcon
},
{
  name: 'Videos',
  path: '/admin/videos',
  icon: VideoIcon
},
{
  name: 'Articles',
  path: '/admin/articles',
  icon: FileTextIcon
},
{
  name: 'Users',
  path: '/admin/users',
  icon: UsersIcon
},
{
  name: 'Gallery',
  path: '/admin/gallery',
  icon: ImageIcon
},
{
  name: 'Categories',
  path: '/admin/categories',
  icon: FolderIcon
},
{
  name: 'Handbook',
  path: '/admin/handbook',
  icon: BookOpenIcon
},
{
  name: 'Brand Voice',
  path: '/admin/brand-voice',
  icon: MegaphoneIcon
},
{
  name: 'Team',
  path: '/admin/team',
  icon: Users2Icon
},
{
  name: 'Analytics',
  path: '/admin/analytics',
  icon: BarChart3Icon
},
{
  name: 'Settings',
  path: '/admin/settings',
  icon: SettingsIcon
}];

export function AdminSidebar({
  isOpen,
  setIsOpen



}: {isOpen: boolean;setIsOpen: (v: boolean) => void;}) {
  const { logout, user } = useAuth();
  return (
    <>
      {/* Mobile overlay */}
      {isOpen &&
      <div
        className="fixed inset-0 top-16 bg-black/50 z-40 lg:hidden"
        onClick={() => setIsOpen(false)} />

      }

      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-secondary text-white z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <img
            src="/image.png"
            alt="RenewBerry Logo"
            width={32}
            height={32}
            className="rounded shadow bg-white"
          />
          <div>
            <span className="block font-heading font-bold text-lg leading-tight">
              RenewBerry
            </span>
            <span className="block text-[10px] text-teal-200 uppercase tracking-wider">
              Admin Portal
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
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${isActive ? 'bg-primary text-white shadow-md' : 'text-teal-100 hover:bg-white/10 hover:text-white'}`
                }>

                <Icon className="w-5 h-5" />
                {item.name}
              </NavLink>);

          })}
        </div>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-teal-100 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium">

            <ExternalLinkIcon className="w-5 h-5" />
            View Live Site
          </Link>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full bg-white/20" />

              <div className="truncate">
                <p className="text-sm font-bold truncate">{user?.name}</p>
                <p className="text-xs text-teal-300 capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-2 text-teal-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Logout">

              <LogOutIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>
    </>);

}