import React from 'react';
import { motion } from 'framer-motion';
import {
  VideoIcon,
  UsersIcon,
  FileTextIcon,
  EyeIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon } from
'lucide-react';
import { REAL_VIDEOS } from '../../data/videoData';
import { POSTS, AUTHORS } from '../../data/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
const chartData = [
{
  name: 'Mon',
  views: 4000,
  users: 240
},
{
  name: 'Tue',
  views: 3000,
  users: 139
},
{
  name: 'Wed',
  views: 2000,
  users: 980
},
{
  name: 'Thu',
  views: 2780,
  users: 390
},
{
  name: 'Fri',
  views: 1890,
  users: 480
},
{
  name: 'Sat',
  views: 2390,
  users: 380
},
{
  name: 'Sun',
  views: 3490,
  users: 430
}];

export function AdminDashboard() {
  const pendingVideos = REAL_VIDEOS.filter(
    (v) => v.status === 'published' && v.approval_status !== 'approved'
  ).length;
  const totalViews = REAL_VIDEOS.reduce((acc, curr) => acc + curr.views, 0);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Dashboard Overview
        </h1>
        <div className="text-sm text-gray-500">Last updated: Just now</div>
      </div>

      {/* Stats Grid */}
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
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">

          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Videos</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">
                {REAL_VIDEOS.length}
              </h3>
            </div>
            <div className="p-3 bg-teal-50 rounded-lg text-primary">
              <VideoIcon className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+12%</span>
            <span className="text-gray-400 ml-2">from last month</span>
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
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">

          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Articles
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">
                {POSTS.length}
              </h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <FileTextIcon className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+5%</span>
            <span className="text-gray-400 ml-2">from last month</span>
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
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">

          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">
                {AUTHORS.length * 124}
              </h3>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <UsersIcon className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+18%</span>
            <span className="text-gray-400 ml-2">from last month</span>
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
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">

          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Views</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">
                {totalViews.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
              <EyeIcon className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+24%</span>
            <span className="text-gray-400 ml-2">from last month</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Platform Traffic
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB" />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6B7280',
                    fontSize: 12
                  }} />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6B7280',
                    fontSize: 12
                  }} />

                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} />

                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#0891B2"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    strokeWidth: 2
                  }}
                  activeDot={{
                    r: 6
                  }} />

                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    strokeWidth: 2
                  }}
                  activeDot={{
                    r: 6
                  }} />

              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Needs Attention
          </h3>

          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-50 border border-amber-100">
              <ClockIcon className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-900">
                  Pending Approvals
                </h4>
                <p className="text-sm text-amber-700 mt-1">
                  {pendingVideos} videos waiting for moderation.
                </p>
                <button className="mt-2 text-sm font-bold text-amber-700 hover:text-amber-900">
                  Review Now &rarr;
                </button>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-red-50 border border-red-100">
              <AlertCircleIcon className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-900">Reported Content</h4>
                <p className="text-sm text-red-700 mt-1">
                  3 articles flagged by users.
                </p>
                <button className="mt-2 text-sm font-bold text-red-700 hover:text-red-900">
                  Check Reports &rarr;
                </button>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
              <CheckCircleIcon className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">System Status</h4>
                <p className="text-sm text-gray-600 mt-1">
                  All services operational. Last backup 2 hours ago.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-w-0">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">
            Recent Videos Uploaded
          </h3>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Video</th>
                <th className="p-4 font-medium">Creator</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {REAL_VIDEOS.slice(0, 5).map((video) =>
              <tr
                key={video.id}
                className="hover:bg-gray-50 transition-colors">

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded bg-gray-200 overflow-hidden flex-shrink-0">
                        {video.thumbnail_url ?
                      <img
                        src={video.thumbnail_url}
                        alt=""
                        className="w-full h-full object-cover" /> :


                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <VideoIcon className="w-5 h-5" />
                          </div>
                      }
                      </div>
                      <p className="font-medium text-gray-900 line-clamp-1 max-w-[200px]">
                        {video.title}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    <span className="truncate block max-w-[120px]">
                      {video.user_id.substring(0, 8)}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600 capitalize">
                    {video.category}
                  </td>
                  <td className="p-4">
                    <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${video.approval_status === 'approved' ? 'bg-green-100 text-green-800' : video.status === 'published' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}>

                      {video.approval_status === 'approved' ?
                    'Approved' :
                    'Pending'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(video.created_at).toLocaleDateString()}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}