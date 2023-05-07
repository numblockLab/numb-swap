import { TOKEN_SWAP_CONTRACT_ABI } from "@abi/abi-contract";
import { Provider } from "@ethersproject/abstract-provider";
import { ERC20Interface } from "@usedapp/core";
import { BigNumber, Contract, Signer, utils } from "ethers";
/**
 * getEtherBalance: Retrieves the ether balance of the user or the contract
 */
export const getNumbBalance = async (
  provider: Provider | Signer,
  _swapContractAddress: string,
  address: string,
  contract = false,
) => {
  try {
    // If the caller has set the `contract` boolean to true, retrieve the balance of
    // ether in the `exchange contract`, if it is set to false, retrieve the balance
    // of the user's address
    if (contract) {
      const balance = await provider.getBalance(_swapContractAddress);
      return balance;
    }
    const balance = await provider.getBalance(address);
    return balance;
  } catch (err) {
    console.error(err);
    return utils.parseEther("0");
  }
};

/**
 * getCDTokensBalance: Retrieves the Crypto Dev tokens in the account
 * of the provided `address`
 */
export const getCDTokensBalance = async (
  provider: Provider | Signer,
  _tokenAddress: string,
  address: string,
): Promise<BigNumber> => {
  try {
    const tokenContract = new Contract(_tokenAddress, ERC20Interface, provider);
    const balanceOfCryptoDevTokens = await tokenContract.balanceOf(address);
    return balanceOfCryptoDevTokens;
  } catch (err) {
    console.error(err);
    return utils.parseEther("0");
  }
};

/**
 * getLPTokensBalance: Retrieves the amount of LP tokens in the account
 * of the provided `address`
 */
export const getLPTokensBalance = async (
  provider: Provider | Signer,
  _swapContractAddress: string,
  address: string | null | undefined,
) => {
  try {
    if (address) {
      const exchangeContract = new Contract(_swapContractAddress, ERC20Interface, provider);
      const balanceOfLPTokens = await exchangeContract.balanceOf(address);
      return balanceOfLPTokens;
    }
    return utils.parseEther("0");
  } catch (err) {
    console.error(err);
    return utils.parseEther("0");
  }
};

/**
 * getReserveOfCDTokens: Retrieves the amount of CD tokens in the
 * exchange contract address
 */
export const getReserveOfCDTokens = async (provider: Provider | Signer, _swapContractAddress: string) => {
  try {
    const exchangeContract = new Contract(_swapContractAddress, TOKEN_SWAP_CONTRACT_ABI, provider);
    const reserve = await exchangeContract.getReserve();
    return reserve;
  } catch (err) {
    console.error(err);
    return utils.parseEther("0");
  }
};
