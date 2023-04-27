/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { NUMB_CHAIN_COST } from "@abi/constants";
import { ITokenChainInfo, ALL_TOKEN_INFOS } from "@abi/tokenAddress";
import InputSelectDefault from "@components/InputSelectDefault";
import InputSelectWithIcon from "@components/InputSelectWithIcon";
import SwapModalWrapper from "@components/SwapModalWrapper";
import { ChainIconItem } from "@components/chain-icon/chain-icon-modal";
import { formatEther } from "@ethersproject/units";
import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { Dispatch } from "@reduxjs/toolkit";
import { CombineActionTypes, putSourceTokenSwapValueAction, selectSourceTokenAction } from "@store/actions";
import { ISelectedToken } from "@store/models/swap-model";
import { getSourceSelector, getSourceTokenSelector, getSourceTokenValueSelector } from "@store/selector/swap-selectors";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { useMemo, useState } from "react";

function SwapSourceTokenBtn() {
  const currentTokeninfo = useAppSelector(getSourceTokenSelector);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const onHandleOpen = () => {
    setShow(true);
  };
  const onSelectToken = (item: ITokenChainInfo) => {
    dispatch(selectSourceTokenAction(item));
    handleClose();
  };
  const chainIconinfo = useMemo(() => {
    return Object.values(ALL_TOKEN_INFOS);
  }, []);

  return (
    <>
      {currentTokeninfo ? (
        <InputSelectWithIcon
          title={currentTokeninfo.symbol}
          imgUrl={currentTokeninfo.imgUrl}
          onClickHanlder={onHandleOpen}
        />
      ) : (
        <InputSelectDefault
          title="Select Token"
          onClickHanlder={onHandleOpen}
          disabled={chainIconinfo === null || chainIconinfo.length === 0}
        />
      )}
      <SwapModalWrapper
        title="Select Token"
        description="What asset do you want to send?"
        isOpen={show}
        onClose={handleClose}
      >
        {chainIconinfo && (
          <div className="css-gj7b5f eu2qphv1">
            {chainIconinfo.map((item) => (
              <ChainIconItem
                key={item.address}
                title={item.symbol}
                onHandleClick={() => onSelectToken(item)}
                iconUrl={item.imgUrl}
              />
            ))}
          </div>
        )}
      </SwapModalWrapper>
    </>
  );
}

function SourceWalletbalance(props: { selectedToken: ISelectedToken; dispatch: Dispatch<CombineActionTypes> }) {
  const { selectedToken, dispatch } = props;
  const { account } = useEthers();
  const tokenBalance = useTokenBalance(selectedToken.address, account, { chainId: NUMB_CHAIN_COST.chainId });
  const filMaxToSource = () => {
    // notifyMessageSuccess("0xabb94c5d57feb649d7815115c3b21d457261a165e4b815550c9e509b3624f150");
    dispatch(putSourceTokenSwapValueAction(formatEther(tokenBalance || 0) || ""));
  };
  return (
    <div className="flex items-center">
      <p className="MuiTypography-root MuiTypography-caption text-grey-300 dark:text-grey-400 flex items-center tracking-[-0.03em] css-m1yo1i">
        Balance: {formatEther(tokenBalance || 0)} {selectedToken.symbol}
        <span className="ml-1 mr-1">|</span>
      </p>
      <p
        onClick={() => filMaxToSource()}
        className="MuiTypography-root MuiTypography-caption font-semibold text-grey-300 dark:text-grey-400 hover:text-grey-400 hover:dark:text-grey-500 transition-all cursor-pointer tracking-[-0.03em] css-m1yo1i"
      >
        Max
      </p>
    </div>
  );
}

export default function SwapSource() {
  const sourceSwapinfo = useAppSelector(getSourceSelector);
  const sourceSwapValue = useAppSelector(getSourceTokenValueSelector);
  const dispatch = useAppDispatch();
  const onInputSourceVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(putSourceTokenSwapValueAction(e.target.value));
  };
  return (
    <div className="rounded-t css-1nestwu ec4inb73">
      <div className="flex items-center justify-between">
        <p className="MuiTypography-root MuiTypography-body1 css-i3l18a">Swap from:</p>
        {sourceSwapinfo.selectedToken && (
          <SourceWalletbalance selectedToken={sourceSwapinfo.selectedToken} dispatch={dispatch} />
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-2">
        <input
          type="number"
          className="sm:text-left text-right ec4inb72 css-1aao2o7 e15splxn0"
          placeholder="Enter an amount"
          onChange={(e) => onInputSourceVal(e)}
          value={sourceSwapValue}
        />
        <div className="css-4plb0w ec4inb71">
          {/* <SwapSourceChainBtn selectedChainId={sourceSwapinfo.selectedChainId} /> */}
          <SwapSourceTokenBtn />
        </div>
      </div>
    </div>
  );
}
