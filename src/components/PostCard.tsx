import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Post } from '../data/mockData';
import { truncateToWords } from '../helpers/textUtils';
interface PostCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
}
export function PostCard({ post, variant = 'default' }: PostCardProps) {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [isHovered, setIsHovered] = useState(false);
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({
      x,
      y
    });
  };
  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{
          y: -2,
          scale: 1.01
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
        className="flex gap-4 group cursor-pointer bg-white p-3 rounded-xl hover:shadow-md transition-shadow border border-transparent hover:border-gray-100 relative overflow-hidden">

        <div className="absolute top-0 left-0 w-1 h-full bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
        <Link
          to={`/post/${post.slug}`}
          className="flex-shrink-0 overflow-hidden rounded-lg w-24 h-24 relative">

          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay"></div>
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

        </Link>
        <div className="flex flex-col justify-center">
          <Link
            to={`/category/${post.category.slug}`}
            className="text-xs font-bold text-primary uppercase tracking-wider mb-1 hover:text-secondary transition-colors">

            {post.category.name}
          </Link>
          <h3 className="font-heading font-bold text-text-primary leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            <Link to={`/post/${post.slug}`}>{post.title}</Link>
          </h3>
          <div className="text-xs text-text-muted flex items-center gap-2">
            <span>{date}</span>
            <span>&bull;</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </motion.div>);

  }
  if (variant === 'featured') {
    return (
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePosition({
            x: 0,
            y: 0
          });
        }}
        style={{
          transform: isHovered ?
          `perspective(1000px) rotateX(${mousePosition.y * -10}deg) rotateY(${mousePosition.x * 10}deg)` :
          'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transition: isHovered ? 'none' : 'transform 0.5s ease-out'
        }}
        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 flex flex-col md:flex-row group relative">

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-teal-400 to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20"></div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer-card z-20 pointer-events-none mix-blend-overlay"></div>

        <Link
          to={`/post/${post.slug}`}
          className="md:w-1/2 overflow-hidden relative">

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-700" />

        </Link>
        <div className="p-8 md:w-1/2 flex flex-col justify-center relative bg-white">
          <motion.div
            initial={false}
            animate={{
              y: isHovered ? -5 : 0
            }}
            transition={{
              duration: 0.3
            }}
            className="flex items-center gap-3 mb-4">

            <Link
              to={`/category/${post.category.slug}`}
              className="inline-block px-3 py-1 bg-teal-50 text-primary text-xs font-bold uppercase tracking-wider rounded-full hover:bg-teal-100 transition-colors">

              {post.category.name}
            </Link>
            {post.isFeatured &&
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-wider rounded-full animate-pulse-soft">
                <Star className="w-3 h-3 fill-current" /> Featured
              </span>
            }
          </motion.div>
          <motion.h2
            initial={false}
            animate={{
              y: isHovered ? -5 : 0
            }}
            transition={{
              duration: 0.3,
              delay: 0.05
            }}
            className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-4 leading-tight group-hover:text-primary transition-colors">

            <Link to={`/post/${post.slug}`}>{post.title}</Link>
          </motion.h2>
          <motion.p
            initial={false}
            animate={{
              y: isHovered ? -5 : 0
            }}
            transition={{
              duration: 0.3,
              delay: 0.1
            }}
            className="text-text-secondary mb-6 line-clamp-3 text-lg">

            {truncateToWords(post.excerpt, 30)}
          </motion.p>
          <motion.div
            initial={false}
            animate={{
              y: isHovered ? -5 : 0
            }}
            transition={{
              duration: 0.3,
              delay: 0.15
            }}
            className="flex items-center justify-between mt-auto">

            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-teal-100 transition-all" />

              <div>
                <p className="text-sm font-bold text-text-primary">
                  {post.author.name}
                </p>
                <p className="text-xs text-text-muted">
                  {date} &bull; {post.readTime}
                </p>
              </div>
            </div>
            <Link
              to={`/post/${post.slug}`}
              className="opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary bg-teal-50 p-3 rounded-full hover:bg-primary hover:text-white">

              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>);

  }
  // Default variant
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({
          x: 0,
          y: 0
        });
      }}
      style={{
        transform: isHovered ?
        `perspective(1000px) rotateX(${mousePosition.y * -15}deg) rotateY(${mousePosition.x * 15}deg)` :
        'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: isHovered ? 'none' : 'transform 0.5s ease-out'
      }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 flex flex-col h-full group relative">

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20"></div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer-card z-20 pointer-events-none mix-blend-overlay"></div>

      <Link
        to={`/post/${post.slug}`}
        className="overflow-hidden aspect-video relative">

        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay"></div>
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

      </Link>
      <div className="p-6 flex flex-col flex-grow relative overflow-hidden bg-white">
        <motion.div
          initial={false}
          animate={{
            y: isHovered ? -3 : 0
          }}
          transition={{
            duration: 0.3
          }}>

          <Link
            to={`/category/${post.category.slug}`}
            className="text-xs font-bold text-primary uppercase tracking-wider mb-2 hover:text-secondary transition-colors inline-block w-fit">

            {post.category.name}
          </Link>
        </motion.div>

        <motion.h3
          initial={false}
          animate={{
            y: isHovered ? -3 : 0
          }}
          transition={{
            duration: 0.3,
            delay: 0.05
          }}
          className="text-xl font-heading font-bold text-text-primary mb-3 leading-tight group-hover:text-primary transition-colors">

          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </motion.h3>

        <motion.p
          initial={false}
          animate={{
            y: isHovered ? -3 : 0
          }}
          transition={{
            duration: 0.3,
            delay: 0.1
          }}
          className="text-text-secondary mb-6 line-clamp-2 flex-grow">

          {truncateToWords(post.excerpt, 25)}
        </motion.p>

        <motion.div
          initial={false}
          animate={{
            y: isHovered ? -3 : 0
          }}
          transition={{
            duration: 0.3,
            delay: 0.15
          }}
          className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50 relative bg-white z-10">

          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-8 h-8 rounded-full object-cover" />

          <div>
            <p className="text-sm font-bold text-text-primary">
              {post.author.name}
            </p>
            <p className="text-xs text-text-muted">
              {date} &bull; {post.readTime}
            </p>
          </div>
        </motion.div>

        {/* Slide up "Read more" overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-12 pb-6 px-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 flex justify-end">
          <Link
            to={`/post/${post.slug}`}
            className="text-primary font-bold text-sm flex items-center gap-2 hover:text-secondary bg-teal-50 px-4 py-2 rounded-full">

            Read story <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>);

}