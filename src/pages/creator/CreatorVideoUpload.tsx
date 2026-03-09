import React, { useState } from 'react';
import { UploadIcon, XIcon, CheckCircleIcon, FilmIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export function CreatorVideoUpload() {
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setStep(2);
    }
  };
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    // Simulate upload progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setStep(3);
          setIsUploading(false);
        }, 500);
      }
    }, 300);
  };
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold text-gray-900">
        Upload Video
      </h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary z-0 transition-all duration-500"
          style={{
            width: step === 1 ? '0%' : step === 2 ? '50%' : '100%'
          }}>
        </div>

        {[1, 2, 3].map((num) =>
        <div
          key={num}
          className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${step >= num ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>

            {step > num ? <CheckCircleIcon className="w-6 h-6" /> : num}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        {step === 1 &&
        <div className="text-center py-12">
            <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <UploadIcon className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Select video to upload
            </h2>
            <p className="text-gray-500 mb-8">
              Your videos will be private until you publish them.
            </p>

            <label className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-bold cursor-pointer transition-colors shadow-sm inline-block">
              Select File
              <input
              type="file"
              className="hidden"
              accept="video/*"
              onChange={handleFileSelect} />

            </label>
            <p className="text-xs text-gray-400 mt-4">
              MP4, WebM or OGG. Maximum file size 2GB.
            </p>
          </div>
        }

        {step === 2 &&
        <form onSubmit={handleUpload} className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                <FilmIcon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">my_awesome_video.mp4</p>
                <p className="text-sm text-gray-500">245 MB</p>
              </div>
              <button
              type="button"
              onClick={() => setStep(1)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">

                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Title (required)
                </label>
                <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="Add a title that describes your video" />

              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                placeholder="Tell viewers about your video..." />

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Category
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white">
                    <option>Education</option>
                    <option>Entertainment</option>
                    <option>Tech</option>
                    <option>Lifestyle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Tags
                  </label>
                  <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  placeholder="e.g. tutorial, tips" />

                </div>
              </div>
            </div>

            {isUploading &&
          <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold text-primary">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                className="h-full bg-primary transition-all duration-300"
                style={{
                  width: `${progress}%`
                }}>
              </div>
                </div>
              </div>
          }

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
              type="submit"
              disabled={isUploading}
              className="bg-primary hover:bg-primary-hover disabled:bg-gray-300 text-white px-8 py-2.5 rounded-xl font-bold transition-colors shadow-sm">

                {isUploading ? 'Processing...' : 'Upload & Publish'}
              </button>
            </div>
          </form>
        }

        {step === 3 &&
        <div className="text-center py-12">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Upload Complete!
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Your video has been submitted and is currently under review by our
              moderation team. It will be live soon.
            </p>

            <div className="flex justify-center gap-4">
              <button
              onClick={() => setStep(1)}
              className="px-6 py-2.5 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">

                Upload Another
              </button>
              <button
              onClick={() => navigate('/creator/videos')}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-sm">

                Go to My Videos
              </button>
            </div>
          </div>
        }
      </div>
    </div>);

}