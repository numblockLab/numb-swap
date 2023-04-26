export interface ISelectedToken {
  symbol: string;
  address: string;
  imgUrl: string;
}

export interface ISwapSelectedValue {
  selectedChainId: number;
  selectedToken: ISelectedToken | null;
  tokenSwapValue: number | string;
}

export interface ISwapModel {
  source: ISwapSelectedValue;
  destination: ISwapSelectedValue;
}
