"use client";

import usePageViewLogger from "@components/usePageViewLogger"

export default function Page() {
    usePageViewLogger('/about');
    
    return (
        <>
            <div className="space-y-2 py-8 md:space-y-5">
                <div className="w-5/6 p-6 border-2 border-gray-300 rounded-3xl">
                    <div className="pb-2 text-3xl md:text-5xl font-extrabold lg:font-extrabold underline bg-gradient-to-r bg-clip-text text-transparent from-sky-500 via-indigo-500 to-sky-500 animate-text">
                        Who is a pseudoEngineer?
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg pt-3 md:pb-3">A pseudoEngineer is anyone who, at some point, pretends to know a particular skill or technology more than they actually do. This could be you, me, or any engineer who adds skills to their resume they don&apos;t fully master, either to stand out in the competitive job market or to secure an interview. Often, the realization of lacking complete knowledge comes when preparing for an interview. Now, with the emergence of AI tools like ChatGPT, many of us have fallen into the habit of simply doing <strong>&#96;Ctrl + C, Ctrl + V&#96;</strong> without truly understanding the logic behind the code.</p>
                </div>
            </div>
            <div className="flex space-y-2 py-2 md:space-y-5 justify-end">
                <div className="w-5/6 md:w-3/4 p-6 border-2 border-gray-300 rounded-3xl">
                    <div className="pb-2 text-3xl md:text-5xl font-extrabold lg:font-extrabold underline bg-gradient-to-r bg-clip-text text-transparent from-sky-500 via-indigo-500 to-sky-500 animate-text">
                        Why do we do this?
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg pt-3 md:pb-4">The intense competition in today&apos;s job market drives us to present ourselves as the best among our peers. We list skills that we either don&apos;t know at all, have some grasp of, or even skills we&apos;re struggling to understand, hoping to land a job and then quickly brush up once an opportunity arises.</p>
                </div>
            </div>
            <div className="space-y-2 py-8 md:space-y-5">
                <div className="w-5/6 md:w-3/4 p-6 border-2 border-gray-300 rounded-3xl">
                    <div className="pb-2 text-3xl md:text-5xl font-extrabold lg:font-extrabold underline bg-gradient-to-r bg-clip-text text-transparent from-sky-500 via-indigo-500 to-sky-500 animate-text">
                        How will pseudoEngineer help?
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg pt-3 md:pb-3">pseudoEngineer will be a platform designed to simplify complex technologies with easy-to-understand explanations—as if teaching a 7-year-old. Your journey, from being a pseudoEngineer to donning the cape of mastery and becoming a superhero in the tech stack of your choice, starts here.</p>
                </div>
            </div>
        </>
    )
}