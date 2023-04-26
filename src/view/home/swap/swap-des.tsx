import { ITokenChainInfo } from "@abi/tokenAddress";
import InputSelectDefault from "@components/InputSelectDefault";
import InputSelectWithIcon from "@components/InputSelectWithIcon";
import SwapModalWrapper from "@components/SwapModalWrapper";
import { ChainIconItem } from "@components/chain-icon/chain-icon-modal";
import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { selectDesChainIdAction, selectDesTokenAction } from "@store/actions";
import { getDesSelector, getDesTokenSelector, getSwapSelector } from "@store/selector/swap-selectors";
import { CHAIN_ICON_INFO, getChainIconInfo, getTokenListByChain } from "@utils/index";
import { useMemo, useState } from "react";

function SwapDesChainBtn(props: { selectedChainId: number }) {
  const { selectedChainId } = props;
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const onHandleOpen = () => {
    setShow(true);
  };
  const onSelectChainId = (chainId: number) => {
    dispatch(selectDesChainIdAction(chainId));
    handleClose();
  };
  const chainIconinfo = useMemo(() => {
    if (selectedChainId > 0) {
      return {
        chain: getChainIconInfo(selectedChainId),
        // chainTokenList: getTokenListByChain(selectedChainId),
      };
    }
    return null;
  }, [selectedChainId]);

  return (
    <>
      {chainIconinfo ? (
        <InputSelectWithIcon
          title={chainIconinfo.chain.name}
          imgUrl={chainIconinfo.chain.iconPath}
          onClickHanlder={onHandleOpen}
        />
      ) : (
        <InputSelectDefault title="Select Network" onClickHanlder={onHandleOpen} />
      )}
      <SwapModalWrapper
        title="Select Network"
        description="What network do you want to send assets from?"
        isOpen={show}
        onClose={handleClose}
      >
        <div className="css-gj7b5f eu2qphv1">
          {Object.values(CHAIN_ICON_INFO).map((item) => (
            <ChainIconItem
              key={item.chainId}
              title={item.name}
              onHandleClick={() => onSelectChainId(item.chainId)}
              iconUrl={item.iconPath}
            />
          ))}
        </div>
      </SwapModalWrapper>
    </>
  );
}

function SwapSourceTokenBtn(props: { selectedChainId: number }) {
  const { selectedChainId } = props;
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
    if (selectedChainId > 0) {
      return getTokenListByChain(selectedChainId);
    }
    return null;
  }, [selectedChainId]);

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
  const desSwapinfo = useAppSelector(getDesSelector);
  const swapData = useAppSelector(getSwapSelector);

  const estimateDesData = useMemo(() => {
    if (swapData.source.selectedChainId > 0 && swapData.source.selectedToken) {
      if (swapData.destination.selectedChainId > 0 && swapData.destination.selectedToken) {
        return swapData.source.tokenSwapValue;
      }
    }
    return "";
  }, [
    swapData.destination.selectedChainId,
    swapData.destination.selectedToken,
    swapData.source.selectedChainId,
    swapData.source.selectedToken,
    swapData.source.tokenSwapValue,
  ]);
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
          <SwapDesChainBtn selectedChainId={desSwapinfo.selectedChainId} />
          <SwapSourceTokenBtn selectedChainId={desSwapinfo.selectedChainId} />
        </div>
      </div>
    </div>
  );
}
