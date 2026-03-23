    // Simulated data for new sections
    const recentActivity = [
      { action: 'User John uploaded a video', time: '3m ago' },
      { action: 'Admin updated settings', time: '10m ago' },
      { action: 'Jane commented on an article', time: '30m ago' },
      { action: 'Server backup completed', time: '1h ago' },
    ];
    const supportTickets = [
      { subject: 'Login issue', status: 'Open', user: 'Alice' },
      { subject: 'Video not processing', status: 'Pending', user: 'Bob' },
      { subject: 'Feature request: Dark mode', status: 'Closed', user: 'Eve' },
    ];
    const userFeedback = [
      { user: 'Sam', feedback: 'Love the new dashboard!' },
      { user: 'Lily', feedback: 'Can you add more analytics?' },
      { user: 'Mike', feedback: 'Mobile view is great.' },
    ];
    const systemUsage = {
      storage: 68, // percent
      bandwidth: 42, // percent
    };
  // Simulated data for new features
  const recentComments = [
    { user: 'Jane Doe', comment: 'Great video! Very helpful.', time: '2m ago' },
    { user: 'John Smith', comment: 'Article needs more details.', time: '10m ago' },
    { user: 'Alice', comment: 'Loved the new update!', time: '1h ago' },
  ];
  const topContent = [
    { title: 'How to Grow on YouTube', views: 12000 },
    { title: 'React vs Vue: 2026', views: 9500 },
    { title: '10 Tips for Creators', views: 8700 },
  ];
  const userGrowth = [
    { day: 'Mon', users: 10 },
    { day: 'Tue', users: 20 },
    { day: 'Wed', users: 15 },
    { day: 'Thu', users: 30 },
    { day: 'Fri', users: 25 },
    { day: 'Sat', users: 40 },
    { day: 'Sun', users: 35 },
  ];
  const systemHealth = {
    status: 'Operational',
    uptime: '99.98%',
    lastBackup: '2 hours ago',
    errors: 0,
  };
  const adminNotes = [
    'Review flagged content',
    'Prepare monthly report',
    'Update FAQ section',
  ];
      {/* Quick Actions Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-primary text-white rounded-xl py-2 px-3 text-xs font-semibold shadow hover:bg-teal-700 transition">Add Video</button>
        <button className="bg-blue-600 text-white rounded-xl py-2 px-3 text-xs font-semibold shadow hover:bg-blue-700 transition">Add Article</button>
        <button className="bg-purple-600 text-white rounded-xl py-2 px-3 text-xs font-semibold shadow hover:bg-purple-700 transition">Send Notification</button>
        <button className="bg-orange-500 text-white rounded-xl py-2 px-3 text-xs font-semibold shadow hover:bg-orange-600 transition">Create Category</button>
      </div>
      {/* More Features Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Recent Comments */}
        <div className="bg-white rounded-2xl shadow p-4 border border-gray-100 flex flex-col min-w-0">
          <h3 className="text-base font-bold text-gray-900 mb-2">Recent Comments</h3>
          <ul className="text-xs text-gray-700 space-y-2">
            {recentComments.map((c, i) => (
              <li key={i} className="flex justify-between items-center border-b last:border-b-0 pb-1">
                <span className="font-semibold text-primary">{c.user}:</span>
                <span className="flex-1 mx-2 truncate">{c.comment}</span>
                <span className="text-gray-400 ml-2">{c.time}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Top Performing Content */}
        <div className="bg-white rounded-2xl shadow p-4 border border-gray-100 flex flex-col min-w-0">
          <h3 className="text-base font-bold text-gray-900 mb-2">Top Performing Content</h3>
          <ul className="text-xs text-gray-700 space-y-2">
            {topContent.map((c, i) => (
              <li key={i} className="flex justify-between items-center border-b last:border-b-0 pb-1">
                <span className="truncate">{c.title}</span>
                <span className="text-green-600 font-semibold ml-2">{c.views.toLocaleString()} views</span>
              </li>
            ))}
          </ul>
        </div>
        {/* User Growth Chart */}
        <div className="bg-white rounded-2xl shadow p-4 border border-gray-100 flex flex-col min-w-0">
          <h3 className="text-base font-bold text-gray-900 mb-2">User Growth</h3>
          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowth} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 10 }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '10px' }} />
                <Line type="monotone" dataKey="users" stroke="#0891B2" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* System Health */}
        <div className="bg-white rounded-2xl shadow p-4 border border-gray-100 flex flex-col min-w-0">
          <h3 className="text-base font-bold text-gray-900 mb-2">System Health</h3>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>Status: <span className="font-semibold text-green-600">{systemHealth.status}</span></li>
            <li>Uptime: <span className="font-semibold">{systemHealth.uptime}</span></li>
            <li>Last Backup: <span className="font-semibold">{systemHealth.lastBackup}</span></li>
            <li>Errors: <span className={systemHealth.errors === 0 ? 'text-green-600' : 'text-red-500'}>{systemHealth.errors}</span></li>
          </ul>
        </div>
        {/* Admin Notes */}
        <div className="bg-white rounded-2xl shadow p-4 border border-gray-100 flex flex-col min-w-0">
          <h3 className="text-base font-bold text-gray-900 mb-2">Admin Notes</h3>
          <ul className="text-xs text-gray-700 space-y-1">
            {adminNotes.map((note, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
  // Simulated performance value for gauge
  const performance = 88;
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-xl font-heading font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Last month</span>
          <span className="inline-block w-2 h-2 rounded-full bg-green-400 ml-1" />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 sm:overflow-x-visible">
        {/* Projects/Stats Example */}
        <div className="min-w-[180px] bg-white rounded-2xl shadow p-4 flex flex-col gap-1 border border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <VideoIcon className="w-5 h-5 text-primary bg-teal-50 rounded p-1" />
            <span className="text-gray-500 text-xs">Videos</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{REAL_VIDEOS.length}</div>
          <div className="text-[10px] text-green-500 font-medium">+12% <span className="text-gray-400 ml-1">this month</span></div>
        </div>
        <div className="min-w-[180px] bg-white rounded-2xl shadow p-4 flex flex-col gap-1 border border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <FileTextIcon className="w-5 h-5 text-blue-600 bg-blue-50 rounded p-1" />
            <span className="text-gray-500 text-xs">Articles</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{POSTS.length}</div>
          <div className="text-[10px] text-green-500 font-medium">+5% <span className="text-gray-400 ml-1">this month</span></div>
        </div>
        <div className="min-w-[180px] bg-white rounded-2xl shadow p-4 flex flex-col gap-1 border border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-purple-600 bg-purple-50 rounded p-1" />
            <span className="text-gray-500 text-xs">Users</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{AUTHORS.length * 124}</div>
          <div className="text-[10px] text-green-500 font-medium">+18% <span className="text-gray-400 ml-1">this month</span></div>
        </div>
        <div className="min-w-[180px] bg-white rounded-2xl shadow p-4 flex flex-col gap-1 border border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <EyeIcon className="w-5 h-5 text-orange-600 bg-orange-50 rounded p-1" />
            <span className="text-gray-500 text-xs">Views</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{totalViews.toLocaleString()}</div>
          <div className="text-[10px] text-green-500 font-medium">+24% <span className="text-gray-400 ml-1">this month</span></div>
        </div>
      </div>

      {/* Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-4 border border-gray-100 min-w-0 flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-bold text-gray-900">Revenues and expenses</h3>
            <button className="text-[11px] text-primary font-semibold hover:underline">View all</button>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="views" stroke="#0891B2" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="users" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <div>
              <span className="font-bold text-gray-900">Revenue</span>
              <span className="ml-2 text-green-600 font-semibold">$7800.00</span>
            </div>
            <div>
              <span className="font-bold text-gray-900">Expenses</span>
              <span className="ml-2 text-red-500 font-semibold">$2520.00</span>
            </div>
          </div>
        </div>

        {/* Performance Gauge Card */}
        <div className="bg-white rounded-2xl shadow p-4 border border-gray-100 flex flex-col items-center justify-center">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Your Performance</h3>
          {/* Simulated gauge using a circle and text */}
          <div className="relative flex items-center justify-center mb-2">
            <svg width="90" height="90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="#F3F4F6" />
              <circle cx="60" cy="60" r="54" fill="none" stroke="#0891B2" strokeWidth="10" strokeDasharray="339.292" strokeDashoffset="{339.292 - (performance / 100) * 339.292}" strokeLinecap="round" />
            </svg>
            <span className="absolute text-xl font-bold text-primary">{performance}%</span>
          </div>
          <ul className="text-[11px] text-gray-600 space-y-1 w-full">
            <li>• Sent 3 proposals</li>
            <li>• 2 campaigns</li>
            <li>• 1 video near next KPI</li>
          </ul>
        </div>
      </div>

      {/* Lower Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active Details Table */}
        <div className="bg-white rounded-2xl shadow p-4 border border-gray-100 lg:col-span-2 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-bold text-gray-900">Active details</h3>
            <button className="text-[11px] text-primary font-semibold hover:underline">View all</button>
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
                {REAL_VIDEOS.slice(0, 5).map((video) => (
                  <tr key={video.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-gray-200 overflow-hidden flex-shrink-0">
                          {video.thumbnail_url ? (
                            <img src={video.thumbnail_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <VideoIcon className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <p className="font-medium text-gray-900 line-clamp-1 max-w-[200px]">{video.title}</p>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      <span className="truncate block max-w-[120px]">{video.user_id.substring(0, 8)}</span>
                    </td>
                    <td className="p-4 text-sm text-gray-600 capitalize">{video.category}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${video.approval_status === 'approved' ? 'bg-green-100 text-green-800' : video.status === 'published' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}>
                        {video.approval_status === 'approved' ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500">{new Date(video.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Tasks Card */}
        <div className="bg-white rounded-2xl shadow p-4 border border-gray-100 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-bold text-gray-900">Pending tasks</h3>
            <button className="text-[11px] text-primary font-semibold hover:underline">View all</button>
          </div>
          <ul className="divide-y divide-gray-100 text-xs">
            <li className="py-2 flex items-center gap-2">
              <span className="inline-block w-7 h-7 rounded-full bg-gray-200" />
              <div>
                <p className="font-medium text-gray-900">Invoice for Notion collab</p>
                <p className="text-[10px] text-gray-500">Send by March 24</p>
              </div>
            </li>
            <li className="py-2 flex items-center gap-2">
              <span className="inline-block w-7 h-7 rounded-full bg-gray-200" />
              <div>
                <p className="font-medium text-gray-900">TikTok reels to finish</p>
                <p className="text-[10px] text-gray-500">Upload by March 28</p>
              </div>
            </li>
            <li className="py-2 flex items-center gap-2">
              <span className="inline-block w-7 h-7 rounded-full bg-gray-200" />
              <div>
                <p className="font-medium text-gray-900">Follow up with Gymshark</p>
                <p className="text-[10px] text-gray-500">Email by March 30</p>
              </div>
            </li>
          </ul>
        </div>
            {/* Announcements & Quick Links Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Announcements - prominent card */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow p-4 border border-blue-100 flex flex-col min-w-0 md:col-span-2">
                <h3 className="text-base font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary" /> Announcements
                </h3>
                <ul className="text-xs text-gray-700 space-y-2">
                  <li><span className="font-semibold text-primary">[Update]</span> New analytics features released!</li>
                  <li><span className="font-semibold text-green-600">[Success]</span> Server maintenance completed.</li>
                  <li><span className="font-semibold text-red-500">[Alert]</span> Scheduled downtime on March 30.</li>
                </ul>
              </div>
              {/* Quick Links - prominent card */}
              <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl shadow p-4 border border-teal-100 flex flex-col min-w-0">
                <h3 className="text-base font-bold text-teal-900 mb-2 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary" /> Quick Links
                </h3>
                <ul className="text-xs text-primary space-y-2">
                  <li><a href="/admin/settings" className="hover:underline">Settings</a></li>
                  <li><a href="/admin/analytics" className="hover:underline">Analytics</a></li>
                  <li><a href="/admin/users" className="hover:underline">User Management</a></li>
                  <li><a href="/admin/articles" className="hover:underline">Articles</a></li>
                </ul>
              </div>
            </div>

            {/* New Feature Sections Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow p-4 border border-gray-100 flex flex-col min-w-0">
                <h3 className="text-base font-bold text-gray-900 mb-2">Recent Activity</h3>
                <ul className="text-xs text-gray-700 space-y-2">
                  {recentActivity.map((a, i) => (
                    <li key={i} className="flex justify-between items-center border-b last:border-b-0 pb-1">
                      <span className="truncate">{a.action}</span>
                      <span className="text-gray-400 ml-2">{a.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Support Tickets */}
              <div className="bg-white rounded-2xl shadow p-4 border border-gray-100 flex flex-col min-w-0">
                <h3 className="text-base font-bold text-gray-900 mb-2">Support Tickets</h3>
                <ul className="text-xs text-gray-700 space-y-2">
                  {supportTickets.map((t, i) => (
                    <li key={i} className="flex justify-between items-center border-b last:border-b-0 pb-1">
                      <span className="truncate">{t.subject}</span>
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold ${t.status === 'Open' ? 'bg-red-100 text-red-600' : t.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{t.status}</span>
                      <span className="text-gray-400 ml-2">{t.user}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* User Feedback */}
              <div className="bg-white rounded-2xl shadow p-4 border border-gray-100 flex flex-col min-w-0">
                <h3 className="text-base font-bold text-gray-900 mb-2">User Feedback</h3>
                <ul className="text-xs text-gray-700 space-y-2">
                  {userFeedback.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 border-b last:border-b-0 pb-1">
                      <span className="font-semibold text-primary">{f.user}:</span>
                      <span className="truncate">{f.feedback}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* System Usage */}
              <div className="bg-white rounded-2xl shadow p-4 border border-gray-100 flex flex-col min-w-0">
                <h3 className="text-base font-bold text-gray-900 mb-2">System Usage</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-20">Storage</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${systemUsage.storage}%` }} />
                    </div>
                    <span className="ml-2 font-semibold">{systemUsage.storage}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-20">Bandwidth</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${systemUsage.bandwidth}%` }} />
                    </div>
                    <span className="ml-2 font-semibold">{systemUsage.bandwidth}%</span>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
}