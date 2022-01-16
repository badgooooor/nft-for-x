import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react/cjs/react.development";
import useCampaigns from "./useCampaigns";

const useCampaignsByOwner = () => {
  const { account } = useMoralis();
  const { campaigns, loading: campaignLoading } = useCampaigns();
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  async function enableWeb3() {
    console.log("enabling web3 ...");
    await Moralis.enableWeb3();
  }

  useEffect(() => {
    const filtered = campaigns.filter((campaign) => campaign.owner === account);
    setFilteredCampaigns(filtered);
  }, [campaignLoading]);

  return { filteredCampaigns, loading };
};

export default useCampaignsByOwner;
