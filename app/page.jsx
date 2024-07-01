'use client';

import { useState } from 'react';
import { coursesList } from '@data/coursesList';
import FolderCard from '@components/FolderCard';

export default function HomePage() {
  const [showAllTags, setShowAllTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');

  // Count occurrences of each tag
  const tagCounts = coursesList.flatMap(course => course.tags)
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

  // Get sorted tags based on count
  const sortedTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([tag, count]) => ({ tag, count }));

  // Filter courses based on selected tag
  const filteredCourses = selectedTag 
    ? coursesList.filter(course => course.tags.includes(selectedTag))
    : coursesList;

  return (
    <section className="container mx-auto py-12">
      <div className="my-6">
        <div className="flex justify-between">
          <div className={`flex flex-wrap ${showAllTags ? '' : 'max-h-10 overflow-hidden'} transition-all duration-300`}>
            {sortedTags.map(({ tag, count }) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                className={`px-2 py-1 m-1 text-xs font-semibold rounded-full flex items-center space-x-1 ${selectedTag === tag ? 'bg-black dark:bg-white text-white dark:text-black' : 'hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black'}`}
              >
                <span>{tag}</span>
                <span className="bg-gray-400 rounded-full px-2 text-xs">{count}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowAllTags(!showAllTags)}
            className="text-black dark:text-white mt-1 focus:outline-none flex items-start font-semibold space-x-1"
          >
            {showAllTags ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-4 h-4 mt-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 18.75L12 11.25L19.5 18.75M4.5 12.75L12 5.25L19.5 12.75" />
                </svg>
                <span>Collapse</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-4 h-4 mt-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.25L12 12.75L19.5 5.25M4.5 11.25L12 18.75L19.5 11.25" />
                </svg>
                <span>Expand</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-wrap -m-4">
        {filteredCourses.map(course => (
          <FolderCard
            key={course.id}
            id={course.id}
            title={course.title}
            slug={course.slug}
            description={course.description}
            imgSrc={course.imgSrc}
            tags={course.tags}
          />
        ))}
      </div>
    </section>
  );
}