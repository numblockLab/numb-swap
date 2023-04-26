import { Contract } from "ethers";

import { useContractFunction } from "@usedapp/core";

export default function useBridgeContract(contract: Contract) {
  const { state, send } = useContractFunction(contract, "transfer", {});
  return { state, send };
}
