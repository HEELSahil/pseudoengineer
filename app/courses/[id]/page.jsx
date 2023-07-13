import Link from "next/link";

import { coursesList } from '@data/coursesList'
import siteMetadata from "@data/siteMetadata"

export default function CourseList ({params}) {

  const slug = String(params.id)
  const course = coursesList.find((course) => course.slug === slug);

  return (
    <section>
        <h1 className='flex justify-center pt-6 pb-5 text-lg tracking-widest font-bold bg-gradient-to-r bg-clip-text text-transparent from-orange-500 via-yellow-500 to-orange-500 animate-text'> &lt; {course.title.toUpperCase()} /&gt; </h1>
        <h2 className='text-center pb-5 text-4xl md:text-5xl xl:text-6xl tracking-wide leading-11 font-extrabold'>{course.courseHeading}</h2>
        <p className='text-center pb-9 font-medium text-gray-500 dark:text-gray-400'>{course.description}</p>
        <div className="flex justify-center pb-9 py-2 xl:py-4 mx-2 xl:mx-12">
          <Link href={siteMetadata.youtube}>
            <button className="items-center text-xl border-2 border-gray-300 px-7 py-2 rounded-full hover:scale-110 bg-black dark:bg-white dark:text-black text-white transition-all duration-200">
              <span className="pl-1 font-medium">Explore Playlist</span>
              </button>
          </Link>
        </div>
        <div className='xl:pt-6'></div>
        <div className="w-full h-0 rounded-3xl overflow-hidden relative" style={{ paddingBottom: "56.25%" }}>
            <iframe
                className="absolute top-0 left-0 w-full h-full bg-black dark:bg-black"
                src={course.src}
                title={course.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
        <div className='pt-12'></div>
    </section>
  )
}