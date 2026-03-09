import React, { Component } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { CATEGORIES, POSTS } from '../data/mockData';
import { PostCard } from '../components/PostCard';
import { AdSlot } from '../components/AdSlot';
export function CategoryPage() {
  const { slug } = useParams<{
    slug: string;
  }>();
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    return <Navigate to="/" replace />;
  }
  const categoryPosts = POSTS.filter((p) => p.category.id === category.id);
  const featuredPost = categoryPosts[0];
  const remainingPosts = categoryPosts.slice(1);
  const IconComponent = (Icons as any)[category.icon] || Icons.Folder;
  return (
    <main className="min-h-screen pb-20">
      {/* Category Header */}
      <div className="bg-gradient-to-br from-secondary to-primary text-white py-20">
        <div className="max-w-blog mx-auto px-4 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="flex flex-col items-center">

            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <IconComponent className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              {category.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-blog mx-auto px-4 py-12">
        <AdSlot position="Category Header" size="banner" />

        <div className="flex flex-col lg:flex-row gap-12 mt-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {featuredPost &&
            <div className="mb-12">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-6 border-b border-gray-200 pb-2">
                  Featured
                </h2>
                <PostCard post={featuredPost} variant="featured" />
              </div>
            }

            <AdSlot position="In-Feed 1" size="banner" className="my-12" />

            {remainingPosts.length > 0 ?
            <div>
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-6 border-b border-gray-200 pb-2">
                  Latest in {category.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {remainingPosts.map((post) =>
                <div key={post.id} className="h-full">
                      <PostCard post={post} />
                    </div>
                )}
                </div>
              </div> :

            <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                <p className="text-text-muted text-lg">
                  More stories coming soon to this category.
                </p>
              </div>
            }

            <AdSlot position="In-Feed 2" size="banner" className="my-12" />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-8">
            <AdSlot position="Sidebar Top" size="sidebar" />

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-heading font-bold text-lg mb-4">
                Related Categories
              </h3>
              <ul className="space-y-2">
                {CATEGORIES.filter((c) => c.id !== category.id).
                slice(0, 4).
                map((cat) =>
                <li key={cat.id}>
                      <a
                    href={`/category/${cat.slug}`}
                    className="text-text-secondary hover:text-primary transition-colors flex items-center gap-2">

                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        {cat.name}
                      </a>
                    </li>
                )}
              </ul>
            </div>

            <AdSlot position="Sidebar Bottom" size="sidebar" />
          </aside>
        </div>
      </div>
    </main>);

}