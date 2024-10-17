import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import WebLeft from "../../icons/webLeft";
import WebRight from "../../icons/webRight";
import useAnimatedCounter from "../../hooks/useAnimatedCounter";
import LogoFull from "../../icons/logoFull";
import AnimateInView from "./animation/animateInView";
import { GridContainer } from "./grid/gridContainer";
import { Row } from "./grid/Row";
import { Col } from "./grid/Col";
import { getRemSize } from "../../styles/globalCss";
import LogoIcon from "../../icons/logoIcon";

// const StyledWrapper = styled(motion.div)`
//   position: absolute;
//   z-index: 1;
//   opacity: 0;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);

//   @media (max-width: ${breakpoints.sm}px) {
//     svg {
//       width: 300px;
//     }
//   }
// `;

const StyledWrapper = styled(motion.div)<{ fillwhite: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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

const StyledGridContainer = styled(GridContainer)`
  height: 100vh;
  display: flex;
  align-items: center;
  @media all and (min-width: 2000px) {
    padding-top: 90px;
  }
`;

const StyledLogoIconWrapper = styled.div`
  /* margin-top: 50px; */
  position: absolute;
  top: 20px;
  left: 20px;
`;

const StyledTitle = styled(motion.h1)<{ color: string }>`
  transition: 0.3s ease-in-out;
  margin-top: 0;
  font-size: ${getRemSize(dimensions.headingSizes.display2.desktop - 20)};
  text-align: center;
  line-height: 200px;
  color: ${({ color }) => color};

  @media all and (max-width: 1380px) {
    font-size: ${getRemSize(dimensions.headingSizes.display2.desktop - 50)};
    line-height: 210px;
  }
  @media all and (max-width: 1100px) {
    font-size: ${getRemSize(dimensions.headingSizes.display2.desktop - 80)};
  }
  @media all and (max-width: 930px) {
    font-size: ${getRemSize(dimensions.headingSizes.display2.desktop - 100)};
  }

  @media all and (max-width: 700px) {
    font-size: ${getRemSize(dimensions.headingSizes.display2.desktop - 130)};
  }

  @media all and (max-width: 600px) {
    font-size: ${getRemSize(dimensions.headingSizes.display2.desktop - 150)};
    line-height: 160px;
  }

  @media all and (max-height: 700px) {
    font-size: ${getRemSize(dimensions.headingSizes.display2.desktop - 120)};
    line-height: 160px;
  }

  @media all and (max-width: 600px) {
    font-size: ${getRemSize(80)};
    line-height: 100px;
  }
`;

const StyledHeading = styled(motion.h1)`
  margin: 50px auto 20px 0;
  font-size: 120px;
`;

const StyledText = styled(motion.p)``;

interface IProps {
  finishLoading: (finished: boolean) => void;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const ComingSoon = () => {
  return (
    <StyledWrapper fillwhite={"false"} transition={{ duration: 1 }}>
      <StyledLogoIconWrapper>
        <AnimateInView variants={variants}>
          <LogoIcon />
        </AnimateInView>
      </StyledLogoIconWrapper>
      <StyledGridContainer>
        <Row>
          <Col start={1} span={12}>
            <StyledTitle
              color={colors.white}
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 4, delay: 1 }}
            >
              Something new is on it's way, check back soon.
            </StyledTitle>
          </Col>
        </Row>
      </StyledGridContainer>
      {/* </StyledLogoIconWrapper> */}
      {/* )} */}
    </StyledWrapper>
  );
};

export default ComingSoon;
