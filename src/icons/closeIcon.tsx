import * as React from "react";
import { SVGProps } from "react";
import { colors } from "../styles/variables";

interface StyledChatIconProps extends SVGProps<SVGSVGElement> {
  dark?: boolean;
}

const CloseIcon = ({ dark }: StyledChatIconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.6742 12.327L1.63164 0.284424L0.453125 1.46293L12.4957 13.5055L0.453432 25.5478L1.63194 26.7263L13.6742 14.684L25.7165 26.7263L26.895 25.5478L14.8527 13.5055L26.8953 1.46296L25.7168 0.284448L13.6742 12.327Z"
      fill={dark ? colors.white : colors.black}
    />
  </svg>
);
export default CloseIcon;
