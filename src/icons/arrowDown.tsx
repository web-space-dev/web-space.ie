import * as React from "react";
import { SVGProps } from "react";

const ArrowDown = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ? props.width : 42}
      height={props.height ? props.height : 34}
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.2174 33.3333L41.5508 19.9999L39.6652 18.1143L24.4462 33.3333L28.2174 33.3333ZM22.332 33.3333L22.332 -1.31242e-05L19.6654 -1.33574e-05L19.6654 33.3333L22.332 33.3333ZM17.5508 33.3332L2.33183 18.1143L0.44621 19.9999L13.7796 33.3332L17.5508 33.3332Z"
        fill={props.fill ? props.fill : "#fff"}
      />
    </svg>
  );
};
export default ArrowDown;
