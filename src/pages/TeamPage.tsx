import React, { useState, Children } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AUTHORS, Author } from '../data/mockData';
import { RadialTeamIntro } from '../components/RadialTeamIntro';
import { truncateToWords } from '../helpers/textUtils';
import { Threads } from '../components/Threads';
import {
  MapPinIcon,
  ArrowRightIcon,
  SparklesIcon,
  UsersIcon,
  HeartIcon,
  QuoteIcon,
  FilterIcon,
  GlobeIcon,
  CodeIcon,
  VideoIcon,
  MegaphoneIcon,
  CrownIcon } from
'lucide-react';
// Extended Team Member Interface
interface TeamMember extends Author {
  slug: string;
  department: string;
  location: string;
  expertise: string[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  joinedYear: string;
  quote: string;
}
// Map AUTHORS to extended TEAM_MEMBERS
const TEAM_MEMBERS: TeamMember[] = AUTHORS.map((author) => {
  switch (author.username) {
    case 'abongwa':
      return {
        ...author,
        slug: 'abongwa',
        department: 'Leadership',
        location: 'Cameroon',
        expertise: ['Vision', 'Strategy', 'Community'],
        socialLinks: {
          twitter: '#',
          linkedin: '#'
        },
        joinedYear: '2025',
        quote:
        'We are building a sanctuary where hope thrives and every story matters.'
      };
    case 'kelvin':
      return {
        ...author,
        slug: 'kelvin',
        department: 'Engineering',
        location: 'Cameroon',
        expertise: ['React', 'Node.js', 'Architecture'],
        socialLinks: {
          github: '#',
          linkedin: '#'
        },
        joinedYear: '2025',
        quote:
        'Clean code is the foundation of a seamless and empowering user experience.'
      };
    case 'praise':
      return {
        ...author,
        slug: 'praise',
        department: 'Engineering',
        location: 'Cameroon',
        expertise: ['Frontend', 'UI/UX', 'TypeScript'],
        socialLinks: {
          github: '#',
          twitter: '#'
        },
        joinedYear: '2025',
        quote:
        'Design is not just what it looks like, it is how it makes people feel.'
      };
    case 'sarahj':
      return {
        ...author,
        slug: 'sarahj',
        department: 'Community',
        location: 'United States',
        expertise: ['Content Strategy', 'Community', 'Social Media'],
        socialLinks: {
          twitter: '#',
          linkedin: '#'
        },
        joinedYear: '2025',
        quote:
        'Every creator has a unique voice that deserves to be heard and celebrated.'
      };
    case 'marcusc':
      return {
        ...author,
        slug: 'marcusc',
        department: 'Content',
        location: 'Canada',
        expertise: ['Video Production', 'Storytelling', 'Editing'],
        socialLinks: {
          youtube: '#',
          twitter: '#'
        },
        joinedYear: '2025',
        quote:
        'Visual storytelling has the power to transcend borders and connect hearts.'
      };
    default:
      return {
        ...author,
        slug: author.username,
        department: 'Team',
        location: 'Global',
        expertise: ['General'],
        socialLinks: {},
        joinedYear: '2025',
        quote: 'Committed to the mission.'
      };
  }
});
const DEPARTMENTS = ['All', 'Leadership', 'Engineering', 'Community', 'Content'];
export function TeamPage() {
  const [activeTab, setActiveTab] = useState('All');
  const filteredMembers =
  activeTab === 'All' ?
  TEAM_MEMBERS.filter((m) => m.department !== 'Leadership') // Exclude founder from grid if showing all
  : TEAM_MEMBERS.filter((m) => m.department === activeTab);
  const founder = TEAM_MEMBERS.find((m) => m.username === 'abongwa');
  const containerVariants = {
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
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };
  return (
    <main className="min-h-screen bg-gray-50 font-body overflow-hidden">
      {/* 1) HERO SECTION */}
      <section className="relative bg-secondary min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Threads WebGL Background */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-auto">
          <Threads
            color={[0.03, 0.57, 0.7]}
            amplitude={1.2}
            distance={0.3}
            enableMouseInteraction={true} />

        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <SparklesIcon className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-bold text-teal-50 tracking-widest uppercase">
                The People Behind RenewBerry
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 tracking-tight">
              Meet the <span className="text-teal-400">Team</span>
            </h1>

            <p className="text-lg md:text-xl text-teal-100/80 max-w-2xl mx-auto font-medium leading-relaxed">
              We are a collective of engineers, storytellers, and community
              builders dedicated to creating a digital sanctuary where hope and
              authentic connection thrive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3) LEADERSHIP SPOTLIGHT */}
      {founder &&
      <section className="py-24 bg-white border-b border-gray-100 relative z-10">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center md:items-start">

              <div className="shrink-0 relative">
                <div className="absolute -inset-4 bg-teal-50 rounded-full blur-2xl opacity-50"></div>
                <img
                src={founder.avatar}
                alt={founder.name}
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white shadow-lg relative z-10" />

                <div className="absolute bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-md z-20">
                  <CrownIcon className="w-6 h-6" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                  <MegaphoneIcon className="w-3.5 h-3.5" />
                  {founder.department}
                </div>

                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">
                  {founder.name}
                </h2>
                <p className="text-lg text-primary font-medium mb-6">
                  {founder.role}
                </p>

                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 mb-6">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{founder.location}</span>
                  <span className="mx-2">•</span>
                  <span>Joined {founder.joinedYear}</span>
                </div>

                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  {founder.bio}
                </p>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8 relative">
                  <QuoteIcon className="w-8 h-8 text-gray-200 absolute top-4 left-4" />
                  <p className="text-gray-700 italic font-medium relative z-10 pl-8">
                    "{founder.quote}"
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-8">
                  {founder.expertise.map((skill) =>
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">

                      {skill}
                    </span>
                )}
                </div>

                <Link
                to={`/author/${founder.username}`}
                className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors group">

                  Read Articles by {founder.name.split(' ')[0]}
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      }

