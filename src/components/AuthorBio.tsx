import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Globe, Mail, ArrowRight } from 'lucide-react';
import { Author } from '../data/mockData';

interface AuthorBioProps {
  author: Author;
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="relative mt-20 mb-12">
      {/* Decorative background element */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-[2rem] -rotate-1 transform -z-10 border border-gray-100 shadow-sm"></div>
      
      <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        
        <div className="relative group flex-shrink-0">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
          <img
            src={author.avatar}
            alt={author.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute -bottom-2 right-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white z-20">
            <Globe className="w-4 h-4" />
          </div>
        </div>

        <div className="text-center md:text-left flex-grow relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-2">
                Written By
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-text-primary tracking-tight">
                <Link
                  to={`/author/${author.username}`}
                  className="hover:text-primary transition-colors decoration-primary/30 underline-offset-8"
                >
                  {author.name}
                </Link>
              </h3>
              <p className="text-primary font-bold text-sm mt-1">{author.role}</p>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-3">
              {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                <button 
                  key={i}
                  className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 border border-gray-100 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <p className="text-text-secondary leading-relaxed mb-8 text-lg md:text-xl font-medium max-w-2xl opacity-90">
            "{author.bio}"
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
            <Link
              to={`/author/${author.username}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              View Author Profile <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex -space-x-3 items-center">
              {[1, 2, 3].map((n) => (
                <img 
                  key={n} 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author.username}${n}`} 
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  alt="follower"
                />
              ))}
              <span className="pl-5 text-sm font-bold text-text-secondary">
                Followed by 1.2k+ creators
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}