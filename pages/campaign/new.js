import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useMoralis } from "react-moralis";

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
    <div className="py-8 flex-col justify-center">
      <div className="font-bold text-2xl mb-2">Create new campaign</div>

      <div className="w-full bg-white rounded-md flex flex-col p-4 mb-4 shadow-lg">
        <div className="font-bold text-xl mb-2">General</div>
        <div className="font-light text-md mb-2">
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

      <div className="w-full bg-white rounded-md flex flex-col p-4 mb-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold text-xl">Redeemable Item Options</div>
            <div className="font-light text-md mb-2">
              Add options for redeemer to select
            </div>
          </div>
          <div>
            <button
              onClick={() => alert("We mock this 😂!")}
              className="ease-in duration-300 bg-dark-slate-blue hover:bg-white text-white hover:text-dark-slate-blue border-2 border-dark-slate-blue rounded-md px-8 py-2"
            >
              <div className="text-xs">Add another option</div>
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
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
      <div className="w-full bg-white rounded-md flex flex-col p-4 mb-4 shadow-lg">
        <div className="font-bold text-xl">Create a new Campaign</div>
        <button
          onClick={createNewCampaign}
          className="self-center w-96 ease-in duration-300 bg-dark-slate-blue hover:bg-white text-white hover:text-dark-slate-blue border-2 border-dark-slate-blue rounded-md px-8 py-2"
        >
          <div className="text-lg">
            {loading ? `Loading...` : `Make Transaction`}
          </div>
        </button>
      </div>
      {/* <div className="w-full bg-white rounded-md flex flex-col p-4 mb-4 shadow-lg">
        <div>
          <div className="font-bold text-xl">Redeemable Item Amount</div>
          <div className="font-light text-md mb-2">
            Set available amount of items
          </div>
        </div>
        <MaxRedeemableTable />
      </div> */}
    </div>
  );
};

export default NewCampaignPage;
