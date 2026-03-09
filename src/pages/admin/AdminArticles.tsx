import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { POSTS, Post } from '../../data/mockData';
import {
  SearchIcon,
  PlusIcon,
  EditIcon,
  Trash2Icon,
  ExternalLinkIcon } from
'lucide-react';
export function AdminArticles() {
  const [articles, setArticles] = useState<Post[]>(POSTS);
  const [searchTerm, setSearchTerm] = useState('');
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter((a) => a.id !== id));
    }
  };
  const filteredArticles = articles.filter(
    (a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Articles
        </h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />

          </div>
          <Link
            to="/admin/articles/new"
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 whitespace-nowrap">

            <PlusIcon className="w-4 h-4" /> New Article
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-w-0">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Author</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredArticles.map((article) =>
              <tr
                key={article.id}
                className="hover:bg-gray-50 transition-colors">

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                      src={article.featuredImage}
                      alt=""
                      className="w-12 h-12 rounded object-cover flex-shrink-0" />

                      <div>
                        <p className="font-bold text-gray-900 line-clamp-1">
                          {article.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {article.isFeatured &&
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold uppercase">
                              Featured
                            </span>
                        }
                          {article.isTrending &&
                        <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold uppercase">
                              Trending
                            </span>
                        }
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img
                      src={article.author.avatar}
                      alt=""
                      className="w-6 h-6 rounded-full" />

                      <span className="text-sm text-gray-700">
                        {article.author.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    <span className="bg-gray-100 px-2.5 py-1 rounded-md">
                      {article.category.name}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                      to={`/post/${article.slug}`}
                      target="_blank"
                      className="p-1.5 text-gray-400 hover:text-primary hover:bg-teal-50 rounded-lg transition-colors"
                      title="View Live">

                        <ExternalLinkIcon className="w-4 h-4" />
                      </Link>
                      <Link
                      to={`/admin/articles/edit/${article.id}`}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit">

                        <EditIcon className="w-4 h-4" />
                      </Link>
                      <button
                      onClick={() => handleDelete(article.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete">

                        <Trash2Icon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}