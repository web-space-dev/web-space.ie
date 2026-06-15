import * as React from "react";
import { SVGProps } from "react";
import { colors } from "../styles/variables";

interface IProps extends SVGProps<SVGSVGElement> {
  dark?: boolean;
}

const Cursor = ({ dark = true }: IProps) => (
  <svg
    width="47"
    height="47"
    viewBox="0 0 47 47"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.24924 5.5353L37.2343 16.0297C37.785 16.2383 38.2587 16.6104 38.5917 17.0961C38.9247 17.5817 39.1011 18.1577 39.0972 18.7466C39.0933 19.3354 38.9092 19.909 38.5697 20.3902C38.2303 20.8714 37.7517 21.2371 37.1982 21.4384L25.6476 25.6369L25.6411 25.6411L25.6372 25.647L21.4384 37.1982C21.2372 37.7516 20.8714 38.2303 20.3902 38.5697C19.909 38.9092 19.3354 39.0933 18.7466 39.0972C18.1577 39.1011 17.5817 38.9247 17.0961 38.5917C16.6104 38.2587 16.2383 37.785 16.0297 37.2343L16.028 37.2299L5.5353 9.24924C5.3408 8.73065 5.29968 8.16692 5.41691 7.62561C5.53415 7.08425 5.80477 6.5881 6.19643 6.19643C6.5881 5.80477 7.08425 5.53415 7.62561 5.41691C8.16692 5.29968 8.73065 5.3408 9.24924 5.5353Z"
      fill="white"
      stroke="#1D1D1D"
      strokeWidth="1.92308"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Cursor;
