import Tilt from 'react-parallax-tilt';

const NFTRedeemedCard = ({ tokenId, optionId, imgSrc }) => {
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
          <div className='font-semibold text-xl mb-1'>Token #{tokenId}</div>
          <div className='font-medium text-md mb-2'>Option #{optionId}</div>
        </div>
      </div>
    </Tilt>
  );
};

export default NFTRedeemedCard;
