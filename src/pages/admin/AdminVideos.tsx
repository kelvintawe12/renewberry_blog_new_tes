import React, { useState, useEffect } from 'react';
import { REAL_VIDEOS, RealVideo } from '../../data/videoData';
import {
  SearchIcon,
  FilterIcon,
  MoreVerticalIcon,
  CheckIcon,
  XIcon,
  PlayIcon,
  ExternalLinkIcon,
  ChevronLeftIcon,
  ChevronRightIcon } from
'lucide-react';
export function AdminVideos() {
  const [videos, setVideos] = useState<RealVideo[]>(REAL_VIDEOS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVideos = filteredVideos.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Video Management
        </h1>
        <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
          <div className="relative flex-1 min-w-0 xs:w-64">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.length === 0 && (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-200">
            No videos found matching your criteria.
          </div>
        )}
        {paginatedVideos.map((video) => (
          <div key={video.id} className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
            <div className="relative group">
              <div className="w-full aspect-video bg-gray-200 overflow-hidden flex items-center justify-center">
                {video.thumbnail_url ? (
                  <img src={video.thumbnail_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <PlayIcon className="w-10 h-10 text-gray-400" />
                )}
                <div
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-default select-none">
                  <ExternalLinkIcon className="w-6 h-6 text-white opacity-60" />
                </div>
              </div>
              <span className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold ${video.approval_status === 'approved' ? 'bg-green-100 text-green-800' : video.approval_status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                {video.approval_status === 'approved' ? 'Approved' : video.approval_status === 'rejected' ? 'Rejected' : 'Pending'}
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-900 line-clamp-1 text-sm">{video.title}</span>
                <span className="ml-auto bg-gray-100 px-2 py-0.5 rounded text-xs capitalize">{video.category}</span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">{video.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                <span>ID: {video.id.substring(0, 8)}...</span>
                <span>By: {video.uploader_role}</span>
              </div>
              <div className="flex gap-4 mt-2 text-xs">
                <span className="text-gray-900 font-medium">{video.views.toLocaleString()} views</span>
                <span className="text-gray-500">{video.likes.toLocaleString()} likes</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 p-3 border-t border-gray-100 bg-gray-50">
              <div className="flex gap-2">
                {video.approval_status !== 'approved' && (
                  <button
                    onClick={() => handleApprove(video.id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Approve">
                    <CheckIcon className="w-5 h-5" />
                  </button>
                )}
                {video.approval_status !== 'rejected' && (
                  <button
                    onClick={() => handleReject(video.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Reject">
                    <XIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVerticalIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-xl shadow-sm">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredVideos.length)}</span> of{' '}
                <span className="font-medium">{filteredVideos.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-current={page === currentPage ? 'page' : undefined}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      page === currentPage
                        ? 'z-10 bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>);

}