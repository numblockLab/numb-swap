import { Button } from "@mui/material";
import BtnProvide from "./btn-provide";
import { ILiquidItem } from "@abi/tokenAddress";

import PoolContractInfo from "./pool-contract-info";

export default function PoolCard(props: { item: ILiquidItem }) {
  const { item } = props;
  return (
    <div className=" w-1/3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <PoolContractInfo item={item} />

      <div className="pool-info">
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500">{item.source.symbol}</span>
          <span> 302001</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500">{item.des.symbol}</span>
          <span> 56823891 </span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500">LP</span>
          <span> 1.23 </span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500">My LP</span>
          <span> 1.23 </span>
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
