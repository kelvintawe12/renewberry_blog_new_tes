import React from 'react';
import { motion } from 'framer-motion';
import { Author } from '../data/mockData';
interface RadialTeamIntroProps {
  items: Author[];
}
export function RadialTeamIntro({ items }: RadialTeamIntroProps) {
  const innerRing = items.slice(0, 2);
  const outerRing = items.slice(2);
  // Decorative particles configuration
  const particles = [
  {
    radius: 'clamp(80px, 15vw, 150px)',
    duration: '15s',
    delay: '0s',
    direction: 'normal',
    size: 'w-1.5 h-1.5'
  },
  {
    radius: 'clamp(110px, 20vw, 200px)',
    duration: '25s',
    delay: '-5s',
    direction: 'reverse',
    size: 'w-2 h-2'
  },
  {
    radius: 'clamp(140px, 25vw, 250px)',
    duration: '20s',
    delay: '-10s',
    direction: 'normal',
    size: 'w-1.5 h-1.5'
  },
  {
    radius: 'clamp(180px, 32vw, 320px)',
    duration: '30s',
    delay: '-2s',
    direction: 'reverse',
    size: 'w-2 h-2'
  },
  {
    radius: 'clamp(200px, 35vw, 350px)',
    duration: '35s',
    delay: '-15s',
    direction: 'normal',
    size: 'w-1.5 h-1.5'
  },
  {
    radius: 'clamp(220px, 38vw, 380px)',
    duration: '40s',
    delay: '-8s',
    direction: 'reverse',
    size: 'w-2 h-2'
  }];

  return (
    <div className="relative w-full max-w-4xl mx-auto min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden py-20">
      {/* 5) SVG Connection Lines (Static Decorative) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg">

        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(8,145,178,0.02)" />
            <stop offset="50%" stopColor="rgba(8,145,178,0.15)" />
            <stop offset="100%" stopColor="rgba(8,145,178,0.02)" />
          </linearGradient>
        </defs>
        {/* Radial lines from center */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) =>
        <motion.line
          key={i}
          x1="50%"
          y1="50%"
          x2={`${50 + 50 * Math.cos(angle * Math.PI / 180)}%`}
          y2={`${50 + 50 * Math.sin(angle * Math.PI / 180)}%`}
          stroke="url(#lineGrad)"
          strokeWidth="1"
          strokeDasharray="4 8"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 0.5 + i * 0.1,
            duration: 1
          }} />

        )}
      </svg>

      {/* 3) Decorative Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 1,
            delay: 0.2
          }}
          className="absolute w-[clamp(200px,36vw,360px)] h-[clamp(200px,36vw,360px)] rounded-full border border-gray-200/30" />

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 1,
            delay: 0.4
          }}
          className="absolute w-[clamp(260px,45vw,450px)] h-[clamp(260px,45vw,450px)] rounded-full border border-teal-200/20 border-dashed" />

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 1,
            delay: 0.6
          }}
          className="absolute w-[clamp(320px,60vw,600px)] h-[clamp(320px,60vw,600px)] rounded-full border border-gray-200/30" />

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 1,
            delay: 0.8
          }}
          className="absolute w-[clamp(400px,75vw,750px)] h-[clamp(400px,75vw,750px)] rounded-full border border-teal-200/10 border-dashed" />

      </div>

      {/* 4) Animated Particle Dots */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        {particles.map((p, i) =>
        <div
          key={i}
          className="absolute"
          style={
          {
            '--orbit-radius': p.radius
          } as React.CSSProperties
          }>

            <div
            className="animate-orbit"
            style={{
              animationDuration: p.duration,
              animationDelay: p.delay,
              animationDirection: p.direction as any
            }}>

              <div
              className={`${p.size} bg-teal-400/40 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.6)]`} />

            </div>
          </div>
        )}
      </div>

      {/* 2) CENTER ELEMENT - Dramatic pulsing core */}
      <div className="absolute z-20 flex items-center justify-center">
        {/* Pulsing Glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute w-32 h-32 md:w-40 md:h-40 bg-primary/20 rounded-full blur-xl" />


        {/* Core Logo */}
        <motion.div
          initial={{
            scale: 0,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20
          }}
          className="relative flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 bg-white rounded-full shadow-2xl border-4 border-teal-50 z-10">

          <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-1 md:mb-2 md:w-12 md:h-12">

            <defs>
              <linearGradient
                id="berryGradRadial"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%">

                <stop offset="0%" stopColor="#0891B2" />
                <stop offset="100%" stopColor="#134E4A" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="55" r="35" fill="url(#berryGradRadial)" />
            <path d="M50 20 C40 10, 30 20, 50 35" fill="#4ADE80" />
            <path d="M50 20 C60 10, 70 20, 50 35" fill="#22C55E" />
            <path d="M50 20 C50 5, 65 5, 50 35" fill="#16A34A" />
          </svg>
          <span className="font-heading text-[0.4rem] md:text-[0.5rem] leading-none tracking-[0.2em] uppercase text-text-secondary font-bold">
            GoodMorningDewPub
          </span>
          <span className="font-heading font-bold text-xs md:text-sm leading-none text-secondary tracking-tight mt-1">
            RenewBerry
          </span>
        </motion.div>
      </div>

      {/* 1) DUAL ORBIT RINGS - Avatars */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        {/* INNER RING (Counter-clockwise, slower) */}
        {innerRing.map((item, index) => {
          const angle = index / innerRing.length * 360;
          return (
            <motion.div
              key={item.id}
              initial={{
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: 1,
                opacity: 1
              }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: index * 0.15 + 0.3
              }}
              className="absolute"
              style={
              {
                transform: `rotate(${angle}deg)`,
                '--orbit-radius': 'clamp(100px, 18vw, 180px)'
              } as React.CSSProperties
              }>

              <div
                className="animate-orbit"
                style={{
                  animationDuration: '35s',
                  animationDirection: 'reverse',
                  animationDelay: `-${index * (35 / innerRing.length)}s`
                }}>

                <div className="relative group cursor-pointer">
                  {/* Subtle Glow Ring */}
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-md scale-110 opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />

                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-115 group-hover:border-teal-100 transition-all duration-300 relative z-10" />


                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-40 shadow-xl">
                    {item.name}
                    <div className="text-xs text-gray-300 font-normal mt-0.5">
                      {item.role}
                    </div>
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
                  </div>
                </div>
              </div>
            </motion.div>);

        })}

        {/* OUTER RING (Clockwise, faster) */}
        {outerRing.map((item, index) => {
          const angle = index / outerRing.length * 360;
          return (
            <motion.div
              key={item.id}
              initial={{
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: 1,
                opacity: 1
              }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: (index + innerRing.length) * 0.15 + 0.3
              }}
              className="absolute"
              style={
              {
                transform: `rotate(${angle}deg)`,
                '--orbit-radius': 'clamp(160px, 30vw, 300px)'
              } as React.CSSProperties
              }>

              <div
                className="animate-orbit"
                style={{
                  animationDuration: '25s',
                  animationDelay: `-${index * (25 / outerRing.length)}s`
                }}>

                <div className="relative group cursor-pointer">
                  {/* Subtle Glow Ring */}
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-md scale-110 opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />

                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-115 group-hover:border-teal-100 transition-all duration-300 relative z-10" />


                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-40 shadow-xl">
                    {item.name}
                    <div className="text-xs text-gray-300 font-normal mt-0.5">
                      {item.role}
                    </div>
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
                  </div>
                </div>
              </div>
            </motion.div>);

        })}
      </div>
    </div>);

}