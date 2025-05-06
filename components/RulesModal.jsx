'use client';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import {
  FaLock,
  FaYoutube,
  FaCheckCircle,
  FaUndoAlt,
  FaMedal,
} from 'react-icons/fa';

const RulesModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-gradient-to-br from-black/40 to-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gradient-to-b from-white to-gray-50 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl shadow-2xl p-8 w-[90%] max-w-md relative overflow-hidden border border-gray-100 dark:border-zinc-700">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/10 dark:bg-purple-400/10 rounded-full blur-xl"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200"
          aria-label="Close modal"
        >
          <IoMdClose size={24} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
              📋
            </span>
            <span>Progress Tracking</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Understanding how your journey is saved
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex items-start space-x-4 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-200">
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg text-red-600 dark:text-red-300 flex-shrink-0">
              <FaLock size={16} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Default State
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All task checkboxes start locked until you engage with content
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-200">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-300 flex-shrink-0">
              <FaYoutube size={16} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Watch & Unlock
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View the YouTube content to unlock the corresponding task
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-200">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-300 flex-shrink-0">
              <FaCheckCircle size={16} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Mark Complete
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You can mark a task complete after watching the entire video
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-200">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg text-amber-600 dark:text-amber-300 flex-shrink-0">
              <FaUndoAlt size={16} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Lock Again
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Unchecking a completed task will lock it again
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-200">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-300 flex-shrink-0">
              <FaMedal size={16} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Earn Rewards
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your progress is saved for certifications and badges
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-zinc-700">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Got it
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RulesModal;
