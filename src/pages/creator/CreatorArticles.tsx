import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { POSTS } from '../../data/mockData';
import {
  SearchIcon,
  PlusIcon,
  Edit2Icon,
  Trash2Icon,
  EyeIcon } from
'lucide-react';
export function CreatorArticles() {
  // Simulate fetching only creator's articles
  const [articles, setArticles] = useState(POSTS.slice(0, 5));
  const [searchTerm, setSearchTerm] = useState('');
  const filteredArticles = articles.filter((a) =>
  a.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          My Articles
        </h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />

          </div>
          <Link
            to="/creator/write"
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm">

            <PlusIcon className="w-4 h-4" /> Write Article
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-w-0">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Article</th>
                <th className="p-4 font-medium">Status</th>
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
                    <div className="flex items-center gap-4">
                      <img
                      src={article.featuredImage}
                      alt=""
                      className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />

                      <div>
                        <p className="font-bold text-gray-900 line-clamp-1">
                          {article.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {article.category.name} • {article.readTime}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                      Published
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
                      className="p-2 text-gray-400 hover:text-primary hover:bg-teal-50 rounded-lg transition-colors"
                      title="View Live">

                        <EyeIcon className="w-4 h-4" />
                      </Link>
                      <Link
                      to={`/creator/write/${article.id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit">

                        <Edit2Icon className="w-4 h-4" />
                      </Link>
                      <button
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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