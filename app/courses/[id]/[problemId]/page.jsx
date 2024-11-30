"use client"

import Link from 'next/link';
import { coursesList } from '@data/coursesList';
import siteMetadata from '@data/siteMetadata';
import SimilarCourses from '@components/SimilarCourses';
import usePageViewLogger from '@components/usePageViewLogger';

export default function Problem({ params }) {
    const { id: courseSlug, problemId: problemSlug } = params;
    const course = coursesList.find(course => course.slug === courseSlug);
    const problem = course?.folder ? Object.values(course.folder).find(p => p.cslug === problemSlug) : null;
    usePageViewLogger(problemSlug);

    if (!course || !problem) {
        return <div>Problem not found</div>;
    }

    const detailsPara1 = problem.para1;
    const detailsPara2 = problem.para2;
    const githubLink = problem.githubLink;

    return (
        <section>
            <h1 className='flex justify-center pt-6 pb-5 text-lg tracking-widest font-bold bg-gradient-to-r bg-clip-text text-transparent from-orange-500 via-yellow-500 to-orange-500 animate-text'>
                &lt; {problem.ctitle.toUpperCase()} /&gt;
            </h1>
            <h2 className='text-center pb-5 text-4xl md:text-5xl xl:text-6xl tracking-wide leading-11 font-extrabold'>
                {problem.courseHeading}
            </h2>
            <p className='text-center pb-9 font-medium text-gray-500 dark:text-gray-400'>
                {problem.cdescription}
            </p>
            <div className="flex justify-center pb-9 py-2 xl:py-4 mx-2 xl:mx-12">
                <Link href={siteMetadata.youtube} target="_blank">
                    <button className="flex items-center text-xl border-2 border-gray-300 px-7 py-2 rounded-full hover:scale-110 bg-black dark:bg-white dark:text-black text-white transition-all duration-200">
                        <span className="pl-1 pr-1 font-medium">Explore Playlist</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                            <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4" d="M4 40.836c4.893-5.973 9.238-9.362 13.036-10.168 3.797-.805 7.412-.927 10.846-.365V41L44 23.545 27.882 7v10.167c-6.349.05-11.746 2.328-16.192 6.833C7.245 28.505 4.681 34.117 4 40.836Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </Link>
            </div>
            <div className='xl:pt-6'></div>
            <div className="w-full h-0 rounded-3xl overflow-hidden relative" style={{ paddingBottom: '56.25%' }}>
                <iframe
                    className="absolute top-0 left-0 w-full h-full bg-black dark:bg-black"
                    src={problem.src}
                    title={problem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div className='pt-16'></div>
            <div className="pb-16">
                <div className="inline-block p-[2px] rounded-t-xl font-medium bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 -mb-1">
                    <div className="flex flex-row justify-center w-full h-full bg-white dark:bg-zinc-900 rounded-t-xl px-14 py-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current text-gray-700 dark:text-gray-200 w-5 h-5 pt-1" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5h8m-8 4h5m-5 6h8m-8 4h5M3 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm0 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z" />
                        </svg>
                        <p className="pl-1">Details</p>
                    </div>
                </div>
                <div className="inline-block p-[2px] rounded-b-xl rounded-r-xl font-medium bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
                    <div className="w-full h-full rounded-b-xl rounded-r-xl bg-white dark:bg-zinc-900 px-8 md:px-10 py-8 md:py-10 space-y-3">
                        <p>{detailsPara1}</p>
                        <p>{detailsPara2}</p>
                        <p>Channel your inner stargazer and shoot a ⭐ towards the course&apos;s GitHub repository!</p>
                        <div className="py-2" style={{ maxWidth: '160px' }}>
                            <Link href={githubLink} target="_blank">
                                <div className="h-full w-full rounded-2xl border-2 border-gray-300 transform transition-transform duration-200 hover:scale-105">
                                    <div className="flex flex-row h-full w-full p-4 rounded-2xl items-center justify-center">
                                        <svg className="fill-current text-green-500 w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                        <p className="ml-2 text-lg font-medium text-gray-500 dark:text-gray-400">Github</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <SimilarCourses currentCourseSlug={courseSlug} currentProblemTags={problem.ctags} />
        </section>
    );
}