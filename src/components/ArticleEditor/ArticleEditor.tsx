import React, {
  useCallback,
  useEffect,
  useState,
  useRef
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  SaveIcon,
  Image as ImageIcon,
  SendIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  Heading2Icon,
  Heading3Icon,
  QuoteIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  CodeIcon,
  MinusIcon,
  EraserIcon,
  EyeIcon,
  Edit2Icon,
  XIcon,
  CheckCircle2Icon,
  CircleDashedIcon,
  Loader2Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  GlobeIcon,
  LockIcon,
  CalendarIcon,
  StarIcon,
  UploadIcon,
  SparklesIcon,
  FileTextIcon,
  FilePlusIcon,
  PaletteIcon,
  TableIcon,
  MaximizeIcon,
  MinimizeIcon,
  CheckCheckIcon,
  HistoryIcon,
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
  TableOfContentsIcon,
  SearchIcon,
  StampIcon
} from 'lucide-react';

import { CATEGORIES, POSTS, AUTHORS, Post } from '../../data/mockData';
import { postStorage } from '../../data/postStorage';
import { REAL_VIDEOS, RealVideo } from '../../data/videoData';

// Find and Replace Dialog
function FindReplaceDialog({ open, onClose, editorRef, onContentChange }: { open: boolean; onClose: () => void; editorRef: React.RefObject<HTMLDivElement>; onContentChange: () => void }) {
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  if (!open) return null;

  const handleFindNext = () => {
    if (findText) {
      // window.find is a non-standard but widely supported API for finding text
      (window as any).find(findText, false, false, true, false, false, false);
    }
  };

  const handleReplace = () => {
    if (findText) {
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed && sel.toString().toLowerCase() === findText.toLowerCase()) {
        document.execCommand('insertText', false, replaceText);
        onContentChange();
      }
      handleFindNext();
    }
  };

  const handleReplaceAll = () => {
    if (!editorRef.current || !findText) return;
    const walker = document.createTreeWalker(editorRef.current, NodeFilter.SHOW_TEXT);
    const nodes: Node[] = [];
    let node;
    while ((node = walker.nextNode())) {
      nodes.push(node);
    }
    
    let changed = false;
    const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    
    nodes.forEach((n) => {
      if (n.nodeValue && regex.test(n.nodeValue)) {
        n.nodeValue = n.nodeValue.replace(regex, replaceText);
        changed = true;
      }
    });

    if (changed) {
      onContentChange();
    }
  };

  return (
    <div className="fixed top-24 right-8 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-80 animate-in fade-in slide-in-from-top-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">Find & Replace</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <XIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-3">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            placeholder="Find..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            autoFocus
          />
        </div>
        <div className="relative">
          <Edit2Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            placeholder="Replace with..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={handleFindNext} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 rounded-lg text-xs font-bold transition-colors">Find Next</button>
          <button onClick={handleReplace} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 rounded-lg text-xs font-bold transition-colors">Replace</button>
        </div>
        <button onClick={handleReplaceAll} className="w-full bg-primary hover:bg-primary-hover text-white py-1.5 rounded-lg text-xs font-bold transition-colors">Replace All</button>
      </div>
    </div>
  );
}

