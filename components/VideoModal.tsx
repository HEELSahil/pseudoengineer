'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';

const VideoModal = ({ isOpen, onClose, onVideoPlay, youtubeUrl }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && onVideoPlay) {
      onVideoPlay();
    }
  }, [isOpen, onVideoPlay]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg max-w-3xl w-full p-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
        >
          <IoMdClose size={24} />
        </button>

        <div className="aspect-video w-full rounded overflow-hidden">
          <iframe
            className="w-full h-full"
            src={youtubeUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default VideoModal;
