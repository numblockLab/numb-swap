import { NUMB_CHAIN_COST } from "@abi/constants";
import { ILiquidItem } from "@abi/tokenAddress";
import { formatShortTx } from "@utils/text-format";
import { Link } from "react-router-dom";

export default function PoolContractInfo(props: { item: ILiquidItem }) {
  const { item } = props;
  return (
    <div className="flex justify-between">
      <div className="pool-hash flex gap-2">
        <img
          width={32}
          height={32}
          src="static/img/logos/liquidity-pool-parts.svg"
          alt=""
          className="ng-star-inserted"
        />
        <Link
          target="_blank"
          className="fs-12 pools-table_current-color ng-star-inserted"
          to={NUMB_CHAIN_COST.getExplorerAddressLink(item.swapContract)}
        >
          {formatShortTx(item.swapContract)}
        </Link>
      </div>

      <div className="flex gap-4 pool-tokens">
        <div className="fs-12 flex lp-token ng-star-inserted">
          <img loading="lazy" alt="token logo" className="mr-1" src={`static/img/logos/${item.source.imgUrl}`} />
          <div className="text-left">
            <Link
              target="_blank"
              className="pools-table_current-color"
              to={NUMB_CHAIN_COST.getExplorerAddressLink(item.source.address)}
            >
              {item.source.symbol}
            </Link>
            <p className="text-gray-500">50%</p>
          </div>
        </div>
        <div className="fs-12 flex  lp-token ng-star-inserted">
          <img loading="lazy" alt="token logo" className="mr-1" src={`static/img/logos/${item.des.imgUrl}`} />
          <div className="text-left">
            <Link
              target="_blank"
              className="pools-table_current-color"
              to={NUMB_CHAIN_COST.getExplorerAddressLink(item.des.address)}
            >
              {item.des.symbol}
            </Link>
            <p className="text-gray-500">50%</p>
          </div>
        </div>
        {/**/}
      </div>
    </div>
  );
}
