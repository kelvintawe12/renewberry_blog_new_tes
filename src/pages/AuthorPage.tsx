import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AUTHORS, POSTS } from '../data/mockData';
import { PostCard } from '../components/PostCard';
export function AuthorPage() {
  const { username } = useParams<{
    username: string;
  }>();
  const author = AUTHORS.find((a) => a.username === username);
  if (!author) {
    return <Navigate to="/" replace />;
  }
  const authorPosts = POSTS.filter((p) => p.author.id === author.id);
  const categoriesWrittenIn = Array.from(
    new Set(authorPosts.map((p) => p.category.name))
  );
  return (
    <main className="min-h-screen pb-20">
      {/* Author Hero */}
      <div className="bg-secondary text-white py-20">
        <div className="max-w-blog mx-auto px-4">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

            <img
              src={author.avatar}
              alt={author.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-white/20 shadow-xl" />

            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">
                {author.name}
              </h1>
              <p className="text-xl text-primary font-bold mb-4">
                {author.role}
              </p>
              <p className="text-teal-100 max-w-2xl text-lg leading-relaxed mb-6">
                {author.bio}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-teal-200">
                <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <span className="font-bold text-white">
                    {authorPosts.length}
                  </span>{' '}
                  Published Stories
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  Writes about:{' '}
                  <span className="text-white">
                    {categoriesWrittenIn.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-blog mx-auto px-4 py-16">
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-10 border-b border-gray-200 pb-4">
          Articles by {author.name}
        </h2>

        {authorPosts.length > 0 ?
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authorPosts.map((post) =>
          <div key={post.id} className="h-full">
                <PostCard post={post} />
              </div>
          )}
          </div> :

        <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-text-muted text-lg">
              This author hasn't published any stories yet.
            </p>
          </div>
        }
      </div>
    </main>);

}