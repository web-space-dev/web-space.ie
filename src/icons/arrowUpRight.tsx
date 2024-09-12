import * as React from "react";
import { SVGProps } from "react";

const ArrowUpRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill ? props.fill : "#000"}
      fillRule="evenodd"
      d="M18.13 8.646H9.292v1.25H19.38l-1.25-1.25Zm1.951 1.95L9.033 21.645l.883.884L20.965 11.48l-.884-.884Zm1.585 1.585V22.27h1.25V13.43l-1.25-1.25Z"
      clipRule="evenodd"
    />
  </svg>
);
export default ArrowUpRight;
