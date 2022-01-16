import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

import MockNFT from '../../src/artifacts/contracts/mock/MockNFT.sol/MockNFT.json';
import NFTForX from '../../src/artifacts/contracts/NFTForX.sol/NFTForX.json';

import NFTRedeemCard from '../../components/campaign/NFTRedeemCard';
import OptionModal from '../../components/Modal/OptionModal';
import NFTRedeemedCard from '../../components/redeem/NFTRedeemedCard';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const { id } = router.query;

  const { account, isAuthenticated, Moralis, isWeb3Enabled } = useMoralis();

  const [campaignAddr, setCampaignAddr] = useState(process.env.NEXT_PUBLIC_NFTFORX_ADDRESS);
  const [collectionAddr, setCollectionAddr] = useState(process.env.NEXT_PUBLIC_NFTMOCK_ADDRESS);
  const [userNFTs, setUserNFTs] = useState([]);
  const [userRedeemeds, setUserRedeemeds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState();
  const [isTokenApproved, setIsTokenApproved] = useState(false);
  const [isApprovalLoading, setIsApprovalLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setCampaignAddr(id);
      getCollection();
    }
  }, [id]);

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3();
  }, []);

  useEffect(() => {
    getUserNFTs();
    getUserRedeemeds();
  }, [account, isWeb3Enabled]);

  useEffect(() => {
    getTokenApproval();
  }, [selectedTokenId]);

  async function enableWeb3() {
    await Moralis.enableWeb3();
  }

  async function getCollection() {
    if (!isWeb3Enabled) await enableWeb3();

    const collection = await Moralis.executeFunction({
      contractAddress: campaignAddr,
      functionName: 'collection',
      abi: NFTForX.abi,
    });

    setCollectionAddr(collection);
  }

  async function getTokenMetaData(tokenId) {
    const tokenURI = await Moralis.executeFunction({
      contractAddress: collectionAddr,
      functionName: 'tokenURI',
      abi: MockNFT.abi,
      params: {
        tokenId: tokenId,
      },
    });

    let data = tokenURI.split(',')[1];
    let buff = Buffer.from(data, 'base64');
    let text = buff.toString();
    return JSON.parse(text);
  }

  async function getUserNFTs() {
    if (!account) return;
    if (!isWeb3Enabled) await enableWeb3();

    const balance = Number.parseInt(
      await Moralis.executeFunction({
        contractAddress: collectionAddr,
        functionName: 'balanceOf',
        abi: MockNFT.abi,
        params: {
          owner: account,
        },
      })
    );

    let tempUserNFTs = [];
    for (let i = 0; i < balance; i++) {
      const tokenId = await Moralis.executeFunction({
        contractAddress: collectionAddr,
        functionName: 'tokenOfOwnerByIndex',
        abi: MockNFT.abi,
        params: {
          owner: account,
          index: String(i),
        },
      });

      const metaData = await getTokenMetaData(tokenId);

      tempUserNFTs.push({ tokenId, ...metaData });
    }

    setUserNFTs([...tempUserNFTs]);
  }

  async function getUserRedeemeds() {
    if (!account) return;
    if (!isWeb3Enabled) await enableWeb3();

    const userRedeems = await Moralis.executeFunction({
      contractAddress: campaignAddr,
      functionName: 'getUserRedeem',
      abi: NFTForX.abi,
      params: {
        userAddr: account,
      },
    });

    const userRedeemOptions = await Moralis.executeFunction({
      contractAddress: campaignAddr,
      functionName: 'getUserRedeemOption',
      abi: NFTForX.abi,
      params: {
        userAddr: account,
      },
    });

    let tempArr = [];
    for (let i = 0; i < userRedeems.length; i++) {
      const metaData = await getTokenMetaData(userRedeems[i]);
      tempArr.push({
        tokenId: userRedeems[i],
        optionId: userRedeemOptions[i],
        ...metaData,
      });
    }

    setUserRedeemeds([...tempArr]);
  }

  async function openRedeem(tokenId) {
    if (!isWeb3Enabled) await enableWeb3();
    setShowModal(true);
    setSelectedTokenId(tokenId);
  }

  async function redeem(optionIndex) {
    if (!isWeb3Enabled) await enableWeb3();
    setIsApprovalLoading(true);

    try {
      await Moralis.executeFunction({
        contractAddress: campaignAddr,
        functionName: 'redeem',
        abi: NFTForX.abi,
        params: {
          tokenId: selectedTokenId,
          optionId: optionIndex,
        },
      });

      getUserNFTs();
      getUserRedeemeds();

      alert('Successfully redeemed');
      setIsApprovalLoading(false);
    } catch (error) {
      console.log(error.message || error);
      setIsApprovalLoading(false);
    }
  }

  async function getTokenApproval() {
    if (!selectedTokenId) return;
    if (!isWeb3Enabled) await enableWeb3();

    try {
      const result = await Moralis.executeFunction({
        contractAddress: collectionAddr,
        functionName: 'getApproved',
        abi: MockNFT.abi,
        params: {
          tokenId: selectedTokenId,
        },
      });

      setIsTokenApproved(result === campaignAddr);
    } catch (error) {
      console.log(error.message || error);
    }
  }

  async function approve() {
    if (!isWeb3Enabled) await enableWeb3();
    setIsApprovalLoading(true);

    try {
      await Moralis.executeFunction({
        contractAddress: collectionAddr,
        functionName: 'approve',
        abi: MockNFT.abi,
        params: {
          to: campaignAddr,
          tokenId: selectedTokenId,
        },
      });

      await getTokenApproval();

      setIsApprovalLoading(false);
    } catch (error) {
      console.log(error.message || error);
      setIsApprovalLoading(false);
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
      <OptionModal
        showModal={showModal}
        setShowModal={setShowModal}
        tokenId={selectedTokenId}
        redeem={redeem}
        approve={approve}
        isTokenApproved={isTokenApproved}
        isApprovalLoading={isApprovalLoading}
      />

      <div className='mb-4'>
        <div className='font-bold text-2xl mb-2'>Choose token to redeem</div>

        <div className='grid sm:grid-cols-4 grid-cols-2 gap-4 bg-white-pink rounded border-light-pink p-4'>
          {userNFTs.map(({ tokenId, image }) => (
            <NFTRedeemCard key={tokenId} tokenId={tokenId} openRedeem={openRedeem} imgSrc={image} />
          ))}
        </div>
      </div>

      <div className='mb-4'>
        <div className='font-bold text-2xl mb-2'>Redeemed Items</div>
        <div className='grid sm:grid-cols-4 grid-cols-2 gap-4'>
          {userRedeemeds.map(({ tokenId, optionId, image }) => (
            <NFTRedeemedCard key={tokenId} tokenId={tokenId} optionId={optionId} imgSrc={image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
