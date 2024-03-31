import './App.css';
import Storage from "./artifacts/contracts/Storage.sol/Storage.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navbar from './component/navbar/Navbar';
import ContentList from './component/content-list/ContentList';
import SubNav from './component/sub-nav/SubNav';

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "<your contract address>";

        const contract = new ethers.Contract(
          contractAddress,
          Storage.abi,
          signer
        );
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <div className="App">
      <Navbar account={account}/>
      <div class="d-flex">
        <div class="d-flex px-4 py-4 h-100">
          <SubNav account={account} provider={provider} contract={contract}/>
        </div>
        <div class="main-d d-flex px-4 py-4 h-100">
          <ContentList account={account} contract={contract}/>
        </div>
      </div>
    </div>
  );
}

export default App;
