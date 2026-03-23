import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, ArrowLeft, Bookmark, Heart, MessageCircle, Share2, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import { POSTS } from '../data/mockData';
import { postStorage } from '../data/postStorage';
import { ShareButtons } from '../components/ShareButtons';
import { AuthorBio } from '../components/AuthorBio';
import { PostCard } from '../components/PostCard';
import { BackgroundAnimation } from '../components/BackgroundAnimation';
import { CommentSection } from '../components/CommentSection';
import { FloatingActions } from '../components/FloatingActions';
import { AdSlot } from '../components/AdSlot';
import { TableOfContents } from '../components/TableOfContents';
import { SubscribeCTA } from '../components/SubscribeCTA';

export function SinglePost() {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => {
    return POSTS.find((p) => p.slug === slug) || 
           postStorage.getPosts().find((p) => p.slug === slug);
  }, [slug]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Scroll animations
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effect for hero image
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0.2]);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setReadingProgress(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Process content to add IDs to headings for TOC
  const processedContent = useMemo(() => {
    if (!post) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content;
    const headings = tempDiv.querySelectorAll('h2, h3');
    headings.forEach((h) => {
      const id = h.textContent?.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      if (id) h.id = id;
    });
    return tempDiv.innerHTML;
  }, [post]);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const relatedPosts = POSTS.filter(
    (p) => p.category.id === post.category.id && p.id !== post.id
  ).slice(0, 3);

  const trendingPosts = POSTS.filter(p => p.isTrending && p.id !== post.id).slice(0, 4);

  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <main className="min-h-screen bg-white pb-20 relative overflow-hidden">
      <BackgroundAnimation variant="light" className="opacity-40" />
      
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-teal-400 to-secondary z-[60] origin-left shadow-sm"
        style={{ scaleX }}
      />

      {/* Floating Header (Mobile/Small Desktop) */}
      <AnimatePresence>
        {readingProgress > 5 && (
          <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 px-4 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-text-secondary" />
              </Link>
              <h2 className="text-sm font-bold truncate max-w-[200px] md:max-w-md">
                {post.title}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-primary">{readingProgress}% Read</span>
              </div>
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full transition-all ${isLiked ? 'text-rose-500 bg-rose-50' : 'text-text-secondary hover:bg-gray-100'}`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Dramatic Full-Bleed Hero */}
      <div className="relative w-full h-[70vh] md:h-[80vh] bg-gray-900 overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: yHero, opacity: opacityHero }}
        >
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          {/* Advanced Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,transparent_30%,rgba(0,0,0,0.6)_100%)] opacity-60"></div>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full pb-16 md:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <Link
                to={`/category/${post.category.slug}`}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
              >
                <Sparkles className="w-3 h-3" /> {post.category.name}
              </Link>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.1] drop-shadow-xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white/50 shadow-2xl"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-400 border-2 border-gray-900 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`/author/${post.author.username}`}
                      className="font-bold text-white hover:text-teal-300 transition-colors block text-lg"
                    >
                      {post.author.name}
                    </Link>
                    <span className="text-sm text-teal-200/80 font-medium">
                      {post.author.role}
                    </span>
                  </div>
                </div>
                
                <div className="hidden sm:block w-px h-10 bg-white/20"></div>
                
                <div className="flex items-center gap-6 text-sm font-semibold">
                  <span className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <Calendar className="w-4 h-4 text-teal-300" /> {date}
                  </span>
                  <span className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <Clock className="w-4 h-4 text-teal-300" /> {post.readTime}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 xl:gap-20">
          
          {/* Article Column */}
          <div className="relative">
            {/* Social Sidebar (Fixed on Desktop) */}
            <div className="hidden xl:block absolute -left-24 top-0 h-full">
              <div className="sticky top-32 flex flex-col gap-6 items-center">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`group flex flex-col items-center gap-1 transition-all ${isLiked ? 'text-rose-500' : 'text-text-secondary hover:text-rose-500'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${isLiked ? 'bg-rose-50 border-rose-200' : 'bg-white border-gray-200 group-hover:border-rose-200 group-hover:bg-rose-50'}`}>
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </div>
                  <span className="text-xs font-bold">1.2k</span>
                </button>
                <button className="group flex flex-col items-center gap-1 text-text-secondary hover:text-primary transition-all">
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold">48</span>
                </button>
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`group flex flex-col items-center gap-1 transition-all ${isBookmarked ? 'text-primary' : 'text-text-secondary hover:text-primary'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${isBookmarked ? 'bg-primary/10 border-primary/30' : 'bg-white border-gray-200 group-hover:border-primary group-hover:bg-primary/5'}`}>
                    <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </div>
                </button>
                <div className="w-px h-12 bg-gray-100"></div>
                <button className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary hover:bg-primary/5 transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <article className="max-w-3xl">
              {/* Content Card */}
              <div className="bg-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="prose prose-lg md:prose-xl max-w-none 
                    prose-headings:font-heading prose-headings:font-bold prose-headings:text-text-primary
                    prose-p:text-text-secondary prose-p:leading-relaxed
                    prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-3xl prose-img:shadow-2xl
                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 prose-blockquote:py-6 prose-blockquote:px-10 prose-blockquote:rounded-r-3xl prose-blockquote:text-text-primary prose-blockquote:italic
                    prose-strong:text-text-primary prose-strong:font-bold
                    prose-ul:list-disc prose-ul:pl-6
                    prose-li:text-text-secondary"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />

                {/* Inline Ad Slot */}
                <AdSlot position="inline-content" size="inline" className="my-12" />

                <div className="mt-16 pt-10 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-bold text-xl">Topics & Tags</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        className="px-5 py-2.5 bg-gray-50 text-text-secondary rounded-2xl text-sm font-bold hover:bg-primary hover:text-white transition-all shadow-sm border border-gray-100"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-12 p-8 bg-gray-50 rounded-3xl flex flex-wrap items-center justify-between gap-6 border border-gray-100">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center gap-2.5 font-bold transition-all ${isLiked ? 'text-rose-500 scale-105' : 'text-text-secondary hover:text-rose-500'}`}
                    >
                      <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                      <span>1.2k Likes</span>
                    </button>
                    <button className="flex items-center gap-2.5 text-text-secondary hover:text-primary font-bold transition-colors">
                      <MessageCircle className="w-6 h-6" />
                      <span>48 Comments</span>
                    </button>
                  </div>
                  <ShareButtons url={`https://renewberry.io/blog/post/${post.slug}`} title={post.title} />
                </div>

                <AuthorBio author={post.author} />
                
                <div className="my-16">
                  <CommentSection postId={post.id} postTitle={post.title} />
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar Column */}
          <aside className="space-y-10">
            {/* Table of Contents */}
            <TableOfContents content={post.content} />

            {/* Newsletter Sidebar Widget */}
            <div className="bg-primary text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              <h3 className="text-2xl font-heading font-bold mb-4 relative z-10">Newsletter</h3>
              <p className="text-teal-100 text-sm mb-6 relative z-10">Get the freshest stories of hope delivered weekly.</p>
              <form className="space-y-3 relative z-10">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 transition-all text-sm"
                />
                <button className="w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-teal-50 transition-colors shadow-lg">
                  Join Now
                </button>
              </form>
            </div>

            {/* Trending Sidebar */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-heading font-bold text-xl uppercase tracking-wider text-sm">Trending Now</h3>
              </div>
              <div className="space-y-6">
                {trendingPosts.map((tp, idx) => (
                  <Link key={tp.id} to={`/post/${tp.slug}`} className="group block">
                    <div className="flex gap-4">
                      <span className="text-3xl font-heading font-black text-gray-100 group-hover:text-primary/20 transition-colors leading-none">
                        0{idx + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {tp.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary font-medium uppercase tracking-wider">
                          <span>{tp.category.name}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span>{tp.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link to="/trending" className="inline-flex items-center gap-2 text-primary font-bold mt-8 text-sm group">
                View All Trending <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Sidebar Ad Slot */}
            <AdSlot position="sidebar" size="sidebar" />
          </aside>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SubscribeCTA />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="w-12 h-1.5 bg-primary rounded-full mb-6"></div>
                <h2 className="text-4xl font-heading font-bold text-text-primary">Related Stories</h2>
              </div>
              <Link to={`/category/${post.category.slug}`} className="hidden sm:flex items-center gap-2 text-primary font-bold group">
                More from {post.category.name} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rp, idx) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <PostCard post={rp} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floating Actions Component */}
      <FloatingActions />
    </main>
  );
}