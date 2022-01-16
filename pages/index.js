import Tilt from "react-parallax-tilt";
import Image from "next/image";
import MintMockButton from "../components/common/MintMockButton";
import CampaignList from "../components/landing/CampaignList";

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
      <div className="flex items-center justify-between mb-4">
        <div className="mb-2 text-2xl font-bold">Campaigns</div>
        <MintMockButton />
      </div>
      <CampaignList />
    </div>
  );
};

export default Home;
