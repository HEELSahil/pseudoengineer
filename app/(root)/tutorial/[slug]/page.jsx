'use client';

import { useEffect, useState, use } from 'react';
import { useSession } from 'next-auth/react';
import AccordionSection from '@components/AccordionSection';
import ContentTable from '@components/ContentTable';
import SeriesCompletionTracker from '@components/SeriesCompletionTracker';

export default function TutorialPage(props) {
  const params = use(props.params);
  const { data: session, status } = useSession();
  const [tutorialData, setTutorialData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (userId = '') => {
    const res = await fetch(`/api/tutorials/${params.slug}`, {
      headers: {
        'x-user-id': userId,
      },
    });

    const data = await res.json();
    setTutorialData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      fetchData(session.user.id);
    } else if (status !== 'loading') {
      fetchData();
    }
  }, [status, session, params.slug]);

  if (loading)
    return (
      <div className="w-full px-4 py-6 space-y-6 animate-pulse">
        <div className="h-10 rounded-lg w-3/4 bg-gray-200 dark:bg-zinc-800" />
        <div className="h-5 rounded-lg w-full bg-gray-200 dark:bg-zinc-800" />
        <div className="h-5 rounded-lg w-2/3 bg-gray-200 dark:bg-zinc-800" />

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border border-gray-200 dark:border-zinc-700 rounded-xl p-4 space-y-3 bg-white dark:bg-zinc-900"
          >
            <div className="h-4 rounded-lg w-1/2 bg-gray-200 dark:bg-zinc-800" />
            <div className="h-4 rounded-lg w-full bg-gray-200 dark:bg-zinc-800" />
            <div className="h-4 rounded-lg w-3/4 bg-gray-200 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    );

  if (
    !tutorialData ||
    !tutorialData.sections ||
    tutorialData.sections.length === 0
  ) {
    return (
      <div className="font-medium">
        This series currently has no content. Please visit back later!
      </div>
    );
  }

  const allTasks = Array.isArray(tutorialData.sections)
    ? tutorialData.sections.flatMap((section) => {
        if (Array.isArray(section.lectures) && section.lectures.length > 0) {
          return section.lectures.flatMap((lec) => lec.tasks || []);
        }
        return section.tasks || [];
      })
    : [];

  const completedTasks = allTasks.filter(
    (task) => task.progress?.[0]?.completed
  ).length;

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-wide leading-11 pb-2 text-gray-900 bg-gradient-to-r bg-clip-text text-transparent from-lime-500 via-emerald-500 to-lime-500 animate-text">
        {tutorialData.title}
      </h1>
      <p className="text-lg pt-2 mb-6 text-gray-500 dark:text-gray-400">
        {tutorialData.description}
      </p>

      <SeriesCompletionTracker
        total={allTasks.length}
        completed={completedTasks}
      />

      {Array.isArray(tutorialData.sections) &&
        tutorialData.sections.map((section) => {
          const isLectureBased = section.lectures?.length > 0;

          const sectionTasks = isLectureBased
            ? section.lectures.flatMap((lec) => lec.tasks || [])
            : section.tasks || [];

          const completed = sectionTasks.filter(
            (t) => t.progress?.[0]?.completed
          ).length;

          return (
            <AccordionSection
              key={section.id}
              title={section.title}
              totalCount={`${completed}/${sectionTasks.length}`}
            >
              {isLectureBased ? (
                section.lectures.map((lecture) => {
                  const totalTasks = lecture.tasks.length;
                  const completedTasks = lecture.tasks.filter(
                    (task) => task.progress?.[0]?.completed
                  ).length;

                  return (
                    <AccordionSection
                      key={lecture.id}
                      title={lecture.title}
                      totalCount={`${completedTasks}/${totalTasks}`}
                    >
                      <ContentTable
                        tasks={lecture.tasks}
                        userId={session?.user?.id || null}
                        onTaskToggle={() => fetchData(session?.user?.id)}
                      />
                    </AccordionSection>
                  );
                })
              ) : (
                <ContentTable
                  tasks={section.tasks}
                  userId={session?.user?.id || null}
                  onTaskToggle={() => fetchData(session?.user?.id)}
                />
              )}
            </AccordionSection>
          );
        })}
    </div>
  );
}
