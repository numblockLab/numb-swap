import { ITokenChainInfo, TOKEN_INFOS } from "@abi/tokenAddress";
import InputSelectDefault from "@components/InputSelectDefault";
import InputSelectWithIcon from "@components/InputSelectWithIcon";
import SwapModalWrapper from "@components/SwapModalWrapper";
import { ChainIconItem } from "@components/chain-icon/chain-icon-modal";
import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { selectDesTokenAction } from "@store/actions";
import { getDesTokenSelector, getSwapSelector } from "@store/selector/swap-selectors";
import { useMemo, useState } from "react";

function SwapSourceTokenBtn() {
  const currentTokeninfo = useAppSelector(getDesTokenSelector);
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
    return Object.values(TOKEN_INFOS);
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

export default function SwapDes() {
  const swapData = useAppSelector(getSwapSelector);

  const estimateDesData = useMemo(() => {
    if (swapData.destination.selectedToken && swapData.source.selectedToken) {
      return swapData.source.tokenSwapValue;
    }
    return "";
  }, [swapData.destination.selectedToken, swapData.source.selectedToken, swapData.source.tokenSwapValue]);
  return (
    <div className="rounded-t css-1nestwu ec4inb73">
      <div className="flex items-center justify-between">
        <p className="MuiTypography-root MuiTypography-body1 css-i3l18a">Receive:</p>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-2">
        <input
          type="number"
          className="sm:text-left text-right ec4inb72 css-1aao2o7 e15splxn0"
          placeholder="0.00"
          disabled
          value={estimateDesData}
        />
        <div className="css-4plb0w ec4inb71">
          <SwapSourceTokenBtn />
        </div>
      </div>
    </div>
  );
}
