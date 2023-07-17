'use client'

import Image from 'next/image'
import Link from 'next/link';

import { useState, useEffect, useRef } from "react";
import { coursesList } from "@data/coursesList";

const SimilarCourses = ({currentCourseSlug, tags}) => {

    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        const filtered = coursesList.filter((course) =>
          course.slug !== currentCourseSlug && course.tags.some((tag) => tags.includes(tag))
        );
        setFilteredCourses(filtered);
      }, [currentCourseSlug, tags]);

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
                <h3 className="font-extrabold text-2xl tracking-wide">Similar courses like this one</h3>
            </div>
            <div>
                <button onClick={() => handleScroll(-416)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.121 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122L7.938 13.06Z"/></g></svg>
                </button>

                <button onClick={() => handleScroll(416)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M16.06 10.94a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 1 1-2.121-2.122L12.879 12L8.283 7.404a1.5 1.5 0 0 1 2.12-2.122l5.658 5.657Z"/></g></svg>
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
                    <div className="px-2" style={{ maxWidth: '544px' }} key={s.id}>
                            <div className="flex h-full w-96 justify-center">
                            <Link href={`/courses/${s.slug}`} className="" key={s.id}>
                                <div className={`${ s.imgSrc && 'h-full'} overflow-hidden`}>
                                    <Image
                                        alt={s.title}
                                        src={s.imgSrc}
                                        className="object-cover object-center rounded-xl"
                                        width={544}
                                        height={306}
                                    />
                                    <div className="px-1 pt-4 pb-3">
                                        <h2 className="mb-3 text-xl font-bold">{s.courseHeading}</h2>
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
