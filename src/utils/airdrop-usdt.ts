import axios from "axios";

export function airDropUSDT(address: string) {
  return axios.get(`/api/v1/misc/air-drop/${address}`);
}
