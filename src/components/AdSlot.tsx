import React, { useEffect, useState, createElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Video,
  Users,
  Smartphone,
  ShoppingBag,
  Megaphone } from
'lucide-react';
interface AdSlotProps {
  position: string;
  size?: 'banner' | 'sidebar' | 'inline';
  className?: string;
}
const ADS = [
{
  id: 1,
  title: 'RenewBerry Premium',
  desc: 'Unlock exclusive features and ad-free viewing.',
  cta: 'Upgrade Now',
  icon: Sparkles,
  gradient: 'from-teal-500 to-cyan-600'
},
{
  id: 2,
  title: 'Creator Workshop',
  desc: 'Learn storytelling from top creators.',
  cta: 'Enroll Free',
  icon: Video,
  gradient: 'from-emerald-500 to-teal-600'
},
{
  id: 3,
  title: 'Partner With Us',
  desc: 'Grow your audience and earn revenue.',
  cta: 'Apply Today',
  icon: Users,
  gradient: 'from-cyan-500 to-blue-600'
},
{
  id: 4,
  title: 'Download the App',
  desc: 'Hope in your pocket. Available on iOS & Android.',
  cta: 'Get the App',
  icon: Smartphone,
  gradient: 'from-indigo-500 to-cyan-500'
},
{
  id: 5,
  title: 'RenewBerry Merch',
  desc: 'Wear your values. Shop the new collection.',
  cta: 'Shop Now',
  icon: ShoppingBag,
  gradient: 'from-rose-500 to-orange-500'
},
{
  id: 6,
  title: 'Advertise Here',
  desc: 'Reach 1M+ creators and viewers globally.',
  cta: 'Start Campaign',
  icon: Megaphone,
  gradient: 'from-amber-500 to-orange-600'
}];

export function AdSlot({
  position,
  size = 'banner',
  className = ''
}: AdSlotProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ADS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const sizeClasses = {
    banner: 'w-full h-[120px] md:h-[140px]',
    sidebar: 'w-full h-[300px] md:h-[350px]',
    inline: 'w-full h-[200px]'
  };
  const isVertical = size === 'sidebar';
  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-sm group ${sizeClasses[size]} ${className}`}
      aria-label={`Advertisement slot: ${position}`}>

      {/* Ad Label */}
      <div className="absolute top-2 right-2 z-20 bg-black/20 backdrop-blur-md text-white/80 text-[10px] uppercase font-bold px-2 py-1 rounded-md tracking-wider">
        Ad
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{
            opacity: 0,
            scale: 1.05
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut'
          }}
          className={`absolute inset-0 bg-gradient-to-br ${ADS[currentIndex].gradient} text-white flex ${isVertical ? 'flex-col justify-center text-center p-8' : 'flex-row items-center justify-between p-6 md:p-8'}`}>

          <div
            className={`flex ${isVertical ? 'flex-col items-center' : 'flex-row items-center'} gap-4 md:gap-6 z-10`}>

            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
              {createElement(ADS[currentIndex].icon, {
                className: 'w-6 h-6 md:w-8 md:h-8 text-white'
              })}
            </div>
            <div className={isVertical ? 'mt-2' : ''}>
              <h3 className="font-heading font-bold text-lg md:text-xl lg:text-2xl mb-1 leading-tight">
                {ADS[currentIndex].title}
              </h3>
              <p className="text-white/80 text-sm md:text-base max-w-md line-clamp-2">
                {ADS[currentIndex].desc}
              </p>
            </div>
          </div>

          <div
            className={`z-10 ${isVertical ? 'mt-8' : 'hidden sm:block flex-shrink-0 ml-4'}`}>

            <button className="bg-white text-gray-900 font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm whitespace-nowrap">
              {ADS[currentIndex].cta}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20">
        {ADS.map((_, idx) =>
        <button
          key={idx}
          onClick={() => setCurrentIndex(idx)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'}`}
          aria-label={`Go to ad slide ${idx + 1}`} />

        )}
      </div>
    </div>);

}