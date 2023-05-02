/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { getSwapSelector } from "@store/selector/swap-selectors";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { useEffect, useState } from "react";

import { NUMB_CHAIN_COST } from "@abi/index";
import LoadingButton from "@mui/lab/LoadingButton";
import { ISelectedToken } from "@store/models/swap-model";
import { BigNumber, Signer, utils } from "ethers";
import { notifyMessageError } from "@emiter/AppEmitter";
import { getCDTokensBalance } from "@hooks/getAmounts";
import { swapTokens } from "@hooks/useSwap";

function BtnLoading({ title }: { title: string }) {
  return (
    <LoadingButton
      // color="primary"
      loading
      loadingPosition="center"
      // loadingIndicator={title}
      variant="outlined"
      fullWidth
    >
      {title}
    </LoadingButton>
  );
}

function BtnSubmitDisable({ title }: { title: string }) {
  return (
    <button
      className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium Mui-disabled MuiTypography-root MuiTypography-button e18czh0v0 css-lh2nae"
      tabIndex={-1}
      type="button"
      disabled
    >
      {title}
    </button>
  );
}

const swapProcess = async (
  signer: Signer,
  swapContractAddress: string,
  sourceDataToken: ISelectedToken,
  sourceTokenValue: string | number,
  estimateValue: string | number,
) => {
  //check Balance
  if (Number(sourceTokenValue) <= 0) {
    notifyMessageError("Please input Amount!");
    return null;
  }
  const accountAddress = await signer.getAddress();
  const avaiableBalance: BigNumber = sourceDataToken.isEther
    ? await signer.getBalance()
    : await getCDTokensBalance(signer, sourceDataToken.address, accountAddress);
  if (avaiableBalance.lt(sourceTokenValue)) {
    notifyMessageError("Insufficient funds!");
    return null;
  }
  const tx = await swapTokens(
    swapContractAddress,
    sourceDataToken.address,
    signer,
    utils.parseEther(`${sourceTokenValue}`),
    utils.parseEther(`${estimateValue}`).toString(),
    sourceDataToken.isEther,
  );
  return tx;
};

function BtnSubmitSwap(props: {
  title: string;
  sourceDataToken: ISelectedToken;
  sourceTokenValue: string | number;
  swapContractAddress: string | null;
  estimateValue: string | number;
  onHandleSetBtnState: (status: number) => void;
}) {
  const { title, sourceDataToken, onHandleSetBtnState, sourceTokenValue, swapContractAddress, estimateValue } = props;
  const dispatch = useAppDispatch();
  const { chainId, switchNetwork, account, library } = useEthers();

  const onHandleSwap = () => {
    if (chainId !== NUMB_CHAIN_COST.chainId) {
      switchNetwork(NUMB_CHAIN_COST.chainId).then();
    } else if (library !== undefined && "getSigner" in library && account !== undefined) {
      const signer = library.getSigner();
      if (swapContractAddress) {
        onHandleSetBtnState(2);
        swapProcess(signer, swapContractAddress, sourceDataToken, sourceTokenValue, estimateValue)
          .then((tx) => {
            console.log("🚀 ~ file: swap-btn-submit.tsx:97 ~ swapProcess ~ tx:", tx);
            onHandleSetBtnState(3);
          })
          .catch((error) => {
            notifyMessageError(error.message);
            onHandleSetBtnState(3);
          });
      }
    }
  };
  return (
    <button
      onClick={() => onHandleSwap()}
      type="button"
      className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiTypography-root MuiTypography-button e18czh0v0 css-18mk15y"
      tabIndex={0}
    >
      {chainId !== NUMB_CHAIN_COST.chainId ? `Switch to ${NUMB_CHAIN_COST.chainName} to Swap` : title}
    </button>
  );
}

export default function SwapBtnSubmit() {
  const { account, activateBrowserWallet } = useEthers();
  const swapData = useAppSelector(getSwapSelector);
  const [btnState, setBtnState] = useState(0);
  useEffect(() => {
    if (account === undefined) {
      setBtnState(0);
    } else if (
      swapData.source.selectedToken &&
      swapData.destination.selectedToken &&
      Number(swapData.source.tokenSwapValue) > 0
    ) {
      setBtnState(3);
    } else {
      setBtnState(1);
    }
  }, [account, swapData.destination.selectedToken, swapData.source.selectedToken, swapData.source.tokenSwapValue]);
  // const btnState: number = 2;
  const onHandleSetBtnState = (status: number) => {
    setBtnState(status);
  };
  return (
    <div>
      {btnState === 0 && (
        <button
          onClick={() => activateBrowserWallet()}
          type="button"
          className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiTypography-root MuiTypography-button e18czh0v0 css-18mk15y"
          tabIndex={0}
        >
          Connect Wallet
        </button>
      )}
      {btnState === 1 && <BtnSubmitDisable title="Review Order" />}
      {btnState === 2 && <BtnLoading title="Swap..." />}
      {btnState === 3 && swapData.source.selectedToken && (
        <BtnSubmitSwap
          onHandleSetBtnState={onHandleSetBtnState}
          sourceDataToken={swapData.source.selectedToken}
          sourceTokenValue={swapData.source.tokenSwapValue}
          swapContractAddress={swapData.swapContractAddress}
          estimateValue={swapData.estimateValue}
          title="Swap"
        />
      )}
    </div>
  );
}
