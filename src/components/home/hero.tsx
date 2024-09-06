import styled from "@emotion/styled";
import { colors, breakpoints } from "../../styles/variables";
import { GridContainer } from "../global/grid/gridContainer";
import Image from "next/image";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";
import { memo } from "react";
import { motion } from "framer-motion";

const StyledWrapper = styled(GridContainer)`
  height: 100vh;
  align-items: center;
`;

const Background = styled.span`
  background-color: ${colors.white};
  width: 100%;
  height: 100vh;
`;

const StyledRow = styled(Row)`
  height: 100vh;
  align-items: center;
`;

const StyledHeading = styled(motion.h1)`
  color: ${colors.black};
  font-weight: 500;

  @media all and (max-width: ${breakpoints.md}px) {
    text-indent: 60px;
  }
`;

const StyledImage = styled(Image)`
  margin-right: 65px;
  margin-bottom: -5px;
  @media all and (max-width: ${breakpoints.md}px) {
    display: none;
  }
`;

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

function Hero({ title }) {
  const text = title.split(" ");
  return (
    <Background>
      <StyledWrapper>
        <StyledRow>
          <Col start={2} span={10}>
            <StyledHeading variants={variants} initial="closed" animate="open">
              <StyledImage
                src={"/logo-icon.png"}
                alt="WebSpace Icon"
                width="33"
                height="40"
              />

              {text.map((el, i) => (
                <motion.span
                  initial={{ color: "#1d1d1d33" }}
                  animate={{ color: colors.black }}
                  transition={{
                    duration: 0.5,
                    delay: i / 8,
                  }}
                  key={i}
                >
                  {el}{" "}
                </motion.span>
              ))}
            </StyledHeading>
          </Col>
        </StyledRow>
      </StyledWrapper>
    </Background>
  );
}

export default memo(Hero);
