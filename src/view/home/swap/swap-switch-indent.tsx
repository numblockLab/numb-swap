import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { getSwapSelector } from "@store/selector/swap-selectors";
import { switchSourceDes } from "@store/actions/swap-action";

export default function SwapSwitchIndent() {
  const swapData = useAppSelector(getSwapSelector);
  const dispatch = useAppDispatch();

  const onSwapSwitch = () => {
    if (swapData.source.selectedToken && swapData.destination.selectedToken) {
      dispatch(switchSourceDes());
    }
  };
  return (
    <div className="flex justify-center items-center h-[1px]">
      <button type="button" className="css-1w6n47d e14mugzc0" onClick={() => onSwapSwitch()}>
        <div className="invert-img relative w-3.5 h-3.5">
          <span
            style={{
              boxSizing: "border-box",
              display: "block",
              overflow: "hidden",
              width: "initial",
              height: "initial",
              background: "none",
              opacity: 1,
              border: "0px",
              margin: "0px",
              padding: "0px",
              position: "absolute",
              inset: "0px",
            }}
          >
            <img
              alt="invert"
              src="/static/img/icons/invert.svg"
              decoding="async"
              data-nimg="fill"
              style={{
                position: "absolute",
                inset: "0px",
                boxSizing: "border-box",
                padding: "0px",
                border: "none",
                margin: "auto",
                display: "block",
                width: "0px",
                height: "0px",
                minWidth: "100%",
                maxWidth: "100%",
                minHeight: "100%",
                maxHeight: "100%",
              }}
              sizes="100vw"
              srcSet="/static/img/icons/invert.svg 640w, /static/img/icons/invert.svg 750w, /static/img/icons/invert.svg 828w, /static/img/icons/invert.svg 1080w, /static/img/icons/invert.svg 1200w, /static/img/icons/invert.svg 1920w, /static/img/icons/invert.svg 2048w, /static/img/icons/invert.svg 3840w"
            />
          </span>
        </div>
      </button>
    </div>
  );
}
