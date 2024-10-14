import * as React from "react";
import { SVGProps } from "react";
import { colors } from "../styles/variables";

interface StyledChatIconProps extends SVGProps<SVGSVGElement> {
  dark?: boolean;
}

const ChatIcon = ({ dark }: StyledChatIconProps) => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 21L6.44444 16.5556H19.7778C20.3671 16.5556 20.9324 16.3214 21.3491 15.9047C21.7659 15.4879 22 14.9227 22 14.3333V3.22222C22 2.63285 21.7659 2.06762 21.3491 1.65087C20.9324 1.23413 20.3671 1 19.7778 1H4.22222C3.63285 1 3.06762 1.23413 2.65087 1.65087C2.23413 2.06762 2 2.63285 2 3.22222V15.4444"
      stroke={dark ? colors.white : colors.black}
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
);
export default ChatIcon;
