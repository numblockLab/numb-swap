/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { ILiquidItem } from "@abi/tokenAddress";
import { BtnLoading } from "@components/Btn-Loading";
import SwapModalWrapper from "@components/SwapModalWrapper";
import { notifyMessageError, notifyMessageSuccess } from "@emiter/AppEmitter";
import { formatEther } from "@ethersproject/units";
import { useLPTokensBalance } from "@hooks/getAmounts";
import { _getTokensAfterRemove, removeLiquidity } from "@hooks/useLiquidity";
import { Button, TextField } from "@mui/material";
import { useEthers } from "@usedapp/core";
import { formatEtherFixed5 } from "@utils/text-format";
import { utils } from "ethers";
import { debounce } from "lodash";
import { ChangeEvent, useState } from "react";
import PoolContractInfo from "./pool-contract-info";

export default function BtnRemove(props: { item: ILiquidItem; emitRefresh: () => void }) {
  const { item, emitRefresh } = props;
  const { account, library } = useEthers();
  const lpBalance = useLPTokensBalance(item.swapContract, account);
  const [lpVal, setLP] = useState("");
  const [state, setState] = useState({
    removeNumbVal: "",
    removeTokenVal: "",
    isLoading: false,
  });
  const [show, setShow] = useState(false);

  const debouncedGetAmt = debounce(
    async (params: { provider: any; _swapContractAddress: string; _removeLPTokens: string }) => {
      const { _removeEther, _removeCD } = await _getTokensAfterRemove(
        params.provider,
        params._swapContractAddress,
        params._removeLPTokens,
      );
      setState({
        ...state,
        removeNumbVal: _removeEther.toString(),
        removeTokenVal: _removeCD.toString(),
      });
    },
    1000,
  );

  const handleClose = () => setShow(false);

  const onHandleOpen = () => {
    setShow(true);
  };
  const onHandleLP = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLP(e.target.value);
    const params = { provider: library, _swapContractAddress: item.swapContract, _removeLPTokens: e.target.value };
    debouncedGetAmt(params)?.then();
  };

  function filMaxToSource(): void {
    const maxLP = formatEther(lpBalance || "0");
    const params = { provider: library, _swapContractAddress: item.swapContract, _removeLPTokens: maxLP };
    debouncedGetAmt(params)?.then();
  }

  function onHandleRemove(): void {
    if (lpVal.trim() === "") {
      notifyMessageError("Please enter LP Tokens!");
      return;
    }
    if (!account) {
      notifyMessageError("Please connect wallet!");
      return;
    }
    if (library) {
      const signer = library.getSigner();
      setState({ ...state, isLoading: true });
      removeLiquidity(signer, item.swapContract, utils.parseEther(lpVal))
        .then((tx) => {
          notifyMessageSuccess(tx.hash);
          setState({ removeNumbVal: "", removeTokenVal: "", isLoading: false });
          setLP("");
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
      <Button variant="outlined" color="error" className="w-50" onClick={() => onHandleOpen()}>
        Remove
      </Button>
      <SwapModalWrapper title="Remove Liquidity" description="" isOpen={show} onClose={handleClose}>
        <>
          <PoolContractInfo item={item} />
          <div className="flex justify-end items-center mt-4">
            <p className="MuiTypography-root MuiTypography-caption text-grey-300 dark:text-grey-400 flex items-center tracking-[-0.03em] css-m1yo1i">
              You have: {formatEther(lpBalance || 0)} LP Tokens
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
            label="Amount of LP Tokens"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            margin="dense"
            fullWidth
            onChange={(e) => onHandleLP(e)}
            value={lpVal}
          />

          <div className="css-16jc9eg e1sncen30 my-2">
            Estimated you get: <br />
            {formatEtherFixed5(state.removeNumbVal)} {item.source.symbol}
            <br />
            {formatEtherFixed5(state.removeTokenVal)} {item.des.symbol}
          </div>

          {state.isLoading === false && (
            <button
              onClick={() => onHandleRemove()}
              type="button"
              className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiTypography-root MuiTypography-button e18czh0v0 css-18mk15y"
              tabIndex={0}
            >
              Remove liquidity
            </button>
          )}
          {state.isLoading && <BtnLoading title="Remove..." />}
        </>
      </SwapModalWrapper>
    </>
  );
}
