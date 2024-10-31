import styled from "@emotion/styled";
import { breakpoints, colors, dimensions } from "../../../styles/variables";
import { GridContainer } from "../../global/grid/gridContainer";
import { motion, useScroll, useTransform } from "framer-motion";
import { getRemSize } from "../../../styles/globalCss";
import { use, useRef } from "react";
import { Col } from "../../global/grid/Col";
import { Row } from "../../global/grid/Row";
import { IShowcase } from "../showcase";
import ShowcaseItemMobile from "./showcase-item-mobile";
import ShowcaseItemMobileAllProjects from "./showcase-item-mobile-all-projects";
import React from "react";

const StyledWrapper = styled(GridContainer)`
  position: sticky;
  top: 25vw;
  z-index: 20;
  background-color: ${colors.black};
  will-change: transform;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;

  @media (max-width: ${breakpoints.sm}px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledMotionWrapper = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 537px;
  /* overflow-x: auto; */
  position: absolute;
  /* top: 0; */
  left: 0;
  right: 0;
  align-items: center;
`;

const StyledItemContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  overflow-x: auto;
  position: relative;
  height: 537px;
  width: max-content;
`;

const StyledRow = styled(Row)`
  /* height: 537px; */
  align-items: center;
`;

const StyledTitle = styled(motion.h2)<{ color: string }>`
  transition: 0.3s ease-in-out;
  margin-top: 0;
  font-size: ${getRemSize(dimensions.headingSizes.display2.desktop)};
  text-align: center;
  line-height: 225px;
  color: ${({ color }) => color};
  @media all and (max-width: 1164px) {
    font-size: ${getRemSize(dimensions.headingSizes.display2.desktop - 50)};
  }
  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.display2.mobile)};
    line-height: 72px;
  }
`;

const StyledMobileSpacer = styled.div`
  margin-right: 92vw;
  scroll-snap-align: center;
`;

const StyledSpacer = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  visibility: hidden;
`;

function ShowcaseWrapperMobile({ title, projects }: IShowcase) {
  const motionWrapperRef = useRef(null);
  const { scrollXProgress, scrollYProgress } = useScroll({
    container: motionWrapperRef,
  });

  const titleOpacity = useTransform(scrollXProgress, [0, 0.2], [1, 0]);

  React.useEffect(() => {
    console.log(scrollXProgress.get(), scrollYProgress.get());
  }, [scrollXProgress, scrollYProgress]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <StyledWrapper>
          <StyledRow>
            <Col start={1} span={12}>
              <StyledTitle
                style={{ opacity: titleOpacity }}
                color={colors.white}
              >
                {title}
              </StyledTitle>
            </Col>
          </StyledRow>

          <StyledMotionWrapper>
            <StyledItemContainer ref={motionWrapperRef}>
              <StyledMobileSpacer />
              {projects.nodes.map((project, index: number) => {
                return <ShowcaseItemMobile key={index} project={project} />;
              })}

              <ShowcaseItemMobileAllProjects />
            </StyledItemContainer>
          </StyledMotionWrapper>
        </StyledWrapper>
        <StyledSpacer height={1000} />
      </div>
    </>
  );
}

export default ShowcaseWrapperMobile;
