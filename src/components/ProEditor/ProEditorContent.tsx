import React from 'react';

interface ProEditorContentProps {
  value: string;
  onChange: (val: string) => void;
  selectedBlock: string | null;
  setSelectedBlock: (block: string | null) => void;
}

export const ProEditorContent: React.FC<ProEditorContentProps> = ({ value, onChange, selectedBlock, setSelectedBlock }) => (
  <div className="flex-1 p-8 bg-gray-50">
    <textarea
      className="w-full h-96 p-4 rounded-lg border border-gray-200 bg-white text-lg font-body shadow-inner focus:outline-primary"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Start writing your article..."
    />
    {selectedBlock && (
      <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
        <span className="font-bold">Block inserted:</span> {selectedBlock}
        <button className="ml-4 px-2 py-1 bg-gray-200 rounded" onClick={() => setSelectedBlock(null)}>Dismiss</button>
      </div>
    )}
  </div>
);
