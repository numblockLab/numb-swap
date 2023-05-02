import { Config, DEFAULT_SUPPORTED_CHAINS } from "@usedapp/core";

import { NUMB_CHAIN_COST } from "./abi/constants";

export { NUMB_CHAIN_COST };

const configCustomChain: Config = {
  readOnlyChainId: NUMB_CHAIN_COST.chainId,
  networks: [...DEFAULT_SUPPORTED_CHAINS, NUMB_CHAIN_COST],
  readOnlyUrls: {
    [NUMB_CHAIN_COST.chainId]: NUMB_CHAIN_COST.rpcUrl,
  },
};

// IMPORTANT: Fill that object with your own data.

const config = {
  basename: "/",
  defaultPath: "/",
  DEFAULT_TOKEN_ID: 1,
  chainConfig: configCustomChain,
};

export default config;
