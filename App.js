import React, { useState } from "react";
import { useEthers, useEtherBalance } from '@usedapp/core'
import Web3 from "web3";
import { ethers } from "ethers";


function App() {
  // usetstate for storing and retrieving wallet details
  const [data, setdata] = useState({
    address: "",
    Balance: 0,
  });
  const [nftBalance,setBalance] = useState(0);
  
  // Button handler button for handling a
  // request event for metamask
  const btnhandler = () => {
  
    // Asking if metamask is already present or not
    if (window.ethereum) {
  
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };
  
  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = (address) => {
  
    // Requesting balance method
    window.ethereum
      .request({ 
        method: "eth_getBalance", 
        params: [address, "latest"] 
      })
      .then((balance) => {
        // Setting balance
        setdata({...data,
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };
  
  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({...data, 
      address: account,
    });
  
    // Setting a balance
    getbalance(account);
  };
  const [text, setText] = useState("");

  function ravi() {
    console.log("I got clicked");
  }

  function capture(event) {
    console.log(text);
    setText(event.target.value);
  }
  const { activateBrowserWallet, account } = useEthers();
  function handleWalletConnect() {
    activateBrowserWallet();
  }

  const showText = (t) => {
    console.log(`text is ${t} `)
    setText("");
  }
  
  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
    return provider;
  };

 const addr=data.address;
 const balance= data.Balance;
 
const contract_addr='0xF2701D30616607141705679f6c8fb0d537CcEa32';
const contract_abi=[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "AuctionEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "HighestBidIncrease",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_author",
				"type": "string"
			}
		],
		"name": "addmyBook",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "auctionEnd",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "auctionEndtime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "beneficiary",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "get",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "highestBid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "highestBidder",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_biddingTime",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "_beneficiary",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_nftdata",
				"type": "string"
			}
		],
		"name": "initiatebid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "myBooks",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "author",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "myMap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "pendingReturns",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "remove",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_i",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
console.log(addr+"hello");
console.log(balance);
// window.contract = new window.web3.eth.Contract(
//   contract_abi,
//   contract_addr
// );
// window.contract.methods
// .highestBid(
//   data.account[0],
//   window.location.href.split("/").pop(),
// ).call().then(async (res)=>{
//   console.log("balance===",res);
//   if(res)
//   {
//     setBalance(res);
//     console.log("nftBalance===",nftBalance);
//   }
  
// });
  
  return (
    
    <div className="App">
    {/* Calling all values which we 
     have stored in usestate */}

        <strong>Address: </strong>
        {addr}<br></br><br></br><br></br>
          <strong>Balance: </strong>
          {balance}<br></br><br></br><br></br>
        <button onClick={btnhandler} variant="primary">
          Metamask login
        </button>
      <button onClick={handleWalletConnect}>Connect to a wallet</button>
      <br></br> <br></br> <br></br>
      <input value={text} type="text" placeholder='enter amount' onChange={capture}/> <br></br> <br></br>
      <button onClick={() => showText(text)}>place bid</button> <br></br> 
      <button onClick={ravi}>withdraw</button>
    </div>
  );
}

export default App;




/*import React, { useState , useEffect } from 'react';
import { ethers }from 'ethers';
import {contract_abi , contract_address} from './variables.js';
import FileBase64 from "react-file-base64";

function Appy() {
  var Web3=require('web3');
  //rinkby testnet url
  var url= 'https://rinkeby.infura.io/v3/77fba0c0693e434caf74f5ba22d7891b' ; 
  var web3 = new Web3(url);
  var address= contract_address;
  var balance=0;
web3.eth.getBalance(address, (err,bal) =>{balance = bal})
  console.log(balance);
//alert(balance);
 //alert(web3.utils.fromWei(balance,'ether'));

  

  console.log(Web3.version+" console");
  //alert(Web3.version+" web3.version");
  return (
    <div>{Web3.utils}</div>
  );
 
// FileBase64 <- use as component

<div>{FileBase64 
type="file"
    multiple={false} 
    onDone={} 
</div>

} 
export default Appy ;*/


