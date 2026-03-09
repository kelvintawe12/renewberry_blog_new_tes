import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { SaveIcon, CameraIcon } from 'lucide-react';
export function CreatorProfile() {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 800);
  };
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold text-gray-900">
        Edit Profile
      </h1>

      <form
        onSubmit={handleSave}
        className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Banner & Avatar */}
        <div className="h-48 bg-gradient-to-r from-teal-200 to-primary relative">
          <button
            type="button"
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-lg backdrop-blur-sm transition-colors">

            <CameraIcon className="w-5 h-5" />
          </button>

          <div className="absolute -bottom-12 left-8 relative group">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-full border-4 border-white bg-white object-cover" />

            <button
              type="button"
              className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">

              <CameraIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="p-8 pt-16 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50" />

            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Username
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 text-gray-500 text-sm">
                  @
                </span>
                <input
                  type="text"
                  defaultValue={user?.name.toLowerCase().replace(' ', '')}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-r-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50" />

              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50 resize-none"
              placeholder="Tell your audience about yourself..."
              defaultValue="I create videos about finding hope in everyday moments. Join me on this journey! ✨" />

            <p className="text-xs text-gray-500 mt-1 text-right">
              160 characters left
            </p>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Social Links</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-gray-600">
                  Instagram
                </div>
                <input
                  type="url"
                  placeholder="https://instagram.com/..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50" />

              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-gray-600">
                  Twitter / X
                </div>
                <input
                  type="url"
                  placeholder="https://twitter.com/..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50" />

              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-gray-600">
                  Website
                </div>
                <input
                  type="url"
                  placeholder="https://yourwebsite.com"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50" />

              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-primary hover:bg-primary-hover disabled:bg-gray-300 text-white px-8 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-sm">

              {isSaving ?
              'Saving...' :

              <>
                  <SaveIcon className="w-4 h-4" /> Save Profile
                </>
              }
            </button>
          </div>
        </div>
      </form>
    </div>);

}