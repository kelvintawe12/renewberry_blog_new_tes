import React, { useState } from 'react';
import { AUTHORS, Author } from '../../data/mockData';
import { SearchIcon, EditIcon, BanIcon, CheckCircleIcon } from 'lucide-react';
interface AdminUser extends Author {
  status: 'active' | 'suspended';
  joinDate: string;
}
const MOCK_USERS: AdminUser[] = AUTHORS.map((a, i) => ({
  ...a,
  status: i % 4 === 0 ? 'suspended' : 'active',
  joinDate: `2025-${12 - i}-15`
}));
export function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const toggleStatus = (id: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === id) {
          return {
            ...u,
            status: u.status === 'active' ? 'suspended' : 'active'
          };
        }
        return u;
      })
    );
  };
  const filteredUsers = users.filter(
    (u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          User Management
        </h1>
        <div className="relative w-full sm:w-72">
          <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />

        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-w-0">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) =>
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors">

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                      src={user.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover border border-gray-200" />

                      <div>
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>

                      <span
                      className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
                    </span>
                      {user.status === 'active' ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit User">

                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button
                      onClick={() => toggleStatus(user.id)}
                      className={`p-1.5 rounded-lg transition-colors ${user.status === 'active' ? 'text-gray-400 hover:text-red-600 hover:bg-red-50' : 'text-red-500 hover:text-green-600 hover:bg-green-50'}`}
                      title={
                      user.status === 'active' ?
                      'Suspend User' :
                      'Reactivate User'
                      }>

                        {user.status === 'active' ?
                      <BanIcon className="w-4 h-4" /> :

                      <CheckCircleIcon className="w-4 h-4" />
                      }
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}