'use client';

import { useState } from 'react';
import { Facebook, Twitter, Copy, Check } from 'lucide-react';

interface ShareButtonProps {
  url: string;
  title: string;
}

export default function ShareButton({ url, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={shareToFacebook}
        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        title="Share to Facebook"
      >
        <Facebook className="w-4 h-4" />
      </button>
      <button
        onClick={shareToTwitter}
        className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
        title="Share to Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>
      <button
        onClick={copyLink}
        className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
        title="Copy Link"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}