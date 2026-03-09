import React, { useState } from 'react';
import { REAL_VIDEOS, RealVideo } from '../../data/videoData';
import {
  SearchIcon,
  FilterIcon,
  MoreVerticalIcon,
  CheckIcon,
  XIcon,
  PlayIcon,
  ExternalLinkIcon } from
'lucide-react';
export function AdminVideos() {
  const [videos, setVideos] = useState<RealVideo[]>(REAL_VIDEOS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const handleApprove = (id: string) => {
    setVideos(
      videos.map((v) =>
      v.id === id ?
      {
        ...v,
        approval_status: 'approved'
      } :
      v
      )
    );
  };
  const handleReject = (id: string) => {
    setVideos(
      videos.map((v) =>
      v.id === id ?
      {
        ...v,
        approval_status: 'rejected'
      } :
      v
      )
    );
  };
  const filteredVideos = videos.filter((v) => {
    const matchesSearch =
    v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
    filterStatus === 'all' ||
    filterStatus === 'approved' && v.approval_status === 'approved' ||
    filterStatus === 'pending' && v.approval_status !== 'approved';
    return matchesSearch && matchesStatus;
  });
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Video Management
        </h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />

          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white">

            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-w-0">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Video Details</th>
                <th className="p-4 font-medium">Metrics</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVideos.map((video) =>
              <tr
                key={video.id}
                className="hover:bg-gray-50 transition-colors group">

                  <td className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-16 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0 relative group-hover:shadow-md transition-shadow">
                        {video.thumbnail_url ?
                      <img
                        src={video.thumbnail_url}
                        alt=""
                        className="w-full h-full object-cover" /> :


                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <PlayIcon className="w-6 h-6" />
                          </div>
                      }
                        <a
                        href={video.video_url}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">

                          <ExternalLinkIcon className="w-5 h-5 text-white" />
                        </a>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 line-clamp-1 max-w-[300px]">
                          {video.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1 max-w-[300px]">
                          {video.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          ID: {video.id.substring(0, 8)}... • By:{' '}
                          {video.uploader_role}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1 text-sm">
                      <span className="text-gray-900 font-medium">
                        {video.views.toLocaleString()} views
                      </span>
                      <span className="text-gray-500">
                        {video.likes.toLocaleString()} likes
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 capitalize">
                    <span className="bg-gray-100 px-2.5 py-1 rounded-md">
                      {video.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${video.approval_status === 'approved' ? 'bg-green-100 text-green-800' : video.approval_status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>

                      {video.approval_status === 'approved' ?
                    'Approved' :
                    video.approval_status === 'rejected' ?
                    'Rejected' :
                    'Pending'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {video.approval_status !== 'approved' &&
                    <button
                      onClick={() => handleApprove(video.id)}
                      className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Approve">

                          <CheckIcon className="w-5 h-5" />
                        </button>
                    }
                      {video.approval_status !== 'rejected' &&
                    <button
                      onClick={() => handleReject(video.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Reject">

                          <XIcon className="w-5 h-5" />
                        </button>
                    }
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVerticalIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              {filteredVideos.length === 0 &&
              <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No videos found matching your criteria.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
          <span>
            Showing {filteredVideos.length} of {videos.length} videos
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>);

}