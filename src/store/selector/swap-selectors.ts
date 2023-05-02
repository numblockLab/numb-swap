import { ISelectedToken, ISwapModel, ISwapSelectedValue } from "@store/models/swap-model";
import { RootStateType } from "../types";

export const getSwapSelector = (state: RootStateType): ISwapModel => state.swap;
export const getSourceSelector = (state: RootStateType): ISwapSelectedValue => state.swap.source;
export const getSourceTokenSelector = (state: RootStateType): ISelectedToken | null => state.swap.source.selectedToken;
export const getSourceTokenValueSelector = (state: RootStateType): string | number => state.swap.source.tokenSwapValue;

export const getDesSelector = (state: RootStateType): ISwapSelectedValue => state.swap.destination;
export const getDesTokenSelector = (state: RootStateType): ISelectedToken | null =>
  state.swap.destination.selectedToken;
export const getDesTokenValueSelector = (state: RootStateType): string | number =>
  state.swap.destination.tokenSwapValue;
export const getEstimateValueSelector = (state: RootStateType): string | number => state.swap.estimateValue;
