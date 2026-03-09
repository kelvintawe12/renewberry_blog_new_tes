import React from 'react';
export function CreatorSettings() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold text-gray-900">
        Account Settings
      </h1>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Email Preferences
            </h3>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-1 w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded" />

                <div>
                  <p className="font-medium text-gray-900">New Comments</p>
                  <p className="text-sm text-gray-500">
                    Get notified when someone comments on your videos.
                  </p>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-1 w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded" />

                <div>
                  <p className="font-medium text-gray-900">New Followers</p>
                  <p className="text-sm text-gray-500">
                    Get notified when someone follows your channel.
                  </p>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-1 w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded" />

                <div>
                  <p className="font-medium text-gray-900">Platform Updates</p>
                  <p className="text-sm text-gray-500">
                    Receive news about new features and creator tools.
                  </p>
                </div>
              </label>
            </div>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Change Password
            </h3>
            <form className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50" />

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50" />

              </div>
              <button
                type="button"
                className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-xl font-bold transition-colors text-sm">

                Update Password
              </button>
            </form>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h3 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h3>
            <p className="text-sm text-gray-500 mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button
              type="button"
              className="border border-red-200 text-red-600 hover:bg-red-50 px-6 py-2 rounded-xl font-bold transition-colors text-sm">

              Delete Account
            </button>
          </section>
        </div>
      </div>
    </div>);

}