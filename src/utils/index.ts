import { BSC_CHAIN_ID, BSC_TEST_NET, NUMB_CHAIN_COST, NUMB_CHAIN_ID } from "@abi/constants";
import { ITokenChainInfo, TOKEN_INFOS } from "@abi/tokenAddress";
import { get, setWith } from "lodash";

export function checkExistsItemIntree(tree: any, itemKey: string | number): boolean {
  if (tree) {
    const o = get(tree, itemKey);
    if (o) {
      return true;
    }
  }
  return false;
}

interface ITableFilter {
  column: { field: string };
  operator: string;
  value: string;
}
export function getFilterForRest(arr: ITableFilter[]): { [x: string]: any } {
  const reduceObj = arr.reduce((obj, cur) => {
    const tmp = {};
    let item: any = setWith(tmp, cur.column.field, `${cur.value}%`);
    if (cur.value === "unchecked" || cur.value === "checked") {
      item = { [cur.column.field]: cur.value === "checked" };
    }
    return { ...obj, ...item };
  }, {});
  return reduceObj;
}

export interface IChainIconInfo {
  iconPath: string;
  name: string;
  chainId: number;
}
export const CHAIN_ICON_INFO: { [chainid: number]: IChainIconInfo } = {
  [NUMB_CHAIN_ID]: { iconPath: "image2vector_2.svg", name: NUMB_CHAIN_COST.chainName, chainId: NUMB_CHAIN_ID },
  [BSC_CHAIN_ID]: { iconPath: "bsc-logo.svg", name: BSC_TEST_NET.chainName, chainId: BSC_CHAIN_ID },
};

export function getChainIconInfo(currentChainId: number): IChainIconInfo {
  const result = CHAIN_ICON_INFO[currentChainId]
    ? CHAIN_ICON_INFO[currentChainId]
    : {
        iconPath: "ethereum-logo.svg",
        name: "unknown",
        chainId: currentChainId,
      };
  return result;
}
export function getTokenListByChain(currentChainId: number): ITokenChainInfo[] {
  const result = TOKEN_INFOS[currentChainId] ? Object.values(TOKEN_INFOS[currentChainId]) : [];
  return result;
}

export * from "./notifyToast";
export * from "./text-format";
