import "./ContentList.css"
import { useState } from "react";


const ContentList = ({account, contract}) => {
    const [data, setData] = useState("");

    const getdata = async () => {
        let dataArray;
        const Otheraddress = document.querySelector(".address").value;
        try {
         if (Otheraddress) {
          dataArray = await contract.display(Otheraddress);
          console.log(dataArray);
        } else {
          dataArray = await contract.display(account);
        }
      } catch (e) {
        alert(e);
      }

       const isEmpty = Object.keys(dataArray).length === 0;

    
        if (!isEmpty) {
          const str = dataArray.toString();
          const str_array = str.split(",");
          const files = str_array.map((item, i) => {
            return (
            <div class="d-flex gap-1 mb-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Google_Docs_2020_Logo.svg/1489px-Google_Docs_2020_Logo.svg.png"alt="file_icon" width={20}/>
                <a href={item} key={i} target="_blank">
                <p class="m-0">{item.substring(55)}</p>
                </a>
            </div>
              
            );
          });
          setData(files);
        } else {
          const files = () => {
            return (
            <div class="d-flex gap-1 mb-1">
                <p class="m-0">No Files to show.</p>
            </div>
              
            );
          };
          setData(files);
          alert("No files to display");
        }
    };


    return (
        <div class="card rounder w-100 h-100">
            <div class="card-header d-flex align-items-center justify-content-between">
              <div class="d-flex gap-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Refresh_icon.png" width={20} height={20} class="cursor" onClick={getdata}/>
                <p class="m-0">Your Files</p>
              </div>
              

              <div class="d-flex gap-1">
                <input type="text" placeholder="Get Files of Address" className="address ip-field"></input>
                <button className="btn btn-primary"  onClick={getdata}>Get Files</button>
              </div>
            </div>

            <div class="card-body">{data}</div>
        </div>
    );
}

export default ContentList;