// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "hardhat/console.sol";

contract NFTForX {
  uint256 private _maxRedeemPerUser;

  // Address to receive NFT from redeemer.
  address private _owner;
  address private _collection;

  mapping(address => uint256[]) public userRedeem;
  mapping(uint256 => uint256) public redeemFor;

  mapping(address => uint256) public redeemCount; 

  string private name;

  event Redeem(address redeeemer, uint256 tokenId, uint256 option); 

  constructor(address __owner, address __collection, uint256 __maxRedeemPerUser) {
    _owner = __owner;
    _collection = __collection;
    _maxRedeemPerUser = __maxRedeemPerUser;
  }

  function owner() public view virtual returns (address) {
    return _owner;
  }

  function collection() public view virtual returns (address) {
    return _collection;
  }

  function maxRedeemPerUser() public view virtual returns (uint256) {
    return _maxRedeemPerUser;
  }

  modifier onlyOwner() {
    require(owner() == msg.sender, "Caller is not owner");
    _;
  }

  modifier notOwner() {
    require(owner() != msg.sender, "Caller is not owner");
    _;
  }

  function userRedeemCount(address userAddr) public view virtual returns (uint256) {
    return redeemCount[userAddr];
  }

  function getUserRedeem(address userAddr) external view returns (uint256[] memory) {
    return userRedeem[userAddr];
  }

  modifier notExceedMaxRedeem() {
    uint256 tokenCount = userRedeemCount(msg.sender);
    require(tokenCount <= _maxRedeemPerUser, "Caller exceed redeem limit.");
    _;
  }

  modifier tokenNotRedeem(uint256 tokenId) {
    require(redeemFor[tokenId] == 0, "Caller trying to redeem redeemed token");
    _;
  }

  // Redeem item by transfer NFT back to owner.
  function redeem(uint256 tokenId, uint256 optionId) external 
    notOwner 
    notExceedMaxRedeem 
    tokenNotRedeem(tokenId) 
  returns (uint256) {
    IERC721(_collection).safeTransferFrom(msg.sender, _owner, tokenId);

    userRedeem[msg.sender].push(tokenId);
    redeemFor[tokenId] = optionId;
    redeemCount[msg.sender] += 1;

    emit Redeem(msg.sender, tokenId, optionId); 
    return tokenId;
  } 
}