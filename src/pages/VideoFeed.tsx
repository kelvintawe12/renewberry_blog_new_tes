import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Share2,
  Play,
  Volume2,
  VolumeX,
  Sparkles,
  ExternalLink,
  ChevronLeft } from
'lucide-react';
import { Link } from 'react-router-dom';
import { REAL_VIDEOS, RealVideo } from '../data/videoData';
// Helper to format numbers (e.g., 1200 -> 1.2K)
const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};
// Helper to check if a URL is a YouTube link
const isYouTubeUrl = (url: string) => {
  return url.includes('youtu.be') || url.includes('youtube.com');
};
// Generate a consistent avatar based on user_id
const getAvatarUrl = (userId: string) => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
};
export function VideoFeed() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [playingStates, setPlayingStates] = useState<Record<number, boolean>>(
    {}
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  // Setup Intersection Observer to handle auto-play/pause on scroll
  useEffect(() => {
    const options = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.6 // Trigger when 60% of the video is visible
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute('data-index'));
        const videoElement = videoRefs.current[index];
        if (entry.isIntersecting) {
          setActiveVideoIndex(index);
          if (videoElement) {
            videoElement.
            play().
            then(() => {
              setPlayingStates((prev) => ({
                ...prev,
                [index]: true
              }));
            }).
            catch((e) => {
              console.log('Autoplay prevented:', e);
              setPlayingStates((prev) => ({
                ...prev,
                [index]: false
              }));
            });
          }
        } else {
          if (videoElement) {
            videoElement.pause();
            videoElement.currentTime = 0; // Reset video when scrolled away
            setPlayingStates((prev) => ({
              ...prev,
              [index]: false
            }));
          }
        }
      });
    }, options);
    // Observe all video containers
    const elements = document.querySelectorAll('.video-container');
    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  const togglePlayPause = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    if (video.paused) {
      video.
      play().
      then(() => {
        setPlayingStates((prev) => ({
          ...prev,
          [index]: true
        }));
      }).
      catch(console.error);
    } else {
      video.pause();
      setPlayingStates((prev) => ({
        ...prev,
        [index]: false
      }));
    }
  };
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };
  return (
    <main className="bg-black min-h-screen w-full fixed inset-0 z-50 flex justify-center overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-4 md:p-6 pointer-events-none bg-gradient-to-b from-black/60 to-transparent">
        <Link
          to="/"
          className="text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md p-2 md:p-3 rounded-full transition-all pointer-events-auto flex items-center justify-center">

          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center gap-6 pointer-events-auto">
          <button className="text-white/60 font-bold text-base md:text-lg hover:text-white transition-colors">
            Following
          </button>
          <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          <button className="text-white font-bold text-base md:text-lg border-b-2 border-white pb-1">
            For You
          </button>
        </div>
        <div className="w-10 md:w-12"></div> {/* Spacer for balance */}
      </div>

      {/* Main Feed Container */}
      <div
        ref={containerRef}
        className="w-full max-w-[500px] h-[100dvh] overflow-y-scroll snap-y-mandatory no-scrollbar relative bg-black">

        {REAL_VIDEOS.map((video, index) => {
          const isActive = index === activeVideoIndex;
          const isPlaying = playingStates[index] || false;
          const isYouTube = isYouTubeUrl(video.video_url);
          return (
            <div
              key={video.id}
              data-index={index}
              className="video-container w-full h-[100dvh] snap-start relative flex items-center justify-center overflow-hidden bg-gray-900"
              onClick={() => !isYouTube && togglePlayPause(index)}>

              {/* Video Player or YouTube Fallback */}
              {isYouTube ?
              <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <img
                  src={
                  video.thumbnail_url ||
                  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop'
                  }
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm" />

                  <a
                  href={video.video_url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="z-20 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-transform hover:scale-105 shadow-lg">

                    <ExternalLink className="w-5 h-5" />
                    Watch on YouTube
                  </a>
                </div> :

              <video
                ref={(el) => videoRefs.current[index] = el}
                src={video.video_url}
                poster={video.thumbnail_url || undefined}
                className="w-full h-full object-cover"
                loop
                playsInline
                muted={isMuted} />

              }

              {/* Overlay Gradient for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 pointer-events-none"></div>

              {/* Play/Pause Indicator Overlay */}
              <AnimatePresence>
                {!isPlaying && isActive && !isYouTube &&
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.5
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.5
                  }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">

                    <div className="w-20 h-20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center">
                      <Play className="w-10 h-10 text-white ml-1 fill-white opacity-80" />
                    </div>
                  </motion.div>
                }
              </AnimatePresence>

              {/* Audio Controls (Only for native videos) */}
              {!isYouTube &&
              <button
                onClick={toggleMute}
                className="absolute top-20 right-4 z-40 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md p-3 rounded-full transition-all pointer-events-auto">

                  {isMuted ?
                <VolumeX className="w-5 h-5" /> :

                <Volume2 className="w-5 h-5" />
                }
                </button>
              }

              {/* Bottom Info Area */}
              <div className="absolute bottom-0 left-0 right-16 p-4 md:p-6 z-30 pointer-events-none pb-6 md:pb-8 flex flex-col justify-end">
                {/* Username & Avatar */}
                <Link
                  to={`/author/${video.user_id}`}
                  className="inline-flex items-center gap-3 mb-3 pointer-events-auto group w-fit"
                  onClick={(e) => e.stopPropagation()}>

                  <span className="text-white font-bold text-base md:text-lg group-hover:underline shadow-sm drop-shadow-md">
                    @{video.user_id.substring(0, 8)}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] uppercase px-2 py-0.5 rounded-full font-bold tracking-wider">
                    {video.uploader_role.replace('_', ' ')}
                  </span>
                </Link>

                {/* Title */}
                <h2 className="text-white font-bold text-lg md:text-xl mb-2 drop-shadow-md leading-tight">
                  {video.title}
                </h2>

                {/* Description */}
                <p className="text-white/90 text-sm mb-3 line-clamp-2 drop-shadow-md">
                  {video.description}
                </p>

                {/* Tags & Category */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                    {video.category}
                  </span>
                  {video.tags?.map((tag, i) =>
                  <span
                    key={i}
                    className="text-white/80 text-sm font-medium drop-shadow-md">

                      {tag}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Sidebar Actions */}
              <div className="absolute bottom-6 right-2 md:right-4 flex flex-col items-center gap-5 md:gap-6 z-30 pointer-events-auto pb-2">
                {/* Profile Picture */}
                <Link
                  to={`/author/${video.user_id}`}
                  className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden mb-2 bg-gray-800"
                  onClick={(e) => e.stopPropagation()}>

                  <img
                    src={getAvatarUrl(video.user_id)}
                    alt="Creator avatar"
                    className="w-full h-full object-cover" />

                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border border-white">
                    +
                  </div>
                </Link>

                {/* Like Button */}
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col items-center gap-1 group">

                  <div className="w-10 h-10 md:w-12 md:h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <Heart className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:fill-red-500 group-hover:text-red-500 transition-colors drop-shadow-md" />
                  </div>
                  <span className="text-white font-bold text-xs drop-shadow-md">
                    {formatNumber(video.likes)}
                  </span>
                </button>

                {/* Love Button */}
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col items-center gap-1 group">

                  <div className="w-10 h-10 md:w-12 md:h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:fill-amber-400 group-hover:text-amber-400 transition-colors drop-shadow-md" />
                  </div>
                  <span className="text-white font-bold text-xs drop-shadow-md">
                    {formatNumber(video.loves)}
                  </span>
                </button>

                {/* Comment Button */}
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col items-center gap-1 group">

                  <div className="w-10 h-10 md:w-12 md:h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:fill-white transition-colors drop-shadow-md" />
                  </div>
                  <span className="text-white font-bold text-xs drop-shadow-md">
                    {formatNumber(video.comments_count)}
                  </span>
                </button>

                {/* Share Button */}
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col items-center gap-1 group">

                  <div className="w-10 h-10 md:w-12 md:h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <Share2 className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-md" />
                  </div>
                  <span className="text-white font-bold text-xs drop-shadow-md">
                    Share
                  </span>
                </button>
              </div>
            </div>);

        })}
      </div>
    </main>);

}