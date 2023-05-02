export const NUMB_CHAIN_ID = 100;
export const NUMB_CHAIN_COST = {
  chainId: NUMB_CHAIN_ID,
  chainName: "NumBlock",
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: "0xd722174C25A980dA3c25Bd5780ADeA578dF5237A",
  getExplorerAddressLink: (address: string) => `https://testnet.numblock.org/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://testnet.numblock.org/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: "https://rpc-testnet.numblock.org",
  blockExplorerUrl: "https://testnet.numblock.org",
  nativeCurrency: {
    name: "NUMB",
    symbol: "NUMB",
    decimals: 18,
  },
};
export const NUMB_FAUCET_LINK = "https://faucet-testnet.numblock.org/";
