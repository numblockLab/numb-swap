import { createReducer } from "@reduxjs/toolkit";
import {
  putDesTokenSwapValueAction,
  putSourceTokenSwapValueAction,
  selectDesChainIdAction,
  selectDesTokenAction,
  selectSourceChainIdAction,
  selectSourceTokenAction,
  setDefaultSwap,
  switchSourceDes,
  updateSwapAction,
} from "../actions/swap-action";
import { ISwapModel, ISwapSelectedValue } from "@store/models/swap-model";

const defaultInput: ISwapSelectedValue = {
  selectedToken: null,
  tokenSwapValue: "",
};
export const initialSwapState: ISwapModel = {
  source: defaultInput,
  destination: defaultInput,
};

const swapReducer = createReducer(initialSwapState as ISwapModel, (builder) => {
  builder.addCase(updateSwapAction, (state, action) => {
    return { ...state, ...action.payload };
  });
  builder.addCase(setDefaultSwap, () => {
    return initialSwapState;
  });
  builder.addCase(selectSourceChainIdAction, (state, action) => {
    state.source.selectedToken = null;
    return state;
  });
  builder.addCase(selectSourceTokenAction, (state, action) => {
    state.source.selectedToken = action.payload;
    return state;
  });
  builder.addCase(putSourceTokenSwapValueAction, (state, action) => {
    state.source.tokenSwapValue = action.payload;
    return state;
  });
  builder.addCase(selectDesChainIdAction, (state, action) => {
    state.destination.selectedToken = null;
    return state;
  });
  builder.addCase(selectDesTokenAction, (state, action) => {
    state.destination.selectedToken = action.payload;
    return state;
  });
  builder.addCase(putDesTokenSwapValueAction, (state, action) => {
    state.destination.tokenSwapValue = action.payload;
    return state;
  });
  builder.addCase(switchSourceDes, (state) => {
    const tmp = { ...state.source };
    state.source = state.destination;
    state.destination = tmp;
    return state;
  });
});

export default swapReducer;
