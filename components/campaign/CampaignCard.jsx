import Tilt from "react-parallax-tilt";
import ImageCard from "./ImageCard";

const CampaignCard = () => {
  return (
    <div className="items-center justify-between p-4 m-4 border-2 rounded-md bg-white-pink border-light-pink">
      <p className="mb-4 font-semibold font-xl">
        REDEEM พรี่อ๋อง for พรี่ฮ๋อง shirt, shoe, or underwear
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Tilt>
          <ImageCard
            src="/collection/tshirt.jpg"
            name="T Shirt"
            description={"Shirt engraved with awesomeness"}
          />
        </Tilt>
        <Tilt>
          <ImageCard
            src="/collection/hat.jpg"
            name="Hat"
            description={"Hat showing how sultan you are"}
          />
        </Tilt>
        <Tilt>
          <ImageCard
            src="/collection/jacket.jpg"
            name="Jacket"
            description={"Jacket that make you drip like rockstar"}
          />
        </Tilt>
      </div>
    </div>
  );
};

export default CampaignCard;
