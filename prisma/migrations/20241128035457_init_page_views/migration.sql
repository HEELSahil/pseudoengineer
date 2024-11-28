-- CreateTable
CREATE TABLE "PageViews" (
    "id" SERIAL NOT NULL,
    "pagePath" TEXT NOT NULL,
    "viewsCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PageViews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PageViews_pagePath_key" ON "PageViews"("pagePath");
