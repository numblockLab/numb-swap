/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import DefaultLayout from "../../layout";
import PoolCard from "./pool-card";
import { LIQUIDITY_LIST } from "@abi/tokenAddress";

export default function PoolsView() {
  return (
    <DefaultLayout>
      <div className="pool-view md:flex md:gap-2 md:justify-start ">
        {LIQUIDITY_LIST.map((e) => (
          <PoolCard item={e} key={e.swapContract} />
        ))}
      </div>
    </DefaultLayout>
  );
}
