-- CreateTable
CREATE TABLE "post_stats" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "reactionCount" INTEGER NOT NULL DEFAULT 0,
    "discussionUrl" TEXT,
    "reactionsData" JSONB,
    "lastSyncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_stats_slug_key" ON "post_stats"("slug");

-- CreateIndex
CREATE INDEX "post_stats_slug_idx" ON "post_stats"("slug");

-- CreateIndex
CREATE INDEX "post_stats_lastSyncedAt_idx" ON "post_stats"("lastSyncedAt");
