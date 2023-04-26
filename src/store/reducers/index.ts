import spinnerReducer, { initialSpinnerState } from "./spinner-reducer";

import { combineReducers } from "@reduxjs/toolkit";
import walletReducer, { initialWalletState } from "./wallet-reducer";
import swapReducer, { initialSwapState } from "./swap-reducer";

const rootReducer = combineReducers({
  spinner: spinnerReducer,
  wallet: walletReducer,
  swap: swapReducer,
});

export default rootReducer;
export const initialState: ReturnType<typeof rootReducer> = {
  spinner: initialSpinnerState,
  wallet: initialWalletState,
  swap: initialSwapState,
};
