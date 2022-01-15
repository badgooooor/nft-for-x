import { useState } from "react";
import { useRecoilState } from "recoil";
import AddAnotherCard from "../../components/campaign/AddAnotherCard";
import ImageCard from "../../components/campaign/ImageCard";
import MaxRedeemableTable from "../../components/campaign/MaxRedeemableTable";
import { campaignOptionState, campaignState } from "../../lib/states";

const NewCampaignPage = () => {
  const [campaignName, setCampaignName] = useState("");
  const [collectionAddr, setCollectionAddr] = useState("");
  const [campaign, setCampaign] = useRecoilState(campaignOptionState);

  return (
    <div>
      <div className="font-bold text-2xl mb-2">Create new campaign</div>

      <div className="w-full bg-white rounded-md flex flex-col p-4 mb-4 shadow-lg">
        <div className="font-bold text-xl mb-2">General</div>
        <div className="font-light text-md mb-2">
          Start with some information
        </div>

        <div>
          <label
            htmlFor="Campaign Name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Campaign Name
          </label>
          <input
            onChange={(e) => setCampaignName(e.target.value)}
            type="text"
            id="campaign_name"
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
            <button className="ease-in duration-300 bg-dark-slate-blue hover:bg-white text-white hover:text-dark-slate-blue border-2 border-dark-slate-blue rounded-md px-8 py-2">
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
        <div>
          <div className="font-bold text-xl">Redeemable Item Amount</div>
          <div className="font-light text-md mb-2">
            Set available amount of items
          </div>
        </div>
        <MaxRedeemableTable />
      </div>
    </div>
  );
};

export default NewCampaignPage;
