/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Footer() {
  return (
    <div className="pb-12 md:pb-0 ">
      <footer className="flex items-center justify-center dark:border-t dark:border-grey-600">
        {/* <div className="flex flex-col w-full max-w-[1536px] mx-auto px-4 md:px-8 py-10 gap-[40px] md:gap-[80px]">
           <div className="flex gap-[40px] sm:gap-5 flex-col sm:flex-row sm:items-center sm:justify-between">
            <a href="/">
              <h1 style={{ color: "white", fontWeight: "bold" }}>FIGCHAIN</h1>
            </a>
          </div>
          <p className="MuiTypography-root MuiTypography-body1 text-grey-300 css-i3l18a">© 2023 FigChain, Inc</p>
        </div> */}
        <div className=" w-full max-w-[1536px] mx-auto px-4 md:px-8 py-10">
          <div className="text-center p-2" style={{ color: "white" }}>
            Copyright © 2023 NumBlock Foundation.
          </div>
        </div>
      </footer>
    </div>
  );
}
