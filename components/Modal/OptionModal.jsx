import { useEffect, useState } from 'react';
import ImageCard from '../../components/campaign/ImageCard';

function OptionItem({ optionId, setSelectedItem }) {
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
    <div>
      <div className='max-w-xs rounded shadow-lg'>
        <ImageCard
          src={imageData[optionId].src}
          name={imageData[optionId].name}
          description={imageData[optionId].description}
        />
        <input
          type='radio'
          value={optionId}
          name='option-radio'
          onClick={(e) => setSelectedItem(e.target.value)}
        />
      </div>
    </div>
  );
}

export default function OptionModal({
  showModal,
  setShowModal,
  tokenId,
  redeem,
  approve,
  isTokenApproved,
  isApprovalLoading,
}) {
  const [optionItems, setOptionItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    getOptionItems();
  }, []);

  async function getOptionItems() {
    setOptionItems([0, 1, 2]);
  }

  async function redeemItem() {
    if (!selectedItem) return alert('Please select an item to redeem');

    await redeem(selectedItem);
    setShowModal(false);
    setSelectedItem(null);
  }

  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-5xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                  <h3 className='text-3xl font-semibold'>Redeem an item</h3>
                </div>
                {/*body*/}
                <div className='relative p-6 flex-auto'>
                  <div className='font-bold text-2xl mb-2'>Selected Token #{tokenId}</div>
                  <div className='max-w-xs rounded shadow-lg mb-4'>
                    <img
                      className='max-w-xs'
                      src='https://gateway.pinata.cloud/ipfs/QmX8AsKPQEtURv9rykLodLXCs9PhsAtGycyZSQXN7TAFa5'
                      alt='Historical Item'
                    />
                  </div>

                  <div className='font-bold text-2xl mb-2'>Select your item</div>
                  <div className='grid grid-cols-3 gap-4'>
                    {optionItems.map((optionId) => (
                      <OptionItem
                        key={optionId}
                        optionId={optionId}
                        setSelectedItem={setSelectedItem}
                      />
                    ))}
                  </div>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end px-6 py-2 border-t border-solid border-blueGray-200 rounded-b'>
                  <button
                    className='hover:bg-black-100 text-red-500 font-medium rounded-md px-8 py-2'
                    type='button'
                    onClick={() => {
                      setShowModal(false);
                      setSelectedItem(null);
                    }}
                  >
                    Cancel
                  </button>
                  {isTokenApproved ? (
                    <button
                      className='bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-8 py-2'
                      type='button'
                      onClick={() => {
                        if (!isApprovalLoading) redeemItem();
                      }}
                    >
                      {isApprovalLoading ? 'Loading...' : 'Redeem'}
                    </button>
                  ) : (
                    <button
                      className='bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-8 py-2'
                      type='button'
                      onClick={() => {
                        if (!isApprovalLoading) approve();
                      }}
                    >
                      {isApprovalLoading ? 'Loading...' : 'Approve'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
}
