import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Category } from '../data/mockData';
interface CategoryTileProps {
  category: Category;
}
export function CategoryTile({ category }: CategoryTileProps) {
  // Dynamically get the icon component
  const IconComponent = (Icons as any)[category.icon] || Icons.Folder;
  // Mock post count
  const postCount = Math.floor(Math.random() * 10) + 3;
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02
      }}
      whileTap={{
        scale: 0.98
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}>

      <Link
        to={`/category/${category.slug}`}
        className="block h-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 group-hover:rotate-6">
              <IconComponent className="w-6 h-6" />
            </div>
            <span className="bg-gray-50 text-gray-500 text-xs font-bold px-2 py-1 rounded-full group-hover:bg-teal-50 group-hover:text-primary transition-colors">
              {postCount} posts
            </span>
          </div>
          <h3 className="font-heading font-bold text-lg text-text-primary mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
            {category.name}
            <Icons.ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2">
            {category.description}
          </p>
        </div>
      </Link>
    </motion.div>);

}