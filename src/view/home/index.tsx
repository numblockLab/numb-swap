import DefaultLayout from "../../layout";
import { BridgeSwap } from "./swap/bridge-swap";

export default function HomeView() {
  return (
    <DefaultLayout>
      <BridgeSwap />
    </DefaultLayout>
  );
}
