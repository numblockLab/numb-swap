/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from "@mui/material";
import React from "react";

export default function PoolCard() {
  return (
    <div className=" w-1/3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <svg
        className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
          clipRule="evenodd"
        />
        <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
      </svg>
      <div className="pool-hash"></div>
      <div className="pool-tokens-pair d-flex pool-tokens"></div>
      <div className="pool-info">
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500">NUMB</span>
          <span> 302001</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500">TOKEN</span>
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
        <Button variant="contained" color="secondary" className="w-50">
          Provide
        </Button>
      </div>
    </div>
  );
}
