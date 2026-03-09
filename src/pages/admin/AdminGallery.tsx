import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../../data/mockData';
import { SearchIcon, PlusIcon, Trash2Icon, Edit2Icon } from 'lucide-react';
import { motion } from 'framer-motion';
export function AdminGallery() {
  const [images, setImages] = useState(GALLERY_IMAGES);
  const [searchTerm, setSearchTerm] = useState('');
  const handleDelete = (id: string) => {
    if (window.confirm('Delete this image from the gallery?')) {
      setImages(images.filter((img) => img.id !== id));
    }
  };
  const filteredImages = images.filter(
    (img) =>
    img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Gallery Management
        </h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />

          </div>
          <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 whitespace-nowrap">
            <PlusIcon className="w-4 h-4" /> Upload Image
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredImages.map((img, idx) =>
        <motion.div
          key={img.id}
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            delay: idx * 0.05
          }}
          className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">

            <img
            src={img.imageUrl}
            alt={img.title}
            className="w-full h-full object-cover" />


            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
              <div className="flex justify-end gap-2">
                <button className="p-1.5 bg-white/20 hover:bg-white text-white hover:text-gray-900 rounded-md backdrop-blur-sm transition-colors">
                  <Edit2Icon className="w-4 h-4" />
                </button>
                <button
                onClick={() => handleDelete(img.id)}
                className="p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-md backdrop-blur-sm transition-colors">

                  <Trash2Icon className="w-4 h-4" />
                </button>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-black/40 px-1.5 py-0.5 rounded">
                  {img.category}
                </span>
                <p className="text-white font-medium text-sm mt-1 line-clamp-1">
                  {img.title}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>);

}