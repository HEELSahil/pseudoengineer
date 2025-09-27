'use client';

import { useState } from 'react';
import { FaYoutube, FaCode, FaBook } from 'react-icons/fa';
import SignInPromptModal from './SignInPromptModal';
import VideoModal from './VideoModal';
import RulesModal from './RulesModal';

export default function ContentTable({ tasks, userId, onTaskToggle }) {
  const [taskStates, setTaskStates] = useState(() =>
    tasks.map((task) => ({
      id: task.id,
      completed: task.progress?.[0]?.completed || false,
      unlocked: task.progress?.[0]?.completed || false,
    })),
  );
  const [showModal, setShowModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [showRules, setShowRules] = useState(Boolean(userId));

  const toggleCheckbox = async (taskId, checked) => {
    if (!userId) {
      setShowModal(true);
      return;
    }
    const isUnlocked = taskStates.find((t) => t.id === taskId)?.unlocked;
    if (!isUnlocked) return;

    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId, userId, completed: checked }),
    });

    setTaskStates((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: checked } : t)),
    );

    onTaskToggle?.();
  };

  const openVideo = (taskId) => {
    setActiveTaskId(taskId);
    setTaskStates((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, unlocked: true } : t)),
    );
    setShowVideoModal(true);
  };

  return (
    <>
      <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />
      <SignInPromptModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        youtubeUrl={tasks.find((t) => t.id === activeTaskId)?.youtubeUrl || ''}
      />

      <div className="overflow-x-auto mt-2">
        <table className="min-w-full table-auto border border-zinc-200 dark:border-zinc-800 text-sm rounded-xl overflow-hidden">
          <thead className="bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-white">
            <tr className="text-center">
              <th className="p-3 border-r border-zinc-200 dark:border-zinc-700">
                Status
              </th>
              <th className="p-3 border-r border-zinc-200 dark:border-zinc-700 text-left">
                Problem
              </th>
              <th className="p-3 border-r border-zinc-200 dark:border-zinc-700">
                Blog
              </th>
              <th className="p-3 border-r border-zinc-200 dark:border-zinc-700">
                YouTube
              </th>
              <th className="p-3 border-r border-zinc-200 dark:border-zinc-700">
                Practice
              </th>
              <th className="p-3">Difficulty</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-300">
            {tasks.map((task) => {
              const localState = taskStates.find((t) => t.id === task.id);
              const isDisabled = !localState?.unlocked && userId;
              return (
                <tr
                  key={task.id}
                  className="border-t border-zinc-200 dark:border-zinc-800 text-center"
                >
                  <td className="p-3 border-r border-zinc-200 dark:border-zinc-800 text-center align-middle">
                    <div
                      onClick={() =>
                        !isDisabled &&
                        toggleCheckbox(task.id, !localState?.completed)
                      }
                      title={isDisabled ? 'Watch video to unlock' : ''}
                      className={`mx-auto w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors duration-200 cursor-${isDisabled ? 'not-allowed' : 'pointer'}
                        ${localState?.completed ? 'bg-emerald-600 border-emerald-500' : 'bg-gray-100 border-zinc-400 dark:bg-zinc-800 dark:border-zinc-600'}`}
                    >
                      {localState?.completed && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </td>

                  <td className="p-3 border-r border-zinc-200 dark:border-zinc-800 text-left whitespace-nowrap">
                    {task.title}
                  </td>

                  <td className="p-3 border-r border-zinc-200 dark:border-zinc-800">
                    {task.articleUrl && (
                      <div className="flex justify-center items-center">
                        <a
                          href={`/blog/${task.id}`}
                          className="text-blue-500 dark:text-blue-400 text-xl"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaBook />
                        </a>
                      </div>
                    )}
                  </td>

                  <td className="p-3 border-r border-zinc-200 dark:border-zinc-800">
                    {task.youtubeUrl && (
                      <div className="flex justify-center items-center">
                        <button
                          className="text-red-500 text-xl"
                          onClick={() => openVideo(task.id)}
                        >
                          <FaYoutube />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="p-3 border-r border-zinc-200 dark:border-zinc-800">
                    {task.practiceUrl && (
                      <div className="flex justify-center items-center">
                        <a
                          href={task.practiceUrl}
                          className="text-green-600 dark:text-green-400 text-xl"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaCode />
                        </a>
                      </div>
                    )}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        task.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
                          : task.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100'
                            : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'
                      }`}
                    >
                      {task.difficulty}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
