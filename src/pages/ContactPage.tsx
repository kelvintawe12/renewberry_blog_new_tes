import React, { useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, MessageSquare, Send, ChevronDown } from 'lucide-react';
export function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>(
    'idle'
  );
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };
  const faqs = [
  {
    q: 'How long does it take to hear back?',
    a: 'We typically respond to all inquiries within 24-48 business hours.'
  },
  {
    q: 'Can I pitch a guest post for the blog?',
    a: "Yes! Please select 'Press & Media' in the subject dropdown and include a brief outline of your pitch."
  },
  {
    q: 'Where can I find technical support for my channel?',
    a: 'For technical issues, please visit our Help Center on the main RenewBerry platform or email support@renewberry.io directly.'
  },
  {
    q: 'Do you offer sponsorships?',
    a: "We are always looking for aligned partners. Please select 'Partnership Opportunity' and share your media kit."
  }];

  const formVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const fieldVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };
  return (
    <main className="min-h-screen pb-20 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-secondary text-white py-24">
        <div className="max-w-blog mx-auto px-4 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}>

            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Have a question, partnership idea, or just want to say hello? We'd
              love to hear from you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-blog mx-auto px-4 py-16 -mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
              <h2 className="text-3xl font-heading font-bold text-text-primary mb-8">
                Send us a message
              </h2>

              <AnimatePresence mode="wait">
                {status === 'success' ?
                <motion.div
                  key="success"
                  initial={{
                    opacity: 0,
                    scale: 0.9
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  className="bg-teal-50 border border-primary text-primary p-12 rounded-2xl text-center relative overflow-hidden">

                    {/* Confetti dots */}
                    {Array.from({
                    length: 20
                  }).map((_, i) =>
                  <motion.div
                    key={i}
                    initial={{
                      y: 100,
                      opacity: 0
                    }}
                    animate={{
                      y: -200,
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: Math.random() * 2 + 1,
                      ease: 'easeOut'
                    }}
                    className={`absolute w-3 h-3 rounded-full ${['bg-primary', 'bg-teal-400', 'bg-amber-400'][i % 3]}`}
                    style={{
                      left: `${Math.random() * 100}%`
                    }} />

                  )}

                    <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Send className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                    <p className="text-lg text-secondary">
                      Thanks for reaching out. Our team will get back to you
                      shortly.
                    </p>
                    <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-primary font-bold hover:text-secondary transition-colors border-b-2 border-primary pb-1">

                      Send another message
                    </button>
                  </motion.div> :

                <motion.form
                  key="form"
                  variants={formVariants}
                  initial="hidden"
                  animate="show"
                  onSubmit={handleSubmit}
                  className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={fieldVariants}>
                        <label className="block text-sm font-bold text-text-primary mb-2">
                          Your Name
                        </label>
                        <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white outline-none transition-all"
                        placeholder="John Doe" />

                      </motion.div>
                      <motion.div variants={fieldVariants}>
                        <label className="block text-sm font-bold text-text-primary mb-2">
                          Email Address
                        </label>
                        <input
                        type="email"
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white outline-none transition-all"
                        placeholder="john@example.com" />

                      </motion.div>
                    </div>

                    <motion.div variants={fieldVariants}>
                      <label className="block text-sm font-bold text-text-primary mb-2">
                        Subject
                      </label>
                      <select className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white outline-none transition-all appearance-none">
                        <option>General Inquiry</option>
                        <option>Partnership Opportunity</option>
                        <option>Creator Support</option>
                        <option>Press & Media</option>
                      </select>
                    </motion.div>

                    <motion.div variants={fieldVariants}>
                      <label className="block text-sm font-bold text-text-primary mb-2">
                        Message
                      </label>
                      <textarea
                      rows={6}
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white outline-none transition-all resize-none"
                      placeholder="How can we help you?">
                    </textarea>
                    </motion.div>

                    <motion.button
                    variants={fieldVariants}
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white font-bold py-4 px-10 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0">

                      {status === 'submitting' ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </motion.form>
                }
              </AnimatePresence>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:w-1/3 space-y-8">
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
                delay: 0.3
              }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">

              <h3 className="text-2xl font-heading font-bold text-text-primary mb-8">
                Contact Info
              </h3>

              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-teal-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-text-primary mb-1">Email</p>
                    <a
                      href="mailto:hello@renewberry.io"
                      className="text-text-secondary hover:text-primary transition-colors">

                      hello@renewberry.io
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-teal-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-text-primary mb-1">Support</p>
                    <a
                      href="mailto:support@renewberry.io"
                      className="text-text-secondary hover:text-primary transition-colors">

                      support@renewberry.io
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-teal-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-text-primary mb-1">Office</p>
                    <p className="text-text-secondary leading-relaxed">
                      The GoodMorningDewPub HQ
                      <br />
                      Innovation District
                      <br />
                      Global
                    </p>
                  </div>
                </div>
              </div>
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
                delay: 0.4
              }}
              className="bg-gradient-to-br from-secondary to-primary p-8 rounded-3xl text-white shadow-lg">

              <h3 className="text-2xl font-heading font-bold mb-4">
                Creator Support
              </h3>
              <p className="text-teal-100 mb-8 leading-relaxed">
                Are you a creator needing help with your channel or
                monetization? Check out our Creator Handbook first.
              </p>
              <a
                href="/category/creator-handbook"
                className="inline-block bg-white text-primary font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">

                View Handbook
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) =>
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

                <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none">

                  <span className="font-bold text-text-primary text-lg">
                    {faq.q}
                  </span>
                  <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />

                </button>
                <AnimatePresence>
                  {openFaq === idx &&
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0
                  }}
                  animate={{
                    height: 'auto',
                    opacity: 1
                  }}
                  exit={{
                    height: 0,
                    opacity: 0
                  }}
                  className="px-6 pb-5 text-text-secondary">

                      {faq.a}
                    </motion.div>
                }
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>);

}