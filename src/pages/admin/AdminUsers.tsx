import React, { useState } from 'react';
import { AUTHORS, Author, POSTS } from '../../data/mockData';
import { SearchIcon, EditIcon, BanIcon, CheckCircleIcon, XIcon, SaveIcon, EyeIcon, TrashIcon, FileTextIcon } from 'lucide-react';
interface AdminUser extends Author {
  status: 'active' | 'suspended';
  joinDate: string;
  email: string;
}
const MOCK_USERS: AdminUser[] = AUTHORS.map((a, i) => ({
  ...a,
  status: i % 4 === 0 ? 'suspended' : 'active',
  joinDate: `2025-${12 - i}-15`,
  email: `${a.username}@renewberry.io`
}));
export function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<AdminUser | null>(null);
  const [formData, setFormData] = useState<Partial<AdminUser>>({});

  const handleEdit = (user: AdminUser) => {
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers(users.map(u => u.id === formData.id ? { ...u, ...formData } as AdminUser : u));
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

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

      {/* Card Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <img src={user.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                <div>
                  <p className="font-bold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">@{user.username}</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {user.status === 'active' ? 'Active' : 'Suspended'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-xs text-gray-500 mb-1">Role</p>
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                  {user.role}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Joined</p>
                <p className="font-medium text-gray-900">{new Date(user.joinDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => setViewingUser(user)}
                className="px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
                <EyeIcon className="w-4 h-4" /> View
              </button>
              <button
                onClick={() => handleEdit(user)}
                className="px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                title="Edit User">
                <EditIcon className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => toggleStatus(user.id)}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium ${user.status === 'active' ? 'text-gray-600 hover:text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                title={user.status === 'active' ? 'Suspend User' : 'Reactivate User'}>
                {user.status === 'active' ? (
                  <><BanIcon className="w-4 h-4" /> Suspend</>
                ) : (
                  <><CheckCircleIcon className="w-4 h-4" /> Activate</>
                )}
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
                <TrashIcon className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative z-10 flex flex-col max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-heading font-bold text-gray-900">Edit User</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="edit-user-form" onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                  <input type="text" required value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                  <input type="email" required value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Role</label>
                  <select value={formData.role || ''} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white">
                    <option value="Creator">Creator</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                  <select value={formData.status || 'active'} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white">
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                Cancel
              </button>
              <button type="submit" form="edit-user-form" className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 shadow-sm">
                <SaveIcon className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View User Details Modal */}
      {viewingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setViewingUser(null)} />
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative z-10 flex flex-col max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-heading font-bold text-gray-900">User Profile</h2>
              <button onClick={() => setViewingUser(null)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col items-center text-center space-y-4">
                  <img src={viewingUser.avatar} alt={viewingUser.name} className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{viewingUser.name}</h3>
                    <p className="text-gray-500">@{viewingUser.username}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase">{viewingUser.role}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${viewingUser.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {viewingUser.status}
                    </span>
                  </div>
                  <div className="w-full text-left bg-gray-50 p-4 rounded-xl text-sm text-gray-600">
                    <p className="mb-2"><span className="font-bold text-gray-900">Email:</span> {viewingUser.email}</p>
                    <p><span className="font-bold text-gray-900">Joined:</span> {new Date(viewingUser.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileTextIcon className="w-4 h-4 text-gray-400" /> Recent Articles
                  </h4>
                  <div className="space-y-3">
                    {POSTS.filter(p => p.author.id === viewingUser.id).map(post => (
                      <div key={post.id} className="group flex gap-4 p-3 rounded-xl hover:bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all">
                        <img src={post.featuredImage} alt="" className="w-16 h-12 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-primary transition-colors">{post.title}</h5>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{post.excerpt}</p>
                          <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-400">
                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                            <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">{post.category.name}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {POSTS.filter(p => p.author.id === viewingUser.id).length === 0 && (
                      <p className="text-sm text-gray-500 italic">No articles published yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>);

}