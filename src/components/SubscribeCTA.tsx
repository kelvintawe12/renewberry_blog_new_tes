import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
export function SubscribeCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>(
    'idle'
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };
  return (
    <section className="bg-gradient-to-br from-secondary via-teal-800 to-primary rounded-3xl p-8 md:p-16 text-white text-center relative overflow-hidden my-16 shadow-2xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl animate-pulse-soft"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300 opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl animate-float"></div>
        {/* Particles */}
        {Array.from({
          length: 10
        }).map((_, i) =>
        <div
          key={i}
          className="absolute rounded-full bg-white/20 animate-float"
          style={{
            width: Math.random() * 6 + 2 + 'px',
            height: Math.random() * 6 + 2 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 5}s`
          }} />

        )}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
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
            once: true
          }}
          transition={{
            duration: 0.6
          }}>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 leading-tight">
            Get Fresh Stories & Platform Updates
          </h2>
          <p className="text-teal-100 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of creators and readers. Weekly inspiration delivered
            straight to your inbox.
          </p>
        </motion.div>

        {status === 'success' ?
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl inline-block">

            <motion.div
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 10,
              delay: 0.1
            }}
            className="w-16 h-16 bg-green-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">

              <CheckCircle2 className="w-8 h-8" />
            </motion.div>
            <p className="text-2xl font-heading font-bold mb-2">
              You're on the list!
            </p>
            <p className="text-teal-50">
              Check your inbox for the latest stories.
            </p>
          </motion.div> :

        <motion.form
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
            duration: 0.6,
            delay: 0.2
          }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">

            <div className="relative flex-grow">
              <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full px-5 py-4 rounded-xl text-text-primary focus:outline-none focus:ring-4 focus:ring-cyan-300/50 transition-all shadow-inner bg-white/95 backdrop-blur-sm"
              aria-label="Email address" />

            </div>
            <button
            type="submit"
            disabled={status === 'submitting'}
            className="bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-hover hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 shadow-md border border-white/10">

              {status === 'submitting' ?
            <span className="animate-pulse">Subscribing...</span> :

            <>
                  Subscribe <Send className="w-4 h-4" />
                </>
            }
            </button>
          </motion.form>
        }
      </div>
    </section>);

}