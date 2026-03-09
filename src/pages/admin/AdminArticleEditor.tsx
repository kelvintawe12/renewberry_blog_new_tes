import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, SaveIcon, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES, AUTHORS, POSTS } from '../../data/mockData';
export function AdminArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const existingPost = isEditing ? POSTS.find((p) => p.id === id) : null;
  const [formData, setFormData] = useState({
    title: existingPost?.title || '',
    excerpt: existingPost?.excerpt || '',
    content: existingPost?.content || '',
    category: existingPost?.category.id || CATEGORIES[0].id,
    author: existingPost?.author.id || AUTHORS[0].id,
    featuredImage: existingPost?.featuredImage || '',
    tags: existingPost?.tags.join(', ') || '',
    isFeatured: existingPost?.isFeatured || false
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    alert('Article saved successfully!');
    navigate('/admin/articles');
  };
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/articles')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors">

            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            {isEditing ? 'Edit Article' : 'Create New Article'}
          </h1>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-sm">

          <SaveIcon className="w-4 h-4" /> Publish
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Article Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value
              })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-lg font-medium"
              placeholder="Enter a captivating title..." />

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt (Short Description)
            </label>
            <textarea
              required
              rows={2}
              value={formData.excerpt}
              onChange={(e) =>
              setFormData({
                ...formData,
                excerpt: e.target.value
              })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
              placeholder="A brief summary of the article..." />

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content (HTML supported)
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
              <div className="bg-gray-50 border-b border-gray-300 px-4 py-2 flex gap-2">
                <button
                  type="button"
                  className="p-1 hover:bg-gray-200 rounded text-sm font-bold">

                  B
                </button>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-200 rounded text-sm italic">

                  I
                </button>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-200 rounded text-sm underline">

                  U
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-200 rounded text-sm">

                  H2
                </button>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-200 rounded text-sm">

                  H3
                </button>
              </div>
              <textarea
                required
                rows={15}
                value={formData.content}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  content: e.target.value
                })
                }
                className="w-full px-4 py-4 outline-none resize-y font-mono text-sm"
                placeholder="<p>Start writing your story here...</p>" />

            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">
              Media & Meta
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image URL
              </label>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <ImageIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    required
                    value={formData.featuredImage}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      featuredImage: e.target.value
                    })
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="https://..." />

                </div>
              </div>
              {formData.featuredImage &&
              <div className="mt-4 rounded-lg overflow-hidden h-48 bg-gray-100 border border-gray-200">
                  <img
                  src={formData.featuredImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => e.currentTarget.style.display = 'none'} />

                </div>
              }
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: e.target.value
                })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="Hope, Inspiration, Community..." />

            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6 h-fit">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">
              Publishing Info
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value
                })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white">

                {CATEGORIES.map((cat) =>
                <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <select
                value={formData.author}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  author: e.target.value
                })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white">

                {AUTHORS.map((author) =>
                <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                )}
              </select>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    isFeatured: e.target.checked
                  })
                  }
                  className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded" />

                <span className="text-sm font-medium text-gray-900">
                  Feature this article
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-8">
                Featured articles appear in the hero section of the blog.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>);

}