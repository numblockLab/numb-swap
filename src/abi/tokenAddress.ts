import { numbUsdContractAddress } from "./abi-contract";

export interface ITokenChainInfo {
  symbol: string;
  address: string;
  imgUrl: string;
}

export function getEtherTokenSymbol(): string {
  return "NUMB";
}
export const NUMB_ADDRESS = "0x4078cB020cf693156E4A51DA0432d5d262dd6882";

export const ALL_TOKEN_INFOS: { [tokenAddress: string]: ITokenChainInfo } = {
  [NUMB_ADDRESS]: {
    address: NUMB_ADDRESS,
    symbol: "NUMB",
    imgUrl: "image2vector_2.svg",
  },
  [numbUsdContractAddress]: { address: numbUsdContractAddress, symbol: "USDT", imgUrl: "usdt-logo.svg" },
};
