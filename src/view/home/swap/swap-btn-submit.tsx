/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { getSwapSelector } from "@store/selector/swap-selectors";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { useEffect, useMemo, useState } from "react";

import { BRIDGE_WALLET_ADDRESS } from "@abi/index";
import { TOKEN_CHAIN_CONTRACT } from "@abi/tokenAddress";
import { notifyMessageError, notifyMessageSuccess } from "@emiter/AppEmitter";
import { formatEther } from "@ethersproject/units";
import useBridgeContract from "@hooks/useBrigdeContract";
import LoadingButton from "@mui/lab/LoadingButton";
import { putSourceTokenSwapValueAction } from "@store/actions";
import { ISelectedToken } from "@store/models/swap-model";
import { getChainIconInfo } from "@utils/index";
import { ethers } from "ethers";

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
function BtnSubmitSwap(props: {
  title: string;
  sourceDataToken: ISelectedToken;
  selectedChainId: number;
  sourceTokenValue: number;
  onHandleSetBtnState: (status: number) => void;
}) {
  const { title, sourceDataToken, selectedChainId, onHandleSetBtnState, sourceTokenValue } = props;
  const dispatch = useAppDispatch();
  const { account, chainId, switchNetwork } = useEthers();
  const tokenBalance = useTokenBalance(sourceDataToken.address, account, { chainId: selectedChainId });
  const chainIconinfo = useMemo(() => {
    return getChainIconInfo(selectedChainId);
  }, [selectedChainId]);

  const bridgeContract = useMemo(() => {
    return TOKEN_CHAIN_CONTRACT[selectedChainId][sourceDataToken.address].contract;
  }, [selectedChainId, sourceDataToken.address]);

  const { state: contractState, send: sendTx } = useBridgeContract(bridgeContract);

  // useEffect(() => {
  //   console.log("🚀 ~ file: swap-btn-submit.tsx:69 ~ useEffect ~ contractState:", contractState);
  //   if (contractState.status === "Success") {
  //     // setState({ name: "", description: "", imageBlob: [], isLoading: false });
  //     if (contractState.receipt) {
  //       dispatch(putSourceTokenSwapValueAction(""));
  //       notifyMessageSuccess(contractState.receipt.transactionHash);
  //     }
  //     onHandleSetBtnState(1);
  //   } else if (contractState.status === "Fail" || contractState.status === "Exception") {
  //     onHandleSetBtnState(3);
  //     notifyMessageError("Error! Please try again!");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [contractState]);

  const onHandleSwap = () => {
    if (chainId !== selectedChainId) {
      switchNetwork(selectedChainId).then();
    } else {
      const currentBal = Number(formatEther(tokenBalance || 0));
      if (currentBal >= sourceTokenValue || currentBal === 0) {
        onHandleSetBtnState(2);
        const amountFormatted = ethers.utils.parseUnits(`${sourceTokenValue}`, 18);
        sendTx(BRIDGE_WALLET_ADDRESS, amountFormatted.toString())
          .then((result) => {
            if (result) {
              notifyMessageSuccess(result.transactionHash);
              dispatch(putSourceTokenSwapValueAction(""));
            }
          })
          .catch(() => {
            onHandleSetBtnState(3);
            notifyMessageError("Error! Please try again!");
          });
      } else {
        notifyMessageError("Insufficient funds!");
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
      {chainId !== selectedChainId ? `Switch to ${chainIconinfo.name} to Swap` : title}
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
    if (swapData.source.selectedChainId === swapData.destination.selectedChainId) {
      setBtnState(1);
    }
  }, [
    account,
    swapData.destination.selectedChainId,
    swapData.destination.selectedToken,
    swapData.source.selectedChainId,
    swapData.source.selectedToken,
    swapData.source.tokenSwapValue,
  ]);
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
          selectedChainId={swapData.source.selectedChainId}
          sourceDataToken={swapData.source.selectedToken}
          sourceTokenValue={Number(swapData.source.tokenSwapValue)}
          title="Swap"
        />
      )}
    </div>
  );
}
