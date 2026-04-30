-- CreateTable
CREATE TABLE "CampaignSession" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "numberOfPlayers" INTEGER NOT NULL,
    "sessionSummary" TEXT NOT NULL,
    "highlights" TEXT,
    "improvements" TEXT,
    "notes" TEXT,
    "campaignId" INTEGER NOT NULL,

    CONSTRAINT "CampaignSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CampaignSession" ADD CONSTRAINT "CampaignSession_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
