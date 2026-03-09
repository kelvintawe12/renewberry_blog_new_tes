import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SettingsIcon, RotateCcwIcon, MousePointer2Icon } from 'lucide-react';
import { Threads } from '../components/Threads';
export function MousePlayground() {
  const [showControls, setShowControls] = useState(false);
  // Threads configuration state
  const [colorR, setColorR] = useState(1);
  const [colorG, setColorG] = useState(1);
  const [colorB, setColorB] = useState(1);
  const [amplitude, setAmplitude] = useState(1);
  const [distance, setDistance] = useState(0);
  const [enableMouseInteraction, setEnableMouseInteraction] = useState(true);
  const handleReset = () => {
    setColorR(1);
    setColorG(1);
    setColorB(1);
    setAmplitude(1);
    setDistance(0);
    setEnableMouseInteraction(true);
  };
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden relative font-body select-none">
      {/* Background Threads Animation */}
      <div className="absolute inset-0 z-0">
        <Threads
          color={[colorR, colorG, colorB]}
          amplitude={amplitude}
          distance={distance}
          enableMouseInteraction={enableMouseInteraction} />

      </div>

      {/* UI Overlay */}
      <div className="relative z-10 h-screen flex flex-col pointer-events-none">
        {/* Top Bar */}
        <header className="p-4 sm:p-6 flex justify-between items-start pointer-events-auto">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
            <h1 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Threads Playground
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Interactive WebGL flowing lines
            </p>
          </div>

          <button
            onClick={() => setShowControls(!showControls)}
            className="bg-black/40 backdrop-blur-xl border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-colors shadow-2xl"
            aria-label="Toggle Controls">

            <SettingsIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
          </button>
        </header>

        {/* Main Game Area / Hint */}
        <main className="flex-1 flex flex-col items-center justify-center pointer-events-none">
          <AnimatePresence>
            {!showControls && enableMouseInteraction &&
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -20
              }}
              transition={{
                delay: 0.5
              }}
              className="absolute bottom-12 flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full text-gray-300 shadow-2xl">

                <MousePointer2Icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium tracking-wide">
                  Move your mouse to interact
                </span>
              </motion.div>
            }
          </AnimatePresence>
        </main>
      </div>

      {/* Controls Modal */}
      <AnimatePresence>
        {showControls &&
        <motion.div
          initial={{
            opacity: 0,
            x: 20,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1
          }}
          exit={{
            opacity: 0,
            x: 20,
            scale: 0.95
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }}
          className="absolute top-24 right-4 sm:right-6 bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl w-80 z-50 shadow-2xl">

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-heading font-bold text-white">
                Configuration
              </h3>
              <button
              onClick={handleReset}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Reset to defaults">

                <RotateCcwIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Color Controls */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Color (RGB)
                </h4>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-red-400">Red</span>
                    <span className="text-gray-400 font-mono">
                      {colorR.toFixed(2)}
                    </span>
                  </div>
                  <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={colorR}
                  onChange={(e) => setColorR(parseFloat(e.target.value))}
                  className="w-full accent-red-500" />

                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-green-400">Green</span>
                    <span className="text-gray-400 font-mono">
                      {colorG.toFixed(2)}
                    </span>
                  </div>
                  <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={colorG}
                  onChange={(e) => setColorG(parseFloat(e.target.value))}
                  className="w-full accent-green-500" />

                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-blue-400">Blue</span>
                    <span className="text-gray-400 font-mono">
                      {colorB.toFixed(2)}
                    </span>
                  </div>
                  <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={colorB}
                  onChange={(e) => setColorB(parseFloat(e.target.value))}
                  className="w-full accent-blue-500" />

                </div>
              </div>

              <div className="h-px w-full bg-white/10" />

              {/* Shape Controls */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Shape & Flow
                </h4>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300">Amplitude</span>
                    <span className="text-gray-400 font-mono">
                      {amplitude.toFixed(2)}
                    </span>
                  </div>
                  <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={amplitude}
                  onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                  className="w-full accent-primary" />

                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300">Distance</span>
                    <span className="text-gray-400 font-mono">
                      {distance.toFixed(2)}
                    </span>
                  </div>
                  <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={distance}
                  onChange={(e) => setDistance(parseFloat(e.target.value))}
                  className="w-full accent-primary" />

                </div>
              </div>

              <div className="h-px w-full bg-white/10" />

              {/* Interaction */}
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  Mouse Interaction
                </span>
                <div className="relative">
                  <input
                  type="checkbox"
                  className="sr-only"
                  checked={enableMouseInteraction}
                  onChange={(e) =>
                  setEnableMouseInteraction(e.target.checked)
                  } />

                  <div
                  className={`block w-10 h-6 rounded-full transition-colors ${enableMouseInteraction ? 'bg-primary' : 'bg-gray-700'}`}>
                </div>
                  <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${enableMouseInteraction ? 'translate-x-4' : 'translate-x-0'}`}>
                </div>
                </div>
              </label>
            </div>

            <button
            onClick={() => setShowControls(false)}
            className="w-full mt-8 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-colors">

              Close Panel
            </button>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}