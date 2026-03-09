import React, {
  useCallback,
  useEffect,
  useState,
  lazy,
  createElement } from
'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Download,
  ZoomIn,
  LayoutGrid,
  Camera,
  Calendar,
  MoreVertical,
  Info } from
'lucide-react';
import { GALLERY_IMAGES } from '../data/mockData';
import { BackgroundAnimation } from '../components/BackgroundAnimation';
const GALLERY_CATEGORIES = [
'All',
'Nature',
'People',
'Architecture',
'Abstract',
'Events',
'Community',
'Inspiration'];

const WATERMARK_URL = "/image.png";

export const downloadWithWatermark = async (
imageUrl: string,
title: string) =>
{
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
    const watermark = new Image();
    watermark.crossOrigin = 'anonymous';
    watermark.src = WATERMARK_URL;
    await new Promise((resolve, reject) => {
      watermark.onload = resolve;
      watermark.onerror = reject;
    });
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0);
    const watermarkWidth = img.width * 0.15;
    const watermarkHeight =
    watermark.height / watermark.width * watermarkWidth;
    const padding = img.width * 0.03;
    ctx.globalAlpha = 0.85;
    ctx.drawImage(
      watermark,
      img.width - watermarkWidth - padding,
      img.height - watermarkHeight - padding,
      watermarkWidth,
      watermarkHeight
    );
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    const link = document.createElement('a');
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}-renewberry.jpg`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading image with watermark:', error);
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
function GalleryLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate





}: {images: typeof GALLERY_IMAGES;currentIndex: number;onClose: () => void;onNavigate: (index: number) => void;}) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();
  const currentImage = images[currentIndex];
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0)
      onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1)
      onNavigate(currentIndex + 1);
      if (e.key === 'ArrowUp') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentIndex, images.length, onClose, onNavigate]);
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > minSwipeDistance) onClose();
  };
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY
    });
  };
  const closeContextMenu = () => setContextMenu(null);
  const handleDownload = async () => {
    setIsDownloading(true);
    await downloadWithWatermark(currentImage.imageUrl, currentImage.title);
    setIsDownloading(false);
    closeContextMenu();
  };
  const handleViewDetails = () => {
    closeContextMenu();
    onClose();
    navigate(`/gallery/${currentImage.slug}`);
  };
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={closeContextMenu}>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4 md:p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">

            <ChevronUp className="w-5 h-5" />
            <span className="hidden sm:inline">Swipe up to close</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`p-3 rounded-full transition-colors ${isLiked ? 'bg-red-500 text-white' : 'bg-white/10 text-white/80 hover:text-white'}`}>

              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              disabled={isDownloading}
              className="p-3 bg-white/10 rounded-full text-white/80 hover:text-white transition-colors disabled:opacity-50">

              <Download
                className={`w-5 h-5 ${isDownloading ? 'animate-bounce' : ''}`} />

            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setContextMenu({
                  x: window.innerWidth - 200,
                  y: 80
                });
              }}
              className="p-3 bg-white/10 rounded-full text-white/80 hover:text-white transition-colors md:hidden">

              <MoreVertical className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-3 bg-white/10 rounded-full text-white/80 hover:text-white transition-colors hidden md:block">

              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4 md:p-16 cursor-crosshair"
        onDoubleClick={handleDoubleClick}>

        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage.id}
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
            transition={{
              duration: 0.3
            }}
            src={currentImage.imageUrl}
            alt={currentImage.title}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />

        </AnimatePresence>
      </div>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu &&
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
          transition={{
            duration: 0.15
          }}
          style={{
            position: 'absolute',
            left: Math.min(contextMenu.x, window.innerWidth - 220),
            top: Math.min(contextMenu.y, window.innerHeight - 250)
          }}
          className="z-50 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-2 w-56 flex flex-col gap-1"
          onClick={(e) => e.stopPropagation()}>

            <div className="px-3 py-2 border-b border-white/10 mb-1">
              <p className="text-white font-semibold text-sm truncate">
                {currentImage.title}
              </p>
              <p className="text-white/50 text-xs">Options</p>
            </div>
            <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-white hover:bg-white/10 rounded-xl transition-colors text-left disabled:opacity-50">

              <Download className="w-4 h-4" />
              {isDownloading ? 'Downloading...' : 'Download (Watermarked)'}
            </button>
            <button
            onClick={handleViewDetails}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-white hover:bg-white/10 rounded-xl transition-colors text-left">

              <Info className="w-4 h-4" />
              View Details
            </button>
            <button
            onClick={() => {
              navigator.clipboard.writeText(
                `https://renewberry.io/gallery/${currentImage.slug}`
              );
              closeContextMenu();
            }}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-white hover:bg-white/10 rounded-xl transition-colors text-left">

              <Share2 className="w-4 h-4" />
              Copy Link
            </button>
          </motion.div>
        }
      </AnimatePresence>

      {/* Navigation Arrows */}
      {currentIndex > 0 &&
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(currentIndex - 1);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all z-20">

          <ChevronLeft className="w-6 h-6" />
        </button>
      }
      {currentIndex < images.length - 1 &&
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(currentIndex + 1);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all z-20">

          <ChevronRight className="w-6 h-6" />
        </button>
      }

      {/* Bottom Info Panel */}
      <motion.div
        initial={{
          y: 100,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          delay: 0.2
        }}
        className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent p-6 md:p-8 pointer-events-none">

        <div className="max-w-4xl mx-auto pointer-events-auto">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3">
            {currentImage.category}
          </span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
            {currentImage.title}
          </h2>
          <p className="text-white/70 mb-4 line-clamp-2 max-w-2xl">
            {currentImage.description}
          </p>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              {currentImage.photographer}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {currentImage.date}
            </span>
          </div>

          {/* Thumbnail Strip */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((img, idx) =>
            <button
              key={img.id}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(idx);
              }}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${idx === currentIndex ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'}`}>

                <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-full object-cover" />

              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Double Click Hint */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white/60 text-xs font-medium tracking-wide pointer-events-none">
        Double-click image for options
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 right-4 z-30 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-white/80 text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>);

}
export function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'masonry' | 'grid'>('masonry');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const filteredImages =
  filter === 'All' ?
  GALLERY_IMAGES :
  GALLERY_IMAGES.filter((img) => img.category === filter);
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);
  const navigateLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);
  const getCategoryCount = (category: string) => {
    if (category === 'All') return GALLERY_IMAGES.length;
    return GALLERY_IMAGES.filter((img) => img.category === category).length;
  };
  return (
    <main className="min-h-screen bg-white pb-24 relative overflow-hidden">
      <BackgroundAnimation variant="light" />

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4 relative z-10 bg-gray-50 border-b border-gray-100">
        <div className="max-w-blog mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
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
                duration: 0.6
              }}
              className="max-w-2xl">

              <h1 className="text-5xl md:text-7xl font-heading font-black text-text-primary mb-6 tracking-tight">
                Visual <span className="text-primary">Stories</span>
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                Explore moments of hope, renewal, and beauty captured by our
                global community of creators. Every image tells a story worth
                sharing.
              </p>
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
                duration: 0.6,
                delay: 0.2
              }}
              className="flex flex-col items-start md:items-end gap-2">

              <div className="text-sm font-bold text-text-muted uppercase tracking-widest">
                Total Captures
              </div>
              <div className="text-4xl font-heading font-bold text-secondary">
                {GALLERY_IMAGES.length}
              </div>
            </motion.div>
          </div>

          {/* Category Filters */}
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
              delay: 0.1
            }}
            className="flex flex-wrap gap-3">

            {GALLERY_CATEGORIES.map((cat) =>
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`group flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${filter === cat ? 'bg-text-primary text-white shadow-lg scale-105' : 'bg-white text-text-secondary hover:bg-gray-100 border border-gray-200 hover:border-gray-300'}`}>

                <span>{cat}</span>
                <span
                className={`text-xs px-2 py-0.5 rounded-full transition-colors ${filter === cat ? 'bg-white/20 text-white' : 'bg-gray-100 text-text-muted group-hover:bg-gray-200'}`}>

                  {getCategoryCount(cat)}
                </span>
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Gallery Controls */}
      <div className="max-w-[1600px] mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-text-muted font-medium">
            Showing{' '}
            <span className="font-bold text-text-primary">
              {filteredImages.length}
            </span>{' '}
            images
          </p>
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1 border border-gray-200">
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-2.5 rounded-lg transition-all ${viewMode === 'masonry' ? 'bg-white text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
              title="Masonry View">

              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
              title="Grid View">

              <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm" />
                <div className="bg-current rounded-sm" />
                <div className="bg-current rounded-sm" />
                <div className="bg-current rounded-sm" />
              </div>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className={
          viewMode === 'masonry' ?
          'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6' :
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          }>

          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, idx) =>
            <motion.div
              layout
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 0.9
              }}
              transition={{
                duration: 0.4,
                delay: idx * 0.05
              }}
              key={image.id}
              className={viewMode === 'masonry' ? 'break-inside-avoid' : ''}>

                <div
                onClick={() => openLightbox(idx)}
                className={`relative rounded-2xl overflow-hidden group bg-gray-100 cursor-pointer ${viewMode === 'grid' ? 'aspect-[4/5]' : ''}`}>

                  <img
                  src={image.imageUrl}
                  alt={image.title}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${viewMode === 'grid' ? 'h-full' : 'h-auto'}`}
                  loading="lazy" />

                  {/* Quick Actions Overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0">
                    <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(idx);
                    }}
                    className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">

                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      await downloadWithWatermark(image.imageUrl, image.title);
                    }}
                    className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">

                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3 w-fit">
                      {image.category}
                    </span>
                    <h3 className="text-white font-heading font-bold text-xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {image.title}
                    </h3>
                    <p className="text-white/70 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      {image.photographer}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          className="text-center py-32">

            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-text-primary mb-3">
              No images found
            </h3>
            <p className="text-text-muted text-lg">
              Try selecting a different category to explore more stories.
            </p>
          </motion.div>
        }

        {/* Load More */}
        {filteredImages.length > 0 &&
        <div className="text-center mt-20">
            <button className="bg-white border border-gray-200 text-text-primary font-bold py-4 px-10 rounded-full hover:border-primary hover:text-primary hover:shadow-lg transition-all duration-300">
              Load More Images
            </button>
          </div>
        }
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null &&
        <GalleryLightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox} />

        }
      </AnimatePresence>
    </main>);

}