import React from 'react';
import { Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react';
interface ShareButtonsProps {
  url: string;
  title: string;
}
export function ShareButtons({ url, title }: ShareButtonsProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    // In a real app, show a toast notification here
    alert('Link copied to clipboard!');
  };
  return (
    <div className="flex items-center space-x-4 py-6 border-y border-gray-200 my-8">
      <span className="font-heading font-semibold text-text-primary mr-2">
        Share this story:
      </span>

      <button
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
        aria-label="Share on Twitter">

        <Twitter className="w-5 h-5" />
      </button>

      <button
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
        aria-label="Share on Facebook">

        <Facebook className="w-5 h-5" />
      </button>

      <button
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
        aria-label="Share on LinkedIn">

        <Linkedin className="w-5 h-5" />
      </button>

      <button
        onClick={handleCopy}
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
        aria-label="Copy link">

        <LinkIcon className="w-5 h-5" />
      </button>
    </div>);

}