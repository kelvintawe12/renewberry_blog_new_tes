import { useEditor } from '@tiptap/react';
import { extensions } from '../lib/tiptap';

export const useEditorConfig = (content: string, onUpdate: (html: string) => void) => {
  return useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] px-4 py-8',
      },
    },
  });
};
