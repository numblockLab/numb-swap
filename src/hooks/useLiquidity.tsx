import { TOKEN_SWAP_CONTRACT_ABI } from "@abi/abi-contract";
import { ERC20Interface } from "@usedapp/core";
import { BigNumber, BigNumberish, Contract, Signer, utils } from "ethers";

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
