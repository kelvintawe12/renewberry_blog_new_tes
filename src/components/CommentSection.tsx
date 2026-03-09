import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Heart,
  Reply,
  MoreHorizontal,
  Send,
  ChevronDown,
  ChevronUp,
  Flag,
  Smile } from
'lucide-react';
import { getRelativeTime } from '../helpers/textUtils';
interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
}
interface CommentSectionProps {
  postId: string;
  postTitle?: string;
}
// Mock comments data
const MOCK_COMMENTS: Comment[] = [
{
  id: 'c1',
  author: {
    name: 'Sarah Mitchell',
    avatar:
    'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah&backgroundColor=b6e3f4',
    isVerified: true
  },
  content:
  'This article really resonated with me. The part about finding hope in small moments is exactly what I needed to hear today. Thank you for sharing this beautiful perspective! 🌟',
  createdAt: '2026-03-08T08:30:00Z',
  likes: 24,
  isLiked: false,
  replies: [
  {
    id: 'c1r1',
    author: {
      name: 'RenewBerry Team',
      avatar:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=renewberry&backgroundColor=c0aede',
      isVerified: true
    },
    content:
    "Thank you so much for your kind words, Sarah! We're so glad this piece touched you. Keep spreading that light! ✨",
    createdAt: '2026-03-08T09:15:00Z',
    likes: 8,
    isLiked: false
  }]

},
{
  id: 'c2',
  author: {
    name: 'Marcus Chen',
    avatar:
    'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus&backgroundColor=d1d4f9'
  },
  content:
  "I've been following RenewBerry since the beginning and the quality of content just keeps getting better. This is the kind of storytelling the internet needs more of.",
  createdAt: '2026-03-07T14:20:00Z',
  likes: 18,
  isLiked: true
},
{
  id: 'c3',
  author: {
    name: 'Elena Rodriguez',
    avatar:
    'https://api.dicebear.com/7.x/avataaars/svg?seed=elena&backgroundColor=ffd5dc'
  },
  content:
  'Shared this with my entire team at work. We all needed this reminder today. The message about resilience is so powerful.',
  createdAt: '2026-03-06T11:45:00Z',
  likes: 31,
  isLiked: false,
  replies: [
  {
    id: 'c3r1',
    author: {
      name: 'David Kim',
      avatar:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=david&backgroundColor=c0aede'
    },
    content:
    'Same here! Our whole office is now hooked on RenewBerry content.',
    createdAt: '2026-03-06T12:30:00Z',
    likes: 5,
    isLiked: false
  }]

},
{
  id: 'c4',
  author: {
    name: 'Amara Johnson',
    avatar:
    'https://api.dicebear.com/7.x/avataaars/svg?seed=amara&backgroundColor=b6e3f4'
  },
  content:
  'The photography in this piece is absolutely stunning. Every image tells its own story. Would love to see more visual essays like this!',
  createdAt: '2026-03-05T16:00:00Z',
  likes: 42,
  isLiked: false
}];

