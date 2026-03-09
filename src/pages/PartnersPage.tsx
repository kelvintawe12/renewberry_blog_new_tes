import React, { useEffect, useState, useRef, Children, Component } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate } from
'framer-motion';
import {
  TrendingUp as TrendingUpIcon,
  Users as UsersIcon,
  ShieldCheck as ShieldCheckIcon,
  ArrowRight as ArrowRightIcon,
  Globe as GlobeIcon,
  Zap as ZapIcon,
  Award as AwardIcon,
  CheckCircle2 as CheckCircle2Icon,
  Sparkles as SparklesIcon,
  Rocket as RocketIcon,
  HeartHandshake as HeartHandshakeIcon } from
'lucide-react';
import { Threads } from '../components/Threads';
const LOGO_URL = "/image.png";

// Animated Counter Component
function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0





}: {value: number;prefix?: string;suffix?: string;decimals?: number;}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px'
  });
  const [displayValue, setDisplayValue] = useState('0');
  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: 'easeOut',
        onUpdate(v) {
          setDisplayValue(v.toFixed(decimals));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, decimals]);
  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>);

}
export function PartnersPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const partners = [
  {
    name: 'CreatorHub',
    desc: 'Leading resource for video creators and digital artists worldwide.',
    color: 'bg-blue-500',
    metrics: '2M+ Reach'
  },
  {
    name: 'PositiveVibes Media',
    desc: 'Amplifying good news globally through engaging short-form content.',
    color: 'bg-amber-500',
    metrics: '5M+ Reach'
  },
  {
    name: 'TechForGood',
    desc: 'Highlighting ethical technology platforms and sustainable innovations.',
    color: 'bg-emerald-500',
    metrics: '1.5M+ Reach'
  },
  {
    name: 'Storytellers Guild',
    desc: 'Community of narrative-driven artists sharing impactful documentaries.',
    color: 'bg-purple-500',
    metrics: '800k+ Reach'
  },
  {
    name: 'Mindful Tech',
    desc: 'Promoting digital wellness, balance, and healthy screen time habits.',
    color: 'bg-teal-500',
    metrics: '3M+ Reach'
  },
  {
    name: 'The Daily Inspire',
    desc: 'Daily dose of motivation, hope, and uplifting community stories.',
    color: 'bg-rose-500',
    metrics: '4M+ Reach'
  }];

  const benefits = [
  {
    title: 'Revenue Sharing',
    desc: 'Earn competitive commissions for every creator you refer who monetizes on our platform. Watch your passive income grow.',
    icon: TrendingUpIcon,
    color: 'text-emerald-600',
    bg: 'bg-emerald-100'
  },
  {
    title: 'Exclusive Access',
    desc: 'Get early access to new features, beta programs, and partner-only events before they are released to the public.',
    icon: ShieldCheckIcon,
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    title: 'Co-Marketing',
    desc: 'Collaborate on content, webinars, and campaigns to reach a broader audience and establish your brand authority.',
    icon: UsersIcon,
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  {
    title: 'Global Reach',
    desc: 'Connect with our international audience of creators and viewers across 150+ countries and expand your footprint.',
    icon: GlobeIcon,
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  {
    title: 'Fast Integration',
    desc: 'Seamlessly integrate with our API and tools to start earning and growing immediately with minimal technical setup.',
    icon: ZapIcon,
    color: 'text-rose-600',
    bg: 'bg-rose-100'
  },
  {
    title: 'Premium Support',
    desc: 'Dedicated partner success managers to help you optimize your campaigns, troubleshoot issues, and maximize returns.',
    icon: AwardIcon,
    color: 'text-teal-600',
    bg: 'bg-teal-100'
  }];

  const howItWorksSteps = [
  {
    title: 'Apply',
    desc: 'Submit your application in minutes. We review all requests within 48 hours.',
    icon: SparklesIcon
  },
  {
    title: 'Connect',
    desc: 'Get access to your partner dashboard and custom referral links.',
    icon: HeartHandshakeIcon
  },
  {
    title: 'Share',
    desc: 'Promote RenewBerry to your audience using our high-converting assets.',
    icon: GlobeIcon
  },
  {
    title: 'Earn',
    desc: 'Receive monthly payouts for every successful creator you bring onboard.',
    icon: RocketIcon
  }];

  const heroVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };
  const heroItemVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };
  const benefitContainerVariants = {
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
  const benefitItemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };
  return (
    <main className="min-h-screen bg-white font-body overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        {/* Threads Background */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
          <Threads
            color={[0.03, 0.56, 0.7]}
            amplitude={1.2}
            distance={0.3}
            enableMouseInteraction={true} />

        </div>

        {/* Decorative elements */}
        <motion.div
          style={{
            y: y1
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-blob-morph" />

        <motion.div
          style={{
            y: y2
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-[100px] pointer-events-none animate-blob-morph-delayed" />


        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="show"
              className="max-w-4xl mx-auto">

              <motion.div
                variants={heroItemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md shadow-sm mb-8">

                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-bold text-primary tracking-wide uppercase">
                  Partner Network
                </span>
              </motion.div>

              <motion.h1
                variants={heroItemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-text-primary mb-6 leading-tight">

                Grow with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600">
                  RenewBerry
                </span>
              </motion.h1>

              <motion.p
                variants={heroItemVariants}
                className="text-xl md:text-2xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed line-clamp-3 overflow-hidden">

                Join the official affiliate network. Partner with us to amplify
                stories of hope, empower creators, and build a more positive
                digital ecosystem while earning competitive rewards.
              </motion.p>

              <motion.div
                variants={heroItemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">

                <button className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold py-4 px-8 rounded-xl transition-all hover:-translate-y-1 shadow-[0_10px_20px_rgba(8,145,178,0.2)] flex items-center justify-center gap-2">
                  Apply to Partner <ArrowRightIcon className="w-5 h-5" />
                </button>
                <button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-text-primary border border-gray-200 font-bold py-4 px-8 rounded-xl transition-all hover:-translate-y-1 shadow-sm">
                  View Program Details
                </button>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                variants={heroItemVariants}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-200">

                <div>
                  <p className="text-4xl font-heading font-black text-primary mb-1">
                    <AnimatedCounter
                      value={2.4}
                      prefix="$"
                      suffix="M+"
                      decimals={1} />

                  </p>
                  <p className="text-sm text-text-muted font-bold uppercase tracking-wider">
                    Partner Payouts
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-heading font-black text-primary mb-1">
                    <AnimatedCounter value={500} suffix="+" />
                  </p>
                  <p className="text-sm text-text-muted font-bold uppercase tracking-wider">
                    Active Partners
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-heading font-black text-primary mb-1">
                    <AnimatedCounter value={150} suffix="+" />
                  </p>
                  <p className="text-sm text-text-muted font-bold uppercase tracking-wider">
                    Countries
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <section className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
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
            className="text-center mb-16 max-w-3xl mx-auto">

            <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-6">
              Why Partner With Us?
            </h2>
            <p className="text-xl text-text-secondary">
              We believe in growing together. Our partner program is designed to
              reward those who share our vision for a better internet.
            </p>
          </motion.div>

          <motion.div
            variants={benefitContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              margin: '-100px'
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {benefits.map((benefit, idx) =>
            <motion.div
              key={idx}
              variants={benefitItemVariants}
              className="p-8 rounded-3xl border border-gray-200 bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">

                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${benefit.bg} ${benefit.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10`}>

                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-text-primary mb-3 relative z-10">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary leading-relaxed line-clamp-3 relative z-10">
                  {benefit.desc}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
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
            className="text-center mb-20 max-w-3xl mx-auto">

            <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-6">
              How It Works
            </h2>
            <p className="text-xl text-text-secondary">
              Four simple steps to start earning and making an impact.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{
                  scaleX: 0
                }}
                whileInView={{
                  scaleX: 1
                }}
                viewport={{
                  once: true,
                  margin: '-100px'
                }}
                transition={{
                  duration: 1.5,
                  ease: 'easeInOut'
                }}
                className="w-full h-full bg-gradient-to-r from-primary/20 via-primary to-teal-400 origin-left" />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
              {howItWorksSteps.map((step, idx) =>
              <motion.div
                key={idx}
                initial={{
                  opacity: 0,
                  y: 30
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true,
                  margin: '-50px'
                }}
                transition={{
                  delay: idx * 0.2,
                  type: 'spring',
                  stiffness: 100
                }}
                className="relative flex flex-col items-center text-center group">

                  <div className="w-24 h-24 rounded-full bg-white border-4 border-gray-50 shadow-xl flex items-center justify-center mb-6 relative z-10 group-hover:border-primary/20 transition-colors duration-300">
                    <div className="absolute inset-2 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-colors duration-300">
                      <step.icon className="w-8 h-8" />
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-text-primary text-white font-heading font-bold flex items-center justify-center text-sm shadow-lg">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary">{step.desc}</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Partners */}
      <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />

        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl animate-float-delayed" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
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
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">

            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Trusted by Industry Leaders
              </h2>
              <p className="text-xl text-gray-400">
                Join a network of top-tier creators, platforms, and
                organizations dedicated to positive impact.
              </p>
            </div>
            <button className="text-white border border-white/20 hover:bg-white/10 px-6 py-3 rounded-full font-bold transition-colors whitespace-nowrap flex items-center gap-2">
              View Directory <ArrowRightIcon className="w-4 h-4" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, idx) =>
            <motion.div
              key={idx}
              initial={{
                opacity: 0,
                x: idx % 2 === 0 ? -50 : 50
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true,
                margin: '-50px'
              }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: 'easeOut'
              }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:-translate-y-2 transition-all cursor-pointer group shadow-lg">

                <div className="flex items-start justify-between mb-6">
                  <div
                  className={`w-16 h-16 rounded-2xl ${partner.color} shadow-lg flex items-center justify-center text-2xl font-bold text-white transform group-hover:scale-110 transition-transform duration-300`}>

                    {partner.name.charAt(0)}
                  </div>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-wider text-gray-300">
                    {partner.metrics}
                  </span>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                  {partner.name}
                </h3>
                <p className="text-gray-400 line-clamp-2">{partner.desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        {/* Parallax Blurs */}
        <motion.div
          style={{
            y: y1
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          style={{
            y: y2
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400/10 rounded-full blur-[100px] pointer-events-none" />


        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            whileInView={{
              opacity: 1,
              scale: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.8
            }}
            className="bg-white rounded-[3rem] p-10 md:p-20 text-center border border-gray-200 relative overflow-hidden shadow-2xl">

            <div className="relative z-10">
              <motion.img
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
                  delay: 0.2
                }}
                src={LOGO_URL}
                alt="Logo"
                className="w-24 h-24 mx-auto mb-8 drop-shadow-md" />


              <motion.h2
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
                  delay: 0.3
                }}
                className="text-4xl md:text-5xl font-heading font-black text-text-primary mb-6">

                Ready to Make an Impact?
              </motion.h2>

              <motion.p
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
                  delay: 0.4
                }}
                className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">

                Apply to become an official RenewBerry partner today and start
                earning while spreading hope across the digital landscape.
              </motion.p>

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
                  delay: 0.5
                }}
                className="flex flex-col sm:flex-row justify-center items-center gap-4">

                <button className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold py-4 px-10 rounded-xl transition-all hover:-translate-y-1 shadow-lg text-lg flex items-center justify-center gap-2">
                  Submit Application <CheckCircle2Icon className="w-5 h-5" />
                </button>
                <p className="text-sm text-text-muted font-medium px-4">
                  Takes ~3 minutes. Fast approval.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>);

}