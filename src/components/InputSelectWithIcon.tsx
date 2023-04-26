interface Props {
  title: string;
  imgUrl: string;
  onClickHanlder: () => void;
}
export default function InputSelectWithIcon(props: Props) {
  const { title, imgUrl, onClickHanlder } = props;
  return (
    <button type="button" className="css-kjyh70 ecs3q253" onClick={() => onClickHanlder()}>
      <div className="css-8krjsn ecs3q252">
        <div className="css-15753k5 ecs3q251">
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
              alt="asset"
              srcSet={`/static/img/logos/${imgUrl} 1x, /static/img/logos/${imgUrl} 2x`}
              src={`/static/img/logos/${imgUrl}`}
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
        </div>
        <p className="MuiTypography-root MuiTypography-caption font-semibold text-left leading-3 css-m1yo1i">{title}</p>
      </div>
      <div className="css-12bfvy2 ecs3q250">
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
      </div>
    </button>
  );
}
