import { Dialog } from "@mui/material";

export default function SwapModalWrapper(props: {
  title: string;
  description: string;
  isOpen: boolean;
  onClose(): void;
  children: JSX.Element | string | undefined | null;
}) {
  const { title, description, children, isOpen, onClose } = props;
  return (
    <Dialog onClose={onClose} open={isOpen} className="eo840kt4 css-137lhdu">
      <div className="css-e779zy eo840kt3">
        <div>
          <h3 className="MuiTypography-root MuiTypography-headline2 css-2wlho5">{title}</h3>
        </div>
        <button type="button" className="hover:scale-110 css-15fejx6 eo840kt2" onClick={() => onClose()}>
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black dark:text-white"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6 4.93935L12 10.9393L18 4.93935L19.0607 6.00001L13.0607 12L19.0607 18L18 19.0607L12 13.0607L6 19.0607L4.93934 18L10.9393 12L4.93934 6.00001L6 4.93935Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className="css-10c6y6e">
        <p className="css-i3l18a">{description}</p>
        {children}
      </div>
    </Dialog>
  );
}
