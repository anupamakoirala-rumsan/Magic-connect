import './App.css';
import React ,{useState} from 'react';
import Web3 from 'web3';
import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';
import {magicEthereum,magicMatic,ethWeb3,maticWeb3} from './switchNetwork';
function App() {

  const[account,setAccount] = useState(null)
  // const[magic,setMagic] = useState();
  // const[web3,setWeb3] =useState();
  const magic_api_key = process.env.REACT_APP_MAGIC_KEY;
  console.log(magic_api_key)

  const customNetwork ={
    rpcUrl: 'https://rpc-mainnet.maticvigil.com/',
  chainId: 137,
  }

  // const handleChangeNetwork = e=>{
  //   e.target.value === 'etherum'? setMagic(magicEthereum) :setMagic(magicMatic);
  //   e.target.value === 'etherum'? setWeb3(ethWeb3) : setWeb3(maticWeb3)
  // }

  const magic = new Magic(magic_api_key,{
    extensions:[new ConnectExtension()],
    network:customNetwork
    // rpcUrl : '"https://matic-mumbai.chainstacklabs.com',
    // chainId : 80001
  //   rpcUrl: 'https://rpc-mainnet.maticvigil.com/',
  // chainId: 137,
  });

  console.log(magic)
  const web3 = new Web3(magic.rpcProvider);

web3?.eth.getChainId().then((data)=>{
  console.log(data)
})


  console.log({magic})
// web3.eth.getAccounts().then(accounts=> console.log(accounts[0]))

const login = async()=>{
  console.log("login")
  web3?.eth.getAccounts().then((accounts)=>{
    console.log(accounts[0])
    setAccount(accounts?.[0]);
  }).catch((error)=>{
    console.log(error)
  })
}

const signMessage = async ()=>{
  // const signer = await web3.eth.getAccounts()[0];
 try{ console.log(account)
  const message = await web3.eth.personal.sign("Message to be signed", account,"").catch((err)=>console.log(err));
  console.log(message)}
  catch(err){
    console.log(err)
  }
}

const showWallet = async()=>{
  magic.connect.showWallet().catch((err)=>console.log(err));

}

  // magic.connect.supportedSdkMethods(); 
  //  console.log(web3)
  return (
    <div className="App">
      <header className="App-header">
        Magic connect
        {!account &&(
          <button onClick ={login} >
            Sign In
          </button>
        )}
{/* 
<div className="info">
    <select name="network" onChange={e => handleChangeNetwork(e)}>
      <option value="ethereum">Ethereum (Ropsten Testnet)</option>
      <option value="matic">Matic (Mumbai Testnet)</option>
    </select>
  </div> */}

        {account &&(
          <>
          <button onClick ={signMessage}>
            Sign Message
          </button>
          <button onClick={showWallet}>
          Show Wallet
          </button>

          </>

        )}
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
