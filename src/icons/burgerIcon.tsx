import * as React from "react";
import { SVGProps } from "react";
import { colors } from "../styles/variables";
import { motion } from "framer-motion";

interface StyledBurgerIconProps extends SVGProps<SVGSVGElement> {
  dark?: boolean;
}

const BurgerIcon = ({ dark }: StyledBurgerIconProps) => {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 17 13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.line
        y1="0.5"
        x2="17"
        y2="0.5"
        stroke={dark ? colors.white : colors.black}
      />
      <motion.line
        y1="6.5"
        x2="17"
        y2="6.5"
        stroke={dark ? colors.white : colors.black}
      />
      <motion.line
        y1="12.5"
        x2="17"
        y2="12.5"
        stroke={dark ? colors.white : colors.black}
      />
    </motion.svg>
  );
};
export default BurgerIcon;
