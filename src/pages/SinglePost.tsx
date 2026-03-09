import React, { useEffect, useState, Children } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { POSTS } from '../data/mockData';
import { ShareButtons } from '../components/ShareButtons';
import { AuthorBio } from '../components/AuthorBio';
import { PostCard } from '../components/PostCard';
import { BackgroundAnimation } from '../components/BackgroundAnimation';
import { CommentSection } from '../components/CommentSection';
export function SinglePost() {
  const { slug } = useParams<{
    slug: string;
  }>();
  const post = POSTS.find((p) => p.slug === slug);
  const [readingProgress, setReadingProgress] = useState(0);
  // Scroll animations
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  // Parallax effect for hero image
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setReadingProgress(Math.round(latest * 100));
    });
  }, [scrollYProgress]);
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  if (!post) {
    return <Navigate to="/" replace />;
  }
  const relatedPosts = POSTS.filter(
    (p) => p.category.id === post.category.id && p.id !== post.id
  ).slice(0, 6);
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  return (
    <main className="min-h-screen bg-white pb-20 relative overflow-hidden">
      <BackgroundAnimation variant="light" className="h-[60vh] top-[80vh]" />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 to-primary z-50 origin-left"
        style={{
          scaleX
        }} />

      <motion.div
        initial={{
          opacity: 0,
          y: -20
        }}
        animate={{
          opacity: readingProgress > 5 ? 1 : 0,
          y: readingProgress > 5 ? 0 : -20
        }}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-gray-100">

        <div className="w-4 h-4 rounded-full border-2 border-gray-200 relative overflow-hidden">
          <div
            className="absolute bottom-0 left-0 right-0 bg-primary transition-all duration-300"
            style={{
              height: `${readingProgress}%`
            }}>
          </div>
        </div>
        <span className="text-xs font-bold text-primary">
          {readingProgress}% Read
        </span>
      </motion.div>

      {/* Dramatic Full-Bleed Hero */}
      <div className="relative w-full h-[80vh] md:h-[90vh] bg-black overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            y: yHero,
            opacity: opacityHero
          }}>

          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover opacity-80" />

          {/* Vignette & Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none"></div>
        </motion.div>

        {/* Top Nav Overlay */}
        <div className="absolute top-0 left-0 right-0 pt-24 pb-6 px-6 md:px-12 z-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">

            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20 z-20 max-w-6xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              delay: 0.2
            }}>

            <Link
              to={`/category/${post.category.slug}`}
              className="inline-block px-4 py-1.5 bg-primary/80 backdrop-blur-sm text-white text-sm font-bold uppercase tracking-wider rounded-full mb-6 border border-white/20 shadow-lg hover:bg-primary transition-colors">

              {post.category.name}
            </Link>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 leading-tight drop-shadow-lg max-w-4xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white/50 shadow-lg" />

                <div className="text-left">
                  <Link
                    to={`/author/${post.author.username}`}
                    className="font-bold text-white hover:text-teal-300 transition-colors block text-lg drop-shadow-md">

                    {post.author.name}
                  </Link>
                  <span className="text-sm text-teal-200 font-medium">
                    {post.author.role}
                  </span>
                </div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-white/20"></div>
              <div className="flex items-center gap-6 text-sm font-medium bg-black/30 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-300" /> {date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-300" /> {post.readTime}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-16 relative z-10 -mt-10">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-2xl border border-gray-100">
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
              once: true,
              margin: '-100px'
            }}
            transition={{
              duration: 0.6
            }}
            className="prose prose-lg md:prose-xl max-w-none prose-headings:font-heading prose-a:text-primary hover:prose-a:text-secondary prose-img:rounded-2xl prose-img:shadow-lg prose-blockquote:bg-teal-50/50 prose-blockquote:py-4 prose-blockquote:pr-6 prose-blockquote:rounded-r-2xl prose-blockquote:border-primary prose-blockquote:text-secondary prose-blockquote:font-medium"
            dangerouslySetInnerHTML={{
              __html: post.content
            }} />


          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true
            }}
            variants={{
              hidden: {
                opacity: 0
              },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="mt-16 pt-10 border-t border-gray-100 flex flex-wrap gap-3">

            {post.tags.map((tag) =>
            <motion.div
              key={tag}
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.8
                },
                show: {
                  opacity: 1,
                  scale: 1
                }
              }}>

                <Link
                to={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-5 py-2.5 bg-gray-50 border border-gray-200 text-text-secondary rounded-xl text-sm font-bold hover:bg-primary hover:text-white hover:border-primary transition-all inline-block shadow-sm">

                  #{tag}
                </Link>
              </motion.div>
            )}
          </motion.div>

          <ShareButtons
            url={`https://renewberry.io/blog/post/${post.slug}`}
            title={post.title} />


          <AuthorBio author={post.author} />

          {/* Comment Section */}
          <CommentSection postId={post.id} postTitle={post.title} />
        </div>

        {/* Cross-Promotion CTA */}
        <motion.div
          whileHover={{
            scale: 1.02
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20
          }}
          className="bg-gradient-to-br from-secondary via-teal-800 to-primary rounded-[2.5rem] p-10 md:p-16 text-center text-white mt-16 shadow-2xl relative overflow-hidden border border-teal-700">

          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <h3 className="text-3xl md:text-5xl font-heading font-bold mb-6 relative z-10">
            Inspired by this story?
          </h3>
          <p className="text-teal-100 mb-10 text-lg md:text-xl relative z-10 max-w-2xl mx-auto leading-relaxed">
            Watch related videos and join the conversation on the main
            RenewBerry platform. Discover thousands of creators sharing hope
            daily.
          </p>
          <a
            href="https://renewberry.io"
            className="inline-block bg-white text-primary font-bold py-5 px-12 rounded-2xl hover:bg-teal-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 relative z-10 text-lg">

            Watch on RenewBerry
          </a>
        </motion.div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 &&
      <div className="bg-gray-50 py-24 border-t border-gray-200 relative z-10">
          <div className="max-w-blog mx-auto px-4">
            <div className="text-center mb-16">
              <div className="w-12 h-1.5 bg-primary rounded-full mx-auto mb-6"></div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
                Continue Reading
              </h2>
              <p className="text-xl text-text-secondary">
                More stories from {post.category.name}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((rp, idx) =>
            <motion.div
              key={rp.id}
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
              className="h-full">

                  <PostCard post={rp} />
                </motion.div>
            )}
            </div>
          </div>
        </div>
      }
    </main>);

}