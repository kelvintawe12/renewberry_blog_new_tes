import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Hash } from 'lucide-react';
import { POSTS } from '../data/mockData';
import { PostCard } from '../components/PostCard';
export function TagPage() {
  const { tag } = useParams<{
    tag: string;
  }>();
  if (!tag) {
    return <Navigate to="/" replace />;
  }
  // Format tag back to readable string (e.g., 'success-story' -> 'Success Story')
  const formattedTag = tag.
  split('-').
  map((word) => word.charAt(0).toUpperCase() + word.slice(1)).
  join(' ');
  // Find posts containing this tag (case insensitive)
  const tagPosts = POSTS.filter((p) =>
  p.tags.some(
    (t) =>
    t.toLowerCase() === formattedTag.toLowerCase() ||
    t.toLowerCase().replace(/\s+/g, '-') === tag
  )
  );
  return (
    <main className="min-h-screen pb-20 bg-gray-50">
      <div className="bg-white border-b border-gray-200 pt-32 pb-16">
        <div className="max-w-blog mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 text-primary rounded-2xl mb-6">
            <Hash className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
            {formattedTag}
          </h1>
          <p className="text-text-secondary text-lg">
            {tagPosts.length} {tagPosts.length === 1 ? 'story' : 'stories'}{' '}
            tagged with #{formattedTag}
          </p>
        </div>
      </div>

      <div className="max-w-blog mx-auto px-4 py-16">
        {tagPosts.length > 0 ?
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tagPosts.map((post) =>
          <div key={post.id} className="h-full">
                <PostCard post={post} />
              </div>
          )}
          </div> :

        <div className="text-center py-20">
            <p className="text-text-muted text-lg">
              No posts found with this tag.
            </p>
          </div>
        }
      </div>
    </main>);

}