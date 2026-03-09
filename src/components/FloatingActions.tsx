import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronUp,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  X } from
'lucide-react';
export function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
    setIsShareOpen(false);
  };
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      <AnimatePresence>
        {isShareOpen &&
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          exit={{
            opacity: 0,
            y: 10,
            scale: 0.9
          }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mb-2 flex gap-3">

            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
            <button
            onClick={handleCopy}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">

              <LinkIcon className="w-5 h-5" />
            </button>
          </motion.div>
        }
      </AnimatePresence>

      <motion.button
        whileHover={{
          scale: 1.1
        }}
        whileTap={{
          scale: 0.9
        }}
        onClick={() => setIsShareOpen(!isShareOpen)}
        className="w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-hover transition-colors"
        aria-label="Share page">

        {isShareOpen ?
        <X className="w-5 h-5" /> :

        <Share2 className="w-5 h-5" />
        }
      </motion.button>

      <AnimatePresence>
        {isVisible &&
        <motion.button
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
            scale: 0.5
          }}
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: 0.9
          }}
          onClick={scrollToTop}
          className="w-12 h-12 bg-secondary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-secondary-hover transition-colors"
          aria-label="Scroll to top">

            <ChevronUp className="w-6 h-6" />
          </motion.button>
        }
      </AnimatePresence>
    </div>);

}