// Watermark Modal
function WatermarkModal({ open, onClose, onInsert }: { open: boolean; onClose: () => void; onInsert: (config: any) => void }) {
  const [type, setType] = useState<'text' | 'image'>('text');
  const [text, setText] = useState('DRAFT');
  const [imageUrl, setImageUrl] = useState('');
  const [opacity, setOpacity] = useState(0.1);
  const [rotation, setRotation] = useState(-45);
  const [size, setSize] = useState(5);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Add Watermark</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded text-gray-500"><XIcon className="w-5 h-5" /></button>
        </div>
        
        <div className="space-y-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${type === 'text' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setType('text')}
            >
              Text
            </button>
            <button 
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${type === 'image' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setType('image')}
            >
              Image
            </button>
          </div>

          {type === 'text' ? (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Text</label>
              <input 
                type="text" 
                value={text} 
                onChange={e => setText(e.target.value)} 
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="Watermark Text"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Image URL</label>
              <input 
                type="url" 
                value={imageUrl} 
                onChange={e => setImageUrl(e.target.value)} 
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="https://example.com/logo.png"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Opacity ({opacity})</label>
              <input 
                type="range" 
                min="0.05" max="1" step="0.05" 
                value={opacity} 
                onChange={e => setOpacity(parseFloat(e.target.value))} 
                className="w-full cursor-pointer accent-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Rotation</label>
              <select value={rotation} onChange={e => setRotation(parseInt(e.target.value))} className="w-full px-2 py-1.5 border border-gray-200 rounded-lg bg-white text-sm outline-none">
                <option value={0}>Horizontal (0°)</option>
                <option value={-45}>Diagonal (-45°)</option>
                <option value={-90}>Vertical (-90°)</option>
              </select>
            </div>
          </div>

           <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Size {type === 'text' ? '(Font Scale)' : '(Width %)'}</label>
              <input 
                type="range" 
                min="1" max={type === 'text' ? 15 : 100} 
                value={size} 
                onChange={e => setSize(parseInt(e.target.value))} 
                className="w-full cursor-pointer accent-primary"
              />
            </div>

          <button 
            onClick={() => { onInsert({ type, text, imageUrl, opacity, rotation, size }); onClose(); }}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-bold hover:bg-primary-hover transition-colors shadow-sm"
          >
            Insert Watermark
          </button>
        </div>
      </div>
    </div>
  );
}

// Video Embed Modal
function VideoEmbedModal({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (video: RealVideo) => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 text-gray-500">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <h2 className="text-lg font-bold mb-4">Embed a Video</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
          {REAL_VIDEOS.map((video) => (
            <div key={video.id} className="border rounded-xl p-3 flex flex-col bg-gray-50 hover:bg-gray-100 transition cursor-pointer" onClick={() => { onSelect(video); onClose(); }}>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 mb-2">
                {video.thumbnail_url ? (
                  <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No Thumbnail</div>
                )}
              </div>
              <div className="font-semibold text-sm mb-1 line-clamp-1">{video.title}</div>
              <div className="text-xs text-gray-500 line-clamp-2 mb-1">{video.description}</div>
              <div className="text-xs text-gray-400">{video.duration_seconds ? `${video.duration_seconds}s` : ''}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Image Upload Modal
function ImageUploadModal({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (url: string, alt: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Mock base64 preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        // Mock upload to picsum-like URL
        const mockUrl = `https://picsum.photos/seed/${selectedFile.name.replace(/\s+/g, '')}/1200/600.jpg`;
        setUrl(mockUrl);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleInsert = () => {
    if (url) {
      onSelect(url, alt);
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Insert Image</h2>
          <button onClick={onClose} className="p-1 text-gray-500 hover:bg-gray-100 rounded">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer" onClick={() => document.getElementById('image-upload')?.click()}>
            <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <div className="text-sm text-gray-500">Drag & drop or click to upload</div>
            <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            {file && (
              <div className="mt-2 text-sm font-medium text-primary">{file.name}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Or paste URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="Describe image for accessibility"
            />
          </div>
          <button
            onClick={handleInsert}
            disabled={!url}
            className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            Insert Image
          </button>
        </div>
      </div>
    </div>
  );
}

// Ruler Component
function Ruler({ padding, onPaddingChange }: { padding: { left: number; right: number }, onPaddingChange: (p: { left: number; right: number }) => void }) {
  const rulerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !rulerRef.current) return;
      const rect = rulerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      
      if (isDragging === 'left') {
        const newLeft = Math.max(24, Math.min(x, 300));
        onPaddingChange({ ...padding, left: newLeft });
      } else {
        const newRight = Math.max(24, Math.min(rect.width - x, 300));
        onPaddingChange({ ...padding, right: newRight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, padding, onPaddingChange]);

  return (
    <div ref={rulerRef} className="w-full max-w-[816px] mx-auto h-6 bg-gray-50 border-b border-gray-200 relative mb-1 select-none hidden sm:block font-mono text-[9px] text-gray-400">
      {/* Ticks */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 83 }).map((_, i) => {
           const isMajor = i % 10 === 0;
           return (
            <div 
              key={i} 
              className={`absolute bottom-0 border-l ${isMajor ? 'border-gray-400 h-2.5' : 'border-gray-300 h-1.5'}`}
              style={{ left: `${(i / 82) * 100}%` }}
            >
              {isMajor && (
                <span className="absolute bottom-2.5 -left-1 font-medium">{i / 10}</span>
              )}
            </div>
           );
        })}
      </div>

      {/* Left Margin Marker */}
      <div 
        className="absolute top-0 bottom-0 left-0 bg-gray-200/50 border-r border-gray-400 z-10 cursor-ew-resize group hover:bg-gray-300/50 transition-colors"
        style={{ width: `${padding.left}px` }}
        onMouseDown={(e) => { e.preventDefault(); setIsDragging('left'); }}
      >
        <div className="absolute top-0 right-[-6px] -mt-1 cursor-ew-resize text-gray-600 hover:text-gray-900">
           <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 12l8 10 8-10z"/></svg>
        </div>
      </div>

      {/* Right Margin Marker */}
      <div 
        className="absolute top-0 bottom-0 right-0 bg-gray-200/50 border-l border-gray-400 z-10 cursor-ew-resize group hover:bg-gray-300/50 transition-colors"
        style={{ width: `${padding.right}px` }}
        onMouseDown={(e) => { e.preventDefault(); setIsDragging('right'); }}
      >
        <div className="absolute top-0 left-[-6px] -mt-1 cursor-ew-resize text-gray-600 hover:text-gray-900">
           <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 12l8 10 8-10z"/></svg>
        </div>
      </div>
    </div>
  );
}

// Template Modal
function TemplateModal({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (content: string) => void }) {
  const templates = [
    {
      name: 'How-to Guide',
      icon: FileTextIcon,
      content: `<h2>Step 1: Getting Started</h2><p>Explain the first step...</p><div class='callout-box bg-blue-50 border-l-4 border-blue-400 p-4 rounded-xl my-4'><strong>💡 Pro Tip:</strong> Include actionable advice here.</div><h2>Step 2: Implementation</h2><p>Dive deeper into the process...</p>`
    },
    {
      name: 'Listicle (10x)',
      icon: ListIcon,
      content: `<h2>1. First Item</h2><p>Describe your first point...</p><div class='fact-box bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl my-4'><strong>🤔 Did You Know?</strong> Include an interesting stat.</div><h2>2. Second Item</h2><p>Continue with more items...</p>`
    },
    {
      name: 'Opinion Piece',
      icon: PaletteIcon,
      content: `<blockquote class='fancy-quote border-l-4 border-purple-400 pl-4 italic text-lg my-4 text-purple-700'>“Start with a powerful quote that sets your tone...”</blockquote><h2>Why This Matters</h2><p>Explain your main thesis...</p><h2>The Bigger Picture</h2><p>Wrap up with your conclusion...</p>`
    }
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Article Templates</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {templates.map((template) => (
            <div key={template.name} className="border rounded-xl p-4 hover:bg-gray-50 transition cursor-pointer group" onClick={() => onSelect(template.content)}>
              <div className="flex items-center gap-3 mb-2">
                <template.icon className="w-6 h-6 text-primary group-hover:text-primary-dark" />
                <h3 className="font-bold text-gray-900">{template.name}</h3>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{template.content.replace(/<[^>]*>/g, '').slice(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// AI Suggestion Modal
function AISuggestionModal({ open, title, onClose, onSuggest }: { open: boolean; title: string; onClose: () => void; onSuggest: (suggestion: { excerpt: string; title: string }) => void }) {
  const [loading, setLoading] = useState(false);

  const suggestions = title ? [
    {
      title: `How to ${title.toLowerCase()} in 5 Simple Steps`,
      excerpt: 'A step-by-step guide to mastering ${title.toLowerCase()} that anyone can follow...'
    },
    {
      title: `Why ${title} is the Future of [Industry]`,
      excerpt: `Discover why ${title.toLowerCase()} is revolutionizing the way we work and live.`
    },
    {
      title: `10 Mistakes People Make with ${title.toLowerCase()}`,
      excerpt: 'Avoid these common pitfalls and achieve better results with ${title.toLowerCase()}.'
    }
  ] : [];

  const handleSuggest = (suggestion: typeof suggestions[0]) => {
    setLoading(true);
    setTimeout(() => {
      onSuggest(suggestion);
      onClose();
      setLoading(false);
    }, 1000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">AI Suggestions</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="border rounded-xl p-4 hover:bg-gray-50 cursor-pointer transition" onClick={() => handleSuggest(suggestion)}>
              <div className="font-bold text-gray-900 line-clamp-1 mb-1">{suggestion.title}</div>
              <div className="text-sm text-gray-600 line-clamp-2">{suggestion.excerpt}</div>
            </div>
          ))}
          {!title && (
            <p className="text-gray-500 text-sm text-center py-8">Enter a title to get AI suggestions</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Link Modal
function LinkModal({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (url: string) => void }) {
  const [url, setUrl] = useState('');
  
  useEffect(() => {
    if (open) setUrl('');
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4">Insert Link</h2>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary mb-4 outline-none"
          placeholder="https://example.com"
          autoFocus
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onSave(url);
              onClose();
            }
          }}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">Cancel</button>
          <button onClick={() => { onSave(url); onClose(); }} className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium text-sm transition-colors shadow-sm">Insert Link</button>
        </div>
      </div>
    </div>
  );
}

// Helper to strip HTML for word count
const stripHtml = (html: string) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

// Helper to slugify title
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

interface ArticleVersion {
  timestamp: number;
  data: {
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    featuredImage: string;
  };
}

function HistoryModal({ open, history, onClose, onRestore }: { open: boolean; history: ArticleVersion[]; onClose: () => void; onRestore: (version: ArticleVersion) => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <HistoryIcon className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-bold">Version History</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3">
          {history.length === 0 && (
            <p className="text-gray-500 text-center py-8">No history available yet.</p>
          )}
          {history.map((version) => (
            <div key={version.timestamp} className="border rounded-xl p-4 hover:bg-gray-50 flex justify-between items-center group transition-all">
              <div>
                <p className="font-bold text-sm text-gray-900">{new Date(version.timestamp).toLocaleString()}</p>
                <p className="text-xs text-gray-500 truncate max-w-[180px] mt-0.5">{version.data.title || 'Untitled'}</p>
                <div className="flex gap-2 mt-1">
                   <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{version.data.content.length} chars</span>
                </div>
              </div>
              <button
                onClick={() => onRestore(version)}
                className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-primary hover:text-white hover:border-primary transition-colors shadow-sm opacity-0 group-hover:opacity-100"
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TableOfContentsModal({ open, onClose, content, onJump }: { open: boolean; onClose: () => void; content: string; onJump: (text: string) => void }) {
  if (!open) return null;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const headings = Array.from(tempDiv.querySelectorAll('h2, h3'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto custom-scrollbar" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TableOfContentsIcon className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-bold">Table of Contents</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-1">
          {headings.length === 0 && (
            <p className="text-gray-500 text-center py-8 text-sm">No headings found (H2, H3).</p>
          )}
          {headings.map((heading, i) => (
            <button
              key={i}
              onClick={() => { onJump(heading.textContent || ''); onClose(); }}
              className={`w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-all group flex items-start gap-3 ${heading.tagName === 'H3' ? 'pl-8' : ''}`}
            >
              <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${heading.tagName === 'H3' ? 'bg-gray-300 group-hover:bg-primary/50' : 'bg-primary'}`} />
              <span className={`text-sm ${heading.tagName === 'H3' ? 'text-gray-600' : 'text-gray-900 font-medium'} group-hover:text-primary transition-colors line-clamp-2`}>
                {heading.textContent}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Grammar Check Modal
function GrammarCheckModal({ open, content, onClose }: { open: boolean; content: string; onClose: () => void }) {
  if (!open) return null;

  const text = stripHtml(content);
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const longSentences = sentences.filter(s => s.trim().split(/\s+/).length > 25);
  const adverbs = (text.match(/\b\w+ly\b/g) || []).filter(w => !['family', 'only', 'early', 'ugly'].includes(w.toLowerCase())).length;
  const passiveVoice = (text.match(/\b(am|are|is|was|were|be|been|being)\b\s+\w+ed\b/g) || []).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CheckCheckIcon className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-bold">Writing Assistant</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
            <h3 className="font-bold text-teal-900 mb-3 text-sm uppercase tracking-wider">Readability Report</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Long Sentences</span>
                <span className={`text-sm font-bold px-2 py-0.5 rounded ${longSentences.length > 2 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{longSentences.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Adverbs Usage</span>
                <span className={`text-sm font-bold px-2 py-0.5 rounded ${adverbs > 5 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{adverbs}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Passive Voice</span>
                <span className={`text-sm font-bold px-2 py-0.5 rounded ${passiveVoice > 3 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{passiveVoice}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p className="mb-1 font-semibold">Writing Tips:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Aim for sentences under 25 words.</li>
              <li>Use strong verbs instead of adverbs when possible.</li>
              <li>Active voice makes your writing more direct and engaging.</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

interface ArticleEditorProps {
  onBack?: () => void;
  isAdmin?: boolean;
}

export function ArticleEditor({ onBack, isAdmin = false }: ArticleEditorProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  // Load existing post from storage or mock data
  const existingPost = isEditing ? (postStorage.getPost(id) || POSTS.find(p => p.id === id)) : null;

  // Form State
  const [title, setTitle] = useState(existingPost?.title || '');
  const [excerpt, setExcerpt] = useState(existingPost?.excerpt || '');
  const [content, setContent] = useState(existingPost?.content || '');
  const [category, setCategory] = useState(
    existingPost?.category.id || CATEGORIES[0].id
  );
  const [tags, setTags] = useState<string[]>(existingPost?.tags || []);
  const [featuredImage, setFeaturedImage] = useState(
    existingPost?.featuredImage || ''
  );
  const [imageAlt, setImageAlt] = useState('');
  const [status, setStatus] = useState('draft'); // draft, review, published
  const [visibility, setVisibility] = useState('public'); // public, unlisted
  const [scheduledDate, setScheduledDate] = useState('');
  const [isFeatured, setIsFeatured] = useState(
    existingPost?.isFeatured || false
  );
  const [isTrending, setIsTrending] = useState(
    existingPost?.isTrending || false
  );

  // Editor State
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>(
    'saved'
  );
  const [tagInput, setTagInput] = useState('');
  const [seoPreviewOpen, setSeoPreviewOpen] = useState(true);
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>(
    {}
  );
  const editorRef = useRef<HTMLDivElement>(null);
  const lastSavedData = useRef({
    title,
    excerpt,
    content,
    tags,
    featuredImage
  });

  // New Feature States
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [showSeoCards, setShowSeoCards] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [isDistractionFree, setIsDistractionFree] = useState(false);
  const [wordCountGoal, setWordCountGoal] = useState(0);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [grammarModalOpen, setGrammarModalOpen] = useState(false);
  const [isSpellCheckEnabled, setIsSpellCheckEnabled] = useState(true);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [history, setHistory] = useState<ArticleVersion[]>([]);
  const [tocModalOpen, setTocModalOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [findReplaceOpen, setFindReplaceOpen] = useState(false);
  const [watermarkModalOpen, setWatermarkModalOpen] = useState(false);
  const [pagePadding, setPagePadding] = useState({ left: 48, right: 48 });

  // Video Embed Modal State
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const savedSelection = useRef<Range | null>(null);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelection.current = sel.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    if (savedSelection.current) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedSelection.current);
      }
    }
  };

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  // Load history
  useEffect(() => {
    if (id) {
      const savedHistory = localStorage.getItem(`article_history_${id}`);
      if (savedHistory) {
        try {
          setHistory(JSON.parse(savedHistory) as ArticleVersion[]);
        } catch (e) {
          console.error("Failed to parse history", e);
        }
      }
    }
  }, [id]);

  // Auto-save logic
  useEffect(() => {
    const hasChanged =
      title !== lastSavedData.current.title ||
      excerpt !== lastSavedData.current.excerpt ||
      content !== lastSavedData.current.content ||
      JSON.stringify(tags) !== JSON.stringify(lastSavedData.current.tags) ||
      featuredImage !== lastSavedData.current.featuredImage;

    if (hasChanged && saveStatus === 'saved') {
      setSaveStatus('unsaved');
    }

    if (hasChanged) {
      const timer = setTimeout(() => {
        handleSavePost(true);
      }, 30000); // Auto-save after 30s of inactivity
      return () => clearTimeout(timer);
    }
  }, [title, excerpt, content, tags, featuredImage]);

  const handleSavePost = (isAuto = false) => {
    setSaveStatus('saving');
    
    const selectedCategory = CATEGORIES.find(c => c.id === category) || CATEGORIES[0];
    const postData: Post = {
      id: id || '',
      title,
      slug: existingPost?.slug || slugify(title),
      excerpt,
      content,
      featuredImage,
      category: selectedCategory,
      author: existingPost?.author || AUTHORS[0], // Fallback to first author for now
      tags,
      publishedAt: existingPost?.publishedAt || new Date().toISOString(),
      readTime: `${Math.max(1, Math.ceil(stripHtml(content).split(/\s+/).length / 200))} min read`,
      isFeatured,
      isTrending
    };

    setTimeout(() => {
      const savedPost = postStorage.savePost(postData);
      lastSavedData.current = {
        title,
        excerpt,
        content,
        tags,
        featuredImage
      };
      setSaveStatus('saved');
      
      // If this was a new post, redirect to edit URL
      if (!isEditing && savedPost.id) {
        navigate(isAdmin ? `/admin/articles/edit/${savedPost.id}` : `/creator/write/${savedPost.id}`, { replace: true });
      }
    }, isAuto ? 1000 : 500);
  };

  const handleSaveDraft = () => {
    handleSavePost();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSavePost();
    alert(isAdmin ? 'Article saved successfully!' : 'Article submitted for review!');
    if (onBack) {
      onBack();
    } else {
      navigate(isAdmin ? '/admin/articles' : '/creator/articles');
    }
  };

  const handleRestoreVersion = (version: ArticleVersion) => {
    if (window.confirm('Are you sure you want to restore this version? Unsaved changes will be lost.')) {
      setTitle(version.data.title);
      setExcerpt(version.data.excerpt);
      setContent(version.data.content);
      setTags(version.data.tags);
      setFeaturedImage(version.data.featuredImage);
      if (editorRef.current) {
        editorRef.current.innerHTML = version.data.content;
      }
      setHistoryModalOpen(false);
      setSaveStatus('unsaved');
    }
  };

  const handleJumpToHeading = (text: string) => {
    if (!editorRef.current) return;
    const elements = editorRef.current.querySelectorAll('h2, h3');
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].textContent === text) {
        elements[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
        const el = elements[i] as HTMLElement;
        const originalBg = el.style.backgroundColor;
        el.style.backgroundColor = '#fef3c7';
        el.style.transition = 'background-color 0.5s';
        setTimeout(() => { el.style.backgroundColor = originalBg; }, 1500);
        break;
      }
    }
  };

  const handleInsertWatermark = (config: any) => {
    restoreSelection();
    if (!editorRef.current) return;
    
    const style = `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(${config.rotation}deg); opacity: ${config.opacity}; pointer-events: none; user-select: none; z-index: 0; white-space: nowrap;`;
    let watermarkHtml = '';
    
    if (config.type === 'text') {
      watermarkHtml = `<div class="watermark" contenteditable="false" style="${style} font-size: ${config.size}rem; font-weight: 800; color: #000; border: 2px dashed #000; padding: 0.5rem 2rem;">${config.text}</div>`;
    } else {
      watermarkHtml = `<img class="watermark" contenteditable="false" src="${config.imageUrl}" style="${style} width: ${config.size}%; height: auto;" />`;
    }
    
    document.execCommand('insertHTML', false, watermarkHtml);
    setContent(editorRef.current.innerHTML);
  };

  // Editor Commands
  const execCommand = (
    command: string,
    value: string | undefined = undefined
  ) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateActiveFormats();
    handleContentChange();
  };

  const handleFormatBlock = (tag: string) => {
    execCommand('formatBlock', tag);
  };

  const handleLinkClick = () => {
    saveSelection();
    setLinkModalOpen(true);
  };

  const handleLinkSave = (url: string) => {
    if (url) {
      restoreSelection();
      execCommand('createLink', url);
    }
    savedSelection.current = null;
  };

  // Insert image HTML at cursor position
  const handleInsertImage = (url: string, alt: string) => {
    restoreSelection();
    if (!editorRef.current) return;
    const imageHtml = `<figure class="my-6"><img src="${url}" alt="${alt}" class="w-full max-w-2xl mx-auto rounded-xl shadow-lg" /><figcaption class="text-center text-sm text-gray-500 mt-2">${alt}</figcaption></figure>`;
    document.execCommand('insertHTML', false, imageHtml);
    setContent(editorRef.current.innerHTML);
  };

  // Insert video embed HTML at cursor position
  const handleEmbedVideo = (video: RealVideo) => {
    restoreSelection();
    if (!editorRef.current) return;
    const videoHtml = `<div class="embedded-video my-6"><video controls src="${video.video_url}" poster="${video.thumbnail_url || ''}" style="max-width:100%;border-radius:1rem;"></video><div class="text-xs text-gray-500 mt-1">${video.title}</div></div>`;
    // Insert at caret position
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      const temp = document.createElement('div');
      temp.innerHTML = videoHtml;
      const frag = document.createDocumentFragment();
      let node;
      while ((node = temp.firstChild)) {
        frag.appendChild(node);
      }
      range.insertNode(frag);
      // Move caret after inserted video
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      // Fallback: append to end
      editorRef.current.innerHTML += videoHtml;
    }
    setContent(editorRef.current.innerHTML);
  };

  // Insert template content
  const handleInsertTemplate = (templateContent: string) => {
    restoreSelection();
    if (!editorRef.current) return;
    document.execCommand('insertHTML', false, templateContent);
    setContent(editorRef.current.innerHTML);
  };

  const handleInsertTable = () => {
    if (!editorRef.current) return;
    const tableHtml = `
      <div class="overflow-x-auto my-6">
        <table class="w-full border-collapse border border-gray-200 text-sm"><thead><tr class="bg-gray-50"><th class="border border-gray-200 p-3 text-left font-bold text-gray-700">Header 1</th><th class="border border-gray-200 p-3 text-left font-bold text-gray-700">Header 2</th><th class="border border-gray-200 p-3 text-left font-bold text-gray-700">Header 3</th></tr></thead><tbody><tr><td class="border border-gray-200 p-3 text-gray-600">Cell 1</td><td class="border border-gray-200 p-3 text-gray-600">Cell 2</td><td class="border border-gray-200 p-3 text-gray-600">Cell 3</td></tr><tr><td class="border border-gray-200 p-3 text-gray-600">Cell 4</td><td class="border border-gray-200 p-3 text-gray-600">Cell 5</td><td class="border border-gray-200 p-3 text-gray-600">Cell 6</td></tr></tbody></table>
      </div><p><br/></p>
    `;
    document.execCommand('insertHTML', false, tableHtml);
    setContent(editorRef.current.innerHTML);
  };

  const handleCodeBlock = () => {
    restoreSelection();
    if (!editorRef.current) return;
    const html = `<pre class='code-block bg-gray-900 text-white p-4 my-4 rounded-xl overflow-x-auto'><code>// Your code here...</code></pre><p><br/></p>`;
    document.execCommand('insertHTML', false, html);
    setContent(editorRef.current.innerHTML);
  };

  const handleAddPage = () => {
    if (!editorRef.current) return;
    const pageBreakHtml = `
      <div class="page-break my-8 py-2 bg-gray-100 border-y border-gray-200 text-center text-xs text-gray-400 uppercase tracking-widest select-none relative group" contenteditable="false" style="margin-left: -3rem; margin-right: -3rem;">
        <span class="bg-gray-100 px-2 text-gray-500 font-bold">Page Break</span>
      </div>
      <p><br/></p>
    `;
    document.execCommand('insertHTML', false, pageBreakHtml);
    setContent(editorRef.current.innerHTML);
  };

  const updateActiveFormats = useCallback(() => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      h2: document.queryCommandValue('formatBlock') === 'H2',
      h3: document.queryCommandValue('formatBlock') === 'H3',
      quote: document.queryCommandValue('formatBlock') === 'BLOCKQUOTE',
      ul: document.queryCommandState('insertUnorderedList'),
      ol: document.queryCommandState('insertOrderedList'),
      pre: document.queryCommandValue('formatBlock') === 'PRE'
    });
  }, []);

  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          execCommand('underline');
          break;
      }
    }
  };

  // Tag Management
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/^,|,$/g, '');
      if (newTag && !tags.includes(newTag) && tags.length < 8) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Stats
  const plainText = stripHtml(content);
  const wordCount = plainText.trim() ? plainText.trim().split(/\s+/).length : 0;
  const charCount = plainText.length;
  const MAX_CHARS = 10000;
  const readingTimeMinutes = Math.ceil(wordCount / 200);
  const readingTimeText = wordCount === 0 ? '0 min read' : (wordCount < 100 ? '< 1 min read' : `${readingTimeMinutes} min read`);

  // Suggested Tags
  const allExistingTags = Array.from(new Set(POSTS.flatMap((p) => p.tags)));
  const suggestedTags = allExistingTags
    .filter((t) => !tags.includes(t))
    .slice(0, 5);

  const backToArticles = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(isAdmin ? '/admin/articles' : '/creator/articles');
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto pb-20">
      {/* Sticky Top Action Bar */}
      <div className="relative md:sticky top-0 md:top-16 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 -mx-4 sm:-mx-8 mb-8 transition-all">
        <div className="flex items-center gap-4">
          <button
            onClick={backToArticles}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
            title="Back to Articles"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-heading font-bold text-gray-900 leading-tight">
              {isEditing ? 'Edit Article' : 'Write New Article'}
            </h1>
            <button
              onClick={() => setIsDistractionFree(!isDistractionFree)}
              className="ml-2 p-1.5 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors inline-flex items-center gap-1"
              title={isDistractionFree ? "Show Sidebar" : "Distraction Free Mode"}
            >
              {isDistractionFree ? <MinimizeIcon className="w-4 h-4" /> : <MaximizeIcon className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-2 mt-0.5">
              {saveStatus === 'saved' && (
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => { saveSelection(); setVideoModalOpen(true); }}
                    className="p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-200"
                    title="Embed Video"
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M10 9l5 3-5 3V9z" fill="currentColor"/></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => { saveSelection(); setImageModalOpen(true); }}
                    className="p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-200"
                    title="Insert Image"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => { saveSelection(); setTemplateModalOpen(true); }}
                    className="p-2 rounded-lg transition-colors text-indigo-600 hover:bg-indigo-100"
                    title="Templates"
                  >
                    <FileTextIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setAiModalOpen(true)}
                    className="p-2 rounded-lg transition-colors text-purple-600 hover:bg-purple-100"
                    title="AI Suggest"
                  >
                    <SparklesIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setHistoryModalOpen(true)}
                    className="p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-200"
                    title="Version History"
                  >
                    <HistoryIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setTocModalOpen(true)}
                    className="p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-200"
                    title="Table of Contents"
                  >
                    <TableOfContentsIcon className="w-4 h-4" />
                  </button>
                  {/* Article Writing Tools */}
                  <button
                    type="button"
                    onClick={() => {
                      if (!editorRef.current) return;
                      const html = `<div class='callout-box bg-blue-50 border-l-4 border-blue-400 p-4 my-4 rounded-xl'><strong>💡 Tip:</strong> <span>Write your tip here...</span></div>`;
                      document.execCommand('insertHTML', false, html);
                      setContent(editorRef.current.innerHTML);
                    }}
                    className="p-2 rounded-lg transition-colors text-blue-600 hover:bg-blue-100"
                    title="Insert Callout/Info Box"
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!editorRef.current) return;
                      const html = `<div class='fact-box bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 rounded-xl'><strong>🤔 Did You Know?</strong> <span>Interesting fact here...</span></div>`;
                      document.execCommand('insertHTML', false, html);
                      setContent(editorRef.current.innerHTML);
                    }}
                    className="p-2 rounded-lg transition-colors text-yellow-600 hover:bg-yellow-100"
                    title="Insert 'Did You Know?' Box"
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 16h.01M12 8a4 4 0 0 1 4 4c0 1.5-1 2.5-2 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      saveSelection();
                      handleCodeBlock();
                    }}
                    className="p-2 rounded-lg transition-colors text-gray-800 hover:bg-gray-200"
                    title="Insert Code Block"
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M8 12l2-2-2-2m8 4l-2-2 2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!editorRef.current) return;
                      const html = `<blockquote class='fancy-quote border-l-4 border-purple-400 pl-4 italic text-lg my-4 text-purple-700'>“Your quote here...”</blockquote>`;
                      document.execCommand('insertHTML', false, html);
                      setContent(editorRef.current.innerHTML);
                    }}
                    className="p-2 rounded-lg transition-colors text-purple-700 hover:bg-purple-100"
                    title="Insert Stylish Quote"
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 17a4 4 0 0 1 4-4V7a4 4 0 0 0-4 4v6zm10 0a4 4 0 0 1 4-4V7a4 4 0 0 0-4 4v6z" stroke="currentColor" strokeWidth="2"/></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGrammarModalOpen(true)}
                    className="p-2 rounded-lg transition-colors text-teal-600 hover:bg-teal-100"
                    title="Grammar & Style Report"
                  >
                    <CheckCheckIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSpellCheckEnabled(!isSpellCheckEnabled)}
                    className={`p-2 rounded-lg transition-colors ${isSpellCheckEnabled ? 'text-blue-600 hover:bg-blue-100' : 'text-gray-400 hover:bg-gray-200'}`}
                    title={isSpellCheckEnabled ? "Disable Spell Check" : "Enable Spell Check"}
                  >
                    <span className="font-bold text-xs">ABC</span>
                    {isSpellCheckEnabled && <div className="h-0.5 bg-blue-600 w-full mt-0.5 rounded-full"></div>}
                  </button>
                  <CheckCircle2Icon className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-xs text-gray-500 font-medium">
                    Saved to drafts
                  </span>
                </div>
              )}
              {saveStatus === 'saving' && (
                <>
                  <Loader2Icon className="w-3.5 h-3.5 text-primary animate-spin" />
                  <span className="text-xs text-gray-500 font-medium">
                    Saving...
                  </span>
                </>
              )}
              {saveStatus === 'unsaved' && (
                <>
                  <CircleDashedIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs text-amber-600 font-medium">
                    Unsaved changes
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition-colors border ${
              isPreviewMode
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {isPreviewMode ? (
              <Edit2Icon className="w-4 h-4" />
            ) : (
              <EyeIcon className="w-4 h-4" />
            )}
            {isPreviewMode ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={handleSaveDraft}
            className="flex-1 sm:flex-none bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold transition-colors hover:bg-gray-50 shadow-sm"
          >
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 sm:flex-none bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <SendIcon className="w-4 h-4" /> {isAdmin ? 'Save Changes' : 'Publish'}
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${isDistractionFree ? 'max-w-4xl mx-auto' : 'lg:grid-cols-3'} gap-8 transition-all duration-300`}>
        {/* Main Content Area */}
        <div className={`${isDistractionFree ? '' : 'lg:col-span-2'} space-y-6`}>
          <AnimatePresence mode="wait">
            {!isPreviewMode ? (
              <motion.div
                key="editor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Title & Excerpt */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-3xl sm:text-4xl font-heading font-bold text-gray-900 outline-none placeholder:text-gray-300 mb-6"
                    placeholder="Your captivating title..."
                  />

                  <div className="relative">
                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value.slice(0, 200))}
                      rows={2}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none text-gray-700"
                      placeholder="Write a brief excerpt (shown in article cards and search results)..."
                    />
                    <div
                      className={`absolute bottom-3 right-4 text-xs font-medium ${
                        excerpt.length >= 190 ? 'text-amber-500' : 'text-gray-400'
                      }`}
                    >
                      {excerpt.length}/200
                    </div>
                  </div>
                </div>

                {/* Rich Text Editor */}
                <div className="bg-gray-100 rounded-2xl shadow-inner border border-gray-200 overflow-hidden flex flex-col">
                  {/* Toolbar */}
                  <div className="bg-white border-b border-gray-200 p-2 flex gap-1 sticky top-16 md:top-[136px] z-10 shadow-sm overflow-x-auto no-scrollbar items-center">
                    <button
                      type="button"
                      onClick={() => execCommand('bold')}
                      className={`p-2 rounded-lg transition-colors ${
                        activeFormats.bold
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Bold (Ctrl+B)"
                    >
                      <BoldIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCommand('italic')}
                      className={`p-2 rounded-lg transition-colors ${
                        activeFormats.italic
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Italic (Ctrl+I)"
                    >
                      <ItalicIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCommand('underline')}
                      className={`p-2 rounded-lg transition-colors ${
                        activeFormats.underline
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Underline (Ctrl+U)"
                    >
                      <UnderlineIcon className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

                    <button
                      type="button"
                      onClick={() => handleFormatBlock('H2')}
                      className={`p-2 rounded-lg transition-colors ${
                        activeFormats.h2
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Heading 2"
                    >
                      <Heading2Icon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFormatBlock('H3')}
                      className={`p-2 rounded-lg transition-colors ${
                        activeFormats.h3
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Heading 3"
                    >
                      <Heading3Icon className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

                    <button
                      type="button"
                      onClick={() => handleFormatBlock('BLOCKQUOTE')}
                      className={`p-2 rounded-lg transition-colors ${
                        activeFormats.quote
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Quote"
                    >
                      <QuoteIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCommand('insertUnorderedList')}
                      className={`p-2 rounded-lg transition-colors ${
                        activeFormats.ul
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Bullet List"
                    >
                      <ListIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCommand('insertOrderedList')}
                      className={`p-2 rounded-lg transition-colors ${
                        activeFormats.ol
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Numbered List"
                    >
                      <ListOrderedIcon className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

                    <button
                      type="button"
                      onClick={handleLinkClick}
                      onMouseDown={(e) => e.preventDefault()}
                      className="p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-200"
                      title="Insert Link"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => { saveSelection(); setImageModalOpen(true); }}
                      className="p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-200"
                      title="Insert Image"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleInsertTable}
                      className="p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-200"
                      title="Insert Table"
                    >
                      <TableIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => { saveSelection(); setWatermarkModalOpen(true); }}
                      className="p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-200"
                      title="Add Watermark"
                    >
                      <StampIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleAddPage}
                      className="p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-200"
                      title="Add Page Break"
                    >
                      <FilePlusIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleCodeBlock}
                      className={`hidden sm:block p-2 rounded-lg transition-colors ${
                        activeFormats.pre
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Code Block"
                    >
                      <CodeIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCommand('insertHorizontalRule')}
                      className="p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-200"
                      title="Divider"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>

                    <div className="flex-1"></div>

                    <button
                      type="button"
                      onClick={() => execCommand('removeFormat')}
                      className="p-2 rounded-lg transition-colors text-gray-500 hover:text-red-600 hover:bg-red-50"
                      title="Clear Formatting"
                    >
                      <EraserIcon className="w-4 h-4" />
                    </button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

                  <button
                    type="button"
                    onClick={() => setFindReplaceOpen(!findReplaceOpen)}
                    className={`p-2 rounded-lg transition-colors ${findReplaceOpen ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
                    title="Find & Replace"
                  >
                    <SearchIcon className="w-4 h-4" />
                  </button>
                  </div>

                  {/* Stats Bar */}
                  <div className="bg-white border-b border-gray-100 px-6 py-2 flex items-center gap-6 text-xs font-medium text-gray-400">
                    <div className="relative">
                      <button 
                        onClick={() => setIsEditingGoal(!isEditingGoal)}
                        className={`hover:text-gray-600 transition-colors flex items-center gap-2 ${wordCountGoal > 0 && wordCount >= wordCountGoal ? 'text-green-600 font-bold' : ''}`}
                        title="Set word count goal"
                      >
                        <span>{wordCount} {wordCountGoal > 0 ? `/ ${wordCountGoal}` : ''} words</span>
                        {wordCountGoal > 0 && (
                          <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${wordCount >= wordCountGoal ? 'bg-green-500' : 'bg-primary'} transition-all duration-300`}
                              style={{ width: `${Math.min(100, (wordCount / wordCountGoal) * 100)}%` }}
                            />
                          </div>
                        )}
                      </button>
                      
                      {isEditingGoal && (
                        <div className="absolute top-full left-0 mt-2 p-3 bg-white rounded-xl shadow-xl border border-gray-100 z-50 w-48">
                          <label className="block text-xs font-bold text-gray-700 mb-1">Target Word Count</label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={wordCountGoal || ''}
                              onChange={(e) => setWordCountGoal(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900"
                              placeholder="e.g. 1000"
                              autoFocus
                              onKeyDown={(e) => e.key === 'Enter' && setIsEditingGoal(false)}
                            />
                            <button 
                              onClick={() => setIsEditingGoal(false)}
                              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-600 transition-colors"
                            >
                              Set
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className={charCount > MAX_CHARS * 0.9 ? 'text-red-500 font-bold transition-colors' : 'transition-colors'}>
                      {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
                    </span>
                    <span>{readingTimeText}</span>
                  </div>

                  {/* ContentEditable Area */}
                  <div className="flex-1 p-4 md:p-8 cursor-text bg-gray-100/50" onClick={() => editorRef.current?.focus()}>
                    <Ruler padding={pagePadding} onPaddingChange={setPagePadding} />
                    <div className="max-w-[816px] mx-auto bg-white shadow-lg min-h-[500px] sm:min-h-[1056px] transition-all duration-300 relative overflow-hidden ring-1 ring-gray-200">
                      <div
                        ref={editorRef}
                        contentEditable
                        suppressContentEditableWarning
                        spellCheck={isSpellCheckEnabled}
                        onInput={handleContentChange}
                        onKeyUp={(e) => {
                          handleContentChange();
                          updateActiveFormats();
                          handleKeyDown(e);
                        }}
                        onMouseUp={updateActiveFormats}
                        className="w-full min-h-[500px] sm:min-h-[1056px] outline-none prose prose-lg max-w-none focus:outline-none relative z-10"
                        style={{ paddingLeft: `${pagePadding.left}px`, paddingRight: `${pagePadding.right}px`, paddingTop: '48px', paddingBottom: '48px' }}
                        data-placeholder="Start writing your story here..."
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center w-full"
              >
                {/* Device Toggle */}
                <div className="bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm mb-6 flex gap-2">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${previewDevice === 'desktop' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <MonitorIcon className="w-4 h-4" /> Desktop
                  </button>
                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${previewDevice === 'tablet' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <TabletIcon className="w-4 h-4" /> Tablet
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${previewDevice === 'mobile' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <SmartphoneIcon className="w-4 h-4" /> Mobile
                  </button>
                </div>

                <div className={`bg-white transition-all duration-500 ease-in-out origin-top ${
                  previewDevice === 'mobile' 
                    ? 'w-[375px] min-h-[667px] rounded-[3rem] border-[8px] border-gray-900 shadow-2xl p-6 overflow-hidden relative' 
                    : previewDevice === 'tablet'
                    ? 'w-[768px] min-h-[1024px] rounded-[2rem] border-[8px] border-gray-800 shadow-2xl p-8 overflow-hidden relative'
                    : 'w-full min-h-[800px] rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12'
                }`}>
                  {previewDevice === 'mobile' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-10" />}
                  {previewDevice === 'tablet' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-800 rounded-b-lg z-10" />}

                  <div className={previewDevice !== 'desktop' ? 'h-full overflow-y-auto custom-scrollbar pt-4' : 'max-w-3xl mx-auto'}>
                  {featuredImage && (
                    <img
                      src={featuredImage}
                      alt={imageAlt || title}
                      className={`w-full object-cover rounded-xl ${previewDevice === 'mobile' ? 'aspect-[4/3] mb-6' : previewDevice === 'tablet' ? 'aspect-video mb-6' : 'aspect-video mb-8'}`}
                    />
                  )}

                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-sm font-bold text-primary uppercase tracking-wider">
                      {CATEGORIES.find((c) => c.id === category)?.name ||
                        'Category'}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {readingTimeText}
                    </span>
                  </div>

                  <h1 className={`${previewDevice === 'mobile' ? 'text-2xl mb-4' : previewDevice === 'tablet' ? 'text-3xl mb-5' : 'text-4xl sm:text-5xl mb-6'} font-heading font-bold text-gray-900 leading-tight`}>
                    {title || 'Untitled Article'}
                  </h1>

                  {excerpt && (
                    <p className={`${previewDevice !== 'desktop' ? 'text-lg mb-6' : 'text-xl mb-8'} text-gray-600 leading-relaxed italic border-l-4 border-gray-200 pl-4`}>
                      {excerpt}
                    </p>
                  )}

                  <div
                    className={`prose ${previewDevice === 'mobile' ? 'prose-sm' : previewDevice === 'tablet' ? 'prose-base' : 'prose-lg'} max-w-none prose-headings:font-heading prose-a:text-primary hover:prose-a:text-primary-hover`}
                    dangerouslySetInnerHTML={{
                      __html:
                        content ||
                        '<p class="text-gray-400">No content yet...</p>'
                    }}
                  />

                  {tags.length > 0 && (
                    <div className={`pt-8 border-t border-gray-100 flex flex-wrap gap-2 ${previewDevice === 'mobile' ? 'mt-8' : 'mt-12'}`}>
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className={`space-y-6 ${isDistractionFree ? 'hidden' : ''}`}>
          {/* Publishing Details */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <GlobeIcon className="w-5 h-5 text-gray-400" /> Publishing Details
            </h3>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Status
              </label>
              <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
                <button
                  type="button"
                  onClick={() => setStatus('draft')}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    status === 'draft'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Draft
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('review')}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    status === 'review'
                      ? 'bg-white text-amber-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Review
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('published')}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    status === 'published'
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Published
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Visibility
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="visibility"
                    checked={visibility === 'public'}
                    onChange={() => setVisibility('public')}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Public</p>
                    <p className="text-xs text-gray-500">Visible to everyone</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="visibility"
                    checked={visibility === 'unlisted'}
                    onChange={() => setVisibility('unlisted')}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                      Unlisted <LockIcon className="w-3 h-3 text-gray-400" />
                    </p>
                    <p className="text-xs text-gray-500">
                      Only people with link can view
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Schedule (Optional)
              </label>
              <div className="relative">
                <CalendarIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="datetime-local"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50 text-sm"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                  Feature this article{' '}
                  <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-900">
                  Mark as Trending
                </span>
              </label>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900">Tags</h3>

            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-50 text-primary rounded-lg text-sm font-medium border border-teal-100"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:bg-teal-100 p-0.5 rounded-full transition-colors"
                  >
                    <XIcon className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              disabled={tags.length >= 8}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50 text-sm disabled:opacity-50 disabled:bg-gray-100"
              placeholder={
                tags.length >= 8
                  ? 'Maximum 8 tags reached'
                  : 'Add tag (press Enter)...'
              }
            />

            {suggestedTags.length > 0 && tags.length < 8 && (
              <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">
                  Suggested:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setTags([...tags, tag])}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Featured Image */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900">Featured Image</h3>

            {featuredImage ? (
              <div className="relative group rounded-xl overflow-hidden aspect-video bg-gray-100 border border-gray-200">
                <img
                  src={featuredImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setFeaturedImage('')}
                    className="bg-white text-red-600 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm hover:bg-red-50 transition-colors"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl aspect-video bg-gray-50 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-teal-50/30 transition-colors flex flex-col items-center justify-center text-gray-400 cursor-pointer" onClick={() => setImageModalOpen(true)}>
                <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                <span className="text-sm font-medium">
                  Drag & drop or click
                </span>
                <span className="text-xs mt-1">1200 x 600px recommended</span>
              </div>
            )}

            <div className="relative">
              <LinkIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50 text-sm"
                placeholder="Or paste image URL..."
              />
            </div>

            {featuredImage && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Alt Text (Accessibility)
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50 text-sm"
                  placeholder="Describe the image..."
                />
              </div>
            )}
          </div>

          {/* SEO Preview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              type="button"
              onClick={() => setSeoPreviewOpen(!seoPreviewOpen)}
              className="w-full p-4 flex items-center justify-between font-bold text-gray-900 bg-gray-50/50 hover:bg-gray-50 transition-colors"
            >
              <span>SEO Preview</span>
              {seoPreviewOpen ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </button>

            <AnimatePresence>
              {seoPreviewOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-100"
                >
                  <div className="p-5 space-y-4">
                    {/* Google Search */}
                    <div className="text-sm text-gray-500 truncate">
                      renewberry.io › post › {slugify(title) || 'your-article-slug'}
                    </div>
                    <div className="text-lg font-medium text-blue-600 hover:underline cursor-pointer line-clamp-1">
                      {title || 'Your Article Title Will Appear Here'}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {excerpt ||
                        'This is how your article excerpt will appear in search engine results. Make it compelling and descriptive to encourage clicks.'}
                    </div>

                    {/* Social Cards */}
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Social Cards</p>
                      {/* Twitter Card */}
                      <div className="bg-gray-900 text-white p-4 rounded-lg mb-3">
                        <div className="text-sm font-bold line-clamp-1 mb-1">{title}</div>
                        <div className="text-sm line-clamp-2">{excerpt}</div>
                      </div>
                      {/* Facebook Card */}
                      <div className="border p-4 rounded-lg">
                        <img src={featuredImage || 'https://picsum.photos/seed/article/1200/630'} alt="Preview" className="w-full h-32 object-cover rounded mb-3" />
                        <div className="text-sm font-bold line-clamp-1 mb-1">{title}</div>
                        <div className="text-sm line-clamp-2 text-gray-600">{excerpt}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ImageUploadModal open={imageModalOpen} onClose={() => setImageModalOpen(false)} onSelect={handleInsertImage} />
      <TemplateModal open={templateModalOpen} onClose={() => setTemplateModalOpen(false)} onSelect={handleInsertTemplate} />
      <AISuggestionModal open={aiModalOpen} title={title} onClose={() => setAiModalOpen(false)} onSuggest={(suggestion) => {
        setTitle(suggestion.title);
        setExcerpt(suggestion.excerpt);
      }} />
      <LinkModal open={linkModalOpen} onClose={() => setLinkModalOpen(false)} onSave={handleLinkSave} />
      <VideoEmbedModal open={videoModalOpen} onClose={() => setVideoModalOpen(false)} onSelect={handleEmbedVideo} />
      <GrammarCheckModal open={grammarModalOpen} content={content} onClose={() => setGrammarModalOpen(false)} />
      <HistoryModal open={historyModalOpen} history={history} onClose={() => setHistoryModalOpen(false)} onRestore={handleRestoreVersion} />
      <TableOfContentsModal open={tocModalOpen} onClose={() => setTocModalOpen(false)} content={content} onJump={handleJumpToHeading} />
      <FindReplaceDialog open={findReplaceOpen} onClose={() => setFindReplaceOpen(false)} editorRef={editorRef} onContentChange={handleContentChange} />
      <WatermarkModal open={watermarkModalOpen} onClose={() => setWatermarkModalOpen(false)} onInsert={handleInsertWatermark} />
    </div>
  );
}
