import Image from "next/image";
import CampaignCard from "../components/campaign/CampaignCard";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl text-center">NFT4X</h1>
      <h1 className="m-8 text-xl text-left">Campaigns</h1>
      <CampaignCard />
    </div>
  );
};

export default Home;
