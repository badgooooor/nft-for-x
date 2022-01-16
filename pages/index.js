import CampaignList from "../components/landing/CampaignList";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl text-center">NFT4X</h1>
      <h1 className="text-xl text-left mb-4">Campaigns</h1>
      <CampaignList />
    </div>
  );
};

export default Home;
