import { NumericFormat } from "react-number-format";

const defaultDecimalPlaces = 0;

export default function MoneyComponent(props: {
  numValue: number | string;
  decimalPlaces?: number;
  className?: string;
}): JSX.Element {
  const { numValue, decimalPlaces, className } = props;

  return (
    <NumericFormat
      value={numValue}
      displayType="text"
      thousandSeparator
      prefix=""
      decimalScale={decimalPlaces || defaultDecimalPlaces}
      className={className}
    ></NumericFormat>
  );
}
