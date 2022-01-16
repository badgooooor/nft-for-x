import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

import NFTForXFactory from '../src/artifacts/contracts/NFTForXFactory.sol/NFTForXFactory.json';
import NFTForX from '../src/artifacts/contracts/NFTForX.sol/NFTForX.json';

const useCampaigns = () => {
  const { Moralis, isWeb3Enabled } = useMoralis();
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  async function enableWeb3() {
    console.log('enabling web3 ...');
    await Moralis.enableWeb3();
  }

  async function getCampaigns() {
    setLoading(true);
    if (!isWeb3Enabled) await enableWeb3();

    try {
      const numberOfCampaigns = await Moralis.executeFunction({
        contractAddress: process.env.NEXT_PUBLIC_NFTFORX_FACTORY_ADDRESS,
        functionName: 'numberOfCampaigns',
        abi: NFTForXFactory.abi,
      });

      const campaigns = [];
      for (let i = 4; i < numberOfCampaigns; i++) {
        const campaignAddr = await Moralis.executeFunction({
          contractAddress: process.env.NEXT_PUBLIC_NFTFORX_FACTORY_ADDRESS,
          functionName: 'getCampaign',
          abi: NFTForXFactory.abi,
          params: {
            campaignId: i,
          },
        });

        const name = `Campaign #${i + 1}`;

        const owner = await Moralis.executeFunction({
          contractAddress: campaignAddr,
          functionName: 'owner',
          abi: NFTForX.abi,
        });

        const collection = await Moralis.executeFunction({
          contractAddress: campaignAddr,
          functionName: 'collection',
          abi: NFTForX.abi,
        });

        const totalRedeemCount = await Moralis.executeFunction({
          contractAddress: campaignAddr,
          functionName: 'totalRedeemCount',
          abi: NFTForX.abi,
        });

        campaigns.push({
          name,
          owner,
          campaignAddr,
          collection,
          totalRedeemCount,
        });
      }

      setCampaigns(campaigns);
    } catch (error) {
      alert(error.message);
      console.log(error.message || error);
    }

    setLoading(false);
  }

  useEffect(() => {
    getCampaigns();
  }, [isWeb3Enabled]);

  return { loading, campaigns };
};

export default useCampaigns;
