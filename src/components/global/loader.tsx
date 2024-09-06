import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import WebLeft from "../../icons/webLeft";
import WebRight from "../../icons/webRight";
import useAnimatedCounter from "../../hooks/useAnimatedCounter";
import LogoFullNoIcon from "../../icons/logoFullNoIcon";

const StyledLogoIconWrapper = styled(motion.div)`
  position: absolute;
  z-index: 1;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: ${breakpoints.sm}px) {
    svg {
      width: 300px;
    }
  }
`;

const StyledWrapper = styled(motion.div)<{ fillwhite: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${(props) =>
    props.fillwhite === "false" &&
    `radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    ${colors.black} 70%
  );`} 
  flex-direction: column;
`;

const StyledPercentageWrapper = styled(motion.div)`
  position: relative;
  width: 120px;
  margin: 0 auto;
  text-align: center;
`;

const StyledWebLeftWrapper = styled(motion.div)`
  position: absolute;
  /* top: -30px;
  left: -80px; */
  z-index: 5;

  top: -20px;
  left: -105px;
  @media (max-width: ${breakpoints.sm}px) {
    svg {
      width: 48px;
    }
  }
  /* svg path {
    fill: red;
  } */
`;

const Percentage = styled(motion.span)`
  font-size: ${dimensions.headingSizes.medium.desktop}px;
  margin-bottom: 20px;
`;

const StyledWebRightWrapper = styled(motion.div)`
  position: absolute;
  /* bottom: -30px;
  right: -80px; */
  z-index: 5;

  bottom: -20px;
  right: -105px;

  @media (max-width: ${breakpoints.sm}px) {
    svg {
      width: 48px;
    }
  }

  /* svg path {
    fill: red;
  } */
`;

interface IProps {
  finishLoading: (finished: boolean) => void;
}

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const Loader = ({ finishLoading }: IProps) => {
  const [initialAnimationComplete, setInitialAnimationComplete] =
    useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [morphing, setMorphing] = useState(false);
  const [hideLogo, setHideLogo] = useState(false);

  const { ref, formattedValue } = useAnimatedCounter({
    value: 100,
    direction: "up",
    start: initialAnimationComplete,
  });

  useEffect(() => {
    if (formattedValue === "100") {
      setTimeout(() => {
        setMorphing(true);
      }, 500);
    }
  }, [formattedValue, finishLoading]);

  useEffect(() => {
    if (showLogo) {
      setTimeout(() => {
        setHideLogo(true);
        setTimeout(() => {
          finishLoading(true);
        }, 1000);
      }, 1500);
    }
  }, [showLogo]);

  return (
    <StyledWrapper
      fillwhite={hideLogo.toString()}
      animate={{ backgroundColor: hideLogo ? colors.white : colors.black }}
      transition={{ duration: 1 }}
    >
      <StyledPercentageWrapper
        initial="closed"
        animate={hideLogo ? "closed" : "open"}
        variants={variants}
        onAnimationComplete={() => {
          setInitialAnimationComplete(true);
        }}
      >
        <StyledWebLeftWrapper
          className="web-left"
          animate={morphing ? { top: -19, left: -102 } : {}}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <WebLeft />
        </StyledWebLeftWrapper>
        <Percentage
          className="percentage"
          ref={ref}
          animate={morphing ? { opacity: 0 } : {}}
          transition={{ duration: 0.1 }}
        >
          {formattedValue}%
        </Percentage>
        <StyledWebRightWrapper
          className="web-right"
          animate={morphing ? { bottom: -18, right: 135 } : {}}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          onAnimationComplete={() => {
            setShowLogo(true);
          }}
        >
          <WebRight />
        </StyledWebRightWrapper>
      </StyledPercentageWrapper>

      {!hideLogo && (
        <StyledLogoIconWrapper
          className="logo-icon"
          animate={showLogo && !hideLogo ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <LogoFullNoIcon />
        </StyledLogoIconWrapper>
      )}
    </StyledWrapper>
  );
};

export default Loader;
