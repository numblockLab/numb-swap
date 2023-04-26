import { toast } from "react-toastify";

export const emitToastError = (errMsg: string | JSX.Element): void => {
  toast.error(errMsg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });
};
export const emitToastSuccess = (sucMessage: string | JSX.Element): void => {
  toast.success(<span className="span-success">{sucMessage}</span>, {
    position: "top-right",
    autoClose: 15000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });
};
export const emitToastDefault = (message: string | JSX.Element): void => {
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    type: toast.TYPE.DEFAULT,
  });
};

export function notify({
  message,
  type = "info",
}: {
  message: string;
  description?: string | JSX.Element;
  txid?: string;
  type?: string;
}): void {
  if (type === "success") {
    emitToastSuccess(message);
  } else if (type === "error") {
    emitToastError(message);
  } else {
    emitToastDefault(message);
  }
  // notification[type]({
  //   message: <span style={{ color: "black" }}>{message}</span>,
  //   description: <span style={{ color: "black", opacity: 0.5 }}>{description}</span>,
  //   placement,
  //   style: {
  //     backgroundColor: "white",
  //   },
  // });
}
