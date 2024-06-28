import { coursesList } from '@data/coursesList';
import CoursesCard from '@components/CoursesCard';

export default function CourseList({ params }) {
    const slug = String(params.id);
    const course = coursesList.find((course) => course.slug === slug);

    if (!course) {
        return <div>Course not found</div>;
    }

    const problems = Object.values(course.folder);

    return (
        <section>
            <div className="container py-12">
                <div className="-m-4 flex flex-wrap">
                    {problems.map((problem) => (
                        <CoursesCard
                            key={problem.ctitle}
                            cid={problem.cid}
                            ctitle={problem.ctitle}
                            cslug={problem.cslug}
                            cdescription={problem.cdescription}
                            cimgSrc={problem.cimgSrc}
                            ctags={problem.ctags}
                            parentSlug={slug}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
