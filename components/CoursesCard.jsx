import Image from 'next/image';
import Link from 'next/link';

const FileCard = ({
  cid,
  ctitle,
  cslug,
  cdescription,
  cimgSrc,
  ctags,
  parentSlug,
}) => (
  <div className="p-4 md:w-1/2 xl:w-1/3" style={{ maxWidth: '544px' }}>
    <div className="h-full w-full rounded-2xl bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 shadow-2xl p-1">
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 transform transition-transform duration-200 hover:scale-105">
        <div className={`${cimgSrc && 'h-full'} overflow-hidden`}>
          <Link href={`/courses/${parentSlug}/${cslug}`} className="" key={cid}>
            <Image
              alt={ctitle}
              src={cimgSrc}
              className="object-cover object-center rounded-t-2xl md:h-48"
              width={544}
              height={306}
            />
            <div className="px-6 pt-6 pb-3">
              <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
                {ctitle}
              </h2>
              <p className="max-w-none text-gray-500 dark:text-gray-400 font-medium">
                {cdescription}
              </p>
            </div>
          </Link>
          {ctags && (
            <div className="px-6 pb-6 space-x-2">
              {ctags.map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 bg-violet-400 text-white text-xs font-semibold rounded-full"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default FileCard;
