import { Contract, ethers } from "ethers";
import { BSC_CHAIN_ID, NUMB_CHAIN_ID } from "./constants";
import {
  bscTestNetBrigdeContractAbi,
  bscUsdContractAddress,
  numbBrigdeContractAbi,
  numbUsdContractAddress,
} from "./abi-contract";

export const USD_ADDRESS: { [chainid: number]: { symbol: string; address: string; imgUrl: string } } = {
  [NUMB_CHAIN_ID]: { address: numbUsdContractAddress, symbol: "USDT", imgUrl: "usdt-logo.svg" },
  [BSC_CHAIN_ID]: { address: bscUsdContractAddress, symbol: "BUSDT", imgUrl: "usdt-logo.svg" },
};

export const ETHER_TOKEN_SYMBOL: { [chainid: number]: { symbol: string } } = {
  [NUMB_CHAIN_ID]: { symbol: "NUMB" },
  [BSC_CHAIN_ID]: { symbol: "tBNB" },
};

export function getEtherTokenSymbol(chainId: number): string {
  return ETHER_TOKEN_SYMBOL[chainId] ? ETHER_TOKEN_SYMBOL[chainId].symbol : "unkown";
}

export function getUsdAddress(chainId: number) {
  return USD_ADDRESS[chainId] ? USD_ADDRESS[chainId] : null;
}

export const BRIDGE_WALLET_ADDRESS = "0x44aDefbc49c2902e39B2AB309016Da6368e6b6Df";

const figBrigdeUsdContractInterface = new ethers.utils.Interface(numbBrigdeContractAbi);
const figBrigdeUsdContract = new Contract(numbUsdContractAddress, figBrigdeUsdContractInterface);

const bscBrigdeUsdContractInterface = new ethers.utils.Interface(bscTestNetBrigdeContractAbi);
const bscBrigdeUsdContract = new Contract(bscUsdContractAddress, bscBrigdeUsdContractInterface);
export interface ITokenChainInfo {
  symbol: string;
  address: string;
  imgUrl: string;
}

export const TOKEN_CHAIN_INFO: { [chainId: number]: { [tokenAddress: string]: ITokenChainInfo } } = {
  [NUMB_CHAIN_ID]: {
    [USD_ADDRESS[NUMB_CHAIN_ID].address]: { ...USD_ADDRESS[NUMB_CHAIN_ID] },
  },
  [BSC_CHAIN_ID]: {
    [USD_ADDRESS[BSC_CHAIN_ID].address]: { ...USD_ADDRESS[BSC_CHAIN_ID] },
  },
};

export const TOKEN_CHAIN_CONTRACT: { [chainId: number]: { [tokenAddress: string]: { contract: Contract } } } = {
  [NUMB_CHAIN_ID]: {
    [USD_ADDRESS[NUMB_CHAIN_ID].address]: { contract: figBrigdeUsdContract },
  },
  [BSC_CHAIN_ID]: {
    [USD_ADDRESS[BSC_CHAIN_ID].address]: { contract: bscBrigdeUsdContract },
  },
};
