import React from 'react';

interface ProEditorStatsProps {
  content: string;
}

export const ProEditorStats: React.FC<ProEditorStatsProps> = ({ content }) => {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;
  return (
    <div className="w-full bg-white border-t border-gray-200 px-4 py-2 text-sm text-gray-600 flex justify-between items-center">
      <span>Words: {wordCount}</span>
      <span>Characters: {charCount}</span>
      <span>Reading time: {Math.ceil(wordCount / 200)} min</span>
    </div>
  );
};
