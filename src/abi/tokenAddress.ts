export const numbUsdContractAddress = "0x1d3B29a5A9f790f22b57527493d28EF570ef4976";
export const NUMB_ADDRESS = "0x4078cB020cf693156E4A51DA0432d5d262dd6882";
export const FELIX_ADDRESS = "0xf42bb6f056f75a110c6d0b6ae67f9cf048e74d2e";
export interface ITokenChainInfo {
  symbol: string;
  address: string;
  imgUrl: string;
}

export function getEtherTokenSymbol(): string {
  return "NUMB";
}

export const ALL_TOKEN_INFOS: { [tokenAddress: string]: ITokenChainInfo } = {
  [NUMB_ADDRESS]: {
    address: NUMB_ADDRESS,
    symbol: "NUMB",
    imgUrl: "image2vector_2.svg",
  },
  [numbUsdContractAddress]: { address: numbUsdContractAddress, symbol: "USDT", imgUrl: "usdt-logo.svg" },
  [FELIX_ADDRESS]: { address: FELIX_ADDRESS, symbol: "FELIX", imgUrl: "pie_chart.svg" },
};
