# Web3 CloudStore

### Description:

This project is a decentralized storage application built with Solidity and React. It allows users to store data and control access to that data through a permission system.

### Features:

- Securely store data on the blockchain
- Grant access to specific users
- View all data a user has access to
- Manage access permissions

### Technologies Used:

- Solidity (for the smart contract)
- React (for the frontend)
- Metamask (for interacting with the blockchain)

### Installation and Setup:

- Clone this repository.
``` bash
  git clone https://github.com/ManishDait/MLH-Web3-Hackathon
```
- Install dependencies using npm install or yarn install.
```bash
  cd web3based-cloud-storage
  npm install
```

### Running the Application:
- Deploy and run SmarlContract using hardhat
```bash
  npx hardhat compile
  npx hardhat node
  npx harhat run --network localhost script/deploy.js
```
- Make sure you have Metamask installed and connected to a blockchain network.
- Go to client directory and install dependencises
```bash
  cd client
  npm install
```
- Start the development server using npm start or yarn start.
```bash
npm start
```
- The application will be available at http://localhost:3000/.

### Usage:

- Connect your Metamask wallet to the application.
- You will see your account address displayed in the navbar.
- Use the SubNav component to manage your data and access permissions.
- The ContentList component displays all data you have access to.

### Please Note:

Replace `<your contract address here>` in `App.js` file with the actual address of your deployed contract. and also same for `<your pinata api key>` in `component/sub-nav/SubNav.js`
This is a basic example, of Web3 App.
