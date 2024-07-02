# Club Membership NFT

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-wagmi`](https://github.com/wevm/wagmi/tree/main/packages/create-wagmi).


This project demonstrates a system for managing club memberships using NFTs (Non-Fungible Tokens) on the Ethereum blockchain. The project leverages smart contracts written in Solidity and a front-end built with Next.js.


## Getting Started

### Prerequisites

- Node.js
- npm
- MetaMask
- Ethereum Test Network (e.g., Sepolia)

### Installation


1. Install dependencies:
    ```sh
    npm install
2. Set Up Environment Variables
Create a `.env` file and add your configuration settings.

3. Deploy Smart Contract

    You can either deploy the smart contracts directly from Remix or use Hardhat locally.

    If Using Hardhat

    1. Install dependencies:
        ```sh
        cd contracts
        npm install  
    2. Set Up Environment Variables
        Create a `.env` file and add your configuration settings.

    3. Compile the smart contract:
        ```sh
        npx hardhat compile
    4. Deploy the smart contract to Sepolia:
        ```sh
        npx hardhat ignition deploy ignition/modules/NFT.ts
4. Update the contract address and admin adress in `constants.ts` under src/app

5. Start the development server:
    ```sh
        npm run dev
    ```




