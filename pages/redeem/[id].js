import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

import MockNFT from '../../src/artifacts/contracts/mock/MockNFT.sol/MockNFT.json';
import NFTForX from '../../src/artifacts/contracts/NFTForX.sol/NFTForX.json';

import NFTRedeemCard from '../../components/campaign/NFTRedeemCard';
import OptionModal from '../../components/Modal/OptionModal';
import NFTRedeemedCard from '../../components/redeem/NFTRedeemedCard';
import { useRouter } from 'next/router';
import UserTokenContainer from '../../components/redeem/UserTokenContainer';
import RedeemedTokenContainer from '../../components/redeem/RedeemedTokenContainer';

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
  const [isModalLoading, setisModalLoading] = useState(false);
  const [userNftLoading, setUserNFTLoading] = useState(false);
  const [userRedeemsLoading, setUserRedeemsLoading] = useState(false);

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
    setUserNFTLoading(true);

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
    setUserNFTLoading(false);
  }

  async function getUserRedeemeds() {
    if (!account) return;
    if (!isWeb3Enabled) await enableWeb3();

    setUserRedeemsLoading(true);

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
    setUserRedeemsLoading(false);
  }

  async function openRedeem(tokenId) {
    if (!isWeb3Enabled) await enableWeb3();
    setShowModal(true);
    setSelectedTokenId(tokenId);
  }

  async function redeem(optionIndex) {
    if (!isWeb3Enabled) await enableWeb3();
    setisModalLoading(true);

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
      setisModalLoading(false);
    } catch (error) {
      console.log(error.message || error);
      setisModalLoading(false);
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
    setisModalLoading(true);

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

      setisModalLoading(false);
    } catch (error) {
      console.log(error.message || error);
      setisModalLoading(false);
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
        isModalLoading={isModalLoading}
      />

      <div className='mb-4'>
        <div className='font-bold text-2xl mb-2'>Choose token to redeem</div>

        <UserTokenContainer>
          {userNftLoading ? (
            <div className='text-xl mb-2'>Loading... user's token</div>
          ) : userNFTs.length === 0 ? (
            <div className='text-xl mb-2'>You don't have any token.</div>
          ) : (
            userNFTs.map(({ tokenId, image }) => (
              <NFTRedeemCard
                key={tokenId}
                tokenId={tokenId}
                openRedeem={openRedeem}
                imgSrc={image}
              />
            ))
          )}
        </UserTokenContainer>
      </div>

      <div className='mb-4'>
        <div className='font-bold text-2xl mb-2'>Redeemed Items</div>
        <RedeemedTokenContainer>
          {userRedeemsLoading ? (
            <div className='text-xl mb-2'>Loading... user's redeemed items</div>
          ) : userNFTs.length === 0 ? (
            <div className='w-full text-xl mb-2'>You don't have any redeemed item.</div>
          ) : (
            userRedeemeds.map(({ tokenId, optionId, image }) => (
              <NFTRedeemedCard key={tokenId} tokenId={tokenId} optionId={optionId} imgSrc={image} />
            ))
          )}
        </RedeemedTokenContainer>
      </div>
    </div>
  );
};

export default Home;
