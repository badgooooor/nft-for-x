const { expect } = require("chai");

describe("NFTForXFactory", function () {
  let alice, nftCollection, rest;

  beforeEach(async () => {
    [alice, nftCollection, ...rest] = await ethers.getSigners();
  });

  it("Should be able to create new NFTForX Campaign", async function () {
    const NFTForXFactory = await ethers.getContractFactory("NFTForXFactory");
    const NFTForX = await ethers.getContractFactory("NFTForX");
    const nftForXFactory = await NFTForXFactory.deploy();
    await nftForXFactory.deployed();

    await nftForXFactory.createCampaign(
      alice.address,
      nftCollection.address,
      20
    );
    expect(await nftForXFactory.numberOfCampaigns()).to.equal(1);

    const createdCampaignAddr = await nftForXFactory.getCampaign(0);
    const createdCampaign = NFTForX.attach(createdCampaignAddr);

    expect(await createdCampaign.owner()).to.equal(alice.address);
    expect(await createdCampaign.collection()).to.equal(nftCollection.address);
    expect(await createdCampaign.maxRedeemPerUser()).to.equal(20);
  });
});

describe("NFTForX", function () {
  let alice, bob, nftCollection, rest;

  beforeEach(async () => {
    [alice, bob, nftCollection, ...rest] = await ethers.getSigners();
  });

  it("Should be created with all supplied parameter from constructor", async function () {
    const NFTForX = await ethers.getContractFactory("NFTForX");
    const nftForX = await NFTForX.deploy(
      alice.address,
      nftCollection.address,
      20
    );
    await nftForX.deployed();

    expect(await nftForX.owner()).to.equal(alice.address);
    expect(await nftForX.collection()).to.equal(nftCollection.address);
    expect(await nftForX.maxRedeemPerUser()).to.equal(20);
  });

  it("Should transfer NFT back to owner with redeem() method", async function () {
    // Mint NFT
    const MockNFT = await ethers.getContractFactory("MockNFT");
    const mockNFT = await MockNFT.deploy();
    await mockNFT.deployed();

    await mockNFT.mint(alice.address);

    // Deploy NFTForX
    const NFTForX = await ethers.getContractFactory("NFTForX");
    // Bob is owner of collection
    const nftForX = await NFTForX.deploy(bob.address, mockNFT.address, 20);
    await nftForX.deployed();

    // Alice redeems NFT
    expect(await mockNFT.ownerOf(0)).to.equal(alice.address);
    await mockNFT.connect(alice).approve(nftForX.address, 0);
    await nftForX.redeem(0, 0);
    expect(await mockNFT.ownerOf(0)).to.equal(bob.address);
  });

  it("Should not transfer NFT if owner exceeded _maxRedeemPerUser", async function () {
    // Mint NFT
    const MockNFT = await ethers.getContractFactory("MockNFT");
    const mockNFT = await MockNFT.deploy();
    await mockNFT.deployed();

    await mockNFT.mint(alice.address);
    await mockNFT.mint(alice.address);
    await mockNFT.mint(alice.address);

    // Deploy NFTForX
    const NFTForX = await ethers.getContractFactory("NFTForX");
    // Bob is owner of collection
    const nftForX = await NFTForX.deploy(bob.address, mockNFT.address, 1);
    await nftForX.deployed();

    // Alice redeems NFT
    expect(await mockNFT.ownerOf(0)).to.equal(alice.address);
    await mockNFT.connect(alice).approve(nftForX.address, 0);
    await nftForX.redeem(0, 0);
    expect(await mockNFT.ownerOf(0)).to.equal(bob.address);

    // This should fail.
    await mockNFT.connect(alice).approve(nftForX.address, 1);
    await expect(nftForX.redeem(1, 0)).to.be.revertedWith(
      "Caller exceed redeem limit."
    );
  });

  it("Should count of user’s redeemed item", async function () {
    // Mint NFT
    const MockNFT = await ethers.getContractFactory("MockNFT");
    const mockNFT = await MockNFT.deploy();
    await mockNFT.deployed();

    await mockNFT.mint(alice.address);
    await mockNFT.mint(alice.address);
    await mockNFT.mint(alice.address);

    // Deploy NFTForX
    const NFTForX = await ethers.getContractFactory("NFTForX");
    // Bob is owner of collection
    const nftForX = await NFTForX.deploy(bob.address, mockNFT.address, 3);
    await nftForX.deployed();

    // Alice redeems NFT
    for (let i = 0; i < 3; i++) {
      expect(await mockNFT.ownerOf(i)).to.equal(alice.address);
      await mockNFT.connect(alice).approve(nftForX.address, i);
      await nftForX.redeem(i, 0);
      expect(await mockNFT.ownerOf(i)).to.equal(bob.address);
    }

    expect(await nftForX.userRedeemCount(alice.address)).to.equal(3);
    expect(await nftForX.totalRedeemCount()).to.equal(3);
  });

  it("Should get user’s redeemed token and option", async function () {
    // Mint NFT
    const MockNFT = await ethers.getContractFactory("MockNFT");
    const mockNFT = await MockNFT.deploy();
    await mockNFT.deployed();

    await mockNFT.mint(alice.address);
    await mockNFT.mint(alice.address);
    await mockNFT.mint(alice.address);

    // Deploy NFTForX
    const NFTForX = await ethers.getContractFactory("NFTForX");
    // Bob is owner of collection
    const nftForX = await NFTForX.deploy(bob.address, mockNFT.address, 3);
    await nftForX.deployed();

    // Alice redeems NFT
    for (let i = 0; i < 3; i++) {
      expect(await mockNFT.ownerOf(i)).to.equal(alice.address);
      await mockNFT.connect(alice).approve(nftForX.address, i);
      // Mocking option
      await nftForX.redeem(i, i + 1);
      expect(await mockNFT.ownerOf(i)).to.equal(bob.address);
    }

    const userRedeemed = await nftForX.getUserRedeem(alice.address);
    const userRedeemedOption = await nftForX.getUserRedeemOption(alice.address);

    // Check NFT redeem
    for (let i = 0; i < 3; i++) {
      expect(await nftForX.redeemFor(userRedeemed[i].toString())).to.equal(
        i + 1
      );
      expect(userRedeemedOption[i]).to.equal(i + 1);
    }
  });
});
