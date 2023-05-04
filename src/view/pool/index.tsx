/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import DefaultLayout from "../../layout";
import PoolCard from "./pool-card";

export default function PoolsView() {
  return (
    <DefaultLayout>
      <div className="flex justify-start gap-2">
        <PoolCard />
        <PoolCard />
      </div>
    </DefaultLayout>
  );
}
