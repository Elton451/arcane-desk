-- CreateTable
CREATE TABLE "NPC" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "personality" TEXT,

    CONSTRAINT "NPC_pkey" PRIMARY KEY ("id")
);
