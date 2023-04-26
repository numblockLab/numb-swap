import { CombineAppActionTypes } from "./app-action";
import { CombineSwapActionTypes } from "./swap-action";
import { CombineWalletActionTypes } from "./wallet-action";

export type CombineActionTypes = CombineAppActionTypes | CombineWalletActionTypes | CombineSwapActionTypes;

export * from "./app-action";
export * from "./wallet-action";
export * from "./swap-action";
