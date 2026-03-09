import React, { useEffect, useState, Children } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '../components/HeroSection';
import { CategoryTile } from '../components/CategoryTile';
import { PostCard } from '../components/PostCard';
import { SubscribeCTA } from '../components/SubscribeCTA';
import { SplashCursor } from '../components/SplashCursor';
import {
  CATEGORIES,
  POSTS,
  AUTHORS,
  GALLERY_IMAGES,
  VIDEOS } from
'../data/mockData';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  Video,
  Globe,
  Play,
  Image as ImageIcon } from
'lucide-react';
function useCounter(
end: number,
duration: number = 2000,
startWhen: boolean = true)
{
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startWhen) return;
    let startTime: number | null = null;
    let animationFrame: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };
    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [end, duration, startWhen]);
  return count;
}
export function BlogHome() {
  const latestPosts = POSTS.filter((p) => !p.isFeatured).slice(0, 6);
  const trendingPosts = POSTS.filter((p) => p.isTrending).slice(0, 3);
  const editorsPicks = POSTS.slice(3, 7);
  const featuredCreators = AUTHORS.slice(0, 3);
  const galleryHighlights = GALLERY_IMAGES.slice(0, 4);
  const videoHighlights = VIDEOS.slice(0, 4);
  const [statsVisible, setStatsVisible] = useState(false);
  const creatorsCount = useCounter(10, 2000, statsVisible);
  const storiesCount = useCounter(500, 2500, statsVisible);
  const readersCount = useCounter(2, 2000, statsVisible);
  const countriesCount = useCounter(150, 3000, statsVisible);
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };
  const SectionHeading = ({
    title,
    subtitle



  }: {title: string;subtitle: string;}) =>
  <div className="mb-10 relative">
      <div className="w-12 h-1.5 bg-primary rounded-full mb-4"></div>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-2">
        {title}
      </h2>
      <p className="text-text-secondary text-lg">{subtitle}</p>
    </div>;

  return (
    <main className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* WebGL Fluid Cursor Effect */}
      <SplashCursor />

      <div className="relative z-10">
        <HeroSection />

        {/* Trending Ticker Marquee */}
        <div className="bg-white border-y border-gray-200 py-3 overflow-hidden flex items-center shadow-sm relative z-10 -mt-16">
          <div className="bg-primary text-white font-bold px-4 py-3 absolute left-0 z-20 flex items-center gap-2 h-full uppercase tracking-wider text-sm shadow-[10px_0_15px_-3px_rgba(0,0,0,0.1)]">
            <TrendingUp className="w-4 h-4" /> Trending
          </div>
          <div className="flex whitespace-nowrap animate-marquee ml-32">
            {[...trendingPosts, ...trendingPosts, ...trendingPosts].map(
              (post, i) =>
              <Link
                key={`${post.id}-${i}`}
                to={`/post/${post.slug}`}
                className="mx-6 text-text-secondary hover:text-primary transition-colors font-medium flex items-center gap-2">

                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  {post.title}
                </Link>

            )}
          </div>
        </div>

        <div className="max-w-blog mx-auto px-4 py-12">
          {/* Inspire Daily Banner */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            className="my-12 rounded-3xl overflow-hidden shadow-xl relative aspect-[21/9] md:aspect-[3/1] group cursor-pointer">

            <img
              src="/image.png"
              alt="Inspire Daily"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

            <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-transparent flex items-center p-8 md:p-16">
              <div className="max-w-lg">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4 border border-white/30">
                  Daily Motivation
                </span>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
                  Start Your Day With Purpose
                </h2>
                <p className="text-white/90 text-lg mb-6 hidden md:block">
                  Join our morning community sessions for daily inspiration and
                  goal setting.
                </p>
                <button className="bg-white text-primary font-bold py-3 px-8 rounded-xl hover:bg-teal-50 transition-colors shadow-lg">
                  Join the Movement
                </button>
              </div>
            </div>
          </motion.div>

          {/* Categories Section */}
          <section className="my-24">
            <SectionHeading
              title="Explore Topics"
              subtitle="Find stories that resonate with your journey." />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                margin: '-100px'
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {CATEGORIES.slice(0, 8).map((category) =>
              <motion.div key={category.id} variants={itemVariants}>
                  <CategoryTile category={category} />
                </motion.div>
              )}
            </motion.div>
          </section>

          {/* Animated Stats Bar */}
          <motion.section
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            onViewportEnter={() => setStatsVisible(true)}
            className="my-24 bg-secondary rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">

            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              <div className="text-center">
                <Users className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                <div className="text-4xl md:text-5xl font-heading font-bold mb-1">
                  {creatorsCount}K+
                </div>
                <div className="text-teal-100 text-sm uppercase tracking-wider font-semibold">
                  Creators
                </div>
              </div>
              <div className="text-center">
                <Video className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                <div className="text-4xl md:text-5xl font-heading font-bold mb-1">
                  {storiesCount}K+
                </div>
                <div className="text-teal-100 text-sm uppercase tracking-wider font-semibold">
                  Stories Shared
                </div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                <div className="text-4xl md:text-5xl font-heading font-bold mb-1">
                  {readersCount}M+
                </div>
                <div className="text-teal-100 text-sm uppercase tracking-wider font-semibold">
                  Monthly Readers
                </div>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                <div className="text-4xl md:text-5xl font-heading font-bold mb-1">
                  {countriesCount}+
                </div>
                <div className="text-teal-100 text-sm uppercase tracking-wider font-semibold">
                  Countries
                </div>
              </div>
            </div>
          </motion.section>

          {/* Trending Now Section */}
          {trendingPosts.length > 0 &&
          <section className="my-24">
              <SectionHeading
              title="Trending Now"
              subtitle="The stories everyone is talking about today." />

              <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                margin: '-100px'
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {trendingPosts.map((post, idx) =>
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="h-full relative">

                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-xl z-20 shadow-lg border-4 border-gray-50">
                      {idx + 1}
                    </div>
                    <PostCard post={post} />
                  </motion.div>
              )}
              </motion.div>
            </section>
          }

          {/* Video Highlights */}
          <section className="my-24 bg-gray-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex justify-between items-end mb-10">
              <div>
                <div className="w-12 h-1.5 bg-teal-400 rounded-full mb-4"></div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                  Video Highlights
                </h2>
                <p className="text-gray-400 text-lg">
                  Watch the latest inspiring moments.
                </p>
              </div>
              <Link
                to="/videos"
                className="hidden md:flex items-center gap-2 text-teal-400 hover:text-white font-bold transition-colors">

                View All Videos <TrendingUp className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
              {videoHighlights.map((video, idx) =>
              <Link to="/videos" key={video.id}>
                  <motion.div
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0
                  }}
                  viewport={{
                    once: true
                  }}
                  transition={{
                    delay: idx * 0.1
                  }}
                  className="relative aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer">

                    <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white font-bold text-sm line-clamp-2">
                        {video.title}
                      </p>
                      <p className="text-gray-300 text-xs mt-1">
                        {video.views} views
                      </p>
                    </div>
                  </motion.div>
                </Link>
              )}
            </div>
            <Link
              to="/videos"
              className="md:hidden mt-8 flex items-center justify-center gap-2 text-teal-400 font-bold w-full bg-white/10 py-3 rounded-xl">

              View All Videos
            </Link>
          </section>

          {/* Editor's Picks Layout */}
          <section className="my-24">
            <SectionHeading
              title="Editor's Picks"
              subtitle="Hand-selected stories you shouldn't miss." />

            <div className="flex flex-col lg:flex-row gap-8">
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20
                }}
                whileInView={{
                  opacity: 1,
                  x: 0
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.6
                }}
                className="lg:w-1/2">

                {editorsPicks[0] &&
                <PostCard post={editorsPicks[0]} variant="default" />
                }
              </motion.div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{
                  once: true
                }}
                className="lg:w-1/2 flex flex-col gap-6">

                {editorsPicks.slice(1, 4).map((post) =>
                <motion.div key={post.id} variants={itemVariants}>
                    <PostCard post={post} variant="compact" />
                  </motion.div>
                )}
              </motion.div>
            </div>
          </section>

          {/* From Our Gallery */}
          <section className="my-24">
            <div className="flex justify-between items-end mb-10">
              <SectionHeading
                title="From Our Gallery"
                subtitle="Visual stories captured by our community." />

              <Link
                to="/gallery"
                className="hidden md:flex items-center gap-2 text-primary hover:text-secondary font-bold transition-colors mb-10">

                Browse Gallery <ImageIcon className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryHighlights.map((img, idx) =>
              <motion.div
                key={img.id}
                initial={{
                  opacity: 0,
                  scale: 0.9
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  delay: idx * 0.1
                }}>

                  <Link
                  to={`/gallery/${img.slug}`}
                  className="block relative aspect-square rounded-2xl overflow-hidden group">

                    <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-bold text-sm truncate">
                        {img.title}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )}
            </div>
          </section>

          {/* Latest Posts Section */}
          <section id="latest-posts" className="my-24">
            <SectionHeading
              title="Latest Stories"
              subtitle="Fresh perspectives published recently." />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                margin: '-100px'
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {latestPosts.map((post) =>
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="h-full">

                  <PostCard post={post} />
                </motion.div>
              )}
            </motion.div>
            <div className="text-center mt-12">
              <button className="bg-white border-2 border-gray-200 text-text-primary font-bold py-3 px-8 rounded-xl hover:border-primary hover:text-primary transition-colors">
                Load More Stories
              </button>
            </div>
          </section>

          <SubscribeCTA />
        </div>
      </div>
    </main>);

}