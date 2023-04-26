import { getChainIconInfo } from "@utils/index";
import { useMemo } from "react";

type Props = {
  handleOpenModal: any;
  currentChainId: number;
};

export default function SwitchChainBtn({ handleOpenModal, currentChainId }: Props) {
  const chainIconinfo = useMemo(() => {
    return getChainIconInfo(currentChainId);
  }, [currentChainId]);

  return (
    <button
      onClick={() => handleOpenModal()}
      className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiTypography-root MuiTypography-button min-w-0 e1hxx02w0 e1jvrmku0 css-ljhvh"
      tabIndex={0}
      type="button"
    >
      <span
        style={{
          boxSizing: "border-box",
          display: "inline-block",
          overflow: "hidden",
          width: "initial",
          height: "initial",
          background: "none",
          opacity: 1,
          border: "0px",
          margin: "0px",
          padding: "0px",
          position: "relative",
          maxWidth: "100%",
        }}
      >
        <span
          style={{
            boxSizing: "border-box",
            display: "block",
            width: "initial",
            height: "initial",
            background: "none",
            opacity: 1,
            border: "0px",
            margin: "0px",
            padding: "0px",
            maxWidth: "100%",
          }}
        >
          <img
            alt=""
            aria-hidden="true"
            src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e"
            style={{
              display: "block",
              maxWidth: "100%",
              width: "initial",
              height: "initial",
              background: "none",
              opacity: 1,
              border: "0px",
              margin: "0px",
              padding: "0px",
            }}
          />
        </span>
        <img
          alt={chainIconinfo.name}
          srcSet={`/static/img/logos/${chainIconinfo.iconPath} 1x, /static/img/logos/${chainIconinfo.iconPath} 2x`}
          src={`/static/img/logos/${chainIconinfo.iconPath}`}
          decoding="async"
          data-nimg="intrinsic"
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
        />
      </span>
      {chainIconinfo.name}
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-current h-4 w-4"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 7.93934L12 14.9393L19 7.93934L20.0607 9L12.5303 16.5303C12.2374 16.8232 11.7626 16.8232 11.4697 16.5303L3.93934 9L5 7.93934Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
