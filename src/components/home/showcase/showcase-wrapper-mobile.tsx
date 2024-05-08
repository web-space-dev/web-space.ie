import styled from "@emotion/styled";
import { breakpoints, colors, dimensions } from "../../../styles/variables";
import { GridContainer } from "../../global/grid/gridContainer";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { getRemSize } from "../../../styles/globalCss";
import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  Fragment,
} from "react";
import { Col } from "../../global/grid/Col";
import { Row } from "../../global/grid/Row";
import { IShowcase } from "../showcase";
import ShowcaseItemMobile from "./showcase-item-mobile";
import ShowcaseItemMobileAllProjects from "./showcase-item-mobile-all-projects";
import useDebugPanel from "../../../hooks/useDebugPanel";

const StyledSpacer = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  /* width: 100vw; */
  visibility: hidden;
`;

interface IStyledWrapper {
  open: boolean;
}

const StyledWrapper = styled(GridContainer)<IStyledWrapper>`
  position: sticky;

  height: 100vh;
  z-index: 20;
  background-color: ${colors.black};
  top: 0;
  left: 0;
  right: 0;
  will-change: transform;
  overflow: hidden;

  @media (max-width: ${breakpoints.sm}px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledMotionWrapper = styled(motion.div)`
  display: flex;
  width: max-content;
  height: 100vh;
  overflow: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
`;

const StyledItemContainer = styled.div`
  overflow-y: scroll;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  position: relative;
  height: 100vh;
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
  margin-right: 343px;
  scroll-snap-align: center;
`;

const useScrollProgress = (ref) => {
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      const rect = ref.current.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      const end = start + rect.height;
      const scrollPos = window.scrollY - start;
      const progress = Math.max(0, Math.min(scrollPos / (end - start), 1));
      scrollProgress.set(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, scrollProgress]);

  return scrollProgress;
};

export default function ShowcaseWrapperMobile({ title, projects }: IShowcase) {
  const ghostRef = useRef(null);
  const horizontalRef = useRef(null);
  const wrapperRef = useRef(null);
  const horizontalWidth = 2500;

  const scrollProgress = useScrollProgress(ghostRef);

  const isInView = useInView(wrapperRef);

  const transform = useTransform(
    scrollProgress,
    [0, 1],
    isInView ? [0, -horizontalWidth] : [0, 0]
  );
  const cappedTransform = useMotionValue(Math.min(transform.get(), 1450));

  const textOpacityTransform = useTransform(scrollProgress, [0, 0.1], [1, 0]);

  // const cappedTransform = useMotionValue(transform.get());

  useEffect(() => {
    const unsubscribe = transform.onChange((value) => {
      cappedTransform.set(Math.max(value, -1410));
    });

    return unsubscribe;
  }, [transform, cappedTransform]);

  return (
    <div style={{ position: "relative" }}>
      <StyledWrapper open={false} ref={wrapperRef}>
        <Row>
          <Col start={1} span={12}>
            <StyledTitle
              color={false ? colors.accent : colors.white}
              style={{ opacity: textOpacityTransform }}
            >
              {title}
            </StyledTitle>
          </Col>
        </Row>

        <StyledMotionWrapper ref={horizontalRef} style={{ x: cappedTransform }}>
          <StyledItemContainer>
            <StyledMobileSpacer />
            {projects.nodes.map((project, index: number) => {
              return <ShowcaseItemMobile key={index} project={project} />;
            })}
            <ShowcaseItemMobileAllProjects />
          </StyledItemContainer>
        </StyledMotionWrapper>
      </StyledWrapper>
      <StyledSpacer ref={ghostRef} height={horizontalWidth} />
    </div>
  );
}
