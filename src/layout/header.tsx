import ConnectWalletContainer from "./ConnectWalletContainer";
import { BNB_FAUCET_LINK, NUMB_FAUCET_LINK } from "@abi/constants";
import { notifyMessageError, notifyMessageSuccess } from "../emiter/AppEmitter";
import { useEthers } from "@usedapp/core";
import { airDropUSDT } from "@utils/airdrop-usdt";
/* eslint-disable jsx-a11y/no-redundant-roles */
export default function Header() {
  const { account } = useEthers();

  const goFaucet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const url = NUMB_FAUCET_LINK;
    window.open(url, "_blank");
  };
  const goFaucetBnb = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const url = BNB_FAUCET_LINK;
    window.open(url, "_blank");
  };

  const goFaucetUSDT = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (account) {
      notifyMessageSuccess("Sending request!");
      airDropUSDT(account)
        .then(() => notifyMessageSuccess("You got 10 USDT!"))
        .catch((res) => {
          if (res.response.data.message) {
            const dataResMsg = res.response.data.message;
            notifyMessageError(dataResMsg);
          } else {
            notifyMessageError("Error please try again!");
          }
        });
    } else {
      notifyMessageError("Please connect wallet!");
    }
  };
  return (
    <header
      className="MuiPaper-root MuiPaper-elevation MuiPaper-elevation4 MuiAppBar-root MuiAppBar-colorPrimary MuiAppBar-positionFixed bg-white dark:bg-grey-900 mui-fixed css-1exm00j"
      style={{}}
    >
      <div className="MuiContainer-root MuiContainer-maxWidthXl css-1ekb41w">
        <div className="MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular css-8g4gfm">
          <div className="flex lg:gap-6 items-center grow">
            <a role="link" tabIndex={0} href="/" className="">
              <img
                className="xs:h-[30px] md:h-[36px] 2xl:h-[56px]"
                src="/static/img/logos/numblock_logo.png"
                alt="NumBlock"
              />
            </a>
            <div className=" lg:flex gap-1">
              <div className="px-3 flex items-center">
                <button className="css-o3dwbz e1v5pgbr0 btn-header" type="button" onClick={(e) => goFaucet(e)}>
                  Faucet NUMB
                </button>
              </div>
            </div>
            <div className=" lg:flex gap-1">
              <div className="px-3 flex items-center">
                <button className="css-o3dwbz e1v5pgbr0 btn-header" type="button" onClick={(e) => goFaucetBnb(e)}>
                  Faucet BNB
                </button>
              </div>
            </div>
            <div className=" lg:flex gap-1">
              <div className="px-3 flex items-center">
                <button className="css-o3dwbz e1v5pgbr0 btn-header" type="button" onClick={(e) => goFaucetUSDT(e)}>
                  Faucet USDT
                </button>
              </div>
            </div>
            <div className="hidden lg:flex gap-1"></div>
          </div>
          <div className="css-muaxpu eqz6u831">
            <div className="inner-content">
              <div className="flex gap-2 justify-center w-full lg:w-auto" style={{}}>
                {/* <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiTypography-root MuiTypography-button w-full md:min-w-[163px] e1jvrmku0 css-35mpm5"
                  tabIndex={0}
                  type="button"
                >
                  Connect Wallet
                </button> */}
                <ConnectWalletContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
