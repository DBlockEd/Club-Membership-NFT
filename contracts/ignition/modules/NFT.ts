import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTModule = buildModule("ClubMembershipNFT", (m) => {

  const NFTContract = m.contract("ClubMembershipNFT");

  return { NFTContract };
});

export default NFTModule;
