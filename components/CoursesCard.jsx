import Image from 'next/image'
import Link from 'next/link'

const CoursesCard = ({ id, title, description, imgSrc }) => (
    <div className="md p-4 md:w-1/2 lg:w-1/3" style={{ maxWidth: '544px' }}>
        <div className={`${ imgSrc && 'h-full'} overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}>
        <Link href={`/courses/${id}`} className="" key={id}>
            <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-48"
                width={544}
                height={306}
            />
            <div className="p-6">
                <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">{title}</h2>
                <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
            </div>
            </Link>
        </div>
    </div>
)

export default CoursesCard