"use client";

import { useEffect, useState } from "react";
import listCampaign from "../../actions/listCampaign";
import { CampaignCard } from "../CampaignCard/CampaignCard";
import { Dictionary } from "@/shared/types/i18n";
import { ICampaign } from "@/shared/api/models/ICampaign";
import { Paginator } from "@/shared/components/paginator/Paginator";
import { SkeletonBlock } from "@/shared/components/loading/Loading";

interface CampaignListProps {
  dict: Dictionary;
}

const SKELETON_COUNT = 6;

const CampaignList = ({ dict }: CampaignListProps) => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const campaignDict = dict.campaign;

  useEffect(() => {
    setIsLoading(true);
    listCampaign({ page }).then(({ campaigns: rows, pagination }) => {
      setCampaigns(rows as ICampaign[]);
      const { total, size } = pagination;
      setTotalNumberOfPages(total === 0 ? 0 : Math.ceil(total / size));
      setIsLoading(false);
    });
  }, [page]);

  return (
    <div className="mt-8 flex w-full flex-col items-center gap-8">
      <ul className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <li key={i} className="list-none">
                <SkeletonBlock layout="card" />
              </li>
            ))
          : campaigns.map((campaign) => (
              <li key={campaign.id} className="list-none">
                <CampaignCard
                  id={campaign.id}
                  name={campaign.name}
                  description={campaign.description ?? ""}
                  createdAt={campaign.createdAt}
                  labels={{
                    createdAt: campaignDict.created_at,
                    lastPlayedAt: campaignDict.last_played_at,
                    continueCampaign: campaignDict.continue_campaign,
                  }}
                />
              </li>
            ))}
      </ul>

      {!isLoading && totalNumberOfPages > 0 && (
        <Paginator
          dict={dict}
          totalNumberOfPages={totalNumberOfPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default CampaignList;
