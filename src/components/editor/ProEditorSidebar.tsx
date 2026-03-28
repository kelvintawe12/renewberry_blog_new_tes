import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Layers, 
  History, 
  ShieldCheck,
  Palette,
  Maximize2,
  Trash2,
  Clock,
  User,
  Info,
  Search,
  Video,
  ChevronRight,
  ChevronLeft,
  Layout,
  Scaling,
  Image as ImageIcon,
  RotateCcw,
  MousePointer2,
  Target,
  Grid
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { REAL_VIDEOS } from '../../data/videoData';
import { GALLERY_IMAGES } from '../../data/mockData';
import { Editor } from '@tiptap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { WatermarkOrientation } from './Editor';

export type PageSize = 'A4' | 'A3' | 'Letter';
export type Orientation = 'portrait' | 'landscape';

interface ProSidebarProps {
  editor: Editor | null;
  watermark: string;
  setWatermark: (val: string) => void;
  watermarkOrientation: WatermarkOrientation;
  setWatermarkOrientation: (val: WatermarkOrientation) => void;
  brandingEnabled: boolean;
  setBrandingEnabled: (val: boolean) => void;
  documentTitle: string;
  setDocumentTitle: (val: string) => void;
  pageSize: PageSize;
  setPageSize: (val: PageSize) => void;
  orientation: Orientation;
  setOrientation: (val: Orientation) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  wordGoal: number;
  setWordGoal: (val: number) => void;
}

const SidebarSection = ({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon?: any }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-4 px-2">
      {Icon && <Icon size={14} className="text-gray-400" />}
      <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">{title}</h3>
    </div>
    <div className="space-y-1">{children}</div>
  </div>
);

