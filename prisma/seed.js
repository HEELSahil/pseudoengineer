const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seedDataStructures = require('./seed-data-structures');
const seedSystemDesign = require('./seed-system-design');

async function main() {
  await seedDataStructures(prisma);
  await seedSystemDesign(prisma);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
