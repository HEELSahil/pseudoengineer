'use client'

import { useState } from 'react';
import { coursesList } from '@data/coursesList';
import CoursesCard from '@components/CoursesCard';

export default function CourseList({ params }) {
    const slug = String(params.id);
    const course = coursesList.find((course) => course.slug === slug);

    if (!course) {
        return <div>Course not found</div>;
    }

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const problems = Object.values(course.folder);

    const filteredProblems = searchTerm
        ? problems.filter(problem => 
            problem.ctags.some(tag => 
                tag.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        : problems;

    return (
      <section>
        <div className="container py-12">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for courses by tags..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border-[2.5px] border-gray-400 rounded-full shadow-md focus:outline-none focus:ring-[2.5px] focus:ring-violet-500 focus:border-transparent"
            />
            </div>
            <div className="-m-4 flex flex-wrap">
              {filteredProblems.map((problem) => (
                <CoursesCard
                  key={problem.ctitle}
                  cid={problem.cid}
                  ctitle={problem.ctitle}
                  cslug={problem.cslug}
                  cdescription={problem.cdescription}
                  cimgSrc={problem.cimgSrc}
                  ctags={problem.ctags}
                  parentSlug={slug}
                />
              ))}
            </div>
          </div>
      </section>
    );
}