      {/* 4) RADIAL TEAM INTRO */}
      <section className="py-24 bg-gray-50 relative z-10 border-b border-gray-200">
        <div className="max-w-blog mx-auto px-4">
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
            className="text-center mb-16">

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Orbit
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A connected ecosystem of creators and builders.
            </p>
          </motion.div>

          <RadialTeamIntro items={AUTHORS} />
        </div>
      </section>

      {/* 5) TEAM GRID */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">
                The Core Team
              </h2>
              <p className="text-gray-600">
                Meet the experts driving our mission forward.
              </p>
            </div>

            {/* Department Filters */}
            <div className="flex flex-wrap items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
              <div className="px-3 text-gray-400 hidden lg:block">
                <FilterIcon className="w-4 h-4" />
              </div>
              {DEPARTMENTS.map((dept) =>
              <button
                key={dept}
                onClick={() => setActiveTab(dept)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === dept ? 'bg-white text-primary shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent'}`}>

                  {dept}
                </button>
              )}
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              margin: '-50px'
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredMembers.map((member) =>
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col items-start">

                <div className="flex items-center gap-6 mb-6 w-full">
                  <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover border border-gray-100 shrink-0" />

                  <div>
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-2">
                      {member.role}
                    </p>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">
                      {member.department === 'Engineering' &&
                    <CodeIcon className="w-3 h-3" />
                    }
                      {member.department === 'Community' &&
                    <GlobeIcon className="w-3 h-3" />
                    }
                      {member.department === 'Content' &&
                    <VideoIcon className="w-3 h-3" />
                    }
                      {member.department}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 w-full pb-6 border-b border-gray-100">
                  <MapPinIcon className="w-3.5 h-3.5" />
                  <span>{member.location}</span>
                  <span className="mx-1">•</span>
                  <span>Joined {member.joinedYear}</span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                  {truncateToWords(member.bio, 25)}
                </p>

                <div className="mb-6 w-full">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-3">
                    Expertise
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill) =>
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-600 text-xs rounded-md font-medium">

                        {skill}
                      </span>
                  )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6 w-full relative">
                  <QuoteIcon className="w-4 h-4 text-gray-300 absolute top-3 left-3" />
                  <p className="text-gray-600 italic text-sm pl-6">
                    "{member.quote}"
                  </p>
                </div>

                <Link
                to={`/author/${member.username}`}
                className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-gray-50 hover:bg-primary text-gray-700 hover:text-white font-bold py-3 px-4 rounded-xl transition-colors group">

                  View Profile
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </motion.div>

          {filteredMembers.length === 0 &&
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
              <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No members found
              </h3>
              <p className="text-gray-500">
                There are currently no team members in this department.
              </p>
            </div>
          }
        </div>
      </section>

      {/* 6) JOIN CTA */}
      <section className="relative py-32 bg-secondary text-white overflow-hidden">
        {/* Threads WebGL Background - Subtle White */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-auto">
          <Threads
            color={[1, 1, 1]}
            amplitude={0.5}
            distance={0.2}
            enableMouseInteraction={true} />

        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 30
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

            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/20">
              <HeartIcon className="w-8 h-8 text-teal-300" />
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Join Our Mission
            </h2>

            <p className="text-xl text-teal-100/80 mb-10 leading-relaxed">
              We are always looking for passionate individuals who believe in
              the power of positive storytelling. Help us build a better
              internet.
            </p>

            <button className="bg-white text-primary hover:bg-teal-50 font-bold py-4 px-10 rounded-xl transition-colors shadow-lg text-lg inline-flex items-center gap-2">
              View Open Roles <ArrowRightIcon className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </main>);

}