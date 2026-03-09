import React from 'react';
import { SaveIcon } from 'lucide-react';
export function AdminSettings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Platform Settings
        </h1>
        <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-sm">
          <SaveIcon className="w-4 h-4" /> Save Settings
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button className="px-6 py-4 text-sm font-bold text-primary border-b-2 border-primary bg-teal-50/50">
            General
          </button>
          <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50">
            Security
          </button>
          <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50">
            API Keys
          </button>
          <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50">
            Emails
          </button>
        </div>

        <div className="p-6 space-y-8">
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Site Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  defaultValue="RenewBerry"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none" />

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  defaultValue="support@renewberry.io"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none" />

              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Description (SEO)
                </label>
                <textarea
                  rows={2}
                  defaultValue="A platform for stories of hope, renewal, and transformation."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none resize-none" />

              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Features Toggle
            </h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <p className="font-bold text-gray-900">Public Registration</p>
                  <p className="text-sm text-gray-500">
                    Allow new users to sign up automatically.
                  </p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-primary translate-x-6 transition-transform duration-200"
                    style={{
                      right: 0
                    }} />

                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-primary cursor-pointer"></label>
                </div>
              </label>

              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <p className="font-bold text-gray-900">Auto-Approve Videos</p>
                  <p className="text-sm text-gray-500">
                    Videos from trusted creators bypass manual review.
                  </p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 transition-transform duration-200"
                    style={{
                      right: 0
                    }} />

                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
              </label>
            </div>
          </section>
        </div>
      </div>
    </div>);

}