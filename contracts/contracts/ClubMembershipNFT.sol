// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ClubMembershipNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    mapping(address => bool) private isMember;
    mapping(address => string) private memberToURI;

    constructor() ERC721("club-membership-nft", "CMNFT") Ownable(msg.sender) {}

    function mintNFT(address to, string memory tokenURI) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        addMember(to, tokenURI);
    }

    function addMember(address to, string memory tokenURI) internal {
        if (!isMember[to]) {
            isMember[to] = true;
            memberToURI[to] = tokenURI;
        }
    }

    function getAllMembers() public view returns (address[] memory) {
        address[] memory members = new address[](_nextTokenId);
        for (uint256 i = 0; i < _nextTokenId; i++) {
            members[i] = ownerOf(i);
        }
        return members;
    }

    function getAllURIs() public view returns (string[] memory) {
        string[] memory uris = new string[](_nextTokenId);
        for (uint256 i = 0; i < _nextTokenId; i++) {
            uris[i] = tokenURI(i);
        }
        return uris;
    }

    function getUserURI(
        address userAddress
    ) public view returns (string memory) {
        return memberToURI[userAddress];
    }
}
