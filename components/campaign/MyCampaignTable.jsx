import Link from "next/link";
import { useRecoilState } from "recoil";

import useCampaignsByOwner from "../../hooks/useCampaignByOwner";
import { myCampaignState } from "../../lib/states";

const Row = ({ campaignName, redeemCount, campaignAddr, nft }) => {
  return (
    <tr className="w-full">
      <td className="px-6 py-3">
        <div className="text-sm font-medium text-gray-900">{campaignName}</div>
      </td>
      <td scope="col" className="px-6 py-3">
        <div className="text-sm font-medium text-gray-900">{campaignAddr}</div>
      </td>
      <td scope="col" className="px-6 py-3">
        <div className="text-sm font-medium text-gray-900">{redeemCount}</div>
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
                campaignName={campaign.name}
                campaignAddr={campaign.campaignAddr}
                redeemCount={campaign.totalRedeemCount}
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
      <table className="w-full table-auto">
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
              Campaign Address
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Redeem Count
            </th>
          </tr>
        </thead>
        {renderCampaigns()}
      </table>
    </div>
  );
};

export default MyCampaignTable;
