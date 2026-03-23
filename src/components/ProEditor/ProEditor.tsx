import React, { useState } from 'react';
import { ProEditorSidebar } from './ProEditorSidebar';
import { ProEditorToolbar } from './ProEditorToolbar';
import { ProEditorContent } from './ProEditorContent';
import { ProEditorStats } from './ProEditorStats';

export const ProEditor: React.FC = () => {
  const [content, setContent] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  return (
    <div className="flex w-full min-h-[80vh] bg-gray-50 rounded-2xl shadow-xl overflow-hidden">
      <ProEditorSidebar />
      <div className="flex-1 flex flex-col">
        <ProEditorToolbar onBlockInsert={setSelectedBlock} />
        <ProEditorContent value={content} onChange={setContent} selectedBlock={selectedBlock} setSelectedBlock={setSelectedBlock} />
        <ProEditorStats content={content} />
      </div>
    </div>
  );
};
