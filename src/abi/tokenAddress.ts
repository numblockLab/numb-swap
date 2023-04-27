import { numbUsdContractAddress } from "./abi-contract";

export interface ITokenChainInfo {
  symbol: string;
  address: string;
  imgUrl: string;
}

export function getEtherTokenSymbol(): string {
  return "NUMB";
}

export const TOKEN_INFOS: { [tokenAddress: string]: ITokenChainInfo } = {
  "0xe11BeA6a30c452a504b5ccC727e77Cf05Cb4997d": {
    address: "0xe11BeA6a30c452a504b5ccC727e77Cf05Cb4997d",
    symbol: "NUMB",
    imgUrl: "image2vector_2.svg",
  },
  [numbUsdContractAddress]: { address: numbUsdContractAddress, symbol: "USDT", imgUrl: "usdt-logo.svg" },
};
