import { createReducer } from "@reduxjs/toolkit";
import { setDefaultWallet, updateWalletAction } from "@store/actions/wallet-action";
import { IWalletModel } from "@store/models/wallet-model";

export const initialWalletState: IWalletModel = {
  walletType: "Meta mask",
  currentChainId: 0,
};

const walletReducer = createReducer(initialWalletState as IWalletModel, (builder) => {
  builder.addCase(updateWalletAction, (state, action) => {
    return { ...state, ...action.payload };
  });
  builder.addCase(setDefaultWallet, () => {
    return initialWalletState;
  });
});

export default walletReducer;
