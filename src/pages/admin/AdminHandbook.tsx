import React, { useState } from 'react';
import { SaveIcon, PlusIcon, ChevronRightIcon } from 'lucide-react';
const INITIAL_SECTIONS = [
{
  id: '1',
  title: 'Getting Started',
  content: 'Welcome to RenewBerry. Here is how to set up your profile...'
},
{
  id: '2',
  title: 'Video Optimization',
  content: 'Use clear lighting, good audio, and engaging hooks...'
},
{
  id: '3',
  title: 'Monetization Guidelines',
  content: 'To be eligible for monetization, you must have...'
}];

export function AdminHandbook() {
  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const [activeSection, setActiveSection] = useState(sections[0]);
  const handleSave = () => {
    alert('Handbook updated successfully!');
  };
  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Creator Handbook Editor
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage the guides and tutorials available to creators.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-sm">

          <SaveIcon className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden flex-shrink-0">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="font-bold text-gray-700">Sections</h3>
            <button className="p-1 hover:bg-gray-200 rounded text-gray-500">
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-1">
            {sections.map((section) =>
            <button
              key={section.id}
              onClick={() => setActiveSection(section)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between group ${activeSection.id === section.id ? 'bg-teal-50 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>

                <span className="truncate">{section.title}</span>
                <ChevronRightIcon
                className={`w-4 h-4 ${activeSection.id === section.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />

              </button>
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <input
              type="text"
              value={activeSection.title}
              onChange={(e) =>
              setActiveSection({
                ...activeSection,
                title: e.target.value
              })
              }
              className="w-full text-xl font-bold text-gray-900 outline-none placeholder:text-gray-300"
              placeholder="Section Title" />

          </div>
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex gap-2">
            <button className="p-1.5 hover:bg-gray-200 rounded text-sm font-bold">
              B
            </button>
            <button className="p-1.5 hover:bg-gray-200 rounded text-sm italic">
              I
            </button>
            <button className="p-1.5 hover:bg-gray-200 rounded text-sm underline">
              U
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
            <button className="p-1.5 hover:bg-gray-200 rounded text-sm">
              H2
            </button>
            <button className="p-1.5 hover:bg-gray-200 rounded text-sm">
              List
            </button>
            <button className="p-1.5 hover:bg-gray-200 rounded text-sm">
              Link
            </button>
          </div>
          <textarea
            value={activeSection.content}
            onChange={(e) =>
            setActiveSection({
              ...activeSection,
              content: e.target.value
            })
            }
            className="flex-1 w-full p-6 outline-none resize-none font-mono text-sm leading-relaxed"
            placeholder="Write content here..." />

        </div>
      </div>
    </div>);

}