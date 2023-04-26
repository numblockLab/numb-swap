type Props = {
  title: string;
  onHandleClick(): void;
  iconUrl: string;
};
export function ChainIconItem(props: Props) {
  const { title, iconUrl, onHandleClick } = props;
  return (
    <button type="button" className="css-19s3tzc eu2qphv0" onClick={() => onHandleClick()}>
      <div className="flex items-center justify-center flex-shrink-0">
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
            alt={title}
            srcSet={`/static/img/logos/${iconUrl} 1x, /static/img/logos/${iconUrl} 2x`}
            src={`/static/img/logos/${iconUrl}`}
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
      <p className="MuiTypography-root MuiTypography-body1 css-i3l18a">{title}</p>
    </button>
  );
}

// export function ChainIconModal() {
//   return (
//     <div className="css-gj7b5f eu2qphv1">
//       <ChainIconItem
//         title={""}
//         onHandleClick={function (): void {
//           throw new Error("Function not implemented.");
//         }}
//         iconUrl={""}
//       />
//       <ChainIconItem />
//       <ChainIconItem />
//     </div>
//   );
// }
