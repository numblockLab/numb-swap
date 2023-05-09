import { TOKEN_SWAP_CONTRACT_ABI } from "@abi/abi-contract";
import { ERC20Interface } from "@usedapp/core";
import { Provider } from "@ethersproject/abstract-provider";
import { BigNumber, BigNumberish, Contract, Signer, utils } from "ethers";
import { getNumbBalance, getReserveOfCDTokens } from "./getAmounts";

export const calculateCD = (_addEther = "0", etherBalanceContract: BigNumberish, cdTokenReserve: BigNumberish) => {
  const _addEtherAmountWei = utils.parseEther(_addEther);
  const cryptoDevTokenAmount = _addEtherAmountWei.mul(cdTokenReserve).div(etherBalanceContract);
  return cryptoDevTokenAmount;
};

export const addLiquidity = async (
  _swapContractAddress: string,
  _tokenAddress: string,
  signer: Signer,
  addCDAmountWei: string | BigNumber,
  addEtherAmountWei: string | BigNumber,
) => {
  try {
    // create a new instance of the token contract
    const tokenContract = new Contract(_tokenAddress, ERC20Interface, signer);
    // create a new instance of the exchange contract
    const exchangeContract = new Contract(_swapContractAddress, TOKEN_SWAP_CONTRACT_ABI, signer);
    // Because CD tokens are an ERC20, user would need to give the contract allowance
    // to take the required number CD tokens out of his contract
    let tx = await tokenContract.approve(_swapContractAddress, addCDAmountWei.toString());
    await tx.wait();
    // After the contract has the approval, add the ether and cd tokens in the liquidity
    tx = await exchangeContract.addLiquidity(addCDAmountWei, {
      value: addEtherAmountWei,
    });

    await tx.wait();
    return tx;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const removeLiquidity = async (
  signer: Signer,
  _swapContractAddress: string,
  removeLPTokensWei: string | BigNumber,
) => {
  // Create a new instance of the exchange contract
  const exchangeContract = new Contract(_swapContractAddress, TOKEN_SWAP_CONTRACT_ABI, signer);
  const tx = await exchangeContract.removeLiquidity(removeLPTokensWei);
  await tx.wait();
  return tx;
};

/**
 * getTokensAfterRemove: Calculates the amount of `Eth` and `CD` tokens
 * that would be returned back to user after he removes `removeLPTokenWei` amount
 * of LP tokens from the contract
 */
export const getTokensAfterRemove = async (
  provider: Provider | Signer,
  _swapContractAddress: string,
  removeLPTokenWei: BigNumber,
  _ethBalance: BigNumber,
  cryptoDevTokenReserve: BigNumber,
) => {
  try {
    // Create a new instance of the exchange contract
    const exchangeContract = new Contract(_swapContractAddress, TOKEN_SWAP_CONTRACT_ABI, provider);
    // Get the total supply of `Crypto Dev` LP tokens
    const _totalSupply = await exchangeContract.totalSupply();
    // Here we are using the BigNumber methods of multiplication and division
    // The amount of Eth that would be sent back to the user after he withdraws the LP token
    // is calculated based on a ratio,
    // Ratio is -> (amount of Eth that would be sent back to the user / Eth reserve) = (LP tokens withdrawn) / (total supply of LP tokens)
    // By some maths we get -> (amount of Eth that would be sent back to the user) = (Eth Reserve * LP tokens withdrawn) / (total supply of LP tokens)
    // Similarly we also maintain a ratio for the `CD` tokens, so here in our case
    // Ratio is -> (amount of CD tokens sent back to the user / CD Token reserve) = (LP tokens withdrawn) / (total supply of LP tokens)
    // Then (amount of CD tokens sent back to the user) = (CD token reserve * LP tokens withdrawn) / (total supply of LP tokens)
    const _removeEther = _ethBalance.mul(removeLPTokenWei).div(_totalSupply);
    const _removeCD = cryptoDevTokenReserve.mul(removeLPTokenWei).div(_totalSupply);
    return {
      _removeEther,
      _removeCD,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const _getTokensAfterRemove = async (
  provider: Provider | Signer,
  _swapContractAddress: string,
  _removeLPTokens: string,
) => {
  try {
    // Convert the LP tokens entered by the user to a BigNumber
    const removeLPTokenWei = utils.parseEther(_removeLPTokens);
    // Get the Eth reserves within the exchange contract
    const _ethBalance = await getNumbBalance(provider, _swapContractAddress, "", true);
    // get the crypto dev token reserves from the contract
    const cryptoDevTokenReserve = await getReserveOfCDTokens(provider, _swapContractAddress);
    // call the getTokensAfterRemove from the utils folder
    const { _removeEther, _removeCD } = await getTokensAfterRemove(
      provider,
      _swapContractAddress,
      removeLPTokenWei,
      _ethBalance,
      cryptoDevTokenReserve,
    );
    return { _removeEther, _removeCD };
  } catch (err) {
    console.error(err);
    return {
      _removeEther: utils.parseEther("0"),
      _removeCD: utils.parseEther("0"),
    };
  }
};
