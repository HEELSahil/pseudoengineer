module.exports = async function seedSystemDesign(prisma) {
  const tutorialSlug = 'system-design';

  const tutorial = await prisma.tutorial.upsert({
    where: { slug: tutorialSlug },
    update: {
      title: 'System Design Complete Course',
      description:
        'Say goodbye to random YouTube playlists and scattered notes. Each lecture comes with handpicked problems, blog explanations and practice links. Your progress is saved, your practice is tracked, your journey is yours.',
    },
    create: {
      slug: tutorialSlug,
      title: 'System Design Complete Course',
      description:
        'Say goodbye to random YouTube playlists and scattered notes. Each lecture comes with handpicked problems, blog explanations and practice links. Your progress is saved, your practice is tracked, your journey is yours.',
    },
    include: {
      sections: {
        include: {
          tasks: true,
        },
      },
    },
  });

  const sectionsToSeed = [
    {
      slug: 'basics-of-systems',
      title: 'Step 1: Basics of Systems',
      tasks: [
        {
          slug: 'what-is-system-design',
          title: 'What is System Design?',
          articleUrl: 'https://example.com/system-design-intro',
          youtubeUrl: 'https://youtube.com/example1',
          difficulty: 'Easy',
        },
        {
          slug: 'scaling-techniques',
          title: 'Horizontal vs. Vertical Scaling',
          articleUrl: 'https://example.com/scaling',
          youtubeUrl: 'https://youtube.com/example2',
          difficulty: 'Medium',
        },
      ],
    },
    {
      slug: 'load-balancing',
      title: 'Step 2: Load Balancing',
      tasks: [
        {
          slug: 'load-balancing',
          title: 'What is Load Balancing?',
          articleUrl: 'https://example.com/load-balancing',
          youtubeUrl: 'https://youtube.com/example3',
          difficulty: 'Medium',
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

    for (const taskData of sectionData.tasks) {
      const existingTask = await prisma.task.findUnique({
        where: { slug: taskData.slug },
      });

      if (!existingTask) {
        await prisma.task.create({
          data: {
            ...taskData,
            sectionId: section.id,
          },
        });
      } else {
        await prisma.task.update({
          where: { slug: taskData.slug },
          data: {
            ...taskData,
            sectionId: section.id, // reassign to correct section
          },
        });
      }
    }
  }

  console.log('System Design tutorial seeded');
};
