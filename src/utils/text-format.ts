import { formatEther } from "@ethersproject/units";

export function formatShortTx(text: string) {
  if (text.length > 13) {
    return `${text.substring(0, 4)}...${text.substring(text.length - 8, text.length)}`;
  }
  return text;
}

export function formatEtherFixed5(amountOfTokens: string | number) {
  const srtVal = formatEther(amountOfTokens || 0);
  return Number(srtVal).toFixed(5);
}
