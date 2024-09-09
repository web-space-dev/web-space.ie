import styled from "@emotion/styled";
import { colors, breakpoints, dimensions } from "../../styles/variables";
import { GridContainer } from "../global/grid/gridContainer";
import Image from "next/image";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";
import { memo } from "react";
import { motion } from "framer-motion";
import { getRemSize } from "../../styles/globalCss";

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
    font-size: ${dimensions.headingSizes.medium.desktop}px;
  }

  @media all and (max-width: 800px) {
    font-size: ${dimensions.headingSizes.medium.desktop - 10}px;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    text-indent: 60px;
    font-size: ${dimensions.headingSizes.medium.mobile}px;
  }

  @media all and (max-height: 700px) {
    font-size: ${getRemSize(dimensions.headingSizes.medium.desktop - 15)};

    img {
      width: 28px;
      height: 35px;
    }

    @media all and (max-width: 750px) {
      font-size: ${getRemSize(dimensions.headingSizes.medium.desktop - 25)};
    }

    @media all and (max-width: ${breakpoints.sm}px) {
      font-size: ${getRemSize(dimensions.headingSizes.medium.mobile)};
    }

    @media all and (max-width: 450px) {
      font-size: ${getRemSize(dimensions.headingSizes.medium.mobile - 5)};
    }
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
