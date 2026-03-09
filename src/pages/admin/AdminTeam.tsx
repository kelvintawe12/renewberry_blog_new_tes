import React, { useState } from 'react';
import { AUTHORS, Author } from '../../data/mockData';
import {
  SearchIcon,
  EditIcon,
  TrashIcon,
  PlusIcon,
  XIcon,
  UserPlusIcon,
  SaveIcon,
  CheckCircleIcon,
  BanIcon } from
'lucide-react';
// Extend Author interface for admin purposes
interface AdminTeamMember extends Author {
  status: 'active' | 'inactive';
  department: string;
  joinDate: string;
}
// Generate mock data based on existing AUTHORS
const DEPARTMENTS = [
'Engineering',
'Leadership',
'Community',
'Content',
'Marketing'];

const MOCK_TEAM: AdminTeamMember[] = AUTHORS.map((a, i) => ({
  ...a,
  status: i % 5 === 0 ? 'inactive' : 'active',
  department: DEPARTMENTS[i % DEPARTMENTS.length],
  joinDate: `2025-${12 - i}-01`
}));
export function AdminTeam() {
  const [teamMembers, setTeamMembers] = useState<AdminTeamMember[]>(MOCK_TEAM);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<AdminTeamMember | null>(
    null
  );
  // Form state
  const [formData, setFormData] = useState<Partial<AdminTeamMember>>({
    name: '',
    username: '',
    role: '',
    department: 'Engineering',
    bio: '',
    avatar: 'https://picsum.photos/seed/new/200/200',
    status: 'active'
  });
  const filteredMembers = teamMembers.filter(
    (m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleOpenModal = (member?: AdminTeamMember) => {
    if (member) {
      setEditingMember(member);
      setFormData(member);
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        username: '',
        role: '',
        department: 'Engineering',
        bio: '',
        avatar: `https://picsum.photos/seed/${Math.random()}/200/200`,
        status: 'active'
      });
    }
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      // Update existing
      setTeamMembers(
        teamMembers.map((m) =>
        m.id === editingMember.id ?
        {
          ...m,
          ...formData
        } as AdminTeamMember :
        m
        )
      );
    } else {
      // Add new
      const newMember: AdminTeamMember = {
        ...(formData as AdminTeamMember),
        id: `a${Date.now()}`,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setTeamMembers([newMember, ...teamMembers]);
    }
    handleCloseModal();
  };
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers(teamMembers.filter((m) => m.id !== id));
    }
  };
  const toggleStatus = (id: string) => {
    setTeamMembers(
      teamMembers.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            status: m.status === 'active' ? 'inactive' : 'active'
          };
        }
        return m;
      })
    );
  };
  // Stats calculations
  const totalMembers = teamMembers.length;
  const activeMembers = teamMembers.filter((m) => m.status === 'active').length;
  const uniqueDepartments = new Set(teamMembers.map((m) => m.department)).size;
  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Team Management
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />

          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-sm">

            <UserPlusIcon className="w-4 h-4" />
            Add Member
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <UsersIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Members</p>
            <p className="text-2xl font-heading font-bold text-gray-900">
              {totalMembers}
            </p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircleIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Members</p>
            <p className="text-2xl font-heading font-bold text-gray-900">
              {activeMembers}
            </p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <SearchIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Departments</p>
            <p className="text-2xl font-heading font-bold text-gray-900">
              {uniqueDepartments}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-w-0">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Member</th>
                <th className="p-4 font-medium">Role & Dept</th>
                <th className="p-4 font-medium hidden md:table-cell">
                  Bio Snippet
                </th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.map((member) =>
              <tr
                key={member.id}
                className="hover:bg-gray-50 transition-colors">

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200" />

                      <div>
                        <p className="font-bold text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500">
                          @{member.username}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium text-gray-900">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-500">{member.department}</p>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <p className="text-sm text-gray-500 truncate max-w-[250px]">
                      {member.bio}
                    </p>
                  </td>
                  <td className="p-4">
                    <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${member.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>

                      <span
                      className={`w-1.5 h-1.5 rounded-full ${member.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
                    </span>
                      {member.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                      onClick={() => toggleStatus(member.id)}
                      className={`p-1.5 rounded-lg transition-colors ${member.status === 'active' ? 'text-gray-400 hover:text-orange-600 hover:bg-orange-50' : 'text-green-500 hover:text-green-600 hover:bg-green-50'}`}
                      title={
                      member.status === 'active' ? 'Deactivate' : 'Activate'
                      }>

                        {member.status === 'active' ?
                      <BanIcon className="w-4 h-4" /> :

                      <CheckCircleIcon className="w-4 h-4" />
                      }
                      </button>
                      <button
                      onClick={() => handleOpenModal(member)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Member">

                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button
                      onClick={() => handleDelete(member.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Member">

                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}

              {filteredMembers.length === 0 &&
              <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No team members found matching "{searchTerm}"
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen &&
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          onClick={handleCloseModal} />


          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative z-10 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-heading font-bold text-gray-900">
                {editingMember ? 'Edit Team Member' : 'Add New Member'}
              </h2>
              <button
              onClick={handleCloseModal}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">

                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="team-form" onSubmit={handleSave} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">
                      Full Name
                    </label>
                    <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value
                    })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="e.g. Jane Doe" />

                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">
                      Username
                    </label>
                    <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      username: e.target.value
                    })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="e.g. janedoe" />

                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">
                      Role / Title
                    </label>
                    <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value
                    })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="e.g. Lead Designer" />

                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">
                      Department
                    </label>
                    <select
                    value={formData.department}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      department: e.target.value
                    })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white">

                      {DEPARTMENTS.map((dept) =>
                    <option key={dept} value={dept}>
                          {dept}
                        </option>
                    )}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">
                    Avatar URL
                  </label>
                  <div className="flex gap-3">
                    <img
                    src={formData.avatar || 'https://via.placeholder.com/150'}
                    alt="Preview"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200" />

                    <input
                    type="url"
                    required
                    value={formData.avatar}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      avatar: e.target.value
                    })
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="https://..." />

                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">
                    Biography
                  </label>
                  <textarea
                  required
                  rows={4}
                  value={formData.bio}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    bio: e.target.value
                  })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  placeholder="Short bio about the team member..." />

                </div>

                <div className="flex items-center gap-2">
                  <input
                  type="checkbox"
                  id="status-toggle"
                  checked={formData.status === 'active'}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.checked ? 'active' : 'inactive'
                  })
                  }
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />

                  <label
                  htmlFor="status-toggle"
                  className="text-sm font-medium text-gray-700">

                    Active Member
                  </label>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
              <button
              type="button"
              onClick={handleCloseModal}
              className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">

                Cancel
              </button>
              <button
              type="submit"
              form="team-form"
              className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 shadow-sm">

                <SaveIcon className="w-4 h-4" />
                {editingMember ? 'Save Changes' : 'Add Member'}
              </button>
            </div>
          </div>
        </div>
      }
    </div>);

}