export interface ISelectedToken {
  symbol: string;
  address: string;
  imgUrl: string;
  isEther: boolean;
}

export interface ISwapSelectedValue {
  selectedToken: ISelectedToken | null;
  tokenSwapValue: number | string;
}

export interface ISwapModel {
  source: ISwapSelectedValue;
  destination: ISwapSelectedValue;
  swapContractAddress: string | null;
  estimateValue: number | string;
}
