import React, { useState, useEffect } from 'react';
import { Editor, WatermarkOrientation } from '../components/editor/Editor';
import { ProEditorSidebar, PageSize, Orientation } from '../components/editor/ProEditorSidebar';
import { FileText, Save, ChevronLeft, Download, Plus, LayoutGrid, Globe, Shield, CheckCircle2, Loader2, Maximize2, Minimize2, AlertTriangle, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const BANNED_WORDS = ['spam', 'junk', 'fake news', 'unverified'];

export const EditorPlayground = () => {
  // Load from LocalStorage or Defaults
  const savedData = JSON.parse(localStorage.getItem('rb_editor_draft') || '{}');
  
  const [content, setContent] = useState(savedData.content || '<h1>RenewBerry Studio Pro</h1><p>Start your professional journey here...</p>');
  const [watermark, setWatermark] = useState(savedData.watermark || 'RENEWBERRY');
  const [watermarkOrientation, setWatermarkOrientation] = useState<WatermarkOrientation>(savedData.watermarkOrientation || 'diagonal');
  const [brandingEnabled, setBrandingEnabled] = useState(savedData.brandingEnabled !== undefined ? savedData.brandingEnabled : true);
  const [documentTitle, setDocumentTitle] = useState(savedData.title || 'RenewBerry Official Article');
  
  const [pageSize, setPageSize] = useState<PageSize>(savedData.pageSize || 'A4');
  const [orientation, setOrientation] = useState<Orientation>(savedData.orientation || 'portrait');
  const [wordGoal, setWordGoal] = useState(savedData.wordGoal || 500);
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'publishing'>('saved');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastToastMessage] = useState('');
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [safetyReport, setSafetyCheckSafetyReport] = useState<{ passed: boolean; issues: string[] }>({ passed: true, issues: [] });

  const navigate = useNavigate();
  const [editorInstance, setEditorInstance] = useState<any>(null);

  // Auto-save logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('saving');
      localStorage.setItem('rb_editor_draft', JSON.stringify({
        content, title: documentTitle, watermark, watermarkOrientation, brandingEnabled, pageSize, orientation, wordGoal
      }));
      setTimeout(() => setStatus('saved'), 800);
    }, 1000);
    return () => clearTimeout(timer);
  }, [content, documentTitle, watermark, watermarkOrientation, brandingEnabled, pageSize, orientation, wordGoal]);

  const handleExport = (type: 'pdf' | 'html') => {
    setToastToastMessage(`Generating ${type.toUpperCase()}...`);
    setShowToast(true);
    setTimeout(() => {
      setToastToastMessage(`${type.toUpperCase()} Export Ready!`);
      setTimeout(() => setShowToast(false), 2000);
    }, 1500);
  };

  const runSafetyCheck = () => {
    setStatus('saving');
    setShowSafetyModal(true);
    const issues: string[] = [];
    
    // Check 1: Length
    const wordCount = editorInstance?.storage.characterCount.words() || 0;
    if (wordCount < 100) issues.push("Article is too short (Minimum 100 words recommended).");
    
    // Check 2: Banned Words
    const text = content.toLowerCase();
    BANNED_WORDS.forEach(word => {
      if (text.includes(word)) issues.push(`Contains unprofessional language: "${word}"`);
    });

    // Check 3: Branding
    if (!brandingEnabled) issues.push("RenewBerry Branding is disabled.");

    setTimeout(() => {
      setSafetyCheckSafetyReport({ passed: issues.length === 0, issues });
      setStatus('saved');
    }, 1500);
  };

  const handlePublish = () => {
    setStatus('publishing');
    setToastToastMessage('Syncing with RenewBerry Feed...');
    setShowToast(true);
    setTimeout(() => {
      setStatus('saved');
      setToastToastMessage('Published Successfully!');
      setTimeout(() => setShowToast(false), 3000);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-[#F9FAFB] flex flex-col overflow-hidden z-[9999]">
      {/* Header */}
      {!isFocusMode && (
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between shrink-0 z-50 shadow-sm">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
              <ChevronLeft size={20} />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:block text-primary">Exit Studio</span>
            </button>
            <div className="w-px h-8 bg-gray-200" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-11 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20"><img src="/image.png" alt="R" className="w-6 h-6 brightness-0 invert" /></div>
              <div>
                <input type="text" value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} className="text-sm font-black text-gray-900 uppercase tracking-tight bg-transparent border-none p-0 focus:ring-0 w-auto min-w-[200px]" />
                <div className="flex items-center gap-2 mt-0.5">
                  {status === 'saving' ? (
                    <span className="flex items-center gap-1.5"><Loader2 size={10} className="animate-spin text-primary" /><span className="text-[9px] text-primary uppercase font-black tracking-widest">Saving Draft...</span></span>
                  ) : (
                    <span className="flex items-center gap-1.5"><CheckCircle2 size={10} className="text-green-500" /><span className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Saved to Local</span></span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsFocusMode(true)} className="p-2 text-gray-400 hover:text-primary transition-colors flex items-center gap-2 mr-2 group">
              <Maximize2 size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Focus Mode</span>
            </button>
            
            <button onClick={runSafetyCheck} className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase text-gray-500 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all">
              <Shield size={14} className="text-primary" /> Brand Check
            </button>

            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase text-gray-500 hover:bg-gray-100 rounded-xl border border-transparent hover:border-gray-200"><Download size={14} /> Export</button>
              <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-100 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <button onClick={() => handleExport('pdf')} className="w-full text-left px-4 py-2 text-[10px] font-black uppercase text-gray-600 hover:bg-gray-50">PDF Document</button>
                <button onClick={() => handleExport('html')} className="w-full text-left px-4 py-2 text-[10px] font-black uppercase text-gray-600 hover:bg-gray-50">HTML Web Page</button>
              </div>
            </div>
            
            <button onClick={handlePublish} disabled={status === 'publishing'} className="bg-primary text-white px-6 py-2.5 rounded-xl text-[10px] font-black shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all flex items-center gap-2 active:scale-95">
              {status === 'publishing' ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} PUBLISH TO FEED
            </button>
          </div>
        </header>
      )}

      <div className="flex flex-1 overflow-hidden relative">
        {!isFocusMode && (
          <ProEditorSidebar 
            editor={editorInstance}
            watermark={watermark} setWatermark={setWatermark}
            watermarkOrientation={watermarkOrientation} setWatermarkOrientation={setWatermarkOrientation}
            brandingEnabled={brandingEnabled} setBrandingEnabled={setBrandingEnabled}
            documentTitle={documentTitle} setDocumentTitle={setDocumentTitle}
            pageSize={pageSize} setPageSize={setPageSize}
            orientation={orientation} setOrientation={setOrientation}
            isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed}
          />
        )}

        <div className="flex-1 relative overflow-hidden flex flex-col bg-[#F3F4F6]">
          <Editor 
            content={content} onChange={setContent}
            watermark={watermark} watermarkOrientation={watermarkOrientation}
            brandingEnabled={brandingEnabled}
            pageSize={pageSize} orientation={orientation}
            onEditorReady={setEditorInstance}
            isFocusMode={isFocusMode}
          />
          
          {isFocusMode && (
            <button onClick={() => setIsFocusMode(false)} className="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-2.5 rounded-full flex items-center gap-2 shadow-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 z-[100]">
              <Minimize2 size={16} /><span className="text-[10px] font-black uppercase tracking-widest">Exit Focus Mode</span>
            </button>
          )}

          {!isFocusMode && (
            <div className="absolute bottom-10 right-10 flex flex-col gap-3 z-50">
              <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 w-48 mb-2 animate-in slide-in-from-bottom-4">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-2">
                  <span>Goal Progress</span>
                  <span className="text-primary">{Math.min(100, Math.round(((editorInstance?.storage.characterCount.words() || 0) / wordGoal) * 100))}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, ((editorInstance?.storage.characterCount.words() || 0) / wordGoal) * 100)}%` }}
                  />
                </div>
                <div className="mt-2 text-[8px] font-bold text-gray-400 uppercase">{editorInstance?.storage.characterCount.words() || 0} / {wordGoal} Words</div>
              </div>
              <button className="w-14 h-14 bg-primary text-white shadow-2xl shadow-primary/40 rounded-full flex items-center justify-center hover:scale-110 transition-all active:scale-95 group">
                <Plus size={28} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Safety Modal */}
      <AnimatePresence>
        {showSafetyModal && (
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSafetyModal(false)} className="absolute inset-0 bg-secondary/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${safetyReport.passed ? 'bg-green-500 shadow-green-200' : 'bg-orange-500 shadow-orange-200'}`}>
                    {safetyReport.passed ? <CheckCircle2 className="text-white" size={24} /> : <AlertTriangle className="text-white" size={24} />}
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Safety Analysis</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">RenewBerry Compliance Report</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {safetyReport.issues.length > 0 ? safetyReport.issues.map((issue, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                      <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />
                      <p className="text-[10px] font-bold text-red-700 leading-normal">{issue}</p>
                    </div>
                  )) : (
                    <div className="p-10 text-center bg-green-50 rounded-3xl border border-green-100">
                      <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                      <p className="text-sm font-black text-green-800 uppercase tracking-tighter">Your article is safe to publish!</p>
                      <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-1">Meets all RenewBerry standards.</p>
                    </div>
                  )}
                </div>

                <button onClick={() => setShowSafetyModal(false)} className="w-full py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all">Close Report</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toasts */}
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[10000] bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-xl">
            {toastMessage.includes('Gen') || toastMessage.includes('Sync') ? <Loader2 size={18} className="text-primary animate-spin" /> : <CheckCircle2 size={18} className="text-green-400" />}
            <span className="text-[10px] font-black uppercase tracking-widest">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
