const { expect } = require("chai");

describe("NFTForX", function () {
  it("Should be able to create new NFTForX Campaign", async function () {
    const NFTForXFactory = await ethers.getContractFactory("NFTForXFactory");
    const NFTForX = await ethers.getContractFactory("NFTForX");
    const nftForXFactory = await NFTForXFactory.deploy();
    await nftForXFactory.deployed();

    await nftForXFactory.createCampaign('0xE648394086Ab45A03071048EF02b6C87CAdCb017', '0xE648394086Ab45A03071048EF02b6C87CAdCb017', 20);
    expect(await nftForXFactory.numberOfCampaigns()).to.equal(1);

    const createdCampaignAddr = await nftForXFactory.getCampaign(0);
    const createdCampaign = NFTForX.attach(createdCampaignAddr);
    
    expect(await createdCampaign.owner()).to.equal('0xE648394086Ab45A03071048EF02b6C87CAdCb017');
    expect(await createdCampaign.collection()).to.equal('0xE648394086Ab45A03071048EF02b6C87CAdCb017');
    expect(await createdCampaign.maxRedeemPerUser()).to.equal(20);
  });
});
