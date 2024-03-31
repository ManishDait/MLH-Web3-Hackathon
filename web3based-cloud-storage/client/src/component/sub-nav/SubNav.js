import "./SubNav.css"
import { useState } from "react";
import axios from "axios";

import { useEffect } from "react";

const SubNav = ({ contract, account, provider }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No file selected");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
          try {
            const formData = new FormData();
            formData.append("file", file);
    
            const resFile = await axios({
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              headers: {
                pinata_api_key: `<your pinata api key>`,
                pinata_secret_api_key: `<your pinata secret key>`,
                "Content-Type": "multipart/form-data",
              },
            });
            const FileHash = `https://violet-impressive-wren-810.mypinata.cloud/ipfs/${resFile.data.IpfsHash}`;
            contract.add(account,FileHash);
            alert("Successfully File Uploaded");
            setFileName("No file selected");
            setFile(null);
          } catch (e) {
            alert("Unable to upload file to Pinata");
          }
        }
        setFileName("No fie selected");
        setFile(null);
    };

    const retrieveFile = (e) => {
        const data = e.target.files[0]; 
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
          setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };

    const sharing = async () => {
        const address = document.querySelector(".share").value;
        await contract.allow(address);
      };
      useEffect(() => {
        const accessList = async () => {
          const addressList = await contract.shareAccess();
          let select = document.querySelector("#selectNumber");
          const options = addressList;
    
          for (let i = 0; i < options.length; i++) {
            let opt = options[i];
            let e1 = document.createElement("option");
            e1.textContent = opt;
            e1.value = opt;
            select.appendChild(e1);
          }
        };
        contract && accessList();
      }, [contract]);

    return (
        <ul class="list-group">
            <li class="list-group-item">
                <form className="form" onSubmit={handleSubmit}>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <input disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile}/>
                        <button class="btn btn-primary upload"  type="submit"  disabled={!file}>Upload File</button>
                    </div>
                </form>
            </li>
            <li class="list-group-item">
                <div>
                    <p>Share Files With</p>
                    <input type="text" placeholder="Enter Address" className="share ip-field"></input>
                    <button className="btn btn-primary mx-1" onClick={() => sharing()}>Share Files With</button>
                </div>
            </li>
            <li class="list-group-item">
              <form id="myForm">
                <select id="selectNumber">
                  <option className="share_address">People With Access</option>
                </select>
              </form>
            </li>
        </ul>
    );
}

export default SubNav;