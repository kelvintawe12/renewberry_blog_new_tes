import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  createElement } from
'react';
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
  StarIcon } from
'lucide-react';
import { CATEGORIES, POSTS } from '../../data/mockData';
// Helper to strip HTML for word count
const stripHtml = (html: string) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};
// Helper to slugify title
const slugify = (text: string) => {
  return text.
  toString().
  toLowerCase().
  replace(/\s+/g, '-').
  replace(/[^\w\-]+/g, '').
  replace(/\-\-+/g, '-').
  replace(/^-+/, '').
  replace(/-+$/, '');
};
export function CreatorArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const existingPost = isEditing ? POSTS.find((p) => p.id === id) : null;
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
  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);
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
        setSaveStatus('saving');
        // Simulate API call
        setTimeout(() => {
          lastSavedData.current = {
            title,
            excerpt,
            content,
            tags,
            featuredImage
          };
          setSaveStatus('saved');
        }, 1000);
      }, 30000); // Auto-save after 30s of inactivity
      return () => clearTimeout(timer);
    }
  }, [title, excerpt, content, tags, featuredImage, saveStatus]);
  // Manual save
  const handleSaveDraft = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      lastSavedData.current = {
        title,
        excerpt,
        content,
        tags,
        featuredImage
      };
      setSaveStatus('saved');
    }, 800);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Article submitted for review!');
    navigate('/creator/articles');
  };
  // Editor Commands
  const execCommand = (
  command: string,
  value: string | undefined = undefined) =>
  {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateActiveFormats();
    handleContentChange();
  };
  const handleFormatBlock = (tag: string) => {
    execCommand('formatBlock', tag);
  };
  const handleLink = () => {
    const url = prompt('Enter link URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };
  const handleCodeBlock = () => {
    handleFormatBlock('PRE');
  };
  const updateActiveFormats = useCallback(() => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      h2: document.queryCommandValue('formatBlock') === 'h2',
      h3: document.queryCommandValue('formatBlock') === 'h3',
      quote: document.queryCommandValue('formatBlock') === 'blockquote',
      ul: document.queryCommandState('insertUnorderedList'),
      ol: document.queryCommandState('insertOrderedList'),
      pre: document.queryCommandValue('formatBlock') === 'pre'
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
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  // Suggested Tags
  const allExistingTags = Array.from(new Set(POSTS.flatMap((p) => p.tags)));
  const suggestedTags = allExistingTags.
  filter((t) => !tags.includes(t)).
  slice(0, 5);
  return (
    <div className="max-w-[1400px] mx-auto pb-20">
      {/* Sticky Top Action Bar */}
      <div className="sticky top-16 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 -mx-4 sm:-mx-8 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/creator/articles')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
            title="Back to Articles">

            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-heading font-bold text-gray-900 leading-tight">
              {isEditing ? 'Edit Article' : 'Write New Article'}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              {saveStatus === 'saved' &&
              <>
                  <CheckCircle2Icon className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-xs text-gray-500 font-medium">
                    Saved to drafts
                  </span>
                </>
              }
              {saveStatus === 'saving' &&
              <>
                  <Loader2Icon className="w-3.5 h-3.5 text-primary animate-spin" />
                  <span className="text-xs text-gray-500 font-medium">
                    Saving...
                  </span>
                </>
              }
              {saveStatus === 'unsaved' &&
              <>
                  <CircleDashedIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs text-amber-600 font-medium">
                    Unsaved changes
                  </span>
                </>
              }
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition-colors border ${isPreviewMode ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>

            {isPreviewMode ?
            <Edit2Icon className="w-4 h-4" /> :

            <EyeIcon className="w-4 h-4" />
            }
            {isPreviewMode ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={handleSaveDraft}
            className="flex-1 sm:flex-none bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold transition-colors hover:bg-gray-50 shadow-sm">

            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 sm:flex-none bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm">

            <SendIcon className="w-4 h-4" /> Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {!isPreviewMode ?
            <motion.div
              key="editor"
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -10
              }}
              className="space-y-6">

                {/* Title & Excerpt */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                  <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-3xl sm:text-4xl font-heading font-bold text-gray-900 outline-none placeholder:text-gray-300 mb-6"
                  placeholder="Your captivating title..." />


                  <div className="relative">
                    <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value.slice(0, 200))}
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none text-gray-700"
                    placeholder="Write a brief excerpt (shown in article cards and search results)..." />

                    <div
                    className={`absolute bottom-3 right-4 text-xs font-medium ${excerpt.length >= 190 ? 'text-amber-500' : 'text-gray-400'}`}>

                      {excerpt.length}/200
                    </div>
                  </div>
                </div>

                {/* Rich Text Editor */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                  {/* Toolbar */}
                  <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1 sticky top-[136px] z-10">
                    <button
                    type="button"
                    onClick={() => execCommand('bold')}
                    className={`p-2 rounded-lg transition-colors ${activeFormats.bold ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
                    title="Bold (Ctrl+B)">

                      <BoldIcon className="w-4 h-4" />
                    </button>
                    <button
                    type="button"
                    onClick={() => execCommand('italic')}
                    className={`p-2 rounded-lg transition-colors ${activeFormats.italic ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
                    title="Italic (Ctrl+I)">

                      <ItalicIcon className="w-4 h-4" />
                    </button>
                    <button
                    type="button"
                    onClick={() => execCommand('underline')}
                    className={`p-2 rounded-lg transition-colors ${activeFormats.underline ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
                    title="Underline (Ctrl+U)">

                      <UnderlineIcon className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

                    <button
                    type="button"
                    onClick={() => handleFormatBlock('H2')}
                    className={`p-2 rounded-lg transition-colors ${activeFormats.h2 ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
                    title="Heading 2">

                      <Heading2Icon className="w-4 h-4" />
                    </button>
                    <button
                    type="button"
                    onClick={() => handleFormatBlock('H3')}
                    className={`p-2 rounded-lg transition-colors ${activeFormats.h3 ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
                    title="Heading 3">

                      <Heading3Icon className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

                    <button
                    type="button"
                    onClick={() => handleFormatBlock('BLOCKQUOTE')}
                    className={`p-2 rounded-lg transition-colors ${activeFormats.quote ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
                    title="Quote">

                      <QuoteIcon className="w-4 h-4" />
                    </button>
                    <button
                    type="button"
                    onClick={() => execCommand('insertUnorderedList')}
                    className={`p-2 rounded-lg transition-colors ${activeFormats.ul ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
                    title="Bullet List">

                      <ListIcon className="w-4 h-4" />
                    </button>
                    <button
                    type="button"
                    onClick={() => execCommand('insertOrderedList')}
                    className={`p-2 rounded-lg transition-colors ${activeFormats.ol ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
                    title="Numbered List">

                      <ListOrderedIcon className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

                    <button
                    type="button"
                    onClick={handleLink}
                    className="p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-200"
                    title="Insert Link">

                      <LinkIcon className="w-4 h-4" />
                    </button>
                    <button
                    type="button"
                    onClick={handleCodeBlock}
                    className={`p-2 rounded-lg transition-colors ${activeFormats.pre ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
                    title="Code Block">

                      <CodeIcon className="w-4 h-4" />
                    </button>
                    <button
                    type="button"
                    onClick={() => execCommand('insertHorizontalRule')}
                    className="p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-200"
                    title="Divider">

                      <MinusIcon className="w-4 h-4" />
                    </button>

                    <div className="flex-1"></div>

                    <button
                    type="button"
                    onClick={() => execCommand('removeFormat')}
                    className="p-2 rounded-lg transition-colors text-gray-500 hover:text-red-600 hover:bg-red-50"
                    title="Clear Formatting">

                      <EraserIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Stats Bar */}
                  <div className="bg-white border-b border-gray-100 px-6 py-2 flex items-center gap-6 text-xs font-medium text-gray-400">
                    <span>{wordCount} words</span>
                    <span>{charCount} characters</span>
                    <span>~{readingTime} min read</span>
                  </div>

                  {/* ContentEditable Area */}
                  <div
                  ref={editorRef}
                  contentEditable
                  onInput={handleContentChange}
                  onKeyUp={(e) => {
                    handleContentChange();
                    updateActiveFormats();
                    handleKeyDown(e);
                  }}
                  onMouseUp={updateActiveFormats}
                  className="w-full min-h-[500px] p-6 sm:p-8 outline-none prose prose-lg max-w-none focus:bg-gray-50/30 transition-colors"
                  data-placeholder="Start writing your story here..."
                  style={{
                    // CSS hack for placeholder on contentEditable
                    ...(content === '' ?
                    {
                      ':empty:before': {
                        content: 'attr(data-placeholder)',
                        color: '#9CA3AF',
                        pointerEvents: 'none',
                        display: 'block'
                      }
                    } :
                    {})
                  }} />

                </div>
              </motion.div> :

            <motion.div
              key="preview"
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -10
              }}
              className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100 min-h-[800px]">

                <div className="max-w-3xl mx-auto">
                  {featuredImage &&
                <img
                  src={featuredImage}
                  alt={imageAlt || title}
                  className="w-full aspect-video object-cover rounded-2xl mb-8" />

                }

                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-sm font-bold text-primary uppercase tracking-wider">
                      {CATEGORIES.find((c) => c.id === category)?.name ||
                    'Category'}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {readingTime} min read
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6 leading-tight">
                    {title || 'Untitled Article'}
                  </h1>

                  {excerpt &&
                <p className="text-xl text-gray-600 leading-relaxed mb-8 italic border-l-4 border-gray-200 pl-4">
                      {excerpt}
                    </p>
                }

                  <div
                  className="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-primary hover:prose-a:text-primary-hover"
                  dangerouslySetInnerHTML={{
                    __html:
                    content ||
                    '<p class="text-gray-400">No content yet...</p>'
                  }} />


                  {tags.length > 0 &&
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
                      {tags.map((tag) =>
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">

                          #{tag}
                        </span>
                  )}
                    </div>
                }
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
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
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${status === 'draft' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>

                  Draft
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('review')}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${status === 'review' ? 'bg-white text-amber-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>

                  Review
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('published')}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${status === 'published' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>

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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50">

                {CATEGORIES.map((cat) =>
                <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                )}
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
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />

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
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />

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
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50 text-sm" />

              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded" />

                <span className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                  Feature this article{' '}
                  <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                </span>
              </label>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900">Tags</h3>

            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) =>
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-50 text-primary rounded-lg text-sm font-medium border border-teal-100">

                  {tag}
                  <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:bg-teal-100 p-0.5 rounded-full transition-colors">

                    <XIcon className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              disabled={tags.length >= 8}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50 text-sm disabled:opacity-50 disabled:bg-gray-100"
              placeholder={
              tags.length >= 8 ?
              'Maximum 8 tags reached' :
              'Add tag (press Enter)...'
              } />


            {suggestedTags.length > 0 && tags.length < 8 &&
            <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">
                  Suggested:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedTags.map((tag) =>
                <button
                  key={tag}
                  type="button"
                  onClick={() => setTags([...tags, tag])}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md transition-colors">

                      + {tag}
                    </button>
                )}
                </div>
              </div>
            }
          </div>

          {/* Featured Image */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900">Featured Image</h3>

            {featuredImage ?
            <div className="relative group rounded-xl overflow-hidden aspect-video bg-gray-100 border border-gray-200">
                <img
                src={featuredImage}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => e.currentTarget.style.display = 'none'} />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                  type="button"
                  onClick={() => setFeaturedImage('')}
                  className="bg-white text-red-600 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm hover:bg-red-50 transition-colors">

                    Remove Image
                  </button>
                </div>
              </div> :

            <div className="rounded-xl aspect-video bg-gray-50 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-teal-50/30 transition-colors flex flex-col items-center justify-center text-gray-400 cursor-pointer">
                <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                <span className="text-sm font-medium">
                  Drag & drop or click
                </span>
                <span className="text-xs mt-1">1200 x 600px recommended</span>
              </div>
            }

            <div className="relative">
              <LinkIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50 text-sm"
                placeholder="Or paste image URL..." />

            </div>

            {featuredImage &&
            <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Alt Text (Accessibility)
                </label>
                <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-gray-50 text-sm"
                placeholder="Describe the image..." />

              </div>
            }
          </div>

          {/* SEO Preview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              type="button"
              onClick={() => setSeoPreviewOpen(!seoPreviewOpen)}
              className="w-full p-4 flex items-center justify-between font-bold text-gray-900 bg-gray-50/50 hover:bg-gray-50 transition-colors">

              <span>SEO Preview</span>
              {seoPreviewOpen ?
              <ChevronUpIcon className="w-4 h-4" /> :

              <ChevronDownIcon className="w-4 h-4" />
              }
            </button>

            <AnimatePresence>
              {seoPreviewOpen &&
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0
                }}
                animate={{
                  height: 'auto',
                  opacity: 1
                }}
                exit={{
                  height: 0,
                  opacity: 0
                }}
                className="border-t border-gray-100">

                  <div className="p-5 space-y-2">
                    <div className="text-sm text-gray-500 truncate">
                      renewberry.io &gt; post &gt;{' '}
                      {slugify(title) || 'your-article-slug'}
                    </div>
                    <div className="text-lg font-medium text-blue-600 hover:underline cursor-pointer line-clamp-1">
                      {title || 'Your Article Title Will Appear Here'}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {excerpt ||
                    'This is how your article excerpt will appear in search engine results. Make it compelling and descriptive to encourage clicks.'}
                    </div>
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>);

}