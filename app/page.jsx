'use client';

import { useState, useRef } from 'react';
import { coursesList } from '@data/coursesList';
import SeriesCard from '@components/SeriesCard';
import usePageViewLogger from '@components/usePageViewLogger';

export default function HomePage() {
  usePageViewLogger('/');

  const [showAllTags, setShowAllTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const coursesRef = useRef(null);

  // Count occurrences of each tag
  const tagCounts = coursesList
    .flatMap((course) => course.tags)
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
    ? coursesList.filter((course) => course.tags.includes(selectedTag))
    : coursesList;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //   const scrollToSection3 = () => {
  //     coursesRef.current.scrollIntoView({ behavior: 'smooth' });
  //   };

  const smoothScrollToCourses = () => {
    const targetPosition = coursesRef.current.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const duration = 750; // Adjust the duration to control the speed

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  return (
    <>
      <section>
        <div className="flex justify-center md:pr-20 lg:pr-0 xl:pr-60 lg:pt-10 text-4xl md:text-6xl lg:text-7xl font-extrabold underline bg-gradient-to-r bg-clip-text text-transparent from-indigo-500 via-purple-500 to-indigo-500 animate-text">
          From Pretend to Pro, Your Journey to Genuine Tech Mastery Starts Here
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg pt-3 md:pb-6">
          With easy-to-follow, practical courses that simplify complex
          technologies, pseudoEngineer will help you achieve genuine mastery and
          ensure your skills are job-ready.
        </p>
      </section>

      <section className="flex flex-col md:flex-row justify-between items-start md:space-x-8 py-6 md:py-6 md:pr-16">
        <div className="relative justify-start inline-block">
          <button
            onClick={smoothScrollToCourses}
            className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-text text-white text-md md:text-lg font-semibold rounded-md shadow-lg hover:shadow-xl transition-shadow duration-200 z-2"
          >
            <span>Explore The Learning Vault</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="ml-2 w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
          <div className="absolute inset-x-0 top-full mt-[-49px] mr-[-7px] mx-auto w-[292px] md:w-[315px] h-14 bg-gray-300 rounded-md shadow-lg -z-50"></div>
        </div>
        <div className="bg-homepage-black dark:bg-homepage-white bg-cover w-80 md:w-72 pb-72 mt-14 md:mt-[-60px] m-0 self-center"></div>
      </section>

      <section ref={coursesRef} className="container mx-auto py-12">
        <div className="my-6">
          <div className="flex justify-between">
            <div
              className={`flex flex-wrap ${
                showAllTags ? '' : 'max-h-10 overflow-hidden'
              } transition-all duration-300`}
            >
              {sortedTags.map(({ tag, count }) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(selectedTag === tag ? '' : tag);
                    setCurrentPage(1); // Reset to page 1 when changing the filter
                  }}
                  className={`px-2 py-1 m-1 text-xs font-semibold rounded-full flex items-center space-x-1 ${
                    selectedTag === tag
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black'
                  }`}
                >
                  <span>{tag}</span>
                  <span className="bg-gray-400 rounded-full px-2 text-xs">
                    {count}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="text-black dark:text-white mt-1 focus:outline-none flex items-start font-semibold space-x-1"
            >
              {showAllTags ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-4 h-4 mt-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 18.75L12 11.25L19.5 18.75M4.5 12.75L12 5.25L19.5 12.75"
                    />
                  </svg>
                  <span>Collapse</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-4 h-4 mt-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 5.25L12 12.75L19.5 5.25M4.5 11.25L12 18.75L19.5 11.25"
                    />
                  </svg>
                  <span>Expand</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap -m-4">
          {currentCourses.map((course) => (
            <SeriesCard
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
        <div className="flex justify-center mt-10">
          <nav
            className="inline-flex shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-full border-2 border-gray-700 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                currentPage === 1 && 'opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`relative inline-flex items-center px-4 py-2 border-2 border-gray-700 bg-white dark:bg-gray-700 text-sm font-medium ${
                  currentPage === index + 1
                    ? 'bg-blue-300 dark:bg-indigo-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-full border-2 border-gray-700 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                currentPage === totalPages && 'opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </nav>
        </div>
      </section>
    </>
  );
}
