import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import NFTMinter from "../../src/artifacts/contracts/NFTMinter.sol/NFTMinter.json";
import { shortenAddr } from "../../utils/shortenAddr";

const MintMockButton = () => {
  const { isAuthenticated } = useMoralis();

  const { Moralis, isWeb3Enabled } = useMoralis();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3();
  }, []);

  async function enableWeb3() {
    console.log("enabling web3 ...");
    await Moralis.enableWeb3();
  }

  async function mintMockNFT() {
    if (!isWeb3Enabled) await enableWeb3();
    setLoading(true);
    if (!isWeb3Enabled) await enableWeb3();

    try {
      const result = await Moralis.executeFunction({
        contractAddress: process.env.NEXT_PUBLIC_NFT_MINTER,
        functionName: "gibme",
        abi: NFTMinter.abi,
        params: {},
      });

      alert(`NFT successfully minted! TX: ${result.transactionHash}`);
    } catch (error) {
      alert(error.message);
      console.log(error.message || error);
    }
    setLoading(false);
  }

  if (isAuthenticated) {
    return (
      <div>
        <button
          className="ease-in duration-300 bg-hot-pink hover:bg-white text-white text-sm hover:text-hot-pink border-2 border-hot-pink rounded-md px-4 py-2"
          onClick={mintMockNFT}
        >
          {loading
            ? `Loading...`
            : `Mint mock NFT (${shortenAddr(
                process.env.NEXT_PUBLIC_NFTMOCK_ADDRESS
              )})`}
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default MintMockButton;
