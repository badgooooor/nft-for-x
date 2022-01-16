import Link from "next/link";
import { useRecoilState } from "recoil";

import useCampaignsByOwner from "../../hooks/useCampaignByOwner";
import { myCampaignState } from "../../lib/states";

const Row = ({ campaignName, redeemCount, items, nft }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10"></div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {campaignName}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{redeemCount}</td>
      <td className="px-6 py-4 space-x-2 text-sm whitespace-nowrap">
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-[#f4c9e7] rounded-full">
          T Shirt x {items["tShirt"]}
        </span>
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-[#f4c9e7] rounded-full">
          Hat x {items["hat"]}
        </span>
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-[#f4c9e7] rounded-full">
          Jacket x {items["jacket"]}
        </span>
      </td>
      <td className="px-6 py-4 space-x-2 text-sm whitespace-nowrap">
        {nft.map((i) => (
          <span
            key={i}
            className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-[#feff79] rounded-full"
          >
            {i}
          </span>
        ))}
      </td>
    </tr>
  );
};

const MyCampaignTable = () => {
  const [campaigns] = useRecoilState(myCampaignState);
  const { filteredCampaigns } = useCampaignsByOwner();

  function renderCampaigns() {
    if (filteredCampaigns.length > 0) {
      return (
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredCampaigns.map((campaign) => {
            return (
              <Row
                key={campaign}
                campaignName={campaign.campaignName}
                redeemCount={campaign.redeemCount}
                items={campaign.items}
                nft={campaign.nft}
              />
            );
          })}
        </tbody>
      );
    } else {
      return (
        <tr>
          <td colSpan={5} className="text-center p-8">
            <div>
              You didn&apos;t create any campaign,{" "}
              <Link href="/campaign/new">
                <a className="underline">Create new one here</a>
              </Link>
            </div>
          </td>
        </tr>
      );
    }
  }

  return (
    <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Campaign Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Redeem Count
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Items
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              NFT
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {renderCampaigns()}
        </tbody>
      </table>
    </div>
  );
};

export default MyCampaignTable;
