import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  CheckSquare,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Baseline,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Minus,
  Eraser,
  Type,
  Youtube,
  Code,
  Trash2,
  Strikethrough,
  Indent as IndentIcon,
  Outdent as OutdentIcon,
  Palette
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface ToolbarProps {
  editor: Editor | null;
}

const ToolbarButton = ({
  onClick,
  isActive = false,
  disabled = false,
  children,
  title,
  className,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
  className?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={cn(
      'p-1.5 rounded-md transition-all hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center min-w-[32px] min-h-[32px]',
      isActive ? 'bg-blue-100 text-blue-700 font-bold' : 'text-gray-600',
      className
    )}
  >
    {children}
  </button>
);

const Divider = () => <div className="w-[1px] h-6 bg-gray-200 mx-1 self-center" />;

const COLORS = [
  { name: 'Default', value: 'inherit' },
  { name: 'Primary', value: '#0891B2' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Gray', value: '#6b7280' },
];

export const Toolbar = ({ editor }: ToolbarProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('Enter Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addYoutube = () => {
    const url = window.prompt('Enter YouTube URL');
    if (url) {
      editor.commands.setYoutubeVideo({ src: url });
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-1 bg-white border-b sticky top-0 z-20 shadow-sm overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-1 ml-1">
        <select 
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className="text-[10px] font-black uppercase tracking-wider bg-gray-100 border border-transparent rounded-xl px-3 py-1.5 outline-none focus:ring-4 focus:ring-primary/10 appearance-none cursor-pointer hover:bg-gray-200 transition-all"
        >
          <option value="Inter">Inter (Modern)</option>
          <option value="Montserrat">Montserrat (Bold)</option>
          <option value="Georgia">Georgia (Serif)</option>
          <option value="Courier New">Courier (Mono)</option>
        </select>
      </div>

      <Divider />

      <div className="flex items-center">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <Undo size={17} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <Redo size={17} />
        </ToolbarButton>
      </div>

      <Divider />

      <div className="flex items-center">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          <Heading1 size={17} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 size={17} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive('paragraph')}
          title="Normal Text"
        >
          <Type size={17} />
        </ToolbarButton>
      </div>

      <Divider />

      <div className="flex items-center relative">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold (Ctrl+B)"
        >
          <Bold size={17} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic (Ctrl+I)"
        >
          <Italic size={17} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="Underline (Ctrl+U)"
        >
          <Underline size={17} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive('highlight')}
          title="Highlight"
        >
          <Highlighter size={17} />
        </ToolbarButton>
        
        {/* Color Picker Popover */}
        <div className="relative">
          <ToolbarButton
            onClick={() => setShowColorPicker(!showColorPicker)}
            isActive={showColorPicker}
            title="Text Color"
          >
            <Baseline size={17} />
          </ToolbarButton>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-2 p-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 flex gap-1 w-40 flex-wrap">
              {COLORS.map(color => (
                <button
                  key={color.name}
                  onClick={() => {
                    if (color.value === 'inherit') editor.chain().focus().unsetColor().run();
                    else editor.chain().focus().setColor(color.value).run();
                    setShowColorPicker(false);
                  }}
                  className="w-6 h-6 rounded-md border border-gray-100 transition-transform hover:scale-125 shadow-sm"
                  style={{ backgroundColor: color.value === 'inherit' ? '#000' : color.value }}
                  title={color.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Divider />

      <div className="flex items-center">
        {/* Indent Tools */}
        <ToolbarButton
          // @ts-ignore
          onClick={() => editor.commands.outdent()}
          title="Decrease Indent"
        >
          <OutdentIcon size={17} />
        </ToolbarButton>
        <ToolbarButton
          // @ts-ignore
          onClick={() => editor.commands.indent()}
          title="Increase Indent"
        >
          <IndentIcon size={17} />
        </ToolbarButton>
      </div>

      <Divider />

      <div className="flex items-center">
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Align Left"
        >
          <AlignLeft size={17} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Align Center"
        >
          <AlignCenter size={17} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          isActive={editor.isActive({ textAlign: 'justify' })}
          title="Justify"
        >
          <AlignJustify size={17} />
        </ToolbarButton>
      </div>

      <Divider />

      <div className="flex items-center">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List size={17} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Ordered List"
        >
          <ListOrdered size={17} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          isActive={editor.isActive('taskList')}
          title="Task List"
        >
          <CheckSquare size={17} />
        </ToolbarButton>
      </div>

      <Divider />

      <div className="flex items-center">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Blockquote"
        >
          <Quote size={17} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title="Code Block"
        >
          <Code size={17} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
          <Minus size={17} />
        </ToolbarButton>
      </div>

      <Divider />

      <div className="flex items-center">
        <ToolbarButton onClick={setLink} isActive={editor.isActive('link')} title="Insert Link">
          <LinkIcon size={17} />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title="Insert Image">
          <ImageIcon size={17} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          title="Insert Table"
        >
          <TableIcon size={17} />
        </ToolbarButton>
      </div>

      <Divider />

      <div className="flex items-center ml-auto pr-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          title="Clear Formatting"
        >
          <Eraser size={17} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().clearContent().run()}
          title="Clear Document"
          className="hover:text-red-600"
        >
          <Trash2 size={17} />
        </ToolbarButton>
      </div>
    </div>
  );
};
