import React from 'react';
import { motion } from 'framer-motion';
import {
  EyeIcon,
  HeartIcon,
  UsersIcon,
  DollarSignIcon,
  PlayIcon,
  TrendingUpIcon } from
'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { REAL_VIDEOS } from '../../data/videoData';
import { Link } from 'react-router-dom';
export function CreatorDashboard() {
  const { user } = useAuth();
  // Mock stats for the creator
  const myVideos = REAL_VIDEOS.slice(0, 4);
  const totalViews = 125430;
  const totalLikes = 14200;
  const followers = 3450;
  const earnings = 1240.5;
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-16 h-16 rounded-full border-2 border-teal-100" />

          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-500">
              Here's what's happening with your channel today.
            </p>
          </div>
        </div>
        <Link
          to="/creator/upload"
          className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-sm">

          Upload New Video
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <EyeIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Views</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {totalViews.toLocaleString()}
              </h3>
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600 flex items-center gap-1 font-medium">
            <TrendingUpIcon className="w-4 h-4" /> +12.5% this week
          </div>
        </motion.div>

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
            delay: 0.1
          }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
              <HeartIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Likes</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {totalLikes.toLocaleString()}
              </h3>
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600 flex items-center gap-1 font-medium">
            <TrendingUpIcon className="w-4 h-4" /> +5.2% this week
          </div>
        </motion.div>

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
            delay: 0.2
          }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <UsersIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Followers</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {followers.toLocaleString()}
              </h3>
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600 flex items-center gap-1 font-medium">
            <TrendingUpIcon className="w-4 h-4" /> +142 new followers
          </div>
        </motion.div>

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
            delay: 0.3
          }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <DollarSignIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Est. Earnings</p>
              <h3 className="text-2xl font-bold text-gray-900">
                $
                {earnings.toLocaleString(undefined, {
                  minimumFractionDigits: 2
                })}
              </h3>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 flex items-center gap-1">
            Next payout in 12 days
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Videos */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-w-0">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Recent Videos</h3>
            <Link
              to="/creator/videos"
              className="text-sm font-bold text-primary hover:text-primary-hover">

              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {myVideos.map((video) =>
            <div
              key={video.id}
              className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4">

                <div className="w-32 h-20 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0 relative">
                  {video.thumbnail_url ?
                <img
                  src={video.thumbnail_url}
                  alt=""
                  className="w-full h-full object-cover" /> :


                <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <PlayIcon className="w-6 h-6" />
                    </div>
                }
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded font-mono">
                    {video.duration_seconds ?
                  `${Math.floor(video.duration_seconds / 60)}:${(video.duration_seconds % 60).toString().padStart(2, '0')}` :
                  '0:00'}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 truncate">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <span>{video.views.toLocaleString()} views</span>
                    <span>•</span>
                    <span>
                      {new Date(video.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${video.approval_status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>

                      {video.approval_status === 'approved' ?
                    'Published' :
                    'Under Review'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips & Resources */}
        <div className="bg-gradient-to-br from-secondary to-primary rounded-2xl shadow-sm text-white p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

          <h3 className="text-xl font-heading font-bold mb-6 relative z-10">
            Creator Success Tips
          </h3>

          <div className="space-y-4 relative z-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h4 className="font-bold text-teal-100 mb-1">
                Optimize your thumbnails
              </h4>
              <p className="text-sm text-white/80">
                Videos with custom, high-contrast thumbnails get 30% more
                clicks.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h4 className="font-bold text-teal-100 mb-1">Engage early</h4>
              <p className="text-sm text-white/80">
                Replying to comments in the first hour boosts algorithm ranking.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h4 className="font-bold text-teal-100 mb-1">Weekly Webinar</h4>
              <p className="text-sm text-white/80 mb-3">
                Join our session on Monetization Strategies tomorrow.
              </p>
              <button className="bg-white text-primary text-sm font-bold px-4 py-2 rounded-lg w-full hover:bg-teal-50 transition-colors">
                Register Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}