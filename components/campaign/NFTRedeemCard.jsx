import Tilt from "react-parallax-tilt";

const NFTRedeemCard = ({ tokenId, redeem }) => {
  return (
    <Tilt>
      <div className="max-w-sm rounded-sm shadow-lg bg-white">
        <img
          className="w-full rounded-t-sm"
          src="https://media.discordapp.net/attachments/929752477711073340/931745821056176168/tshirt.jpg"
          alt="NFT token for redeem"
        />
        <div className="px-6 py-4">
          <div className="font-semibold text-xl mb-2">Token #{tokenId}</div>
        </div>
        <div className="px-6 py-4 text-center">
          <button
            className="w-full ease-in duration-300 bg-dark-slate-blue hover:bg-white text-white hover:text-dark-slate-blue border-2 border-dark-slate-blue rounded-md px-8 py-2"
            onClick={() => redeem(tokenId)}
          >
            Redeem
          </button>
        </div>
      </div>
    </Tilt>
  );
};

export default NFTRedeemCard;
