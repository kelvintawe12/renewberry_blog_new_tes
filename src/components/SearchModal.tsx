import React, { useEffect, useState, useRef, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText } from 'lucide-react';
import { POSTS, Post } from '../data/mockData';
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);
  useEffect(() => {
    if (query.trim().length > 2) {
      const searchTerms = query.toLowerCase().split(' ');
      const filtered = POSTS.filter((post) => {
        const searchableText =
        `${post.title} ${post.excerpt} ${post.category.name} ${post.author.name} ${post.tags.join(' ')}`.toLowerCase();
        return searchTerms.every((term) => searchableText.includes(term));
      });
      setResults(filtered.slice(0, 5)); // Limit to 5 quick results
    } else {
      setResults([]);
    }
  }, [query]);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };
  const handleResultClick = (slug: string) => {
    onClose();
    navigate(`/post/${slug}`);
  };
  return (
    <AnimatePresence>
      {isOpen &&
      <>
          <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          onClick={onClose}
          className="fixed inset-0 bg-secondary/80 backdrop-blur-sm z-50" />

          <div className="fixed inset-0 flex items-start justify-center z-50 pt-[10vh] px-4 pointer-events-none">
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: -20
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: -20
            }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[80vh]">

              <form
              onSubmit={handleSearch}
              className="relative border-b border-gray-100 flex-shrink-0">

                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stories, creators, topics..."
                className="w-full pl-16 pr-16 py-6 text-xl text-text-primary bg-transparent outline-none font-heading" />

                <button
                type="button"
                onClick={onClose}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 bg-gray-100 rounded-md text-xs font-bold">

                  ESC
                </button>
              </form>

              <div className="overflow-y-auto flex-grow">
                {query.trim().length > 0 && query.trim().length <= 2 &&
              <div className="p-8 text-center text-text-muted">
                    Type at least 3 characters to search...
                  </div>
              }

                {query.trim().length > 2 && results.length === 0 &&
              <div className="p-8 text-center text-text-muted">
                    No results found for "{query}". Try different keywords.
                  </div>
              }

                {results.length > 0 &&
              <div className="p-2">
                    <h3 className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Posts
                    </h3>
                    <ul className="space-y-1">
                      {results.map((post) =>
                  <li key={post.id}>
                          <button
                      onClick={() => handleResultClick(post.slug)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-start gap-4 transition-colors group">

                            <div className="bg-teal-50 p-2 rounded text-primary mt-1 group-hover:bg-primary group-hover:text-white transition-colors">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="font-heading font-bold text-text-primary group-hover:text-primary transition-colors">
                                {post.title}
                              </h4>
                              <p className="text-sm text-text-muted line-clamp-1">
                                {post.category.name} &bull; {post.author.name}
                              </p>
                            </div>
                          </button>
                        </li>
                  )}
                    </ul>
                    <div className="p-4 border-t border-gray-100 mt-2">
                      <button
                    onClick={handleSearch}
                    className="text-primary font-semibold text-sm hover:text-secondary transition-colors w-full text-center">

                        View all results for "{query}" &rarr;
                      </button>
                    </div>
                  </div>
              }

                {!query.trim() &&
              <div className="p-6">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                      Popular Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                  'Monetization',
                  'Algorithm',
                  'Success Stories',
                  'Onboarding',
                  'Updates'].
                  map((term) =>
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-text-secondary text-sm rounded-full transition-colors">

                          {term}
                        </button>
                  )}
                    </div>
                  </div>
              }
              </div>
            </motion.div>
          </div>
        </>
      }
    </AnimatePresence>);

}