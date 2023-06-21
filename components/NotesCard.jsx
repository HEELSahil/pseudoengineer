import Image from 'next/image'
import Link from 'next/link'

const NotesCard = ({ title, imgSrc, href }) => (
    <div className="md p-4 md:w-1/3" style={{ maxWidth: '544px' }}>
        <div className={`${ imgSrc && 'h-full'} overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}>
            <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-48"
                width={544}
                height={306}
            />
            <div className="p-6">
                <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">{title}</h2>
                <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">Download Course Notes Here</p>
                <Link href={href} className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                    <button type="button">Download &rarr;</button>
                </Link>
            </div>
        </div>
    </div>
)

export default NotesCard