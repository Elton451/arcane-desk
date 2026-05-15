/*
  Warnings:

  - You are about to drop the `NPC` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "NPC";

-- CreateTable
CREATE TABLE "Npc" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "personality" TEXT,
    "campaignId" INTEGER NOT NULL,

    CONSTRAINT "Npc_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Npc" ADD CONSTRAINT "Npc_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
