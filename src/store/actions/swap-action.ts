import { createAction } from "@reduxjs/toolkit";
import { ISelectedToken, ISwapModel } from "@store/models/swap-model";

export type IUpdateSwapPayload = Partial<ISwapModel>;

export const updateSwapAction = createAction<IUpdateSwapPayload>("swap/UPDATE");

export const setDefaultSwap = createAction<undefined>("swap/DEFAULT");

export const selectSourceChainIdAction = createAction<number>("swap/SELECT_SOURCE_CHAIN_ID");

export const selectSourceTokenAction = createAction<ISelectedToken>("swap/SELECT_SOURCE_TOKEN");

export const putSourceTokenSwapValueAction = createAction<number | string>("swap/SET_SOURCE_TOKEN_VALUE");

export const selectDesChainIdAction = createAction<number>("swap/SELECT_DES_CHAIN_ID");

export const selectDesTokenAction = createAction<ISelectedToken>("swap/SELECT_DES_TOKEN");

export const putDesTokenSwapValueAction = createAction<number | string>("swap/SET_DES_TOKEN_VALUE");

export const switchSourceDes = createAction<undefined>("swap/SWITCH_SOURCE_DES");

export type CombineSwapActionTypes =
  | ReturnType<typeof updateSwapAction>
  | ReturnType<typeof setDefaultSwap>
  | ReturnType<typeof selectSourceChainIdAction>
  | ReturnType<typeof selectSourceTokenAction>
  | ReturnType<typeof putSourceTokenSwapValueAction>
  | ReturnType<typeof selectDesChainIdAction>
  | ReturnType<typeof selectDesTokenAction>
  | ReturnType<typeof putDesTokenSwapValueAction>
  | ReturnType<typeof switchSourceDes>;
