import Image from 'next/image'
import Link from 'next/link'

const CoursesCard = ({ id, title, slug, description, imgSrc }) => (
    <div className="p-4 md:w-1/2 lg:w-1/3" style={{ maxWidth: '544px' }}>
        <div class="h-full w-full rounded-2xl bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 shadow-2xl p-1">
            <div class="flex h-full w-full items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 transform transition-transform duration-200 hover:scale-105">
                <div className={`${ imgSrc && 'h-full'} overflow-hidden`}>
                    <Link href={`/courses/${slug}`} className="" key={id}>
                        <Image
                            alt={title}
                            src={imgSrc}
                            className="object-cover object-center rounded-t-2xl md:h-36 lg:h-48"
                            width={544}
                            height={306}
                        />
                        <div className="p-6">
                            <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">{title}</h2>
                            <p className="mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
)

export default CoursesCard