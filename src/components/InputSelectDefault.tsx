import { useMemo } from "react";

interface Props {
  title: string;
  disabled?: boolean;
  onClickHanlder: () => void;
}
//css-11dp9kx
export default function InputSelectDefault({ title, onClickHanlder, disabled }: Props) {
  const classBtn = useMemo(() => {
    // eslint-disable-next-line operator-linebreak
    let clas =
      "MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiTypography-root MuiTypography-button ec4inb70 e18czh0v0 css-1xcwaqa";
    if (disabled) {
      clas += " css-11dp9kx";
    }
    return clas;
  }, [disabled]);
  return (
    <button disabled={disabled} onClick={() => onClickHanlder()} className={classBtn} tabIndex={0} type="button">
      <p
        className="MuiTypography-root MuiTypography-caption text-left font-medium css-m1yo1i text-grey-50 "
        style={{ color: "white" }}
      >
        {title}
      </p>
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-current w-4 h-4"
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
