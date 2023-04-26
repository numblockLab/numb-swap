import { createAction } from "@reduxjs/toolkit";
import { IWalletModel } from "@store/models/wallet-model";

export type IUpdateWalletPayload = Partial<IWalletModel>;

export const updateWalletAction = createAction<IUpdateWalletPayload>("wallet/UPDATE");

export const setDefaultWallet = createAction<undefined>("wallet/DEFAULT");

export type CombineWalletActionTypes = ReturnType<typeof updateWalletAction> | ReturnType<typeof setDefaultWallet>;