function CommentItem({
  comment,
  isReply = false,
  onReply




}: {comment: Comment;isReply?: boolean;onReply: (commentId: string) => void;}) {
  const [isLiked, setIsLiked] = useState(comment.isLiked || false);
  const [likes, setLikes] = useState(comment.likes);
  const [showReplies, setShowReplies] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className={`${isReply ? 'ml-12 md:ml-16' : ''}`}>

      <div className="flex gap-3 md:gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className={`rounded-full object-cover bg-gray-100 ${isReply ? 'w-8 h-8' : 'w-10 h-10 md:w-12 md:h-12'}`} />

        </div>

        {/* Content */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-text-primary text-sm md:text-base">
              {comment.author.name}
            </span>
            {comment.author.isVerified &&
            <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                ✓
              </span>
            }
            <span className="text-text-muted text-xs md:text-sm">
              {getRelativeTime(comment.createdAt)}
            </span>
          </div>

          <p className="text-text-secondary mt-1 text-sm md:text-base leading-relaxed">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-xs md:text-sm font-medium transition-colors ${isLiked ? 'text-red-500' : 'text-text-muted hover:text-red-500'}`}>

              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>

            <button
              onClick={() => onReply(comment.id)}
              className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-text-muted hover:text-primary transition-colors">

              <Reply className="w-4 h-4" />
              <span>Reply</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 text-text-muted hover:text-text-secondary transition-colors">

                <MoreHorizontal className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showMenu &&
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.95
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95
                  }}
                  className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10 min-w-[120px]">

                    <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-gray-50 flex items-center gap-2">
                      <Flag className="w-4 h-4" />
                      Report
                    </button>
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </div>

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 &&
          <div className="mt-4">
              <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors">

                {showReplies ?
              <ChevronUp className="w-4 h-4" /> :

              <ChevronDown className="w-4 h-4" />
              }
                {comment.replies.length}{' '}
                {comment.replies.length === 1 ? 'reply' : 'replies'}
              </button>

              <AnimatePresence>
                {showReplies &&
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0
                }}
                animate={{
                  opacity: 1,
                  height: 'auto'
                }}
                exit={{
                  opacity: 0,
                  height: 0
                }}
                className="mt-4 space-y-4">

                    {comment.replies.map((reply) =>
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  isReply
                  onReply={onReply} />

                )}
                  </motion.div>
              }
              </AnimatePresence>
            </div>
          }
        </div>
      </div>
    </motion.div>);

}
export function CommentSection({ postId, postTitle }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('popular');
  const [isExpanded, setIsExpanded] = useState(true);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: `c${Date.now()}`,
      author: {
        name: 'You',
        avatar:
        'https://api.dicebear.com/7.x/avataaars/svg?seed=user&backgroundColor=b6e3f4'
      },
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };
    if (replyingTo) {
      setComments((prev) =>
      prev.map((c) => {
        if (c.id === replyingTo) {
          return {
            ...c,
            replies: [...(c.replies || []), comment]
          };
        }
        return c;
      })
      );
      setReplyingTo(null);
    } else {
      setComments((prev) => [comment, ...prev]);
    }
    setNewComment('');
  };
  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return b.likes - a.likes;
  });
  const totalComments = comments.reduce(
    (acc, c) => acc + 1 + (c.replies?.length || 0),
    0
  );
  return (
    <section className="mt-16 pt-10 border-t border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 group">

          <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary">
              Comments
            </h3>
            <p className="text-sm text-text-muted">
              {totalComments} {totalComments === 1 ? 'comment' : 'comments'}
            </p>
          </div>
          {isExpanded ?
          <ChevronUp className="w-5 h-5 text-text-muted" /> :

          <ChevronDown className="w-5 h-5 text-text-muted" />
          }
        </button>

        {isExpanded &&
        <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted hidden sm:inline">
              Sort by:
            </span>
            <select
            value={sortBy}
            onChange={(e) =>
            setSortBy(e.target.value as 'newest' | 'popular')
            }
            className="text-sm font-medium text-text-secondary bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20">

              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        }
      </div>

      <AnimatePresence>
        {isExpanded &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}>

            {/* Comment Input */}
            <form onSubmit={handleSubmit} className="mb-10">
              <div className="flex gap-3 md:gap-4">
                <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user&backgroundColor=b6e3f4"
                alt="Your avatar"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 bg-gray-100" />

                <div className="flex-grow">
                  {replyingTo &&
                <div className="flex items-center gap-2 mb-2 text-sm text-primary">
                      <Reply className="w-4 h-4" />
                      <span>
                        Replying to{' '}
                        {comments.find((c) => c.id === replyingTo)?.author.name}
                      </span>
                      <button
                    type="button"
                    onClick={() => setReplyingTo(null)}
                    className="text-text-muted hover:text-text-secondary">

                        ✕
                      </button>
                    </div>
                }
                  <div className="relative">
                    <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none text-text-primary placeholder:text-text-muted" />

                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <button
                      type="button"
                      className="p-2 text-text-muted hover:text-text-secondary transition-colors">

                        <Smile className="w-5 h-5" />
                      </button>
                      <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="bg-primary hover:bg-primary-hover disabled:bg-gray-200 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors">

                        <Send className="w-4 h-4" />
                        <span className="hidden sm:inline">Post</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-8">
              {sortedComments.map((comment, idx) =>
            <motion.div
              key={comment.id}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: idx * 0.05
              }}>

                  <CommentItem
                comment={comment}
                onReply={(id) => setReplyingTo(id)} />

                  {idx < sortedComments.length - 1 &&
              <div className="border-b border-gray-100 mt-8" />
              }
                </motion.div>
            )}
            </div>

            {/* Load More */}
            <div className="text-center mt-10">
              <button className="bg-gray-50 hover:bg-gray-100 text-text-secondary font-bold py-3 px-8 rounded-xl transition-colors border border-gray-200">
                Load More Comments
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}