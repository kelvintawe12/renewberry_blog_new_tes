import React from 'react';
interface BackgroundAnimationProps {
  variant?: 'light' | 'dark';
  className?: string;
}
export function BackgroundAnimation({
  variant = 'light',
  className = ''
}: BackgroundAnimationProps) {
  const isDark = variant === 'dark';
  const blobColors = isDark ?
  ['bg-teal-500/10', 'bg-cyan-500/10', 'bg-primary/10'] :
  ['bg-teal-200/20', 'bg-cyan-200/20', 'bg-primary/5'];
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>

      <div
        className={`absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-3xl ${blobColors[0]} animate-blob-morph`}>
      </div>
      <div
        className={`absolute top-[20%] right-[-5%] w-[35vw] h-[35vw] rounded-full blur-3xl ${blobColors[1]} animate-blob-morph-delayed`}>
      </div>
      <div
        className={`absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full blur-3xl ${blobColors[2]} animate-blob-morph`}
        style={{
          animationDelay: '2s'
        }}>
      </div>
    </div>);

}