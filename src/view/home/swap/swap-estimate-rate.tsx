import { useAppSelector } from "@hooks/useReduxToolKit";
import { getSwapSelector } from "@store/selector/swap-selectors";
import { useMemo } from "react";

export default function SwapEstimateRate() {
  const swapData = useAppSelector(getSwapSelector);

  const estimateData = useMemo(() => {
    if (swapData.destination.selectedToken && swapData.source.selectedToken) {
      return {
        sourceToken: swapData.source.selectedToken.symbol,
        desToken: swapData.destination.selectedToken.symbol,
        sourceVal: swapData.source.tokenSwapValue === "" ? 0 : swapData.source.tokenSwapValue,
        desVal: swapData.source.tokenSwapValue === "" ? 0 : swapData.source.tokenSwapValue,
      };
    }
    return null;
  }, [swapData.destination.selectedToken, swapData.source.selectedToken, swapData.source.tokenSwapValue]);
  return (
    estimateData && (
      <div className="css-16jc9eg e1sncen30">
        Estimated rate: {estimateData.sourceVal} {estimateData.sourceToken} = {estimateData.desVal}{" "}
        {estimateData.desToken}
      </div>
    )
  );
}
