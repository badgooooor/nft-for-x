import useCampaigns from "../../hooks/useCampaigns";
import CampaignCard from "./CampaignCard";

const CampaignList = () => {
  const { campaigns } = useCampaigns();

  return (
    <div>
      {campaigns.map((campaign, idx) => (
        <CampaignCard key={`campaign-card-${idx}`} campaign={campaign} />
      ))}
    </div>
  );
};

export default CampaignList;
