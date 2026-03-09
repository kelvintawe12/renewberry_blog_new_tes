import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { POSTS, CATEGORIES } from '../data/mockData';
import { PostCard } from '../components/PostCard';
export function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  // Perform search
  const searchTerms = initialQuery.
  toLowerCase().
  split(' ').
  filter((t) => t);
  let results = POSTS;
  if (searchTerms.length > 0) {
    results = POSTS.filter((post) => {
      const searchableText =
      `${post.title} ${post.excerpt} ${post.category.name} ${post.author.name} ${post.tags.join(' ')}`.toLowerCase();
      return searchTerms.every((term) => searchableText.includes(term));
    });
  }
  // Filter by category
  if (activeCategory !== 'all') {
    results = results.filter((post) => post.category.slug === activeCategory);
  }
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({
        q: query
      });
    } else {
      setSearchParams({});
    }
  };
  return (
    <main className="min-h-screen pb-20 bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 pt-32 pb-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-8">
            Search Results
          </h1>
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stories, creators, topics..."
              className="w-full pl-14 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 outline-none transition-colors" />

            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-hover transition-colors">

              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-blog mx-auto px-4 py-12">
        {initialQuery &&
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-text-secondary text-lg">
              Found{' '}
              <span className="font-bold text-text-primary">
                {results.length}
              </span>{' '}
              results for "{initialQuery}"
            </p>

            {/* Category Filter */}
            <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-text-primary outline-none focus:border-primary">

              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) =>
            <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
            )}
            </select>
          </div>
        }

        {results.length > 0 ?
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((post) =>
          <div key={post.id} className="h-full">
                <PostCard post={post} />
              </div>
          )}
          </div> :

        <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <Search className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
              No results found
            </h2>
            <p className="text-text-secondary mb-8">
              We couldn't find any stories matching your search. Try different
              keywords or browse our categories.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.slice(0, 4).map((cat) =>
            <a
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="px-4 py-2 bg-teal-50 text-primary rounded-lg font-medium hover:bg-teal-100 transition-colors">

                  {cat.name}
                </a>
            )}
            </div>
          </div>
        }
      </div>
    </main>);

}