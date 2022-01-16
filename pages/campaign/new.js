import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useMoralis } from "react-moralis";
import Link from "next/link";

import AddAnotherCard from "../../components/campaign/AddAnotherCard";
import ImageCard from "../../components/campaign/ImageCard";
import MaxRedeemableTable from "../../components/campaign/MaxRedeemableTable";
import { campaignOptionState, campaignState } from "../../lib/states";

import NFTForXFactory from "../../src/artifacts/contracts/NFTForXFactory.sol/NFTForXFactory.json";

const NewCampaignPage = () => {
  const { account, isAuthenticated, Moralis, isWeb3Enabled } = useMoralis();
  const [campaignOwner, setCampaignOwner] = useState("");
  const [collectionAddr, setCollectionAddr] = useState(
    process.env.NEXT_PUBLIC_NFTMOCK_ADDRESS
  );
  const [maxRedeem, setMaxRedeem] = useState("");
  const [loading, setLoading] = useState(false);
  // Option
  const [campaign, setCampaign] = useRecoilState(campaignOptionState);

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3();
  }, []);

  useEffect(() => {
    setCampaignOwner(account);
  }, [account]);

  async function enableWeb3() {
    console.log("enabling web3 ...");
    await Moralis.enableWeb3();
  }

  async function createNewCampaign() {
    setLoading(true);
    if (!isWeb3Enabled) await enableWeb3();

    try {
      const result = await Moralis.executeFunction({
        contractAddress: process.env.NEXT_PUBLIC_NFTFORX_FACTORY_ADDRESS,
        functionName: "createCampaign",
        abi: NFTForXFactory.abi,
        params: {
          __owner: campaignOwner,
          __collection: collectionAddr,
          __maxRedeemPerUser: Number(maxRedeem),
        },
      });

      alert(`Campaign created successfully! TX: ${result.transactionHash}`);
    } catch (error) {
      alert(error.message);
      console.log(error.message || error);
    }
    setLoading(false);
  }

  return (
    <div className="flex-col justify-center py-8">
      <button className="px-4 py-2 mb-4 text-sm text-white duration-300 ease-in bg-blue-500 border-2 border-blue-500 rounded-md hover:bg-white hover:bg-opacity-20 hover:text-blue-500">
        <Link href={`/campaign`}>Back to my campaigns</Link>
      </button>
      <div className="mb-2 text-2xl font-bold">Create new campaign</div>

      <div className="flex flex-col w-full p-4 mb-4 bg-white rounded-md shadow-lg">
        <div className="mb-2 text-xl font-bold">General</div>
        <div className="mb-2 font-light text-md">
          Start with some information
        </div>

        <div>
          <label
            htmlFor="Campaign Owner Address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Campaign Owner Address
          </label>
          <input
            onChange={(e) => setCampaignOwner(e.target.value)}
            value={campaignOwner}
            type="text"
            id="campaign_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="Max No. of Redeemable"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Max No. of Redeemable
          </label>
          <input
            onChange={(e) => setMaxRedeem(e.target.value)}
            value={maxRedeem}
            type="number"
            id="collection_address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="Collection Address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Collection Address
          </label>
          <input
            onChange={(e) => setCollectionAddr(e.target.value)}
            value={collectionAddr}
            type="text"
            id="collection_address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex flex-col w-full p-4 mb-4 bg-white rounded-md shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold">Redeemable Item Options</div>
            <div className="mb-2 font-light text-md">
              Add options for redeemer to select
            </div>
          </div>
          <div>
            <button
              onClick={() => alert("We mock this 😂!")}
              className="px-8 py-2 text-white duration-300 ease-in border-2 rounded-md bg-dark-slate-blue hover:bg-white hover:text-dark-slate-blue border-dark-slate-blue"
            >
              <div className="text-xs">Add another option</div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <ImageCard
            src="/collection/tshirt.jpg"
            name="T Shirt"
            description={"Shirt engraved with awesomeness"}
          />
          <ImageCard
            src="/collection/hat.jpg"
            name="Hat"
            description={"Hat showing how sultan you are"}
          />
          <ImageCard
            src="/collection/jacket.jpg"
            name="Jacket"
            description={"Jacket that make you drip like rockstar"}
          />
        </div>
      </div>
      <div className="flex flex-col w-full p-4 mt-8 mb-4">
        <button
          onClick={createNewCampaign}
          className="self-center px-8 py-2 text-white duration-300 ease-in border-2 rounded-md w-96 bg-dark-slate-blue hover:bg-white hover:text-dark-slate-blue border-dark-slate-blue"
        >
          <div className="text-lg">
            {loading ? `Loading...` : `Create a new Campaign`}
          </div>
        </button>
      </div>
    </div>
  );
};

export default NewCampaignPage;
