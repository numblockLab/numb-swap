/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import SwapModalWrapper from "@components/SwapModalWrapper";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import PoolContractInfo from "./pool-contract-info";
import { ILiquidItem } from "@abi/tokenAddress";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { addLiquidity, calculateCD } from "@hooks/useLiquidity";
import { formatEtherFixed5 } from "@utils/text-format";
import { notifyMessageError, notifyMessageSuccess } from "@emiter/AppEmitter";
import { BtnLoading } from "@components/Btn-Loading";
import { utils } from "ethers";

export default function BtnProvide(props: {
  item: ILiquidItem;
  poolNumb: string;
  poolToken: string;
  emitRefresh: () => void;
}) {
  const { item, poolNumb, poolToken, emitRefresh } = props;
  const { account, library } = useEthers();
  const etherBalance = useEtherBalance(account);

  const [state, setState] = useState({
    numbVal: "",
    tokenVal: "",
    isLoading: false,
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const onHandleOpen = () => {
    setShow(true);
  };
  const onHandleNumb = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const _addCDTokens = calculateCD(e.target.value || "0", poolNumb, poolToken);
    setState({ ...state, numbVal: e.target.value, tokenVal: _addCDTokens.toString() });
  };

  function filMaxToSource(): void {
    const _addCDTokens = calculateCD(formatEther(etherBalance || "0"), poolNumb, poolToken);
    setState({
      ...state,
      numbVal: formatEther(etherBalance?.toString() || 0),
      tokenVal: _addCDTokens.toString(),
    });
  }

  function onHandleAdd(): void {
    if (state.numbVal.trim() === "") {
      notifyMessageError("Please enter Numb!");
      return;
    }
    if (!account) {
      notifyMessageError("Please connect wallet!");
      return;
    }
    if (library) {
      const signer = library.getSigner();
      setState({ ...state, isLoading: true });
      addLiquidity(item.swapContract, item.des.address, signer, state.tokenVal, utils.parseEther(state.numbVal))
        .then((tx) => {
          notifyMessageSuccess(tx.hash);
          setState({ numbVal: "", tokenVal: "", isLoading: false });
          emitRefresh();
        })
        .catch((err) => {
          notifyMessageError(err.message);
          setState({ ...state, isLoading: false });
        });
    }
  }

  return (
    <>
      <Button variant="contained" color="secondary" className="w-50" onClick={() => onHandleOpen()}>
        Provide
      </Button>
      <SwapModalWrapper title="Provide Liquidity" description="" isOpen={show} onClose={handleClose}>
        <>
          <PoolContractInfo item={item} />
          <div className="flex justify-end items-center mt-4">
            <p className="MuiTypography-root MuiTypography-caption text-grey-300 dark:text-grey-400 flex items-center tracking-[-0.03em] css-m1yo1i">
              You have: {formatEther(etherBalance || 0)} NUMB
              <span className="ml-1 mr-1">|</span>
            </p>
            <p
              onClick={() => filMaxToSource()}
              className="MuiTypography-root MuiTypography-caption font-semibold text-grey-300 dark:text-grey-400 hover:text-grey-400 hover:dark:text-grey-500 transition-all cursor-pointer tracking-[-0.03em] css-m1yo1i"
            >
              Max
            </p>
          </div>
          <TextField
            label="Amount of NUMB"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            margin="dense"
            fullWidth
            onChange={(e) => onHandleNumb(e)}
            value={state.numbVal}
          />

          <div className="css-16jc9eg e1sncen30 my-2">
            Estimated you need: {formatEtherFixed5(state.tokenVal)} {item.des.symbol}
          </div>

          {state.isLoading === false && (
            <button
              onClick={() => onHandleAdd()}
              type="button"
              className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiTypography-root MuiTypography-button e18czh0v0 css-18mk15y"
              tabIndex={0}
            >
              Add liquidity
            </button>
          )}
          {state.isLoading && <BtnLoading title="Add..." />}
        </>
      </SwapModalWrapper>
    </>
  );
}
