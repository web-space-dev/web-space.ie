import { useState, useRef, useEffect, memo } from "react";
import styled from "@emotion/styled";
import { breakpoints, colors, dimensions } from "../../../styles/variables";
import { GridContainer } from "../../global/grid/gridContainer";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { getRemSize } from "../../../styles/globalCss";
import { Col } from "../../global/grid/Col";
import { Row } from "../../global/grid/Row";
import { IShowcase } from "../showcase";
import ShowcaseGalleryDesktop from "./showcase-gallery-desktop";
import useScrollProgress from "../../../hooks/useScrollProgress";

const StyledGridContainer = styled(GridContainer)`
  height: 100vh;
  display: flex;
  align-items: center;
  @media all and (min-width: 2000px) {
    padding-top: 90px;
  }
`;

const StyledSpacer = styled.div`
  height: 250vh;
`;

interface IStyledWrapper {
  open: boolean;
}

const StyledWrapper = styled.section<IStyledWrapper>`
  position: relative;
  height: auto;
`;

const StyledFollowingContainer = styled.div<IStyledWrapper>`
  position: sticky;
  height: 100vh;
  z-index: 20;
  background-color: ${colors.black};
  top: 0;
  left: 0;
  right: 0;

  @media (max-width: ${breakpoints.sm}px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledMotionWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow-y: hidden;
  @media all and (max-width: ${breakpoints.sm}px) {
    display: flex;
    align-items: center;
    overflow-x: scroll;
  }
`;

const StyledTitle = styled.h2<{ color: string }>`
  transition: 0.3s ease-in-out;
  margin-top: 0;
  font-size: ${getRemSize(dimensions.headingSizes.display2.desktop)};
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
`;

function ShowcaseWrapperDesktop({ title, projects }: IShowcase) {
  const [isOpen, setIsOpen] = useState(false);
  // const [inView, setInView] = useState(false);

  const ref = useRef(null);
  const ghostRef = useRef(null);
  const isInView = useInView(ref, { amount: 1, once: true });

  const scrollProgress = useScrollProgress(ghostRef);
  const scale = useTransform(scrollProgress, [0, 0.4], [0.1, 1]);

  useEffect(() => {
    const unsubscribe = scale.onChange((value) => {
      if (value === 1) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    });

    return () => unsubscribe();
  }, [scale]);

  return (
    <StyledWrapper open={isOpen}>
      <StyledFollowingContainer ref={ref} open={isOpen}>
        <StyledGridContainer>
          <Row>
            <Col start={1} span={12}>
              <StyledTitle color={isOpen ? colors.accent : colors.white}>
                {title}
              </StyledTitle>
            </Col>
          </Row>
        </StyledGridContainer>
        <StyledMotionWrapper
          layout
          transition={{ duration: 1 }}
          style={scale ? { scale } : {}}
        >
          <ShowcaseGalleryDesktop items={projects} isOpen={isOpen} />
        </StyledMotionWrapper>
      </StyledFollowingContainer>
      <StyledSpacer ref={ghostRef} />
    </StyledWrapper>
  );
}

export default memo(ShowcaseWrapperDesktop);
