'use client';

import React from 'react';

const SignInPromptModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 w-[90%] max-w-sm">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Save your progress
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">
          Sign in to keep track of what you&apos;ve completed and pick up where
          you left off.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
          >
            Not now
          </button>
          <a
            href="/sign-in"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm rounded-md font-medium"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInPromptModal;
