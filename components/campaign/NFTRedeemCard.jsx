import Tilt from 'react-parallax-tilt';

const NFTRedeemCard = ({ tokenId, imgSrc, openRedeem }) => {
  return (
    <Tilt>
      <div className='max-w-sm rounded-md shadow-lg bg-white'>
        <div>
          <img
            className='w-full h-72 object-cover rounded-t-sm'
            src={imgSrc}
            alt='NFT token for redeem'
          />
        </div>
        <div className='px-6 py-4'>
          <div className='font-semibold text-xl mb-2'>Token #{tokenId}</div>
        </div>
        <div className='px-6 py-4 text-center'>
          <button
            className='w-full ease-in duration-300 bg-dark-slate-blue hover:bg-white text-white hover:text-dark-slate-blue border-2 border-dark-slate-blue rounded-md px-8 py-2'
            onClick={() => openRedeem(tokenId)}
          >
            Redeem
          </button>
        </div>
      </div>
    </Tilt>
  );
};

export default NFTRedeemCard;
