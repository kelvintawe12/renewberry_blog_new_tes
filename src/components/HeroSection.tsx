import React, { useEffect, useState, Children } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { POSTS } from '../data/mockData';
import { PostCard } from './PostCard';
import { SubscribeModal } from './SubscribeModal';
import { Threads } from './Threads';
export function HeroSection() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const featuredPosts = POSTS.filter((p) => p.isFeatured).slice(0, 3);
  // Simple parallax effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };
  return (
    <div className="relative mb-16 overflow-hidden">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
          'url(https://cdn.magicpatterns.com/uploads/xpg8w7555eVoLunDR4gXdH/image.png)'
        }}>

        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-primary/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
      </div>

      {/* Threads WebGL Animation Layer */}
      <div className="absolute inset-0 z-[1] opacity-30 pointer-events-auto">
        <Threads
          color={[0.03, 0.57, 0.7]}
          amplitude={1.2}
          distance={0.3}
          enableMouseInteraction={true} />

      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-white/30 rounded-full animate-pulse-soft"></div>
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-teal-300/50 rounded-full animate-float"></div>
      </div>

      <div className="relative max-w-blog mx-auto px-4 pt-24 pb-32 md:pt-32 md:pb-40 z-10">
        <motion.div
          className="max-w-3xl"
          style={{
            y: y1,
            opacity
          }}>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show">

            <motion.span
              variants={itemVariants}
              className="inline-block py-1 px-3 rounded-full bg-primary/20 text-teal-100 border border-primary/30 text-sm font-bold mb-6 backdrop-blur-sm shadow-lg">

              The Official RenewBerry Blog
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">

              Stories of Hope, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-200 to-primary animate-shimmer relative inline-block">
                Renewal
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-transparent rounded-full opacity-50"></span>
              </span>{' '}
              & Transformation
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-teal-50 mb-10 max-w-2xl leading-relaxed font-medium">

              Discover inspiring stories from creators changing the world, one
              video at a time. Weeping may endure for a night, but joy comes in
              the morning.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4">

              <button
                onClick={() => {
                  document.getElementById('latest-posts')?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
                className="bg-primary hover:bg-primary-hover text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg text-center shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_30px_rgba(8,145,178,0.6)] hover:-translate-y-1">

                Start Reading
              </button>
              <button
                onClick={() => setIsSubscribeOpen(true)}
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg text-center backdrop-blur-md hover:-translate-y-1">

                Subscribe
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Featured Posts Carousel Overlap */}
      <div className="relative max-w-blog mx-auto px-4 -mt-24 md:-mt-32 z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {featuredPosts.map((post) =>
          <motion.div
            key={post.id}
            variants={itemVariants}
            className="h-full">

              <PostCard post={post} />
            </motion.div>
          )}
        </motion.div>
      </div>

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)} />

    </div>);

}