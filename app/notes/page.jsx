import notesData from '@data/notesData'
import NotesCard from '@components/NotesCard'

export default function Page(){
    return(
        <section className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                <h1 className="pb-2 text-4xl md:text-6xl sm:leading-10 md:leading-14 leading-9 tracking-tight font-thin md:font-bold lg:font-extrabold bg-gradient-to-r bg-clip-text text-transparent from-lime-500 via-emerald-500 to-lime-500 animate-text">
                    Download Course Notes 
                </h1>
            </div>
            <div className="container py-12">
                <div className="-m-4 flex flex-wrap">
                    {notesData.map((d) => (
                        <NotesCard
                            key={d.title}
                            title={d.title}
                            imgSrc={d.imgSrc}
                            href={d.href}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}