import * as React from "react";
import { SVGProps } from "react";
import { colors } from "../styles/variables";
import { motion, useAnimation, useSpring } from "framer-motion";

interface StyledLogoIconProps extends SVGProps<SVGSVGElement> {
  dark?: boolean;
}

const LogoIcon = ({ dark = true }: StyledLogoIconProps) => {
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start({
      fill: dark ? colors.white : colors.black,
      transition: { duration: 0.3 },
    });
  }, [dark]);

  return (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 79 107"
      fill={dark ? colors.white : colors.black}
      xmlns="http://www.w3.org/2000/svg"
      animate={controls}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M44 64.0563V79.8198L0 51.7164L2.63281e-06 27.8581L44 0.819824V16.5833L7.12754 39.6808L44 64.0563ZM35 91.0564V106.82L79 78.7164V54.8582L35 27.8198V43.5833L71.8725 66.6808L35 91.0564Z"
      />
    </motion.svg>
  );
};

export default LogoIcon;
