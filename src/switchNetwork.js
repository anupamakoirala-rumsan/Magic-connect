/**
 * Configure Polygon Connection
 */

 import Web3 from 'web3';
 import { Magic } from 'magic-sdk';
//  import { ConnectExtension } from '@magic-ext/connect';

 const polygonNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    chainId: 80001,
  };
  
  export const magicMatic = new Magic(
    process.env.REACT_APP_MAGIC_KEY,
    { network: polygonNodeOptions }
  );
  magicMatic.network = 'matic';
  
  export const maticWeb3 = new Web3(magicMatic.rpcProvider);
  
  /**
   * Configure Ropsten Connection
   */
  const ropstenNodeOptions = {
    rpcUrl: process.env.REACT_APP_ROPSTEN_RPC,
    chainId: 3,
  };
  
  export const magicEthereum = new Magic(
    process.env.REACT_APP_MAGIC_KEY,
    { network: ropstenNodeOptions }
  );
  magicEthereum.network = 'ethereum';
  
  export const ethWeb3 = new Web3(magicEthereum.rpcProvider);