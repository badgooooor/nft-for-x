import Link from "next/link";
import MyCampaignTable from "../../components/campaign/MyCampaignTable";

const MyCampaignPage = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-4">
        <div className="font-bold text-2xl mb-2">My campaigns</div>
        <div>
          <Link href="/campaign/new">
            <button className="ease-in duration-300 bg-dark-slate-blue hover:bg-white text-white hover:text-dark-slate-blue text-sm border-2 border-dark-slate-blue rounded-md px-2 py-2">
              <a>Create new one here</a>
            </button>
          </Link>
        </div>
      </div>
      <MyCampaignTable />
    </div>
  );
};

export default MyCampaignPage;
