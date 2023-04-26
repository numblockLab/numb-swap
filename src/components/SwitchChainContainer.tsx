import SwitchChainBtn from "@components/SwitchChainBtn";
import { useState } from "react";
import SwitchChainModal from "./SwitchChainModal";

export default function SwitchChainContainer(props: { currentChainId: number }) {
  const { currentChainId } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const onHandleOpen = () => {
    setShow(true);
  };
  return (
    <>
      <SwitchChainBtn handleOpenModal={onHandleOpen} currentChainId={currentChainId} />
      <SwitchChainModal isOpen={show} onClose={handleClose} currentChainId={currentChainId} />
    </>
  );
}
