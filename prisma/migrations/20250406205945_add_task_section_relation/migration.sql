-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_lectureId_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "sectionId" INTEGER,
ALTER COLUMN "lectureId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;
