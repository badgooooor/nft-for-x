import { useState } from "react";
import NavBar from "../../components/common/NavBar";

const NewCampaignPage = () => {
  const [campaignName, setCampaignName] = useState("");
  const [collectionAddr, setCollectionAddr] = useState("");
  return (
    <div>
      <NavBar />
      <div className="flex flex-col max-w-xl m-10 space-y-6">
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
    </div>
  );
};

export default NewCampaignPage;
