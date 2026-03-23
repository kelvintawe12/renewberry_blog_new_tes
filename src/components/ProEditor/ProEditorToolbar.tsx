import React from 'react';

interface ProEditorToolbarProps {
  onBlockInsert: (block: string) => void;
}

export const ProEditorToolbar: React.FC<ProEditorToolbarProps> = ({ onBlockInsert }) => (
  <div className="sticky top-0 z-20 bg-white border-b border-gray-200 flex items-center gap-2 px-4 py-2 shadow-sm">
    <button className="px-3 py-1 rounded bg-primary text-white font-bold" onClick={() => onBlockInsert('heading')}>H</button>
    <button className="px-3 py-1 rounded bg-gray-100 font-bold" onClick={() => onBlockInsert('bold')}>B</button>
    <button className="px-3 py-1 rounded bg-gray-100 font-bold" onClick={() => onBlockInsert('italic')}>I</button>
    <button className="px-3 py-1 rounded bg-gray-100 font-bold" onClick={() => onBlockInsert('list')}>List</button>
    <button className="px-3 py-1 rounded bg-gray-100 font-bold" onClick={() => onBlockInsert('quote')}>Quote</button>
    <button className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-bold" onClick={() => onBlockInsert('image')}>Image</button>
    <button className="px-3 py-1 rounded bg-red-100 text-red-700 font-bold" onClick={() => onBlockInsert('video')}>Video</button>
    <button className="px-3 py-1 rounded bg-green-100 text-green-700 font-bold" onClick={() => onBlockInsert('table')}>Table</button>
    <button className="px-3 py-1 rounded bg-yellow-100 text-yellow-700 font-bold" onClick={() => onBlockInsert('code')}>Code</button>
    <button className="px-3 py-1 rounded bg-gray-200 font-bold" onClick={() => onBlockInsert('undo')}>Undo</button>
    <button className="px-3 py-1 rounded bg-gray-200 font-bold" onClick={() => onBlockInsert('redo')}>Redo</button>
  </div>
);
