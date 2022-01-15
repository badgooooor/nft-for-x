import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

function RedeemableItem({ tokenId, redeem }) {
  return (
    <div className='p-4'>
      <div className='max-w-sm rounded shadow-lg'>
        <img
          className='w-full'
          src='https://media.discordapp.net/attachments/929752477711073340/931745821056176168/tshirt.jpg'
          alt='Redeemable Item'
        />
        <div className='px-6 py-4'>
          <div className='font-semibold text-xl mb-2'>Token #{tokenId}</div>
        </div>
        <div className='px-6 py-4 text-center'>
          <button
            className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md px-8 py-2 items-center'
            onClick={() => redeem(tokenId)}
          >
            Redeem
          </button>
        </div>
      </div>
    </div>
  );
}

function RedeemableContainer({ children }) {
  return <div className='grid grid-cols-4 gap-4'>{children}</div>;
}

export default function Home() {
  const { account } = useMoralis();
  const [userNFTs, setUserNFTs] = useState([]);

  useEffect(() => {
    getUserNFTs();
  }, [account]);

  async function getUserNFTs() {
    console.log(`Getting... NFT token IDs \naccount: ${account}`);
    setUserNFTs([1, 2, 3]);
  }

  async function redeem(tokenId) {
    console.log(`Redeeming... token #${tokenId} \naccount: ${account}`);
  }

  return (
    <div>
      <Head>
        <title>NFT for X</title>
        <meta name='description' content='Best NFT Hack Application' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='px-6 py-4'>
        <div className='font-bold text-2xl mb-2'>Your Redeemable NFTs</div>
      </div>

      <RedeemableContainer>
        {userNFTs.map((tokenId) => (
          <RedeemableItem key={tokenId} tokenId={tokenId} redeem={redeem} />
        ))}
      </RedeemableContainer>
    </div>
  );
}