export const ProEditorSidebar = ({
  editor,
  watermark,
  setWatermark,
  watermarkOrientation,
  setWatermarkOrientation,
  brandingEnabled,
  setBrandingEnabled,
  documentTitle,
  setDocumentTitle,
  pageSize,
  setPageSize,
  orientation,
  setOrientation,
  isCollapsed,
  setIsCollapsed,
  wordGoal,
  setWordGoal
}: ProSidebarProps) => {
  const [activeTab, setActiveTab] = useState<'tools' | 'videos' | 'gallery' | 'outline' | 'layout'>('tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [headings, setHeadings] = useState<{ text: string; level: number; id: string }[]>([]);

  useEffect(() => {
    if (!editor) return;
    const updateHeadings = () => {
      const doc = editor.getJSON();
      const extractedHeadings: any[] = [];
      doc.content?.forEach((node: any) => {
        if (node.type === 'heading') {
          extractedHeadings.push({
            text: node.content?.[0]?.text || 'Untitled Heading',
            level: node.attrs.level,
            id: `heading-${Math.random()}`
          });
        }
      });
      setHeadings(extractedHeadings);
    };
    editor.on('update', updateHeadings);
    updateHeadings();
    return () => { editor.off('update', updateHeadings); };
  }, [editor]);

  const insertImage = (img: any) => {
    if (editor) {
      editor.chain().focus().setImage({ src: img.imageUrl, alt: img.title }).run();
    }
  };

  const insertVideo = (video: any) => {
    if (editor) {
      // @ts-ignore
      editor.commands.setRenewVideo({ src: video.video_url, title: video.title, thumbnail: video.thumbnail_url });
    }
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-white border-r h-full flex flex-col items-center py-6 gap-6 z-40 transition-all duration-300 shadow-xl">
        <button onClick={() => setIsCollapsed(false)} className="p-2 hover:bg-gray-100 rounded-xl text-primary transition-transform active:scale-90"><ChevronRight size={20} /></button>
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg"><img src="/image.png" alt="R" className="w-5 h-5 brightness-0 invert" /></div>
        <div className="flex flex-col gap-4 mt-10">
          <button onClick={() => {setIsCollapsed(false); setActiveTab('tools');}} className="p-3 text-gray-400 hover:text-primary"><FileText size={20} /></button>
          <button onClick={() => {setIsCollapsed(false); setActiveTab('layout');}} className="p-3 text-gray-400 hover:text-primary"><Layout size={20} /></button>
          <button onClick={() => {setIsCollapsed(false); setActiveTab('gallery');}} className="p-3 text-gray-400 hover:text-primary"><ImageIcon size={20} /></button>
          <button onClick={() => {setIsCollapsed(false); setActiveTab('videos');}} className="p-3 text-gray-400 hover:text-primary"><Video size={20} /></button>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ width: 0 }} animate={{ width: 320 }} className="w-80 bg-white border-r h-full flex flex-col overflow-hidden shadow-2xl z-40 relative">
      <button onClick={() => setIsCollapsed(true)} className="absolute top-6 -right-3 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-primary shadow-sm z-50 transition-all hover:scale-110"><ChevronLeft size={14} /></button>

      <div className="p-6 border-b">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
            <img src="/image.png" alt="RenewBerry" className="w-6 h-6 object-contain brightness-0 invert" />
          </div>
          <div>
            <span className="block font-heading font-black text-xs leading-none uppercase tracking-tighter text-gray-900">RenewBerry</span>
            <span className="block text-[10px] text-primary font-bold uppercase tracking-wider mt-0.5">Studio Pro</span>
          </div>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto no-scrollbar">
          {(['tools', 'layout', 'gallery', 'videos', 'outline'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={cn("flex-1 py-2 px-2 text-[8px] font-black uppercase tracking-widest rounded-lg transition-all", activeTab === tab ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600")}>{tab}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 no-scrollbar bg-white">
        <AnimatePresence mode="wait">
          {activeTab === 'tools' && (
            <motion.div key="tools" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
              <SidebarSection title="Document Info" icon={FileText}>
                <div className="px-2 mb-4">
                  <label className="text-[9px] font-black text-gray-400 uppercase block mb-1.5 tracking-tighter">Document Name</label>
                  <input type="text" value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-2.5 text-xs font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                </div>
              </SidebarSection>

              <SidebarSection title="Writing Goal" icon={Target}>
                <div className="px-2 mb-4">
                  <label className="text-[9px] font-black text-gray-400 uppercase block mb-1.5 tracking-tighter">Word Count Goal</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min="100" max="5000" step="100" value={wordGoal} onChange={(e) => setWordGoal(parseInt(e.target.value))} className="flex-1 accent-primary" />
                    <span className="text-[10px] font-black text-primary w-12 text-right">{wordGoal}</span>
                  </div>
                </div>
              </SidebarSection>
              
              <SidebarSection title="Watermark Control" icon={ShieldCheck}>
                <div className="px-2 mb-4">
                  <label className="text-[9px] font-black text-gray-400 uppercase block mb-1.5 tracking-tighter">Watermark Text</label>
                  <input type="text" value={watermark} onChange={(e) => setWatermark(e.target.value)} className="w-full bg-gray-50 border-transparent rounded-xl px-4 py-2.5 text-xs font-mono font-bold focus:ring-4 focus:ring-primary/10 transition-all uppercase mb-4" />
                  
                  <label className="text-[9px] font-black text-gray-400 uppercase block mb-2 tracking-tighter">Orientation</label>
                  <div className="grid grid-cols-3 gap-1">
                    {(['diagonal', 'horizontal', 'vertical'] as WatermarkOrientation[]).map(o => (
                      <button key={o} onClick={() => setWatermarkOrientation(o)} className={cn("py-2 rounded-lg text-[8px] font-black uppercase border-2 transition-all", watermarkOrientation === o ? "border-primary bg-primary/5 text-primary" : "border-gray-50 text-gray-400 hover:bg-gray-50")}>{o}</button>
                    ))}
                  </div>
                </div>
              </SidebarSection>
            </motion.div>
          )}

          {activeTab === 'layout' && (
            <motion.div key="layout" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
              <SidebarSection title="Page Format" icon={Scaling}>
                <div className="grid grid-cols-1 gap-2 px-2">
                  {(['A4', 'A3', 'Letter'] as PageSize[]).map(size => (
                    <button key={size} onClick={() => setPageSize(size)} className={cn("w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all", pageSize === size ? "border-primary bg-primary/5 text-primary" : "border-gray-100 hover:border-gray-200")}>
                      <span className="text-xs font-black uppercase tracking-widest">{size}</span>
                      <span className="text-[8px] font-bold text-gray-400">{size === 'A4' ? '210 × 297 mm' : size === 'A3' ? '297 × 420 mm' : '8.5 × 11.0 in'}</span>
                    </button>
                  ))}
                </div>
              </SidebarSection>
              <SidebarSection title="Orientation" icon={RotateCcw}>
                <div className="grid grid-cols-2 gap-2 px-2">
                  {(['portrait', 'landscape'] as Orientation[]).map(o => (
                    <button key={o} onClick={() => setOrientation(o)} className={cn("flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all capitalize text-[10px] font-bold", orientation === o ? "border-primary bg-primary/5 text-primary" : "border-gray-100 text-gray-400")}>
                      <div className={cn("border-2 border-current rounded-sm", o === 'portrait' ? "w-4 h-6" : "w-6 h-4")} />{o}
                    </button>
                  ))}
                </div>
              </SidebarSection>
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div key="gallery" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input type="text" placeholder="Search gallery..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-gray-50 border-none rounded-xl pl-9 pr-4 py-2.5 text-[10px] font-bold focus:ring-4 focus:ring-primary/10 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {GALLERY_IMAGES.filter(img => img.title.toLowerCase().includes(searchQuery.toLowerCase())).map(img => (
                  <div key={img.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all" onClick={() => insertImage(img)}>
                    <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><div className="bg-white p-1.5 rounded-lg shadow-xl"><MousePointer2 size={12} className="text-primary" /></div></div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'videos' && (
            <motion.div key="videos" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
              {REAL_VIDEOS.map(video => (
                <div key={video.id} className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-primary/20 transition-all cursor-pointer" onClick={() => insertVideo(video)}>
                  <div className="relative aspect-video bg-gray-900">
                    <img src={video.thumbnail_url || '/image.png'} alt={video.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2 right-2 bg-primary/90 px-1.5 py-0.5 rounded text-[6px] font-black text-white uppercase">{video.category}</div>
                  </div>
                  <div className="p-2.5"><h4 className="text-[9px] font-black text-gray-900 uppercase line-clamp-1 group-hover:text-primary transition-colors">{video.title}</h4></div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'outline' && (
            <motion.div key="outline" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
              <SidebarSection title="Article Structure" icon={Layers}>
                {headings.length > 0 ? (
                  <div className="space-y-1">
                    {headings.map((h, i) => (
                      <div key={i} className={cn("text-[10px] font-bold py-1.5 px-3 rounded-lg hover:bg-gray-50 cursor-pointer truncate", h.level === 1 ? "text-gray-900 uppercase tracking-tight" : "text-gray-400 pl-6")}>{h.text}</div>
                    ))}
                  </div>
                ) : <p className="text-[10px] font-bold text-gray-300 text-center py-10 uppercase tracking-widest">No Headings</p>}
              </SidebarSection>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 border-t bg-gray-50/50">
        <button onClick={() => {localStorage.removeItem('rb_editor_draft'); window.location.reload();}} className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-colors"><Trash2 size={16} /> Reset Studio</button>
      </div>
    </motion.div>
  );
};
