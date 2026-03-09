import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Camera,
  Tag,
  Maximize2,
  Download,
  Share2 } from
'lucide-react';
import { GALLERY_IMAGES } from '../data/mockData';
import { ShareButtons } from '../components/ShareButtons';
import { BackgroundAnimation } from '../components/BackgroundAnimation';
import { downloadWithWatermark } from './GalleryPage';
export function GalleryDetail() {
  const { slug } = useParams<{
    slug: string;
  }>();
  const [isDownloading, setIsDownloading] = useState(false);
  const image = GALLERY_IMAGES.find((img) => img.slug === slug);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  if (!image) {
    return <Navigate to="/gallery" replace />;
  }
  const relatedImages = GALLERY_IMAGES.filter(
    (img) => img.category === image.category && img.id !== image.id
  ).slice(0, 4);
  const handleDownload = async () => {
    setIsDownloading(true);
    await downloadWithWatermark(image.imageUrl, image.title);
    setIsDownloading(false);
  };
  return (
    <main className="min-h-screen bg-white pb-24 relative">
      <BackgroundAnimation variant="light" />

      {/* Immersive Hero Section */}
      <div className="relative w-full h-[70vh] md:h-[85vh] bg-black overflow-hidden group">
        {/* Ken Burns Image */}
        <motion.img
          initial={{
            scale: 1.1,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            duration: 1.5,
            ease: 'easeOut'
          }}
          src={image.imageUrl}
          alt={image.title}
          className="w-full h-full object-cover opacity-90 animate-ken-burns" />


        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 pointer-events-none" />

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 pt-24 pb-6 px-6 md:px-12 z-20 flex justify-between items-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10">

            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-5 py-2.5 rounded-full transition-colors disabled:opacity-50">

              <Download
                className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />

              <span className="hidden sm:inline">
                {isDownloading ? 'Downloading...' : 'Download'}
              </span>
            </button>
            <button className="w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/90 hover:text-white border border-white/10 transition-colors">
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              delay: 0.3
            }}
            className="max-w-3xl">

            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-sm font-bold uppercase tracking-wider rounded-full mb-4 border border-white/10">
              {image.category}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-2 leading-tight drop-shadow-lg">
              {image.title}
            </h1>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.8,
              delay: 0.5
            }}
            className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">

            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-white/70 uppercase tracking-wider font-bold mb-0.5">
                Photographer
              </p>
              <p className="text-white font-bold text-lg leading-none">
                {image.photographer}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            delay: 0.2
          }}>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <p className="text-2xl text-text-secondary leading-relaxed mb-12 font-medium">
                {image.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 border-y border-gray-100 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-text-primary">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted font-semibold uppercase tracking-wider">
                      Captured On
                    </p>
                    <p className="font-bold text-text-primary text-lg">
                      {image.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-text-primary">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted font-semibold uppercase tracking-wider">
                      License
                    </p>
                    <p className="font-bold text-text-primary text-lg">
                      Editorial Use
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-sm text-text-muted font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {image.tags.map((tag) =>
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-50 text-text-secondary rounded-lg text-sm font-bold border border-gray-200 hover:border-primary hover:text-primary transition-colors cursor-pointer">

                      #{tag}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Actions */}
            <div className="w-full md:w-72 flex-shrink-0 space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="font-heading font-bold text-lg mb-4">
                  Download Image
                </h3>
                <p className="text-sm text-text-muted mb-6">
                  High-resolution image with RenewBerry watermark for editorial
                  use.
                </p>
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-2 bg-text-primary hover:bg-black text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50">

                  <Download className="w-5 h-5" />
                  {isDownloading ? 'Processing...' : 'Download HD'}
                </button>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="font-heading font-bold text-lg mb-4">
                  Share Story
                </h3>
                <ShareButtons
                  url={`https://renewberry.io/gallery/${image.slug}`}
                  title={image.title} />

              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Images */}
      {relatedImages.length > 0 &&
      <div className="bg-gray-50 py-24 border-t border-gray-100 relative z-10">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-2">
                  More from {image.category}
                </h2>
                <p className="text-text-secondary text-lg">
                  Explore similar visual stories.
                </p>
              </div>
              <Link
              to="/gallery"
              className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors">

                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedImages.map((img, idx) =>
            <motion.div
              key={img.id}
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
              }}>

                  <Link
                to={`/gallery/${img.slug}`}
                className="block relative rounded-2xl overflow-hidden group bg-white shadow-sm hover:shadow-xl transition-all duration-500 aspect-square">

                    <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white font-heading font-bold text-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {img.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
            )}
            </div>
          </div>
        </div>
      }
    </main>);

}