import { shortenIfAddress, useEtherBalance, useEthers } from "@usedapp/core";

import { getEtherTokenSymbol } from "@abi/tokenAddress";
import { formatEther } from "@ethersproject/units";
import { Dialog } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";

type Props = {
  isOpen: boolean;
  onClose(): void;
};
// const FIG_ADDRESS = "0x3AA56A9c28b77223709d040e32B74694f6381847";

export default function AccountModal(props: Props) {
  const { isOpen, onClose } = props;
  const { account, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);
  // const daiBalance = useTokenBalance(FIG_ADDRESS, account);
  function handleDeactivateAccount() {
    deactivate();
    onClose();
  }
  //   const viewExplorer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //     e.preventDefault();
  //     if (account) {
  //       const url = FIG_CHAIN.getExplorerAddressLink(account);
  //       window.open(url, "_blank");
  //     }
  //   };
  // const goFaucet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   if (account) {
  //     const url = NUMB_FAUCET_LINK;
  //     window.open(url, "_blank");
  //   }
  // };
  // const goFaucetBnb = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   if (account) {
  //     const url = BNB_FAUCET_LINK;
  //     window.open(url, "_blank");
  //   }
  // };

  return (
    <Dialog onClose={onClose} open={isOpen} data-rk>
      <div className="iekbcc0 ju367v4 ju367v8f _9pm4ki3 ju367v92 ju367vai ju367va ju367v2j ju367v8f">
        <div className="_9pm4ki5 ju367va ju367v10 ju367v8g">
          <div className="iekbcc0 _1ckjpok1 ju367val ju367vd0 ju367vp ju367vt ju367vv ju367vdu ju367va ju367v10 ju367v61 ju367v8g _1ckjpok5 ju367vq _1ckjpok6">
            <div className="iekbcc0 ju367v7t ju367v62 ju367v6n ju367v78">
              <div className="iekbcc0 ju367va ju367v10">
                <div className="iekbcc0 ju367v84 ju367v6d ju367v6y ju367v7j ju367vb6">
                  <div
                    className="iekbcc0 ju367v4n ju367v2w ju367v3h ju367v42 ju367v4 ju367va ju367v10 ju367v1n ju367v2j"
                    style={{ textAlign: "center" }}
                  >
                    <div
                      className="iekbcc0"
                      style={{ position: "absolute", right: "16px", top: "16px", willChange: "transform" }}
                    >
                      <button
                        onClick={() => onClose()}
                        className="iekbcc0 iekbcc9 ju367v4 ju367v9l ju367vbl ju367vs ju367vt ju367vv ju367veo ju367va ju367v26 ju367v2j ju367v8i ju367v8r _12cbo8i3 ju367v8g _12cbo8i5 _12cbo8i7"
                        aria-label="Close"
                        type="button"
                        style={{ willChange: "transform" }}
                      >
                        <svg
                          aria-hidden="true"
                          fill="none"
                          height={10}
                          viewBox="0 0 10 10"
                          width={10}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L3.58579 5L0.292893 8.29289C-0.0976311 8.68342 -0.0976311 9.31658 0.292893 9.70711C0.683417 10.0976 1.31658 10.0976 1.70711 9.70711L5 6.41421L8.29289 9.70711C8.68342 10.0976 9.31658 10.0976 9.70711 9.70711C10.0976 9.31658 10.0976 8.68342 9.70711 8.29289L6.41421 5L9.70711 1.70711C10.0976 1.31658 10.0976 0.683417 9.70711 0.292893C9.31658 -0.0976311 8.68342 -0.0976311 8.29289 0.292893L5 3.58579L1.70711 0.292893Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>{" "}
                    <div className="iekbcc0 ju367v4g">
                      <div
                        className="iekbcc0 ju367vs ju367v61 ju367v8g ju367v8j"
                        aria-hidden="true"
                        style={{ height: "74px", width: "74px" }}
                      >
                        <div
                          className="iekbcc0 ju367v4 ju367vs ju367va ju367v2j ju367v61 ju367v8e ju367v8j"
                          style={{
                            fontSize: "41px",
                            height: "74px",
                            transition: "all 0.25s ease 0.1s",
                            width: "74px",
                            willChange: "transform",
                          }}
                        >
                          <div className="w-[80%] h-[80%] relative">
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
                                alt="wallet"
                                sizes="100vw"
                                srcSet="https://labs.zetachain.com/_next/image?url=%2Fimg%2Flogos%2Fmeta-mask-logo.png&w=640&q=75 640w, https://labs.zetachain.com/_next/image?url=%2Fimg%2Flogos%2Fmeta-mask-logo.png&w=750&q=75 750w, https://labs.zetachain.com/_next/image?url=%2Fimg%2Flogos%2Fmeta-mask-logo.png&w=828&q=75 828w, https://labs.zetachain.com/_next/image?url=%2Fimg%2Flogos%2Fmeta-mask-logo.png&w=1080&q=75 1080w, https://labs.zetachain.com/_next/image?url=%2Fimg%2Flogos%2Fmeta-mask-logo.png&w=1200&q=75 1200w, https://labs.zetachain.com/_next/image?url=%2Fimg%2Flogos%2Fmeta-mask-logo.png&w=1920&q=75 1920w, https://labs.zetachain.com/_next/image?url=%2Fimg%2Flogos%2Fmeta-mask-logo.png&w=2048&q=75 2048w, https://labs.zetachain.com/_next/image?url=%2Fimg%2Flogos%2Fmeta-mask-logo.png&w=3840&q=75 3840w"
                                src="https://labs.zetachain.com/_next/image?url=%2Fimg%2Flogos%2Fmeta-mask-logo.png&w=3840&q=75"
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
                                  objectFit: "contain",
                                }}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="iekbcc0 ju367va ju367v10 ju367v1e ju367v2n">
                      <div className="iekbcc0 ju367v2n">
                        <h1 className="iekbcc0 ju367vfx ju367v11 ju367v16 ju367v1d ju367v2o">
                          {shortenIfAddress(account)}
                        </h1>
                      </div>
                      <div className="iekbcc0 ju367v2n">
                        <h1 className="iekbcc0 ju367vg3 ju367v11 ju367v14 ju367v1b ju367v2o">
                          {formatEther(etherBalance || 0)} {getEtherTokenSymbol()}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="iekbcc0 ju367v4r ju367v2r ju367v3c ju367v3x ju367va ju367vz ju367v1l">
                    <CopyToClipboard text={account || ""}>
                      <button
                        className="iekbcc0 iekbcc9 ju367v80 ju367v69 ju367v6u ju367v7f ju367vb0 ju367vb4 ju367vo ju367vdx ju367va ju367v8i ju367v90 _12cbo8i3 ju367v8g _12cbo8i4 _12cbo8i7"
                        type="button"
                        style={{ willChange: "transform" }}
                      >
                        <div className="iekbcc0 ju367v4 ju367va ju367v10 ju367v1f ju367v2j ju367v7v ju367v90">
                          <div className="iekbcc0 ju367vfx ju367v2g">
                            <svg
                              fill="none"
                              height={16}
                              viewBox="0 0 17 16"
                              width={17}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.04236 12.3027H4.18396V13.3008C4.18396 14.8525 5.03845 15.7002 6.59705 15.7002H13.6244C15.183 15.7002 16.0375 14.8525 16.0375 13.3008V6.24609C16.0375 4.69434 15.183 3.84668 13.6244 3.84668H12.4828V2.8418C12.4828 1.29688 11.6283 0.442383 10.0697 0.442383H3.04236C1.48376 0.442383 0.629272 1.29004 0.629272 2.8418V9.90332C0.629272 11.4551 1.48376 12.3027 3.04236 12.3027ZM3.23376 10.5391C2.68689 10.5391 2.39294 10.2656 2.39294 9.68457V3.06055C2.39294 2.47949 2.68689 2.21289 3.23376 2.21289H9.8783C10.4252 2.21289 10.7191 2.47949 10.7191 3.06055V3.84668H6.59705C5.03845 3.84668 4.18396 4.69434 4.18396 6.24609V10.5391H3.23376ZM6.78845 13.9365C6.24158 13.9365 5.94763 13.6699 5.94763 13.0889V6.45801C5.94763 5.87695 6.24158 5.61035 6.78845 5.61035H13.433C13.9799 5.61035 14.2738 5.87695 14.2738 6.45801V13.0889C14.2738 13.6699 13.9799 13.9365 13.433 13.9365H6.78845Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                          <div className="iekbcc0">
                            <div className="iekbcc0 ju367vfx ju367v11 ju367v13 ju367v1b ju367v2o">Copy Address</div>
                          </div>
                        </div>
                      </button>
                    </CopyToClipboard>
                    <button
                      onClick={() => handleDeactivateAccount()}
                      className="iekbcc0 iekbcc9 ju367v80 ju367v69 ju367v6u ju367v7f ju367vb0 ju367vb4 ju367vo ju367vdx ju367va ju367v8i ju367v90 _12cbo8i3 ju367v8g _12cbo8i4 _12cbo8i7"
                      type="button"
                      style={{ willChange: "transform" }}
                    >
                      <div className="iekbcc0 ju367v4 ju367va ju367v10 ju367v1f ju367v2j ju367v7v ju367v90">
                        <div className="iekbcc0 ju367vfx ju367v2g">
                          <svg
                            fill="none"
                            height={16}
                            viewBox="0 0 18 16"
                            width={18}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.67834 15.5908H9.99963C11.5514 15.5908 12.399 14.7432 12.399 13.1777V10.2656H10.6354V12.9863C10.6354 13.5332 10.3688 13.8271 9.78772 13.8271H2.89026C2.3092 13.8271 2.0426 13.5332 2.0426 12.9863V3.15625C2.0426 2.60254 2.3092 2.30859 2.89026 2.30859H9.78772C10.3688 2.30859 10.6354 2.60254 10.6354 3.15625V5.89746H12.399V2.95801C12.399 1.39941 11.5514 0.544922 9.99963 0.544922H2.67834C1.12659 0.544922 0.278931 1.39941 0.278931 2.95801V13.1777C0.278931 14.7432 1.12659 15.5908 2.67834 15.5908ZM7.43616 8.85059H14.0875L15.0924 8.78906L14.566 9.14453L13.6842 9.96484C13.5406 10.1016 13.4586 10.2861 13.4586 10.4844C13.4586 10.8398 13.7321 11.168 14.1217 11.168C14.3199 11.168 14.4635 11.0928 14.6002 10.9561L16.7809 8.68652C16.986 8.48145 17.0543 8.27637 17.0543 8.06445C17.0543 7.85254 16.986 7.64746 16.7809 7.43555L14.6002 5.17285C14.4635 5.03613 14.3199 4.9541 14.1217 4.9541C13.7321 4.9541 13.4586 5.27539 13.4586 5.6377C13.4586 5.83594 13.5406 6.02734 13.6842 6.15723L14.566 6.98438L15.0924 7.33984L14.0875 7.27148H7.43616C7.01917 7.27148 6.65686 7.62012 6.65686 8.06445C6.65686 8.50195 7.01917 8.85059 7.43616 8.85059Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="iekbcc0">
                          <div className="iekbcc0 ju367vfx ju367v11 ju367v13 ju367v1b ju367v2o">Disconnect</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
