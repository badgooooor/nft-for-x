import { useEffect, useState } from 'react';

function OptionItem({ optionIndex, setSelectedItem }) {
  return (
    <div>
      <div className='max-w-xs rounded shadow-lg'>
        <img
          className='w-full'
          src='https://images-ext-1.discordapp.net/external/1Y9ri4gBB0Ak1Zm2seQMTzavd6XDXpMO5RRzhqWbu8Y/https/gateway.pinata.cloud/ipfs/QmNTtzrUyifb9NC2CnnYN44QZyRGvzJNGPhdmQr8BjHMwx'
          alt='Historical Item'
        />
        <div className='px-6 py-4'>
          <div className='font-semibold text-xl mb-2'>option #{optionIndex}</div>
        </div>
        <input
          type='radio'
          value={optionIndex}
          name='option-radio'
          onClick={(e) => setSelectedItem(e.target.value)}
        />
      </div>
    </div>
  );
}

export default function OptionModal({ showModal, setShowModal, tokenId }) {
  const [optionItems, setOptionItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    getOptionItems();
  }, []);

  async function getOptionItems() {
    console.log(`Getting... option items of Token ID #${tokenId}`);
    setOptionItems([1, 2, 3]);
  }

  async function redeemItem(e) {
    e.preventDefault();
    if (!selectedItem) return alert('Please select an item to redeem');

    console.log(`Redeeming... item #${selectedItem}`);

    // If successfully redeemed
    setShowModal(false);
    setSelectedItem(null);
  }
  console.log(selectedItem);
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
                  <h3 className='text-3xl font-semibold'>Token ID #{tokenId}</h3>
                </div>
                {/*body*/}
                <div className='relative p-6 flex-auto'>
                  <div className='font-bold text-2xl mb-2'>Selected NFT</div>
                  <div className='max-w-xs rounded shadow-lg mb-4'>
                    <img
                      className='max-w-xs'
                      src='https://media.discordapp.net/attachments/929752477711073340/931745821056176168/tshirt.jpg'
                      alt='Historical Item'
                    />
                  </div>

                  <div className='font-bold text-2xl mb-2'>Options</div>
                  <div className='grid grid-cols-4 gap-4'>
                    {optionItems.map((optionIndex) => (
                      <OptionItem
                        key={optionIndex}
                        optionIndex={optionIndex}
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
                    Cancle
                  </button>
                  <button
                    className='bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-8 py-2'
                    type='button'
                    onClick={redeemItem}
                  >
                    Redeem
                  </button>
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
