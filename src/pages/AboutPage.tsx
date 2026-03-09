import React, { useEffect, useState, Children } from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Shield, Users, Globe } from 'lucide-react';
import { AUTHORS } from '../data/mockData';
import { Link } from 'react-router-dom';
import { BackgroundAnimation } from '../components/BackgroundAnimation';
import { RadialTeamIntro } from '../components/RadialTeamIntro';
import { truncateToWords } from '../helpers/textUtils';
function useCounter(
end: number,
duration: number = 2000,
startWhen: boolean = true)
{
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startWhen) return;
    let startTime: number | null = null;
    let animationFrame: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };
    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [end, duration, startWhen]);
  return count;
}
export function AboutPage() {
  const [statsVisible, setStatsVisible] = useState(false);
  const creatorsCount = useCounter(10000, 2000, statsVisible);
  const countriesCount = useCounter(50, 2500, statsVisible);
  const videosCount = useCounter(500, 2000, statsVisible);
  const viewsCount = useCounter(2, 3000, statsVisible);
  const coreValues = [
  {
    title: 'Hope & Renewal',
    description: truncateToWords(
      'Every Story Is a New Beginning. We believe that no matter how dark the night, joy comes in the morning. Our platform amplifies narratives of overcoming adversity.',
      25
    ),
    icon: Heart
  },
  {
    title: 'Empowerment & Potential',
    description: truncateToWords(
      "Unlocking What's Possible in Every Person. We provide creators with tools to share their authentic voice and build sustainable communities.",
      25
    ),
    icon: Zap
  },
  {
    title: 'Integrity & Ethics',
    description: truncateToWords(
      'Trust Through Transparency and Honesty. We prioritize algorithmic fairness and transparent monetization over sensationalism.',
      25
    ),
    icon: Shield
  },
  {
    title: 'Respect & Community',
    description: truncateToWords(
      'Valuing Every Voice, Celebrating Every Story. We foster a safe, inclusive environment where diverse perspectives are celebrated.',
      25
    ),
    icon: Users
  },
  {
    title: 'Transformation & Impact',
    description: truncateToWords(
      'Creating Content That Changes Lives. We measure success not just in views, but in the positive real-world impact creators have.',
      25
    ),
    icon: Globe
  }];

  const timeline = [
  {
    year: '2025',
    title: 'The Idea Born',
    desc: 'RenewBerry was founded with a simple mission: bring hope back to social media.'
  },
  {
    year: 'Q3 2025',
    title: 'Beta Launch',
    desc: 'First 1,000 creators joined our closed beta program to test the platform.'
  },
  {
    year: 'Q1 2026',
    title: 'v1.0 Release',
    desc: 'Public launch with enhanced monetization tools. 100K users in the first month.'
  },
  {
    year: 'Q2 2026',
    title: 'Blog Launch',
    desc: 'The Official RenewBerry Blog launches to share deeper stories and guides.'
  },
  {
    year: 'Q3 2026',
    title: 'Global Expansion',
    desc: 'Opened to creators worldwide with support for 15 new languages.'
  },
  {
    year: 'Q4 2026',
    title: 'Creator Fund',
    desc: 'Launched a $5M fund for creators focusing on mental health and community.'
  }];

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };
  return (
    <main className="min-h-screen pb-20 overflow-hidden bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-secondary via-teal-800 to-primary text-white py-32 md:py-40 relative">
        <BackgroundAnimation variant="dark" />

        <div className="max-w-blog mx-auto px-4 text-center relative z-10">
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

            <span className="inline-block py-1.5 px-5 rounded-full bg-white/10 border border-white/20 text-sm font-bold mb-8 backdrop-blur-sm uppercase tracking-widest shadow-lg">
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 leading-tight">
              About RenewBerry
            </h1>
            <p className="text-2xl md:text-3xl text-teal-100 max-w-3xl mx-auto font-heading italic font-medium leading-relaxed">
              "Weeping may endure for a night, but joy comes in the morning."
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Story Narrative */}
      <section className="py-24 relative z-10">
        <div className="max-w-3xl mx-auto px-4">
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
            className="prose prose-lg md:prose-xl text-text-secondary">

            <h2 className="text-4xl font-heading font-bold text-text-primary mb-8 text-center">
              The Genesis of Hope
            </h2>
            <p>
              In an era where digital landscapes are dominated by algorithms
              that reward outrage and division, we saw a profound need for a
              sanctuary. RenewBerry wasn't born in a boardroom; it was born from
              a collective exhaustion with the negativity that permeates modern
              social media.
            </p>
            <p>
              We asked ourselves: What if a platform was designed from the
              ground up to amplify stories of resilience, recovery, and genuine
              human connection? What if we built a space where creators were
              rewarded for the positive impact they leave on their viewers?
            </p>
            <p>
              Today, RenewBerry is more than just a video sharing app. It is a
              global community of storytellers, artists, and everyday people who
              believe that vulnerability is strength, and that sharing our
              journeys can light the way for someone else in the dark.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{
                opacity: 0,
                x: -50
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.6
              }}
              className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-gray-100 relative overflow-hidden group">

              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
              <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg mb-8">
                <Globe className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-heading font-bold text-text-primary mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed">
                {truncateToWords(
                  'To empower creators and viewers through visual storytelling that inspires fresh perspectives, hope, and personal transformation—making every viewing experience a catalyst for positive change.',
                  30
                )}
              </p>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 50
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.6,
                delay: 0.2
              }}
              className="bg-secondary p-12 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">

              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl group-hover:bg-teal-400/20 transition-colors duration-500"></div>
              <div className="w-16 h-16 bg-teal-400 text-secondary rounded-2xl flex items-center justify-center shadow-lg mb-8">
                <Zap className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-heading font-bold mb-6">
                Our Vision
              </h2>
              <p className="text-xl text-teal-50 leading-relaxed">
                {truncateToWords(
                  "To become the world's leading video platform where every story shared becomes a beacon of hope, transformation, and empowerment—creating a global community where creators and viewers unite.",
                  30
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* By the Numbers Infographic */}
      <motion.section
        initial={{
          opacity: 0
        }}
        whileInView={{
          opacity: 1
        }}
        viewport={{
          once: true
        }}
        onViewportEnter={() => setStatsVisible(true)}
        className="py-24 bg-white relative z-10">

        <div className="max-w-blog mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-text-primary mb-4">
              By the Numbers
            </h2>
            <p className="text-lg text-text-secondary">
              The growing impact of our community.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center p-8 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="text-5xl md:text-6xl font-heading font-black text-primary mb-4">
                {creatorsCount.toLocaleString()}+
              </div>
              <div className="text-sm uppercase tracking-widest font-bold text-text-secondary">
                Active Creators
              </div>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="text-5xl md:text-6xl font-heading font-black text-primary mb-4">
                {countriesCount}+
              </div>
              <div className="text-sm uppercase tracking-widest font-bold text-text-secondary">
                Countries Reached
              </div>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="text-5xl md:text-6xl font-heading font-black text-primary mb-4">
                {videosCount}K+
              </div>
              <div className="text-sm uppercase tracking-widest font-bold text-text-secondary">
                Videos Uploaded
              </div>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="text-5xl md:text-6xl font-heading font-black text-primary mb-4">
                {viewsCount}M+
              </div>
              <div className="text-sm uppercase tracking-widest font-bold text-text-secondary">
                Monthly Views
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Core Values */}
      <section className="py-24 bg-gray-50 relative z-10">
        <div className="max-w-blog mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              The principles that guide everything we build.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              margin: '-100px'
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {coreValues.map((value, index) =>
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02
              }}
              className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden group">

                <div className="absolute -right-6 -top-6 text-[10rem] font-heading font-black text-gray-50 opacity-40 group-hover:text-teal-50 transition-colors duration-500 pointer-events-none leading-none">
                  0{index + 1}
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-teal-50 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-text-primary mb-4">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
              Our Journey
            </h2>
          </div>

          <div className="relative border-l-4 border-teal-100 ml-4 md:ml-1/2 space-y-16">
            {timeline.map((item, idx) =>
            <motion.div
              key={idx}
              initial={{
                opacity: 0,
                x: -20
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: idx * 0.2
              }}
              className="relative pl-10 md:pl-0">

                <div className="absolute -left-[26px] md:left-1/2 md:-ml-[13px] top-1 w-8 h-8 bg-primary rounded-full border-4 border-white shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>

                <div
                className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pr-16 md:text-right md:ml-0' : 'md:pl-16 md:ml-auto'}`}>

                  <span className="inline-block px-4 py-1.5 bg-gray-100 text-primary font-bold tracking-wider uppercase text-sm rounded-full mb-4">
                    {item.year}
                  </span>
                  <h3 className="text-3xl font-heading font-bold text-text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Team Section with Radial Intro */}
      <section className="py-24 bg-gray-50 relative z-10 overflow-hidden">
        <div className="max-w-blog mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-6">
              Meet the Team
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              The passionate individuals building the future of hopeful
              storytelling.
            </p>
          </div>

          {/* Radial Animation */}
          <RadialTeamIntro items={AUTHORS} />

          {/* Detailed Team Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-20">

            {AUTHORS.map((author) =>
            <motion.div
              key={author.id}
              variants={itemVariants}
              className="flex flex-col items-center text-center group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">

                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-primary rounded-full scale-0 group-hover:scale-110 transition-transform duration-500 opacity-10"></div>
                  <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-40 h-40 rounded-full object-cover border-[6px] border-white shadow-lg relative z-10 group-hover:border-teal-50 transition-colors duration-300" />

                </div>
                <h3 className="text-2xl font-heading font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                  {author.name}
                </h3>
                <p className="text-primary font-bold mb-5 uppercase tracking-wider text-sm bg-teal-50 px-4 py-1.5 rounded-full">
                  {author.role}
                </p>
                <p className="text-text-secondary mb-8 leading-relaxed flex-grow">
                  {truncateToWords(author.bio, 20)}
                </p>
                <Link
                to={`/author/${author.username}`}
                className="text-primary font-bold hover:text-white hover:bg-primary border-2 border-primary px-6 py-2.5 rounded-xl transition-all w-full">

                  Read articles
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </main>);

}