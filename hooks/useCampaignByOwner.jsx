import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import useCampaigns from "./useCampaigns";

const useCampaignsByOwner = () => {
  const { account, isWeb3Enabled } = useMoralis();
  const { campaigns, loading: campaignLoading } = useCampaigns();
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  async function enableWeb3() {
    console.log("enabling web3 ...");
    await Moralis.enableWeb3();
  }

  async function getFilteredCampaigns() {
    if (!isWeb3Enabled) await enableWeb3();

    const filtered = campaigns.filter((campaign) => campaign.owner === account);
    setFilteredCampaigns(filtered);
  }

  useEffect(() => {
    getFilteredCampaigns();
  }, [campaignLoading]);

  return { filteredCampaigns, loading };
};

export default useCampaignsByOwner;
