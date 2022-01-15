import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

import OptionModal from '../components/Modal/OptionModal';
import MockNFT from '../src/artifacts/contracts/mock/MockNFT.sol/MockNFT.json';
import NFTForX from '../src/artifacts/contracts/NFTForX.sol/NFTForX.json';

function RedeemableItem({ tokenId, imgSrc, openRedeem }) {
  return (
    <div>
      <div className='max-w-sm rounded shadow-lg'>
        <img className='w-full' src={imgSrc} alt='Redeemable Item' />
        <div className='px-6 py-4'>
          <div className='font-semibold text-xl mb-2'>Token #{tokenId}</div>
        </div>
        <div className='px-6 py-4 text-center'>
          <button
            className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md px-8 py-2 items-center'
            onClick={() => openRedeem(tokenId)}
          >
            Redeem
          </button>
        </div>
      </div>
    </div>
  );
}

function RedeemableContainer({ children }) {
  return <div className='grid grid-cols-4 gap-4 mx-8'>{children}</div>;
}

function HistoryItem({ tokenId }) {
  return (
    <div>
      <div className='max-w-sm rounded shadow-lg'>
        <img
          className='w-full'
          src='https://images-ext-1.discordapp.net/external/1Y9ri4gBB0Ak1Zm2seQMTzavd6XDXpMO5RRzhqWbu8Y/https/gateway.pinata.cloud/ipfs/QmNTtzrUyifb9NC2CnnYN44QZyRGvzJNGPhdmQr8BjHMwx'
          alt='Historical Item'
        />
        <div className='px-6 py-4'>
          <div className='font-semibold text-xl mb-2'>Token #{tokenId}</div>
        </div>
      </div>
    </div>
  );
}

function HistoryContainer({ children }) {
  return <div className='grid grid-cols-4 gap-4 mx-8'>{children}</div>;
}

export default function Home() {
  const { account, isAuthenticated, Moralis, isWeb3Enabled } = useMoralis();
  const [userNFTs, setUserNFTs] = useState([]);
  const [historyTransactions, setHistoryTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState();

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3();
  }, []);

  useEffect(() => {
    getUserNFTs();
    getHistoricalTransactions();
  }, [account, isWeb3Enabled]);

  async function enableWeb3() {
    console.log('enabling web3 ...');
    await Moralis.enableWeb3();
  }

  async function getUserNFTs() {
    if (!isWeb3Enabled) await enableWeb3();

    console.log(`Getting... NFT token IDs \naccount: ${account}`);
    const options = {
      contractAddress: process.env.NEXT_PUBLIC_NFTMOCK_ADDRESS,
      functionName: 'balanceOf',
      abi: MockNFT.abi,
      params: {
        owner: account,
      },
    };

    const balance = Number.parseInt(await Moralis.executeFunction(options));
    let tempUserNFTs = [];
    for (let i = 0; i < balance; i++) {
      const tokenId = await Moralis.executeFunction({
        contractAddress: process.env.NEXT_PUBLIC_NFTMOCK_ADDRESS,
        functionName: 'tokenOfOwnerByIndex',
        abi: MockNFT.abi,
        params: {
          owner: account,
          index: String(i),
        },
      });

      const tokenURI = await Moralis.executeFunction({
        contractAddress: process.env.NEXT_PUBLIC_NFTMOCK_ADDRESS,
        functionName: 'tokenURI',
        abi: MockNFT.abi,
        params: {
          tokenId: tokenId,
        },
      });

      let data = tokenURI.split(',')[1];
      let buff = Buffer.from(data, 'base64');
      let text = buff.toString();
      const metaData = JSON.parse(text);

      tempUserNFTs.push({ tokenId, ...metaData });
    }

    setUserNFTs([...tempUserNFTs]);
  }

  async function getHistoricalTransactions() {
    if (!isWeb3Enabled) await enableWeb3();

    console.log(`Getting... historical transactions \naccount: ${account}`);
    setHistoryTransactions([1, 2, 3]);
  }

  async function openRedeem(tokenId) {
    if (!isWeb3Enabled) await enableWeb3();

    console.log(`Redeeming... token #${tokenId} \naccount: ${account}`);
    setShowModal(true);
    setSelectedTokenId(tokenId);
  }

  async function redeem(optionIndex) {
    if (!isWeb3Enabled) await enableWeb3();

    try {
      await Moralis.executeFunction({
        contractAddress: process.env.NEXT_PUBLIC_NFTFORX_ADDRESS,
        functionName: 'redeem',
        abi: NFTForX.abi,
        params: {
          tokenId: selectedTokenId,
          optionId: optionIndex,
        },
      });
    } catch (error) {
      console.log(error.message || error);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className='px-8 py-4 pt-8'>
        <div className='font-bold text-2xl mb-2'>Please Connect Your Wallet</div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>NFT for X</title>
        <meta name='description' content='Best NFT Hack Application' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <OptionModal
        showModal={showModal}
        setShowModal={setShowModal}
        tokenId={selectedTokenId}
        redeem={redeem}
      />

      <div className='px-8 py-4 pt-8'>
        <div className='font-bold text-2xl mb-2'>Your Redeemable NFTs</div>
      </div>

      <RedeemableContainer>
        {userNFTs.map(({ tokenId, image }) => (
          <RedeemableItem key={tokenId} tokenId={tokenId} openRedeem={openRedeem} imgSrc={image} />
        ))}
      </RedeemableContainer>

      <div className='px-8 py-4 pt-8'>
        <div className='font-bold text-2xl mb-2'>Transaction History</div>
      </div>
      <HistoryContainer>
        {historyTransactions.map((tokenId) => (
          <HistoryItem key={tokenId} tokenId={tokenId} />
        ))}
      </HistoryContainer>

      <div className='mb-8'></div>
    </div>
  );
}
