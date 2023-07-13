"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

import { coursesList } from '@data/coursesList';
import CoursesCard from '@components/CoursesCard';
import siteMetadata from "@data/siteMetadata";


export default function Page(){
    const [data, setData] = useState([]);
    const [featuredData, setFeaturedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setData(coursesList);
        };
        fetchData();

        const fetchFeaturedData = async () => {
            const filteredData = coursesList.filter(course => course.id === 1 || course.id === 2 || course.id === 4);
            setFeaturedData(filteredData);
        };
        fetchFeaturedData()
    }, []);

    return(
        <section className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                <h1 className="pb-2 text-4xl md:text-6xl sm:leading-10 md:leading-14 leading-9 tracking-tight font-extrabold md:font-bold lg:font-extrabold bg-gradient-to-r bg-clip-text text-transparent from-indigo-400 via-violet-400 to-indigo-500 animate-text">
                    Featured Courses 
                </h1>
            </div>
            <div className="container py-12">
                <div className="-m-4 flex flex-wrap">
                    {featuredData.map((d) => (
                        <CoursesCard
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

            <div className="space-y-2 py-8 md:space-y-5">
                <div className="flex flex-col xl:flex-row justify-between text-center w-full p-6 border-2 border-gray-300 rounded-3xl">
                    <div className="py-2">
                        <h1 className="text-2xl font-medium tracking-wide xl:tracking-widest bg-gradient-to-r bg-clip-text text-transparent from-cyan-500 via-violet-400 to-cyan-500 animate-text">
                            Subscribe to my channel 
                        </h1>
                    </div>
                    <div className="py-2 text-gray-500 dark:text-gray-400">
                        <p className="font-medium">
                            Because why not?
                        </p>
                        <p className="font-medium">
                            Get all the latest programming tutorials and never miss a video.
                        </p>
                    </div>
                    <div className="flex justify-center py-2 xl:py-4 mx-2 xl:mx-12">
                        <Link href={siteMetadata.youtube}>
                            <button className="flex flex-row items-center text-xl border-2 border-gray-300 px-6 py-2 rounded-full bg-gradient-to-r bg-clip-text text-transparent from-cyan-500 via-violet-400 to-cyan-500 animate-text hover:scale-105 transition-all duration-200">
                                <svg className="fill-current text-gray-700 hover:text-red-500 dark:text-gray-200 dark:hover:text-red-500 w-5 h-5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                <span className="pl-2">Subscribe</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="space-y-2 pt-8 pb-8 md:space-y-5">
                <h1 className="pb-2 text-4xl md:text-6xl sm:leading-10 md:leading-14 leading-9 tracking-tight font-extrabold md:font-bold lg:font-extrabold bg-gradient-to-r bg-clip-text text-transparent from-cyan-500 via-violet-400 to-cyan-500 animate-text">
                    Recent Courses 
                </h1>
            </div>

            <div className="container py-12">
                <div className="-m-4 flex flex-wrap">
                    {data.map((d) => (
                        <CoursesCard
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
        </section>
    )
}