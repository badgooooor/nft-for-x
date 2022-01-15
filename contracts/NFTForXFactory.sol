// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./NFTForX.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract NFTForXFactory {
  mapping(uint256 => address) getCampaigns;
  using Counters for Counters.Counter;
  Counters.Counter private campaignIds;

  event CampaignCreated(address campaignAddress);

  function getCampaign(uint256 campaignId) public view returns (address) {
    return getCampaigns[campaignId];
  }

  function createCampaign(address __owner, address __collection, uint256 __maxRedeemPerUser) public {
    NFTForX nftForX = new NFTForX(__owner, __collection, __maxRedeemPerUser);
    getCampaigns[campaignIds.current()] = address(nftForX);
    campaignIds.increment();

    emit CampaignCreated(address(nftForX));
  }

  function numberOfCampaigns() public view returns (uint256) {
    return campaignIds.current();
  }
}