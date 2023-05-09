import { ITokenChainInfo, TOKEN_SWAP_MAPPING } from "@abi/tokenAddress";
import InputSelectDefault from "@components/InputSelectDefault";
import InputSelectWithIcon from "@components/InputSelectWithIcon";
import SwapModalWrapper from "@components/SwapModalWrapper";
import { ChainIconItem } from "@components/chain-icon/chain-icon-modal";
import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { getAmountOfTokensReceivedFromSwap, useTokenReserve } from "@hooks/useSwap";
import { selectDesTokenAction, updateSwapAction } from "@store/actions";
import { ISelectedToken } from "@store/models/swap-model";
import {
  getDesTokenSelector,
  getEstimateValueSelector,
  getSourceTokenSelector,
  getSwapSelector,
} from "@store/selector/swap-selectors";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEtherFixed5 } from "@utils/text-format";
import { utils } from "ethers";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";

function SwapSourceTokenBtn() {
  const sourceSelected: ISelectedToken | null = useAppSelector(getSourceTokenSelector);
  const desTokeninfo = useAppSelector(getDesTokenSelector);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const onHandleOpen = () => {
    setShow(true);
  };
  const onSelectToken = (item: ITokenChainInfo) => {
    dispatch(selectDesTokenAction(item));
    handleClose();
  };
  const chainIconinfo = useMemo(() => {
    if (sourceSelected) {
      const tokenMapping = TOKEN_SWAP_MAPPING[sourceSelected.address];
      return tokenMapping;
    }
    return null;
  }, [sourceSelected]);

  return (
    <>
      {desTokeninfo ? (
        <InputSelectWithIcon title={desTokeninfo.symbol} imgUrl={desTokeninfo.imgUrl} onClickHanlder={onHandleOpen} />
      ) : (
        <InputSelectDefault
          title="Select Token"
          onClickHanlder={onHandleOpen}
          disabled={chainIconinfo === null || chainIconinfo.length === 0}
        />
      )}
      <SwapModalWrapper
        title="Select Token"
        description="What asset do you want to receive?"
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

function InputDesEstimate(props: {
  swapContractAddress: string;
  sourceSelectedToken: ISelectedToken;
  contractBal: string;
  contractRev: string;
  tokenSwapValue: number | string;
}) {
  const { sourceSelectedToken, swapContractAddress, contractBal, contractRev, tokenSwapValue } = props;
  const dispatch = useAppDispatch();
  const { library } = useEthers();
  const estimateVal = useAppSelector(getEstimateValueSelector);
  const debouncedGetAmt = debounce(
    async (params: {
      _swapContractAddress: string;
      _swapAmountWei: string;
      provider: any;
      ethSelected: boolean;
      ethBalance: string;
      reservedCD: string;
    }) => {
      const amountOfTokens = await getAmountOfTokensReceivedFromSwap(
        params._swapContractAddress,
        params._swapAmountWei,
        params.provider,
        params.ethSelected,
        params.ethBalance,
        params.reservedCD,
        false,
      );
      dispatch(
        updateSwapAction({
          estimateValue: amountOfTokens,
        }),
      );
    },
    1000,
  );
  useEffect(() => {
    if (Number(tokenSwapValue) > 0) {
      const _swapAmountWEI = utils.parseEther(tokenSwapValue.toString());
      const params = {
        _swapContractAddress: swapContractAddress,
        _swapAmountWei: _swapAmountWEI.toString(),
        provider: library,
        ethSelected: sourceSelectedToken.isEther,
        ethBalance: contractBal,
        reservedCD: contractRev,
      };
      debouncedGetAmt(params)?.then();
    } else {
      dispatch(
        updateSwapAction({
          estimateValue: "",
        }),
      );
    }
    return () => {
      debouncedGetAmt.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractBal, contractRev, sourceSelectedToken.isEther, swapContractAddress, tokenSwapValue]);
  return (
    <input
      type="number"
      className="sm:text-left text-right ec4inb72 css-1aao2o7 e15splxn0"
      placeholder="0.00"
      disabled
      value={formatEtherFixed5(estimateVal)}
    />
  );
}

export default function SwapDes() {
  const swapData = useAppSelector(getSwapSelector);
  const tokenReserve = useTokenReserve(swapData.swapContractAddress);
  const numbContractBal = useEtherBalance(swapData.swapContractAddress);
  const [state, setState] = useState({
    bal: "0",
    rev: "0",
  });
  useEffect(() => {
    if (tokenReserve) {
      const reserve = tokenReserve;
      if (numbContractBal && reserve) {
        const balStr = numbContractBal.toString();
        const revStr = reserve.toString();
        if (balStr !== state.bal && revStr !== state.rev) {
          setState({ bal: balStr, rev: revStr });
        }
      }
    }
  }, [numbContractBal, state, tokenReserve]);

  // useEffect(() => {
  //   console.log("🚀 ~ file: swap-des.tsx:89 ~ SwapDes ~ state:", state);
  // }, [state]);

  return (
    <div className="rounded-t css-1nestwu ec4inb73">
      <div className="flex items-center justify-between">
        <p className="MuiTypography-root MuiTypography-body1 css-i3l18a">Receive:</p>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-2">
        {swapData.swapContractAddress && swapData.source.selectedToken ? (
          <InputDesEstimate
            swapContractAddress={swapData.swapContractAddress}
            sourceSelectedToken={swapData.source.selectedToken}
            contractBal={state.bal}
            contractRev={state.rev}
            tokenSwapValue={swapData.source.tokenSwapValue}
          />
        ) : (
          <input
            type="number"
            className="sm:text-left text-right ec4inb72 css-1aao2o7 e15splxn0"
            placeholder="0.00"
            disabled
          />
        )}
        <div className="css-4plb0w ec4inb71">
          <SwapSourceTokenBtn />
        </div>
      </div>
    </div>
  );
}
