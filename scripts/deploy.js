//! Replace nftCreator with your MetaMask account address

async function main() {
  const [nftCreator] = await ethers.getSigners();
  // Mock NFT
  const MockNFT = await ethers.getContractFactory('MockNFT');
  const mockNFT = await MockNFT.deploy();
  await mockNFT.deployed();

  console.log('Mock NFT deployed at: ' + mockNFT.address);

  // TODO: Put address here!
  // Mint NFT
  await mockNFT.mintTo(nftCreator.address, 10);

  // NFTForXFactory
  const NFTForXFactory = await ethers.getContractFactory('NFTForXFactory');
  const nftForXFactory = await NFTForXFactory.deploy();
  await nftForXFactory.deployed();

  console.log('NFTForX Factory deployed at: ' + nftForXFactory.address);

  // Create a new campaign
  // Params:
  // - owner: address of the owner of the campaign
  // - collection: address of the collection of NFT
  // - maxRedeemPerUser: maximum number of NFT that can be redeemed per user
  await nftForXFactory.createCampaign(nftCreator.address, mockNFT.address, 20); // => this will Emit NFTForXCreated event

  const nftForX = await nftForXFactory.getCampaign(0);
  console.log('NFTForX deployed at: ' + nftForX);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
