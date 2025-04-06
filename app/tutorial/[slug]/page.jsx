'use client';

import { useEffect, useState } from 'react';
import AccordionSection from '@components/AccordionSection';
import ContentTable from '@components/ContentTable';
import SeriesCompletionTracker from '@components/SeriesCompletionTracker';

export default function TutorialPage({ params }) {
  const [tutorialData, setTutorialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pseudoUserId, setPseudoUserId] = useState('');

  const fetchData = async (userId) => {
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
    let id = localStorage.getItem('pseudoUserId');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('pseudoUserId', id);
    }
    setPseudoUserId(id);
    fetchData(id);
  }, [params.slug]);

  if (loading) return <p>Loading...</p>;
  if (!tutorialData) return <p>Not found</p>;

  // These should be outside map, just before return
  const allLectures = Array.isArray(tutorialData.sections)
    ? tutorialData.sections.flatMap((section) => section.lectures || [])
    : [];
  const allTasks = allLectures.flatMap((lecture) => lecture.tasks || []);
  const completedTasks = allTasks.filter(
    (task) => task.progress?.[0]?.completed
  ).length;

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-wide leading-11 mb-2 text-gray-900 bg-gradient-to-r bg-clip-text text-transparent from-lime-500 via-emerald-500 to-lime-500 animate-text">
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
          const totalLectures = section.lectures.length;

          const completedLectures = section.lectures.filter((lecture) =>
            lecture.tasks.every((task) => task.progress?.[0]?.completed)
          ).length;

          return (
            <AccordionSection
              key={section.id}
              title={section.title}
              totalCount={`${completedLectures}/${totalLectures}`}
            >
              {section.lectures.map((lecture) => {
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
                      onTaskToggle={() => fetchData(pseudoUserId)}
                    />
                  </AccordionSection>
                );
              })}
            </AccordionSection>
          );
        })}
    </div>
  );
}
