import Head from "next/head";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

import NFTRedeemCard from "../components/campaign/NFTRedeemCard";

const Home = () => {
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
      <div className="font-bold text-2xl mb-2">Choose token to redeem</div>

      <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
        {userNFTs.map((tokenId) => (
          <NFTRedeemCard key={tokenId} tokenId={tokenId} redeem={redeem} />
        ))}
      </div>
    </div>
  );
};

export default Home;
