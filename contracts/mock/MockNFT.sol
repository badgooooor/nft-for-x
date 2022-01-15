// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MockNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private tokenIds;

    constructor() ERC721("Mock Token", "MTK") {}

    // Anyone can mint this!!
    function mint(address to) public {
        _mint(to, tokenIds.current());
        tokenIds.increment();
    }
}