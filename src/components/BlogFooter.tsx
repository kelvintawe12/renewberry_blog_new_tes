import React, { useEffect, useRef, Children } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Heart,
  Sparkles,
  LogIn
 } from
'lucide-react';
import { CATEGORIES } from '../data/mockData';
// Animated background particles
function FooterParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(canvas.width * canvas.height / 15000);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 184, 166, ${particle.opacity})`;
        ctx.fill();
        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(20, 184, 166, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });
      animationId = requestAnimationFrame(animate);
    };
    resize();
    animate();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none" />);
}
export function BlogFooter() {
  const currentYear = new Date().getFullYear();
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
      y: 0
    }
  };
  return (
    <footer className="bg-gradient-to-br from-secondary via-teal-900 to-secondary text-white relative overflow-hidden">
      {/* Animated Background */}
      <FooterParticles />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />

      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-blog mx-auto px-4 py-12 md:py-16">
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
            className="bg-gradient-to-r from-primary/20 to-cyan-500/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">

            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-teal-300" />
                  <span className="text-teal-200 font-bold uppercase tracking-wider text-sm">
                    Stay Inspired
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3">
                  Get Weekly Inspiration
                </h3>
                <p className="text-teal-100 max-w-md mx-auto lg:mx-0">
                  Join 50,000+ subscribers receiving stories of hope and renewal
                  every week.
                </p>
              </div>
              <div className="w-full lg:w-auto">
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400/50 min-w-[250px]" />

                  <button
                    type="submit"
                    className="bg-white text-secondary font-bold px-8 py-3.5 rounded-xl hover:bg-teal-50 transition-colors flex items-center justify-center gap-2 whitespace-nowrap">

                    Subscribe <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-xs text-teal-200/60 mt-3 text-center sm:text-left">
                  No spam, unsubscribe anytime. Read our Privacy Policy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-blog mx-auto px-4 py-12 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">

          {/* Brand Column - Takes 2 cols on lg */}
          <motion.div variants={itemVariants} className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <svg
                width="44"
                height="44"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:scale-105 transition-transform flex-shrink-0">

                <defs>
                  <linearGradient
                    id="berryGradFooter"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%">

                    <stop offset="0%" stopColor="#0891B2" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="55" r="35" fill="url(#berryGradFooter)" />
                <path d="M50 20 C40 10, 30 20, 50 35" fill="#4ADE80" />
                <path d="M50 20 C60 10, 70 20, 50 35" fill="#22C55E" />
                <path d="M50 20 C50 5, 65 5, 50 35" fill="#16A34A" />
              </svg>
              <div className="flex flex-col justify-center">
                <span className="font-heading text-[0.65rem] leading-none tracking-[0.2em] uppercase text-teal-300 font-bold">
                  GoodMorningDewPub
                </span>
                <span className="font-heading font-bold text-2xl leading-none text-white tracking-tight mt-1">
                  RenewBerry
                </span>
              </div>
            </Link>
            <p className="text-teal-100/80 mb-6 max-w-xs leading-relaxed text-sm">
              Stories of Hope, Renewal & Transformation. Discover inspiring
              stories from creators changing the world, one video at a time.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary flex items-center justify-center transition-all hover:scale-110 border border-white/10"
                aria-label="Twitter">

                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary flex items-center justify-center transition-all hover:scale-110 border border-white/10"
                aria-label="Facebook">

                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary flex items-center justify-center transition-all hover:scale-110 border border-white/10"
                aria-label="Instagram">

                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary flex items-center justify-center transition-all hover:scale-110 border border-white/10"
                aria-label="YouTube">

                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary flex items-center justify-center transition-all hover:scale-110 border border-white/10"
                aria-label="LinkedIn">

                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Categories Column */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-5 text-teal-200">
              Categories
            </h4>
            <ul className="space-y-3">
              {CATEGORIES.slice(0, 5).map((cat) =>
              <li key={cat.id}>
                  <Link
                  to={`/category/${cat.slug}`}
                  className="text-teal-100/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">

                    <span className="w-1 h-1 rounded-full bg-teal-400 group-hover:w-2 transition-all" />
                    {cat.name}
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>

          {/* Resources Column */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-5 text-teal-200">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/videos"
                  className="text-teal-100/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">

                  <span className="w-1 h-1 rounded-full bg-teal-400 group-hover:w-2 transition-all" />
                  Video Feed
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-teal-100/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">

                  <span className="w-1 h-1 rounded-full bg-teal-400 group-hover:w-2 transition-all" />
                  Image Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/category/creator-handbook"
                  className="text-teal-100/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">

                  <span className="w-1 h-1 rounded-full bg-teal-400 group-hover:w-2 transition-all" />
                  Creator Handbook
                </Link>
              </li>
              <li>
                <Link
                  to="/category/brand-voice"
                  className="text-teal-100/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">

                  <span className="w-1 h-1 rounded-full bg-teal-400 group-hover:w-2 transition-all" />
                  Brand Voice
                </Link>
              </li>
              <li>
                <Link
                  to="/partners"
                  className="text-teal-100/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">

                  <span className="w-1 h-1 rounded-full bg-teal-400 group-hover:w-2 transition-all" />
                  Partner Network
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-5 text-teal-200">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-teal-100/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">

                  <span className="w-1 h-1 rounded-full bg-teal-400 group-hover:w-2 transition-all" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-teal-100/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">

                  <span className="w-1 h-1 rounded-full bg-teal-400 group-hover:w-2 transition-all" />
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://renewberry.io/careers"
                  className="text-teal-100/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">

                  <span className="w-1 h-1 rounded-full bg-teal-400 group-hover:w-2 transition-all" />
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="https://renewberry.io/press"
                  className="text-teal-100/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">

                  <span className="w-1 h-1 rounded-full bg-teal-400 group-hover:w-2 transition-all" />
                  Press Kit
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Legal & Contact Column */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-5 text-teal-200">
              Legal
            </h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href="https://renewberry.io/terms"
                  className="text-teal-100/70 hover:text-white text-sm transition-colors">

                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://renewberry.io/privacy"
                  className="text-teal-100/70 hover:text-white text-sm transition-colors">

                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://renewberry.io/cookies"
                  className="text-teal-100/70 hover:text-white text-sm transition-colors">

                  Cookie Policy
                </a>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <a
                href="mailto:hello@renewberry.io"
                className="flex items-center gap-2 text-teal-100/70 hover:text-white transition-colors">

                <Mail className="w-4 h-4 text-teal-400" />
                hello@renewberry.io
              </a>
            </div>
            {/* Admin Login Link */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link
                to="/auth/login"
                className="flex items-center gap-2 text-teal-100/70 hover:text-white text-sm transition-colors font-medium">

                <LogIn className="w-4 h-4" />
                Admin Login
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-blog mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-teal-200/60 text-sm text-center md:text-left">
              © {currentYear} The GoodMorningDewPub. All rights reserved.
              RenewBerry®
            </p>

            <div className="flex items-center gap-4">
              <span className="text-teal-200/60 text-sm flex items-center gap-1">
                Made with{' '}
                <Heart className="w-4 h-4 text-red-400 fill-red-400" /> for
                creators
              </span>
              <a
                href="https://renewberry.io"
                className="inline-flex items-center gap-2 text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors border border-white/10">

                Main Platform <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>);
}
