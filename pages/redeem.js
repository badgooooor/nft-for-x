import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

import NFTRedeemCard from "../components/campaign/NFTRedeemCard";
import OptionModal from "../components/Modal/OptionModal";
import MockNFT from "../src/artifacts/contracts/mock/MockNFT.sol/MockNFT.json";
import NFTForX from "../src/artifacts/contracts/NFTForX.sol/NFTForX.json";

function HistoryItem({ tokenId }) {
  return (
    <div>
      <div className="max-w-sm rounded shadow-lg">
        <img
          className="w-full"
          src="https://images-ext-1.discordapp.net/external/1Y9ri4gBB0Ak1Zm2seQMTzavd6XDXpMO5RRzhqWbu8Y/https/gateway.pinata.cloud/ipfs/QmNTtzrUyifb9NC2CnnYN44QZyRGvzJNGPhdmQr8BjHMwx"
          alt="Historical Item"
        />
        <div className="px-6 py-4">
          <div className="font-semibold text-xl mb-2">Token #{tokenId}</div>
        </div>
      </div>
    </div>
  );
}

const Home = () => {
  const { account, isAuthenticated, Moralis, isWeb3Enabled } = useMoralis();

  const [userNFTs, setUserNFTs] = useState([]);
  const [historyTransactions, setHistoryTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState();
  const [isTokenApproved, setIsTokenApproved] = useState(false);
  const [isApprovalLoading, setIsApprovalLoading] = useState(false);

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3();
  }, []);

  useEffect(() => {
    getUserNFTs();
    getHistoricalTransactions();
  }, [account, isWeb3Enabled]);

  useEffect(() => {
    getTokenApproval();
  }, [selectedTokenId]);

  async function enableWeb3() {
    console.log("enabling web3 ...");
    await Moralis.enableWeb3();
  }

  async function getUserNFTs() {
    if (!account) return;
    if (!isWeb3Enabled) await enableWeb3();

    console.log(`Getting... NFT token IDs \naccount: ${account}`);
    const options = {
      contractAddress: process.env.NEXT_PUBLIC_NFTMOCK_ADDRESS,
      functionName: "balanceOf",
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
        functionName: "tokenOfOwnerByIndex",
        abi: MockNFT.abi,
        params: {
          owner: account,
          index: String(i),
        },
      });

      const tokenURI = await Moralis.executeFunction({
        contractAddress: process.env.NEXT_PUBLIC_NFTMOCK_ADDRESS,
        functionName: "tokenURI",
        abi: MockNFT.abi,
        params: {
          tokenId: tokenId,
        },
      });

      let data = tokenURI.split(",")[1];
      let buff = Buffer.from(data, "base64");
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
    setIsApprovalLoading(true);

    try {
      await Moralis.executeFunction({
        contractAddress: process.env.NEXT_PUBLIC_NFTFORX_ADDRESS,
        functionName: "redeem",
        abi: NFTForX.abi,
        params: {
          tokenId: selectedTokenId,
          optionId: optionIndex,
        },
      });

      setIsApprovalLoading(false);
    } catch (error) {
      console.log(error.message || error);
    }
  }

  async function getTokenApproval() {
    if (!selectedTokenId) return;
    if (!isWeb3Enabled) await enableWeb3();

    try {
      const result = await Moralis.executeFunction({
        contractAddress: process.env.NEXT_PUBLIC_NFTMOCK_ADDRESS,
        functionName: "getApproved",
        abi: MockNFT.abi,
        params: {
          tokenId: selectedTokenId,
        },
      });

      console.log(result);
      setIsTokenApproved(result === process.env.NEXT_PUBLIC_NFTFORX_ADDRESS);
    } catch (error) {
      console.log(error.message || error);
    }
  }

  async function approve() {
    if (!isWeb3Enabled) await enableWeb3();
    setIsApprovalLoading(true);

    try {
      const result = await Moralis.executeFunction({
        contractAddress: process.env.NEXT_PUBLIC_NFTMOCK_ADDRESS,
        functionName: "approve",
        abi: MockNFT.abi,
        params: {
          to: process.env.NEXT_PUBLIC_NFTFORX_ADDRESS,
          tokenId: selectedTokenId,
        },
      });

      console.log(result);
      await getTokenApproval();

      setIsApprovalLoading(false);
    } catch (error) {
      console.log(error.message || error);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="px-8 py-4 pt-8">
        <div className="font-bold text-2xl mb-2">
          Please Connect Your Wallet
        </div>
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

      <div className="mb-4">
        <div className="font-bold text-2xl mb-2">Choose token to redeem</div>

        <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
          {userNFTs.map(({ tokenId, image }) => (
            <NFTRedeemCard
              key={tokenId}
              tokenId={tokenId}
              openRedeem={openRedeem}
              imgSrc={image}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="font-bold text-2xl mb-2">Redeemed Items</div>
        <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
          {historyTransactions.map((tokenId) => (
            <HistoryItem key={tokenId} tokenId={tokenId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
