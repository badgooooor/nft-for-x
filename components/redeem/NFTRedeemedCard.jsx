import Tilt from 'react-parallax-tilt';

const NFTRedeemedCard = ({ tokenId, imgSrc }) => {
  return (
    <Tilt>
      <div className='max-w-sm rounded-sm shadow-lg'>
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
      </div>
    </Tilt>
  );
};

export default NFTRedeemedCard;
