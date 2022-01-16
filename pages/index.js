import Tilt from "react-parallax-tilt";
import Image from "next/image";
import CampaignCard from "../components/campaign/CampaignCard";

const Home = () => {
  return (
    <div>
      <div className="text-center">
        <Tilt>
          <Image
            className="mt-4"
            src={"/logo/brand-full.png"}
            alt="full-logo"
            height={120}
            width={390}
          />
        </Tilt>
      </div>
      <h1 className="m-8 text-xl text-left">Campaigns</h1>
      <CampaignCard />
    </div>
  );
};

export default Home;
