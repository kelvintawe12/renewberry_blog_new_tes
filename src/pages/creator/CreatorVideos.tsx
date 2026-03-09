import React, { useState } from 'react';
import { REAL_VIDEOS } from '../../data/videoData';
import {
  SearchIcon,
  PlayIcon,
  Edit2Icon,
  Trash2Icon,
  BarChart2Icon } from
'lucide-react';
import { Link } from 'react-router-dom';
export function CreatorVideos() {
  // Simulate fetching only the creator's videos
  const [videos, setVideos] = useState(REAL_VIDEOS.slice(0, 8));
  const [searchTerm, setSearchTerm] = useState('');
  const filteredVideos = videos.filter((v) =>
  v.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          My Videos
        </h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search my videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />

          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVideos.map((video) =>
        <div
          key={video.id}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">

            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              {video.thumbnail_url ?
            <img
              src={video.thumbnail_url}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> :


            <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <PlayIcon className="w-8 h-8" />
                </div>
            }
              <div className="absolute top-3 left-3">
                <span
                className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${video.approval_status === 'approved' ? 'bg-green-500/90 text-white' : 'bg-amber-500/90 text-white'}`}>

                  {video.approval_status === 'approved' ? 'Live' : 'Reviewing'}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded font-mono">
                {video.duration_seconds ?
              `${Math.floor(video.duration_seconds / 60)}:${(video.duration_seconds % 60).toString().padStart(2, '0')}` :
              '0:00'}
              </div>
            </div>

            <div className="p-5">
              <h3
              className="font-bold text-gray-900 line-clamp-1 mb-2"
              title={video.title}>

                {video.title}
              </h3>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="bg-gray-50 rounded-lg py-2">
                  <div className="text-xs text-gray-500 mb-0.5">Views</div>
                  <div className="font-bold text-gray-900 text-sm">
                    {video.views.toLocaleString()}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg py-2">
                  <div className="text-xs text-gray-500 mb-0.5">Likes</div>
                  <div className="font-bold text-gray-900 text-sm">
                    {video.likes.toLocaleString()}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg py-2">
                  <div className="text-xs text-gray-500 mb-0.5">Comments</div>
                  <div className="font-bold text-gray-900 text-sm">
                    {video.comments_count.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  {new Date(video.created_at).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <button
                  className="p-2 text-gray-400 hover:text-primary hover:bg-teal-50 rounded-lg transition-colors"
                  title="Analytics">

                    <BarChart2Icon className="w-4 h-4" />
                  </button>
                  <button
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit">

                    <Edit2Icon className="w-4 h-4" />
                  </button>
                  <button
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete">

                    <Trash2Icon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

}