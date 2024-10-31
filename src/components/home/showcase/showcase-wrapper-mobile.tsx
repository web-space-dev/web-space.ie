import styled from "@emotion/styled";
import { breakpoints, colors, dimensions } from "../../../styles/variables";
import { GridContainer } from "../../global/grid/gridContainer";
import { motion, useScroll, useTransform } from "framer-motion";
import { getRemSize } from "../../../styles/globalCss";
import { useRef } from "react";
import { Col } from "../../global/grid/Col";
import { Row } from "../../global/grid/Row";
import { IShowcase } from "../showcase";
import ShowcaseItemMobile from "./showcase-item-mobile";
import ShowcaseItemMobileAllProjects from "./showcase-item-mobile-all-projects";

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
  height: 100vh;

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
  overflow-x: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  align-items: center;
  /* padding-right: 18px; */
`;

const StyledItemContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  overflow-x: auto;
  position: relative;
  height: 537px;
  width: max-content;
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
  const wrapperRef = useRef(null);
  const spacerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <StyledWrapper ref={wrapperRef}>
          <Row style={{ height: 537 }}>
            <Col start={1} span={12}>
              <StyledTitle
                style={{ opacity: titleOpacity }}
                color={colors.white}
              >
                {title}
              </StyledTitle>
            </Col>
          </Row>

          <StyledMotionWrapper>
            <StyledItemContainer
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
            >
              <StyledMobileSpacer />
              {projects.nodes.map((project, index: number) => {
                return <ShowcaseItemMobile key={index} project={project} />;
              })}
              <ShowcaseItemMobileAllProjects />
            </StyledItemContainer>
          </StyledMotionWrapper>
        </StyledWrapper>
        <StyledSpacer ref={spacerRef} height={1000} />
      </div>
    </>
  );
}

export default ShowcaseWrapperMobile;
