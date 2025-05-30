import Image from 'next/image';
import Link from 'next/link';

const SeriesCard = ({ id, title, slug, description, imgSrc }) => (
  <div className="p-4 md:w-1/2 xl:w-1/3" style={{ maxWidth: '544px' }}>
    <div className="h-full w-full rounded-2xl border-2 border-gray-300 shadow-lg transform transition-transform duration-200 hover:scale-105">
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white dark:bg-zinc-900">
        <div className={`${imgSrc && 'h-full'} overflow-hidden`}>
          <Link href={`/tutorial/${slug}`} className="" key={id}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center rounded-t-2xl md:h-48"
              width={544}
              height={306}
            />
            <div className="px-6 pt-6 pb-6">
              <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
                {title}
              </h2>
              <p className="max-w-none text-gray-500 dark:text-gray-400 font-medium">
                {description}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default SeriesCard;
