import { Button } from "@mui/material";
import BtnProvide from "./btn-provide";
import { ILiquidItem } from "@abi/tokenAddress";

import PoolContractInfo from "./pool-contract-info";
import MoneyComponent from "@components/MoneyComponent";
import { useEffect, useState } from "react";
import { getCDTokensBalance, getLPTokensBalance, getNumbBalance } from "@hooks/getAmounts";
import { useEthers } from "@usedapp/core";
import { formatEtherFixed5 } from "@utils/text-format";

export default function PoolCard(props: { item: ILiquidItem }) {
  const { item } = props;
  const { library, account } = useEthers();
  const [state, setState] = useState({
    poolNumb: "",
    poolToken: "",
    myPoolLP: "",
  });
  useEffect(() => {
    const getPoolNumb = getNumbBalance(library as any, item.swapContract, "", true);
    const getPoolToken = getCDTokensBalance(library as any, item.des.address, item.swapContract);
    const getMyLP = getLPTokensBalance(library as any, item.swapContract, account);
    Promise.all([getPoolNumb, getPoolToken, getMyLP]).then((result) => {
      const [numbbal, tokenbal, mylp] = result;
      setState({ poolNumb: numbbal.toString(), poolToken: tokenbal.toString(), myPoolLP: mylp.toString() });
    });
  }, [account, item.des.address, item.swapContract, library]);
  return (
    <div className=" w-1/3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <PoolContractInfo item={item} />

      <div className="pool-info">
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500">{item.source.symbol}</span>
          <span>
            <MoneyComponent numValue={formatEtherFixed5(state.poolNumb)} decimalPlaces={3} />
          </span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500">{item.des.symbol}</span>
          <span>
            <MoneyComponent numValue={formatEtherFixed5(state.poolToken)} decimalPlaces={3} />
          </span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500"> - My LP</span>
          <span>
            <MoneyComponent numValue={formatEtherFixed5(state.myPoolLP)} decimalPlaces={3} />
          </span>
        </div>
      </div>
      <div className="pool-actions flex justify-between gap-2">
        <Button variant="outlined" color="info" className="w-50">
          Remove
        </Button>
        <BtnProvide item={item} />
      </div>
    </div>
  );
}
