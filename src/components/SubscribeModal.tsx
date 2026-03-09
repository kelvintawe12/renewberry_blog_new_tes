import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail } from 'lucide-react';
interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>(
    'idle'
  );
  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setEmail('');
      setName('');
    }
  }, [isOpen]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1000);
  };
  return (
    <AnimatePresence>
      {isOpen &&
      <>
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
          onClick={onClose}
          className="fixed inset-0 bg-secondary/80 backdrop-blur-sm z-50" />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20
            }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto relative">

              <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              aria-label="Close modal">

                <X className="w-6 h-6" />
              </button>

              <div className="bg-gradient-to-br from-primary/10 to-teal-50 p-8 text-center border-b border-teal-100">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                  <Mail className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-secondary mb-2">
                  Stay Inspired
                </h2>
                <p className="text-text-secondary text-sm">
                  Get fresh stories, creator tips, and platform updates
                  delivered weekly.
                </p>
              </div>

              <div className="p-8">
                {status === 'success' ?
              <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">

                        <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7" />

                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">
                      You're on the list!
                    </h3>
                    <p className="text-text-secondary">
                      Keep an eye on your inbox.
                    </p>
                  </div> :

              <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text-primary mb-1">

                        First Name (optional)
                      </label>
                      <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Jane" />

                    </div>
                    <div>
                      <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-primary mb-1">

                        Email Address *
                      </label>
                      <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="jane@example.com" />

                    </div>
                    <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition-colors mt-4 disabled:opacity-70">

                      {status === 'submitting' ?
                  'Subscribing...' :
                  'Subscribe Now'}
                    </button>
                    <p className="text-xs text-center text-text-muted mt-4">
                      By subscribing, you agree to our Privacy Policy. No spam,
                      ever.
                    </p>
                  </form>
              }
              </div>
            </motion.div>
          </div>
        </>
      }
    </AnimatePresence>);

}