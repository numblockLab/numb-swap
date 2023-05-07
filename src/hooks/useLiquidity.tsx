import { BigNumberish, utils } from "ethers";

export const calculateCD = async (
  _addEther = "0",
  etherBalanceContract: BigNumberish,
  cdTokenReserve: BigNumberish,
) => {
  const _addEtherAmountWei = utils.parseEther(_addEther);
  const cryptoDevTokenAmount = _addEtherAmountWei.mul(cdTokenReserve).div(etherBalanceContract);
  return cryptoDevTokenAmount;
};
