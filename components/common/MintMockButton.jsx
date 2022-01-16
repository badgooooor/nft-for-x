import { useMoralis } from "react-moralis";
import MockNFT from "../../src/artifacts/contracts/mock/MockNFT.sol/MockNFT.json";

const MintMockButton = () => {
  const { isAuthenticated } = useMoralis();

  const { Moralis, account, isWeb3Enabled } = useMoralis();

  async function enableWeb3() {
    console.log("enabling web3 ...");
    await Moralis.enableWeb3();
  }

  async function mintMockNFT() {
    if (!isWeb3Enabled) await enableWeb3();

    // const mintToken = await Moralis.executeFunction({
    //   contractAddress: process.env.NEXT_PUBLIC_NFTMOCK_ADDRESS,
    //   functionName: "mint",
    //   abi: MockNFT.abi,
    //   params: {
    //     to: account,
    //   },
    // });
  }

  if (isAuthenticated) {
    return (
      <div>
        <button
          className="ease-in duration-300 bg-hot-pink hover:bg-white text-white text-sm hover:text-hot-pink border-2 border-hot-pink rounded-md px-4 py-2"
          onClick={mintMockNFT}
        >
          Mint mock NFT
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default MintMockButton;
