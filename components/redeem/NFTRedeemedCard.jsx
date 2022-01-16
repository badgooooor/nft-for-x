import Tilt from 'react-parallax-tilt';

const NFTRedeemedCard = ({ tokenId, optionId }) => {
  const imageData = {
    0: {
      src: '/collection/tshirt.jpg',
      name: 'T Shirt',
      description: 'Shirt engraved with awesomeness',
    },
    1: {
      src: '/collection/hat.jpg',
      name: 'Hat',
      description: 'Hat showing how sultan you are',
    },
    2: {
      src: '/collection/jacket.jpg',
      name: 'Jacket',
      description: 'Jacket that make you drip like rockstar',
    },
  };
  return (
    <Tilt>
      <div className='max-w-sm rounded-md shadow-lg bg-white'>
        <div>
          <img
            className='w-full h-72 object-cover rounded-t-sm'
            src={imageData[optionId].src}
            alt='NFT token for redeem'
          />
        </div>
        <div className='px-6 py-4'>
          <div className='font-semibold text-xl mb-1'>{imageData[optionId].name}</div>
          <div className='font-medium text-md mb-2'>Redeemed with token #{tokenId}</div>
        </div>
      </div>
    </Tilt>
  );
};

export default NFTRedeemedCard;
