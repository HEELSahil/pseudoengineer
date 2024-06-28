'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { coursesList } from '@data/coursesList';

const SimilarCourses = ({ currentCourseSlug, currentProblemTags }) => {
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        // Flatten all folder items and gather their ctags
        const allTags = coursesList.reduce((acc, course) => {
            Object.values(course.folder).forEach(problem => {
                if (problem.ctags.some(tag => currentProblemTags.includes(tag))) {
                    acc.push({ ...problem, courseSlug: course.slug });
                }
            });
            return acc;
        }, []);

        // Filter out the current course problems
        const filtered = allTags.filter(problem => problem.courseSlug !== currentCourseSlug);

        setFilteredCourses(filtered);
    }, [currentCourseSlug, currentProblemTags]);

    const sliderRef = useRef(null);

    const handleScroll = (scrollOffset) => {
        sliderRef.current.scrollLeft += scrollOffset;
    };

    if (filteredCourses.length === 0) {
        return null;
    }

    return (
        <>
            <div className="flex flex-row justify-between">
                <div>
                    <h3 className="font-bold md:font-extrabold text-[21px] md:text-2xl tracking-wide">
                        Similar courses like this one
                    </h3>
                </div>
                <div>
                    <button onClick={() => handleScroll(-416)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <g fill="none" fillRule="evenodd">
                                <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
                                <path fill="currentColor" d="M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.121 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122L7.938 13.06Z" />
                            </g>
                        </svg>
                    </button>

                    <button onClick={() => handleScroll(416)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <g fill="none" fillRule="evenodd">
                                <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
                                <path fill="currentColor" d="M16.06 10.94a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 1 1-2.121-2.122L12.879 12 8.283 7.404a1.5 1.5 0 0 1 2.12-2.122l5.658 5.657Z" />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex items-center pt-6 -ml-2">
                <style jsx>{`
                    ::-webkit-scrollbar {
                        width: 0;
                    }
                `}</style>
                <div className="overflow-x-scroll flex space-x-4" style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }} ref={sliderRef}>
                    {filteredCourses.map((s) => (
                        <div className="px-2" style={{ maxWidth: '544px' }} key={s.cid}>
                            <div className="flex h-full w-96 justify-center">
                                <Link href={`/courses/${s.courseSlug}/${s.cslug}`} target="_blank" className="" key={s.cid}>
                                    <div className={`${s.cimgSrc && 'h-full'} overflow-hidden`}>
                                        <Image
                                            alt={s.ctitle}
                                            src={s.cimgSrc}
                                            className="object-cover object-center rounded-xl"
                                            width={544}
                                            height={306}
                                        />
                                        <div className="px-1 pt-4 pb-3">
                                            <h2 className="mb-3 text-[18px] font-bold">{s.courseHeading}</h2>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SimilarCourses;
