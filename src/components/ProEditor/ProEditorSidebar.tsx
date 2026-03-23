import React from 'react';

export const ProEditorSidebar: React.FC = () => (
  <aside className="w-56 bg-white border-r border-gray-200 p-4 flex flex-col gap-6">
    <div>
      <h2 className="font-bold text-lg mb-2">Quick Actions</h2>
      <button className="w-full py-2 mb-2 bg-primary text-white rounded-lg font-bold">Save</button>
      <button className="w-full py-2 bg-gray-100 rounded-lg font-bold">Preview</button>
    </div>
    <div>
      <h3 className="font-bold text-md mb-1">Outline</h3>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>Introduction</li>
        <li>Body</li>
        <li>Conclusion</li>
      </ul>
    </div>
    <div>
      <h3 className="font-bold text-md mb-1">Media</h3>
      <button className="w-full py-2 bg-blue-50 text-blue-700 rounded-lg font-bold">Insert Image</button>
      <button className="w-full py-2 bg-red-50 text-red-700 rounded-lg font-bold">Insert Video</button>
    </div>
  </aside>
);
