const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tutorialSlug = 'data-structures';

  // 1. Find or create tutorial
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
        'Say goodbye to random YouTube playlists and scattered notes. Each lecture comes with handpicked problems, blog explanations, notes and practice links. Your progress is saved, your practice is tracked, your journey is yours.',
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

  // 2. Seed multiple sections
  const sectionsToSeed = [
    {
      title: 'Step 1: Learn the Basics',
      lectures: [
        {
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
      title: 'Step 2: Learn Recursion',
      lectures: [
        {
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

  // 3. Loop through and create section -> lecture -> task safely
  for (const sectionData of sectionsToSeed) {
    let section = (tutorial.sections ?? []).find(
      (s) => s.title === sectionData.title
    );

    if (!section) {
      section = await prisma.section.create({
        data: {
          title: sectionData.title,
          tutorialId: tutorial.id,
        },
      });
    }

    for (const lectureData of sectionData.lectures) {
      let lecture = (section.lectures ?? []).find(
        (l) => l.title === lectureData.title
      );

      if (!lecture) {
        lecture = await prisma.lecture.create({
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
            },
          });
        } else {
          await prisma.task.update({
            where: { slug: taskData.slug },
            data: {
              ...taskData,
              lectureId: lecture.id, // in case section/lecture changed
            },
          });
        }
      }
    }
  }

  console.log(
    'Seed complete: tutorial, sections, lectures, and tasks are up-to-date.'
  );
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const seedDataStructures = require('./seed-data-structures');
// const seedSystemDesign = require('./seed-system-design');

// async function main() {
//   await seedDataStructures(prisma);
//   await seedSystemDesign(prisma);
// }

// main()
//   .catch((e) => {
//     console.error('Seed failed:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
