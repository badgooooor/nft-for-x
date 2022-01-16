import useCampaigns from "../../hooks/useCampaigns";
import CampaignCard from "../campaign/CampaignCard";

const CampaignList = () => {
  const { campaigns } = useCampaigns();

  return (
    <div>
      {campaigns.map((campaign, idx) => (
        <CampaignCard key={`campaign-card-${idx}`} />
      ))}
    </div>
  );
};

export default CampaignList;
