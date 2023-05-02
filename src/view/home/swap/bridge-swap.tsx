import SwapBtnSubmit from "./swap-btn-submit";
import SwapDes from "./swap-des";
import SwapEstimateRate from "./swap-estimate-rate";
import SwapSource from "./swap-source";
import SwapSwitchIndent from "./swap-switch-indent";

export function BridgeSwap() {
  return (
    <div className="css-1s36hdv e1isyl160">
      <div className="css-1ae8i4r egmuoqj1">
        <div className="css-yu1lbc egmuoqj0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <h3 className="MuiTypography-root MuiTypography-headline2 css-2wlho5">Swap </h3>
            <span style={{ fontSize: "0.75rem;" }}>0.1% Slippage Tolerance</span>
          </div>

          <div className="relative">
            <SwapSource />
            <SwapSwitchIndent />
            <SwapDes />
          </div>

          <SwapEstimateRate />
          <SwapBtnSubmit />
          <div className="css-1tpvyg6 e143h8xs0">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-current w-3 h-3"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.25 7C7.25 4.37665 9.37665 2.25 12 2.25C14.6234 2.25 16.75 4.37665 16.75 7V10.25H20.75V19C20.75 20.5188 19.5188 21.75 18 21.75H6C4.48122 21.75 3.25 20.5188 3.25 19V10.25H7.25V7ZM8.75 10.25H15.25V7C15.25 5.20507 13.7949 3.75 12 3.75C10.2051 3.75 8.75 5.20507 8.75 7V10.25ZM4.75 11.75V19C4.75 19.6904 5.30964 20.25 6 20.25H18C18.6904 20.25 19.25 19.6904 19.25 19V11.75H4.75ZM12.75 14.25V17.75H11.25V14.25H12.75Z"
                fill="currentColor"
              />
            </svg>
            <p className="MuiTypography-root MuiTypography-caption css-m1yo1i">
              Swap is powered and secured by NumBlock
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
