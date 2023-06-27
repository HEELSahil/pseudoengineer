"use client"
import { useEffect, useState } from "react";
import { coursesList } from '@data/coursesList';
import CoursesCard from '@components/CoursesCard';

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
                <h1 className="pb-2 text-4xl md:text-6xl sm:leading-10 md:leading-14 leading-9 tracking-tight font-extrabold md:font-bold lg:font-extrabold bg-gradient-to-r bg-clip-text text-transparent from- from-indigo-400 via-violet-400 to-indigo-500 animate-text">
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