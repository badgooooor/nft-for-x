import MintMockButton from "../components/common/MintMockButton";
import CampaignList from "../components/landing/CampaignList";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl text-center">NFT4X</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="text-xl text-left">Campaigns</div>
        <MintMockButton />
      </div>
      <CampaignList />
    </div>
  );
};

export default Home;
