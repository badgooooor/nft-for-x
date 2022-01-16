import Tilt from "react-parallax-tilt";
import { shortenAddr } from "../../utils/shortenAddr";
import ImageCard from "../campaign/ImageCard";

const CampaignCard = ({ campaign }) => {
  console.log(campaign?.owner);
  return (
    <div className="items-center justify-between p-4 m-4 border-2 rounded-md bg-white-pink border-light-pink">
      <div className="mb-4">
        <p className="mb-1 font-semibold font-xl">{campaign?.name}</p>
        <div className="rounded-full bg-light-blue px-2 py-1 w-48 text-sm">
          Owner: {campaign && shortenAddr(campaign?.owner)}
        </div>
      </div>
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