-- CreateTable
CREATE TABLE "CampaignLocation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "population" TEXT,
    "ruler" TEXT,
    "description" TEXT,
    "additionalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "campaignId" INTEGER NOT NULL,

    CONSTRAINT "CampaignLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignFaction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "leader" TEXT,
    "goals" TEXT,
    "description" TEXT,
    "additionalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "campaignId" INTEGER NOT NULL,

    CONSTRAINT "CampaignFaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignLoreEntry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "era" TEXT,
    "source" TEXT,
    "description" TEXT,
    "additionalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "campaignId" INTEGER NOT NULL,

    CONSTRAINT "CampaignLoreEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CampaignLocation" ADD CONSTRAINT "CampaignLocation_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignFaction" ADD CONSTRAINT "CampaignFaction_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignLoreEntry" ADD CONSTRAINT "CampaignLoreEntry_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
