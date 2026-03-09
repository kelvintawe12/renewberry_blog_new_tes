import React from 'react';
import { SaveIcon } from 'lucide-react';
export function AdminBrandVoice() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Brand Voice & Guidelines
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Define the core messaging and tone for the platform.
          </p>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-sm">
          <SaveIcon className="w-4 h-4" /> Save Guidelines
        </button>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">
            Mission Statement
          </h2>
          <textarea
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
            defaultValue="Our mission is to empower creators and viewers through visual storytelling that inspires fresh perspectives, hope, and personal transformation." />

        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">
            Tone of Voice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                We are...
              </label>
              <ul className="space-y-2">
                <li>
                  <input
                    type="text"
                    defaultValue="Inspiring, but not toxic positive"
                    className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-50" />

                </li>
                <li>
                  <input
                    type="text"
                    defaultValue="Authentic and vulnerable"
                    className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-50" />

                </li>
                <li>
                  <input
                    type="text"
                    defaultValue="Professional yet approachable"
                    className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-50" />

                </li>
              </ul>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                We are NOT...
              </label>
              <ul className="space-y-2">
                <li>
                  <input
                    type="text"
                    defaultValue="Sensationalist or clickbaity"
                    className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-50" />

                </li>
                <li>
                  <input
                    type="text"
                    defaultValue="Overly academic or dry"
                    className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-50" />

                </li>
                <li>
                  <input
                    type="text"
                    defaultValue="Judgmental or exclusionary"
                    className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-50" />

                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">
            Content Pillars
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/3">
                <input
                  type="text"
                  defaultValue="Hope & Resilience"
                  className="w-full px-3 py-2 border border-gray-300 rounded font-bold" />

              </div>
              <div className="w-2/3">
                <input
                  type="text"
                  defaultValue="Stories of overcoming adversity and finding light in dark places."
                  className="w-full px-3 py-2 border border-gray-300 rounded" />

              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3">
                <input
                  type="text"
                  defaultValue="Community Building"
                  className="w-full px-3 py-2 border border-gray-300 rounded font-bold" />

              </div>
              <div className="w-2/3">
                <input
                  type="text"
                  defaultValue="Highlighting collective action and mutual support."
                  className="w-full px-3 py-2 border border-gray-300 rounded" />

              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3">
                <input
                  type="text"
                  defaultValue="Personal Growth"
                  className="w-full px-3 py-2 border border-gray-300 rounded font-bold" />

              </div>
              <div className="w-2/3">
                <input
                  type="text"
                  defaultValue="Actionable advice for mental, emotional, and professional development."
                  className="w-full px-3 py-2 border border-gray-300 rounded" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}