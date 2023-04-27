import { shortenIfAddress, useEthers } from "@usedapp/core";

type Props = {
  handleOpenModal: any;
};

export default function ConnectButton({ handleOpenModal }: Props) {
  const { activateBrowserWallet, account } = useEthers();

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <>
      <button
        onClick={() => handleOpenModal()}
        className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiTypography-root MuiTypography-button e1hxx02w0 e1jvrmku0 css-ljhvh"
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
              src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2724%27%20height=%2724%27/%3e"
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
            alt="wallet"
            src=" https://labs.zetachain.com/_next/image?url=%2Fimg%2Flogos%2Fmeta-mask-logo.png&w=48&q=75"
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
            srcSet="https://labs.zetachain.com/_next/image?url=%2Fimg%2Flogos%2Fmeta-mask-logo.png&w=32&q=75 1x, https://labs.zetachain.com/_next/image?url=%2Fimg%2Flogos%2Fmeta-mask-logo.png&w=48&q=75 2x"
          />
        </span>
        {shortenIfAddress(account)}
        <div className="css-1f8h885 e16vx0xp0" />
      </button>
    </>
  ) : (
    // <button type="button" className="btn-connect-wallet getstarted scrollto d-inline-flex" onClick={handleOpenModal}>
    //   <Identicon />
    //   <span className="text-white mx-2">{shortenIfAddress(account)}</span>
    // </button>
    <button
      onClick={() => handleConnectWallet()}
      className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiTypography-root MuiTypography-button w-full md:min-w-[163px] e1jvrmku0 css-35mpm5"
      tabIndex={0}
      type="button"
    >
      Connect Wallet
    </button>
  );
}
