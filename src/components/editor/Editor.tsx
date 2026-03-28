import React, { useEffect, useState } from 'react';
import { EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import { useEditorConfig } from '../../hooks/useEditorConfig';
import { Toolbar } from './Toolbar';
import { 
  Bold, 
  Italic, 
  Underline, 
  Code, 
  Heading1, 
  Table as TableIcon,
  Columns,
  Rows,
  Trash2,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Youtube as YoutubeIcon
} from 'lucide-react';
import './Editor.css';
import { PageSize, Orientation } from './ProEditorSidebar';

export type WatermarkOrientation = 'diagonal' | 'horizontal' | 'vertical';

interface EditorProps {
  content?: string;
  onChange?: (content: string) => void;
  onEditorReady?: (editor: any) => void;
  placeholder?: string;
  watermark?: string;
  watermarkOrientation?: WatermarkOrientation;
  brandingEnabled?: boolean;
  pageSize?: PageSize;
  orientation?: Orientation;
  isFocusMode?: boolean;
}

export const Editor = ({ 
  content, 
  onChange, 
  onEditorReady,
  placeholder,
  watermark = "DRAFT",
  watermarkOrientation = 'diagonal',
  brandingEnabled = true,
  pageSize = 'A4',
  orientation = 'portrait',
  isFocusMode = false
}: EditorProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const editor = useEditorConfig(content || '', (html) => {
    onChange?.(html);
  });

  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
      // Small delay to ensure DOM is ready for menus
      setTimeout(() => setIsEditable(true), 100);
    }
  }, [editor, onEditorReady]);

  if (!editor) return null;

  const getPageDimensions = () => {
    const isPortrait = orientation === 'portrait';
    if (pageSize === 'A4') return isPortrait ? 'w-[210mm] min-h-[297mm]' : 'w-[297mm] min-h-[210mm]';
    if (pageSize === 'A3') return isPortrait ? 'w-[297mm] min-h-[420mm]' : 'w-[420mm] min-h-[297mm]';
    if (pageSize === 'Letter') return isPortrait ? 'w-[8.5in] min-h-[11in]' : 'w-[11in] min-h-[8.5in]';
    return 'w-[210mm] min-h-[297mm]';
  };

  const getWatermarkClass = () => {
    if (watermarkOrientation === 'diagonal') return 'watermark-diagonal';
    if (watermarkOrientation === 'horizontal') return 'watermark-horizontal';
    if (watermarkOrientation === 'vertical') return 'watermark-vertical';
    return 'watermark-diagonal';
  };

  return (
    <div className="flex flex-col h-full bg-[#F1F5F9] overflow-hidden relative">
      {!isFocusMode && <Toolbar editor={editor} />}
      
      <div className={cn("flex-1 overflow-y-auto p-4 md:p-12 lg:p-20 scrollbar-thin transition-all duration-700", isFocusMode ? "bg-white" : "bg-[#F1F5F9]")}>
        
        {/* We render menus outside the relative container to avoid DOM sync issues with removeChild */}
        {isEditable && (
          <>
            {/* Table Menu */}
            <BubbleMenu editor={editor} shouldShow={({ editor }) => editor.isActive('table')} tippyOptions={{ duration: 100 }} className="flex bg-gray-900 border border-white/10 rounded-xl shadow-2xl p-1 gap-0.5 backdrop-blur-xl z-[100]">
              <button onClick={() => editor.chain().focus().addColumnAfter().run()} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"><Columns size={14} /></button>
              <button onClick={() => editor.chain().focus().addRowAfter().run()} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"><Rows size={14} /></button>
              <div className="w-px h-4 bg-white/10 self-center mx-1" />
              <button onClick={() => editor.chain().focus().deleteTable().run()} className="p-2 rounded-lg hover:bg-red-500 text-white transition-colors"><Trash2 size={14} /></button>
            </BubbleMenu>

            {/* Image Menu */}
            <BubbleMenu editor={editor} shouldShow={({ editor }) => editor.isActive('image')} tippyOptions={{ duration: 100 }} className="flex bg-gray-900 border border-white/10 rounded-xl shadow-2xl p-1 gap-0.5 backdrop-blur-xl z-[100]">
              <button onClick={() => editor.chain().focus().updateAttributes('image', { align: 'left' }).run()} className={`p-2 rounded-lg hover:bg-white/10 transition-colors ${editor.getAttributes('image').align === 'left' ? 'text-primary' : 'text-white'}`}><AlignLeft size={14} /></button>
              <button onClick={() => editor.chain().focus().updateAttributes('image', { align: 'center' }).run()} className={`p-2 rounded-lg hover:bg-white/10 transition-colors ${editor.getAttributes('image').align === 'center' ? 'text-primary' : 'text-white'}`}><AlignCenter size={14} /></button>
              <button onClick={() => editor.chain().focus().updateAttributes('image', { align: 'right' }).run()} className={`p-2 rounded-lg hover:bg-white/10 transition-colors ${editor.getAttributes('image').align === 'right' ? 'text-primary' : 'text-white'}`}><AlignRight size={14} /></button>
              <div className="w-px h-4 bg-white/10 self-center mx-1" />
              <button onClick={() => editor.chain().focus().updateAttributes('image', { width: '25%' }).run()} className="px-2 py-1 text-[10px] font-black text-white hover:bg-white/10 rounded-lg">SM</button>
              <button onClick={() => editor.chain().focus().updateAttributes('image', { width: '50%' }).run()} className="px-2 py-1 text-[10px] font-black text-white hover:bg-white/10 rounded-lg">MD</button>
              <button onClick={() => editor.chain().focus().updateAttributes('image', { width: '100%' }).run()} className="px-2 py-1 text-[10px] font-black text-white hover:bg-white/10 rounded-lg">LG</button>
              <div className="w-px h-4 bg-white/10 self-center mx-1" />
              <button onClick={() => editor.chain().focus().deleteSelection().run()} className="p-2 rounded-lg hover:bg-red-500 text-white transition-colors"><Trash2 size={14} /></button>
            </BubbleMenu>

            {/* Video Menu */}
            <BubbleMenu editor={editor} shouldShow={({ editor }) => editor.isActive('renewVideo')} tippyOptions={{ duration: 100 }} className="flex bg-gray-900 border border-white/10 rounded-xl shadow-2xl p-1 gap-0.5 backdrop-blur-xl z-[100]">
              <button onClick={() => editor.chain().focus().deleteSelection().run()} className="p-2 rounded-lg hover:bg-red-500 text-white transition-colors flex items-center gap-2">
                <Trash2 size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest pr-2">Remove Video</span>
              </button>
            </BubbleMenu>

            {/* Floating Menu */}
            <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }} className="flex bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden p-1.5 gap-1 animate-in slide-in-from-left-2 z-[100]">
              <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="p-3 hover:bg-gray-50 rounded-xl text-gray-600 flex flex-col items-center gap-1 transition-all"><Heading1 size={20} /><span className="text-[8px] uppercase font-black tracking-widest text-gray-400">Title</span></button>
              <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="p-3 hover:bg-gray-50 rounded-xl text-gray-600 flex flex-col items-center gap-1 transition-all"><TableIcon size={20} /><span className="text-[8px] uppercase font-black tracking-widest text-gray-400">Table</span></button>
              <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className="p-3 hover:bg-gray-50 rounded-xl text-gray-600 flex flex-col items-center gap-1 transition-all"><Code size={20} /><span className="text-[8px] uppercase font-black tracking-widest text-gray-400">Code</span></button>
            </FloatingMenu>
          </>
        )}

        <div 
          className={cn(
            "editor-page-container transition-all duration-700 relative group",
            isFocusMode ? "shadow-none border-none" : "shadow-2xl ring-1 ring-black/5",
            getPageDimensions()
          )}
        >
          {/* Watermark */}
          {watermark && !isFocusMode && (
            <div className={cn("watermark-overlay uppercase opacity-[0.03]", getWatermarkClass())}>
              {watermark}
            </div>
          )}

          {/* Branding */}
          {brandingEnabled && !isFocusMode && (
            <div className="page-branding-header">
              <div className="flex items-center gap-2">
                <img src="/image.png" alt="Logo" className="w-5 h-5 object-contain" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">RenewBerry Publications</span>
              </div>
              <div className="text-[9px] text-gray-300 uppercase tracking-widest font-black tracking-[0.2em]">{pageSize} {orientation}</div>
            </div>
          )}

          {/* Main Editor Surface */}
          <div className={cn("transition-all duration-700", isFocusMode ? "pt-[2cm] pb-[2cm] px-[3cm]" : "pt-[4.5cm] pb-[3.5cm] px-[2.5cm]")}>
            <EditorContent editor={editor} />
          </div>

          {/* Branding Footer */}
          {brandingEnabled && !isFocusMode && (
            <div className="page-branding-footer">
              <span className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-black">© 2026 RenewBerry Official</span>
              <span className="text-[9px] text-gray-300 mx-3">•</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-[0.1em] font-black italic">Confidential Draft</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="flex items-center justify-between px-6 py-2.5 text-[9px] uppercase tracking-[0.2em] font-black text-gray-400 border-t bg-white sticky bottom-0 z-20 shadow-sm">
        <div className="flex gap-10">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            {editor.storage.characterCount.words()} Words
          </span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>{Math.ceil(editor.storage.characterCount.words() / 200)} Min Read</span>
        </div>
        <div className="flex items-center gap-6">
          {isFocusMode && <span className="text-primary animate-pulse">Focus Mode Active</span>}
          <span className="text-primary bg-primary/5 px-2 py-1 rounded-lg border border-primary/10">Studio Pro v2.8.1</span>
        </div>
      </div>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
