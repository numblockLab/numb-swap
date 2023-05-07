/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import SwapModalWrapper from "@components/SwapModalWrapper";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import PoolContractInfo from "./pool-contract-info";
import { ILiquidItem } from "@abi/tokenAddress";

export default function BtnProvide(props: { item: ILiquidItem }) {
  const { item } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const onHandleOpen = () => {
    setShow(true);
  };
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
              You have: 234342343
              <span className="ml-1 mr-1">|</span>
            </p>
            <p
              // onClick={() => filMaxToSource()}
              className="MuiTypography-root MuiTypography-caption font-semibold text-grey-300 dark:text-grey-400 hover:text-grey-400 hover:dark:text-grey-500 transition-all cursor-pointer tracking-[-0.03em] css-m1yo1i"
            >
              Max
            </p>
          </div>
          <TextField
            label="NUMB value"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            margin="dense"
            fullWidth
          />

          <div className="css-16jc9eg e1sncen30 my-2">
            Estimated you need: 1500.366100614580894966 Crypto Dev Tokens
          </div>

          <button
            // onClick={() => onHandleSwap()}
            type="button"
            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiTypography-root MuiTypography-button e18czh0v0 css-18mk15y"
            tabIndex={0}
          >
            Add liquidity
          </button>
        </>
      </SwapModalWrapper>
    </>
  );
}
