import { RootStateType } from "../types";

export const getCurrentChainSelector = (state: RootStateType): number => state.wallet.currentChainId;
