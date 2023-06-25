import { coursesList } from '@data/coursesList'

export default function CourseList ({params}) {

    const slug = String(params.id)
    const course = coursesList.find((course) => course.slug === slug);

  return (
    <>
        <h1 className='flex justify-center pt-6 pb-2 text-lg tracking-widest font-bold bg-gradient-to-r bg-clip-text text-transparent from-orange-500 via-yellow-500 to-orange-500 animate-text'>{course.title.toUpperCase()}</h1>
    </>
  )
}