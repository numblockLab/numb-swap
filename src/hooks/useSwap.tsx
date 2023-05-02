/* eslint-disable operator-linebreak */
import { TOKEN_SWAP_CONTRACT_ABI } from "@abi/abi-contract";
import { Provider } from "@ethersproject/abstract-provider";
import { formatEther } from "@ethersproject/units";
import { ERC20Interface, Falsy, useCall, useCalls } from "@usedapp/core";
import { BigNumber, Contract, Signer } from "ethers";

export function useTokenReserve(swapContractAddress: string | Falsy) {
  const { value, error } =
    useCall(
      swapContractAddress && {
        contract: new Contract(swapContractAddress, TOKEN_SWAP_CONTRACT_ABI), // instance of called contract
        method: "getReserve", // Method to be called
        args: [], // Method arguments - address to be checked for balance
      },
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}

export function useTokenBalanceAndReserve(swapContractAddress: string | Falsy) {
  const calls = swapContractAddress
    ? [
        // {
        //   contract: new Contract(swapContractAddress, TOKEN_SWAP_CONTRACT_ABI), // instance of called contract
        //   method: "balanceOf", // Method to be called
        //   args: [swapContractAddress], // Method arguments - address to be checked for balance
        // },
        {
          contract: new Contract(swapContractAddress, TOKEN_SWAP_CONTRACT_ABI), // instance of called contract
          method: "getReserve", // Method to be called
          args: [], // Method arguments - address to be checked for balance
        },
      ]
    : [];
  const results = useCalls(calls) ?? [];
  results.forEach((result, idx) => {
    if (result && result.error) {
      console.error(
        `Error encountered calling 'balanceOf||getReserve' on ${calls[idx]?.contract.address}: ${result.error.message}`,
      );
    }
  });
  return results.map((result) => result?.value?.[0]);
}

export const getAmountOfTokensReceivedFromSwap = async (
  _swapContractAddress: string,
  _swapAmountWei: string,
  provider: Provider,
  ethSelected: boolean,
  ethBalance: string,
  reservedCD: string,
  isFormatted: boolean,
) => {
  // Create a new instance of the exchange contract
  const exchangeContract = new Contract(_swapContractAddress, TOKEN_SWAP_CONTRACT_ABI, provider);
  let amountOfTokens = "";
  if (ethSelected) {
    amountOfTokens = await exchangeContract.getAmountOfTokens(_swapAmountWei, ethBalance, reservedCD);
  } else {
    amountOfTokens = await exchangeContract.getAmountOfTokens(_swapAmountWei, reservedCD, ethBalance);
  }
  if (isFormatted) {
    const srtVal = formatEther(amountOfTokens || 0);
    return Number(srtVal).toFixed(5);
  }
  return amountOfTokens.toString();
};

export const swapTokens = async (
  _swapContractAddress: string,
  _tokenAddress: string,
  signer: Provider | Signer,
  swapAmountWei: BigNumber,
  tokenToBeReceivedAfterSwap: BigNumber,
  ethSelected: boolean,
) => {
  // Create a new instance of the exchange contract
  const exchangeContract = new Contract(_swapContractAddress, TOKEN_SWAP_CONTRACT_ABI, signer);
  // const gas = await exchangeContract.estimateGas("numbToToken");
  // const gasPrice = await signer.getGasPrice();
  let tx;
  // If Eth is selected call the `numbToToken` function else
  // call the `tokenToNumb` function from the contract
  // As you can see you need to pass the `swapAmount` as a value to the function because
  // it is the ether we are paying to the contract, instead of a value we are passing to the function
  if (ethSelected) {
    tx = await exchangeContract.numbToToken(tokenToBeReceivedAfterSwap, {
      value: swapAmountWei,
    });
  } else {
    // User has to approve `swapAmountWei` for the contract because `Crypto Dev` token
    // is an ERC20
    const tokenContract = new Contract(_tokenAddress, ERC20Interface, signer);
    tx = await tokenContract.approve(_swapContractAddress, swapAmountWei.toString());
    await tx.wait();
    // call tokenToNumb function which would take in `swapAmountWei` of `Crypto Dev` tokens and would
    // send back `tokenToBeReceivedAfterSwap` amount of `Eth` to the user
    tx = await exchangeContract.tokenToNumb(swapAmountWei, tokenToBeReceivedAfterSwap);
  }

  await tx.wait();
  return tx;
};
