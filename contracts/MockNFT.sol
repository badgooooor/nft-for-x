//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockNFT is ERC721, Ownable {
    using Strings for uint256;

    uint256 public maxSupply = 500;
    uint256 private nextID = 1;

    string public baseURI =
        "https://gateway.pinata.cloud/ipfs/QmW4YoAhat9sBoHNVGALWbXrW7xR8f4BkmksBBrYUfgGcp/";

    constructor()
        ERC721("NFT4X", "NFT For X Mock NFT")
    {}

    function mintTo(address to, uint256 amount) public onlyOwner{
        require(nextID + amount -1 <= maxSupply);
        for (uint256 i = 0; i < amount; i++) {
            _mint(to, nextID);
            nextID+=1;
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "MockNFT::tokenURI(uint256)::Nonexistent token!");
        return string(abi.encodePacked(baseURI, (tokenId % 3).toString(), ".jpg"));
    }
}
