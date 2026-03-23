import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Post, CATEGORIES, AUTHORS } from '../../data/mockData';
import { postStorage } from '../../data/postStorage';
import { SearchIcon, PlusIcon, EditIcon, Trash2Icon, EyeIcon, FilterIcon, CalendarIcon, UserIcon, CheckSquareIcon, XIcon, GlobeIcon, FileTextIcon, CopyIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
export function AdminArticles() {
  const [articles, setArticles] = useState<Post[]>(postStorage.getPosts());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [authorFilter, setAuthorFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      postStorage.deletePost(id);
      setArticles(postStorage.getPosts());
      if (selectedIds.has(id)) {
        const newSelected = new Set(selectedIds);
        newSelected.delete(id);
        setSelectedIds(newSelected);
      }
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.size} articles?`)) {
      selectedIds.forEach((id) => postStorage.deletePost(id));
      setArticles(postStorage.getPosts());
      setSelectedIds(new Set());
    }
  };

  const handleBulkStatus = (status: string) => {
    if (window.confirm(`Are you sure you want to mark ${selectedIds.size} articles as ${status}?`)) {
      const currentPosts = postStorage.getPosts();
      selectedIds.forEach((id) => {
        const post = currentPosts.find((p) => p.id === id);
        if (post) {
          postStorage.savePost({ ...post, status } as any);
        }
      });
      setArticles(postStorage.getPosts());
      setSelectedIds(new Set());
    }
  };

  const handleDuplicate = (article: Post) => {
    if (window.confirm(`Duplicate "${article.title}"?`)) {
      const newArticle = {
        ...article,
        id: '',
        title: `${article.title} (Copy)`,
        slug: `${article.slug}-copy-${Date.now()}`,
        status: 'draft',
        isFeatured: false,
        isTrending: false,
        publishedAt: new Date().toISOString()
      };
      postStorage.savePost(newArticle as any);
      setArticles(postStorage.getPosts());
    }
  };

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredArticles.length && filteredArticles.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredArticles.map((a) => a.id)));
    }
  };

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (a as any).status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || a.category.id === categoryFilter;
    const matchesAuthor = authorFilter === 'all' || a.author.id === authorFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesAuthor;
  }).sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      case 'oldest':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter, authorFilter, sortOrder]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Article Management
        </h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            to="/admin/articles/new"
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 whitespace-nowrap">
            <PlusIcon className="w-4 h-4" /> New Article
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {['all', 'published', 'draft', 'scheduled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                statusFilter === status
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <button
            onClick={toggleSelectAll}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors text-sm font-medium ${
              selectedIds.size === filteredArticles.length && filteredArticles.length > 0 ? 'bg-primary/10 border-primary text-primary' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
            title="Select All">
            <CheckSquareIcon className={`w-4 h-4 ${selectedIds.size === filteredArticles.length && filteredArticles.length > 0 ? 'fill-primary text-primary' : 'text-gray-400'}`} />
            <span className="whitespace-nowrap hidden md:inline">Select All</span>
          </button>
          <div className="relative flex-1 w-full">
            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white text-gray-600"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            <select
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white text-gray-600"
            >
              <option value="all">All Authors</option>
              {AUTHORS.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white text-gray-600"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <div className="bg-primary/5 border border-primary/20 p-3 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-md">
              {selectedIds.size} Selected
            </span>
            <span className="text-sm text-gray-600 font-medium">Actions:</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkStatus('published')}
              className="flex items-center gap-2 text-green-700 hover:bg-green-50 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors">
              <GlobeIcon className="w-4 h-4" /> Bulk Publish
            </button>
            <button
              onClick={() => handleBulkStatus('draft')}
              className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors">
              <FileTextIcon className="w-4 h-4" /> Bulk Draft
            </button>
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors">
              <Trash2Icon className="w-4 h-4" /> Delete Selected
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {filteredArticles.length === 0 && (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-200">
            No articles found matching your criteria.
          </div>
        )}
        {paginatedArticles.map((article) => (
          <div key={article.id} className="group bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden hover:shadow-md transition-all duration-200">
            <div className="relative group">
              <img
                src={article.featuredImage}
                alt=""
                className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              
              {/* Selection Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  checked={selectedIds.has(article.id)}
                  onChange={() => toggleSelection(article.id)}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer shadow-sm" />
              </div>

              <div className="absolute bottom-2 left-2 flex gap-2">
                {article.isFeatured && (
                  <span className="text-[10px] bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md font-bold uppercase shadow-sm tracking-wide">Featured</span>
                )}
                {article.isTrending && (
                  <span className="text-[10px] bg-blue-500 text-white px-2 py-1 rounded-md font-bold uppercase shadow-sm tracking-wide">Trending</span>
                )}
              </div>
              <div className="absolute top-2 right-2">
                <span className={`inline-block px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                  (article as any).status === 'published' ? 'bg-green-500 text-white' :
                  (article as any).status === 'draft' ? 'bg-gray-500 text-white' :
                  (article as any).status === 'scheduled' ? 'bg-purple-500 text-white' :
                  'bg-amber-500 text-white'
                }`}>
                  {(article as any).status?.toUpperCase() || 'DRAFT'}
                </span>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-semibold">{article.category.name}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              
              <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight min-h-[2.5rem]">
                {article.title}
              </h3>
              
              <p className="text-sm text-gray-500 line-clamp-2">{article.excerpt || article.content?.slice(0, 100) + '...'}</p>
              
              <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <img src={article.author.avatar} alt="" className="w-6 h-6 rounded-full" />
                  <span className="font-medium text-gray-700">{article.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-3 h-3" />
                  {new Date(article.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50/50">
              <div className="flex gap-2 w-full">
                <Link
                  to={`/post/${article.slug}`}
                  target="_blank"
                  className="flex-1 py-2 text-center text-gray-600 hover:text-primary hover:bg-teal-50 rounded-lg transition-colors text-sm font-medium border border-gray-200 hover:border-teal-100 bg-white"
                  title="View Live">
                  <EyeIcon className="w-4 h-4 mx-auto" />
                </Link>
                <Link
                  to={`/admin/articles/edit/${article.id}`}
                  className="flex-1 py-2 text-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium border border-gray-200 hover:border-blue-100 bg-white"
                  title="Edit">
                  <EditIcon className="w-4 h-4 mx-auto" />
                </Link>
                <button
                  onClick={() => handleDuplicate(article)}
                  className="flex-1 py-2 text-center text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors text-sm font-medium border border-gray-200 hover:border-purple-100 bg-white"
                  title="Duplicate">
                  <CopyIcon className="w-4 h-4 mx-auto" />
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="flex-1 py-2 text-center text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium border border-gray-200 hover:border-red-100 bg-white"
                  title="Delete">
                  <Trash2Icon className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-xl shadow-sm">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredArticles.length)}</span> of{' '}
                <span className="font-medium">{filteredArticles.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-current={page === currentPage ? 'page' : undefined}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      page === currentPage
                        ? 'z-10 bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
