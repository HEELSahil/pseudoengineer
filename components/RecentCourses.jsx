'use client'

import { useEffect, useState } from "react";

import { coursesList } from '@data/coursesList';
import FolderCard from '@components/FolderCard';

export default function RecentCourses() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setData(coursesList);
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="container py-12">
                <div className="-m-4 flex flex-wrap">
                    {data.map((d) => (
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
    )
}

