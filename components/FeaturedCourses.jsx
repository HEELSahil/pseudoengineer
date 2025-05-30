'use client';

import { useEffect, useState } from 'react';

import { coursesList } from '@data/coursesList';
import FolderCard from '@components/FolderCard';

export default function FeaturedCourses() {
  const [featuredData, setFeaturedData] = useState([]);

  useEffect(() => {
    const fetchFeaturedData = async () => {
      const filteredData = coursesList.filter(
        (course) => course.id === 1 || course.id === 2 || course.id === 3
      );
      setFeaturedData(filteredData);
    };
    fetchFeaturedData();
  }, []);

  return (
    <>
      <div className="container py-12">
        <div className="-m-4 flex flex-wrap">
          {featuredData.map((d) => (
            <FolderCard
              key={d.title}
              id={d.id}
              title={d.title}
              slug={d.slug}
              description={d.description}
              imgSrc={d.imgSrc}
              tags={d.tags}
            />
          ))}
        </div>
      </div>
    </>
  );
}
