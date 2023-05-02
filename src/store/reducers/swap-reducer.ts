import { createReducer } from "@reduxjs/toolkit";
import { ISwapModel, ISwapSelectedValue } from "@store/models/swap-model";
import {
  putDesTokenSwapValueAction,
  putSourceTokenSwapValueAction,
  selectDesTokenAction,
  selectSourceTokenAction,
  setDefaultSwap,
  switchSourceDes,
  updateSwapAction,
} from "../actions/swap-action";
import { ITokenSwapMappingItem, TOKEN_SWAP_MAPPING } from "@abi/tokenAddress";
import { find } from "lodash";
import { formatEtherFixed5 } from "@utils/text-format";

const defaultInput: ISwapSelectedValue = {
  selectedToken: null,
  tokenSwapValue: "",
};
export const initialSwapState: ISwapModel = {
  source: defaultInput,
  destination: defaultInput,
  swapContractAddress: null,
  estimateValue: "",
};

const swapReducer = createReducer(initialSwapState as ISwapModel, (builder) => {
  builder.addCase(updateSwapAction, (state, action) => {
    return { ...state, ...action.payload };
  });
  builder.addCase(setDefaultSwap, () => {
    return initialSwapState;
  });

  builder.addCase(selectSourceTokenAction, (state, action) => {
    state.source.selectedToken = action.payload;
    state.destination.selectedToken = null;
    state.swapContractAddress = null;
    return state;
  });
  builder.addCase(putSourceTokenSwapValueAction, (state, action) => {
    state.source.tokenSwapValue = action.payload;
    return state;
  });

  builder.addCase(selectDesTokenAction, (state, action) => {
    state.destination.selectedToken = action.payload;
    if (state.source.selectedToken) {
      const tokenMapping = TOKEN_SWAP_MAPPING[state.source.selectedToken.address];
      const contractItem = find(tokenMapping, (e: ITokenSwapMappingItem) => {
        return e.address === action.payload.address;
      });
      if (contractItem) {
        state.swapContractAddress = contractItem.swapContract;
      }
    }
    return state;
  });
  builder.addCase(putDesTokenSwapValueAction, (state, action) => {
    state.destination.tokenSwapValue = action.payload;
    return state;
  });
  builder.addCase(switchSourceDes, (state) => {
    const tmp = { ...state.source };
    state.source = state.destination;
    state.source.tokenSwapValue = formatEtherFixed5(state.estimateValue);
    state.estimateValue = "";
    state.destination = tmp;
    return state;
  });
});

export default swapReducer;
