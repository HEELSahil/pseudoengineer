module.exports = async function seedDataStructures(prisma) {
  const tutorialSlug = 'data-structures';

  let tutorial = await prisma.tutorial.upsert({
    where: { slug: tutorialSlug },
    update: {
      title: 'Data Structures and Algorithms Complete Course',
      description:
        'Say goodbye to random YouTube playlists and scattered notes. Each lecture comes with handpicked problems, blog explanations and practice links. Your progress is saved, your practice is tracked, your journey is yours.',
    },
    create: {
      slug: tutorialSlug,
      title: 'Data Structures and Algorithms Complete Course',
      description:
        'Say goodbye to random YouTube playlists and scattered notes. Each lecture comes with handpicked problems, blog explanations and practice links. Your progress is saved, your practice is tracked, your journey is yours.',
    },
    include: {
      sections: {
        include: {
          lectures: {
            include: {
              tasks: true,
            },
          },
        },
      },
    },
  });

  const sectionsToSeed = [
    {
      slug: 'learn-the-basics',
      title: 'Step 1: Learn the Basics',
      lectures: [
        {
          slug: 'know-basic-arrays',
          title: 'Lec 2: Know Basic Arrays',
          tasks: [
            {
              slug: 'two-sum',
              title: 'Two Sum',
              difficulty: 'Easy',
              articleUrl: 'https://example.com/two-sum-article',
              youtubeUrl: 'https://youtube.com/example1',
              practiceUrl: 'https://practice.com/two-sum',
            },
            {
              slug: 'three-sum',
              title: 'Three Sum',
              difficulty: 'Medium',
              articleUrl: 'https://example.com/three-sum-article',
              youtubeUrl: 'https://youtube.com/example2',
              practiceUrl: 'https://practice.com/three-sum',
            },
          ],
        },
        {
          slug: 'know-basic-maths',
          title: 'Lec 4: Know Basic Maths',
          tasks: [
            {
              slug: 'count-digits',
              title: 'Count Digits',
              difficulty: 'Easy',
              articleUrl: 'https://example.com/count-digits',
              youtubeUrl: 'https://youtube.com/example4',
              practiceUrl: 'https://practice.com/count-digits',
            },
            {
              slug: 'check-for-prime',
              title: 'Check for Prime',
              difficulty: 'Easy',
              articleUrl: 'https://example.com/check-prime',
              youtubeUrl: 'https://youtube.com/example5',
              practiceUrl: 'https://practice.com/check-prime',
            },
          ],
        },
      ],
    },
    {
      slug: 'learn-recursion',
      title: 'Step 2: Learn Recursion',
      lectures: [
        {
          slug: 'basic-recursion-problems',
          title: 'Lec 1: Basic Recursion Problems',
          tasks: [
            {
              slug: 'factorial',
              title: 'Factorial',
              difficulty: 'Easy',
              articleUrl: 'https://example.com/factorial',
              youtubeUrl: 'https://youtube.com/factorial',
              practiceUrl: 'https://practice.com/factorial',
            },
            {
              slug: 'best-time-to-buy-and-sell-stocks',
              title: 'Best Time to buy and Sell Stocks',
              difficulty: 'Easy',
              articleUrl: 'https://example.com/fibonacci',
              youtubeUrl: 'https://youtube.com/fibonacci',
              practiceUrl: 'https://practice.com/fibonacci',
            },
          ],
        },
        {
          slug: 'advanced-recursion-problem',
          title: 'Lec 2: Advanced Recursion Problems',
          tasks: [
            {
              slug: 'neighboring-islands',
              title: 'Neighbouring Islands',
              difficulty: 'Hard',
              articleUrl: 'https://example.com/factorial',
              youtubeUrl: 'https://youtube.com/factorial',
              practiceUrl: 'https://practice.com/factorial',
            },
            {
              slug: 'fibonacci',
              title: 'Fibonacci',
              difficulty: 'Hard',
              articleUrl: 'https://example.com/fibonacci',
              youtubeUrl: 'https://youtube.com/fibonacci',
              practiceUrl: 'https://practice.com/fibonacci',
            },
          ],
        },
      ],
    },
  ];

  for (const sectionData of sectionsToSeed) {
    let section = await prisma.section.upsert({
      where: { slug: sectionData.slug },
      update: {
        title: sectionData.title,
        tutorialId: tutorial.id,
      },
      create: {
        slug: sectionData.slug,
        title: sectionData.title,
        tutorialId: tutorial.id,
      },
    });

    if (!section) {
      section = await prisma.section.create({
        data: {
          title: sectionData.title,
          tutorialId: tutorial.id,
        },
      });
    }

    for (const lectureData of sectionData.lectures) {
      let lecture = await prisma.lecture.findUnique({
        where: { slug: lectureData.slug },
      });

      if (!lecture) {
        lecture = await prisma.lecture.create({
          data: {
            title: lectureData.title,
            slug: lectureData.slug,
            sectionId: section.id,
          },
        });
      } else {
        lecture = await prisma.lecture.update({
          where: { slug: lectureData.slug },
          data: {
            title: lectureData.title,
            sectionId: section.id,
          },
        });
      }

      for (const taskData of lectureData.tasks) {
        const existingTask = await prisma.task.findUnique({
          where: { slug: taskData.slug },
        });

        if (!existingTask) {
          await prisma.task.create({
            data: {
              ...taskData,
              lectureId: lecture.id,
              tutorialId: tutorial.id,
            },
          });
        } else {
          await prisma.task.update({
            where: { slug: taskData.slug },
            data: {
              ...taskData,
              lectureId: lecture.id,
              tutorialId: tutorial.id,
            },
          });
        }
      }
    }
  }

  console.log('Seeded Data Structures tutorial');
};
