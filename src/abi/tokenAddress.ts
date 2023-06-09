export const USDT_ADDRESS = "0x1d3B29a5A9f790f22b57527493d28EF570ef4976";
export const NUMB_ADDRESS = "0x4078cB020cf693156E4A51DA0432d5d262dd6882";
export const SIM_ADDRESS = "0xE67bC1B92e7e9A4080B28248b1954CAFc0A64eeb";
export const BAT_ADDRESS = "0xf8585Ab758701BED870e5E0dfb836C40498D459d";

export const SIM_SWAP_ADDRESS = "0xC47c86fbe7Dd74f27e45afEc3D77696282469A10";
export const USDT_SWAP_ADDRESS = "0x48729ADf1411aA0373f2974B11841F139d896DF5";
export const BAT_SWAP_ADDRESS = "0x6dBc45eA5fBd99F69098d7C64370719C99f9359f";
export interface ITokenChainInfo {
  symbol: string;
  address: string;
  imgUrl: string;
  isEther: boolean;
}

export function getEtherTokenSymbol(): string {
  return "NUMB";
}

export const ALL_TOKEN_INFOS: { [tokenAddress: string]: ITokenChainInfo } = {
  [NUMB_ADDRESS]: {
    address: NUMB_ADDRESS,
    symbol: "NUMB",
    imgUrl: "image2vector_2.svg",
    isEther: true,
  },
  [USDT_ADDRESS]: { address: USDT_ADDRESS, symbol: "USDT", imgUrl: "usdt-logo.svg", isEther: false },
  [SIM_ADDRESS]: { address: SIM_ADDRESS, symbol: "SIM", imgUrl: "pie_chart.svg", isEther: false },
  [BAT_ADDRESS]: { address: BAT_ADDRESS, symbol: "BAT", imgUrl: "pie_chart.svg", isEther: false },
};

export interface ITokenSwapMappingItem extends ITokenChainInfo {
  swapContract: string;
}

export const TOKEN_SWAP_MAPPING: {
  [tokenAddress: string]: ITokenSwapMappingItem[];
} = {
  [NUMB_ADDRESS]: [
    {
      ...ALL_TOKEN_INFOS[USDT_ADDRESS],
      swapContract: USDT_SWAP_ADDRESS,
    },
    {
      ...ALL_TOKEN_INFOS[SIM_ADDRESS],
      swapContract: SIM_SWAP_ADDRESS,
    },
    {
      ...ALL_TOKEN_INFOS[BAT_ADDRESS],
      swapContract: BAT_SWAP_ADDRESS,
    },
  ],
  [USDT_ADDRESS]: [
    {
      ...ALL_TOKEN_INFOS[NUMB_ADDRESS],
      swapContract: USDT_SWAP_ADDRESS,
    },
  ],
  [SIM_ADDRESS]: [
    {
      ...ALL_TOKEN_INFOS[NUMB_ADDRESS],
      swapContract: SIM_SWAP_ADDRESS,
    },
  ],
  [BAT_ADDRESS]: [
    {
      ...ALL_TOKEN_INFOS[NUMB_ADDRESS],
      swapContract: BAT_SWAP_ADDRESS,
    },
  ],
};

export interface ILiquidItem {
  source: ITokenChainInfo;
  des: ITokenChainInfo;
  swapContract: string;
}

export const LIQUIDITY_LIST: ILiquidItem[] = [
  {
    source: ALL_TOKEN_INFOS[NUMB_ADDRESS],
    des: ALL_TOKEN_INFOS[USDT_ADDRESS],
    swapContract: USDT_SWAP_ADDRESS,
  },
  {
    source: ALL_TOKEN_INFOS[NUMB_ADDRESS],
    des: ALL_TOKEN_INFOS[SIM_ADDRESS],
    swapContract: SIM_SWAP_ADDRESS,
  },
  {
    source: ALL_TOKEN_INFOS[NUMB_ADDRESS],
    des: ALL_TOKEN_INFOS[BAT_ADDRESS],
    swapContract: BAT_SWAP_ADDRESS,
  },
];
