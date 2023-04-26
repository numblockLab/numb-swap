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
export const BSC_CHAIN_ID = 97;
export const BSC_TEST_NET = {
  chainId: BSC_CHAIN_ID,
  chainName: "BSC Testnet",
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: "0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C",
  getExplorerAddressLink: (address: string) => `https://testnet.bscscan.com/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://testnet.bscscan.com/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: "https://data-seed-prebsc-2-s3.binance.org:8545/",
  blockExplorerUrl: "https://testnet.bscscan.io",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
};
export const NUMB_FAUCET_LINK = "https://faucet-testnet.numblock.org/";
export const BNB_FAUCET_LINK = "https://testnet.bnbchain.org/faucet-smart";
