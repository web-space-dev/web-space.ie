import styled from "@emotion/styled";
import { breakpoints, colors, dimensions } from "../../../styles/variables";
import { GridContainer } from "../../global/grid/gridContainer";
import { motion, useScroll, useTransform } from "framer-motion";
import { getRemSize } from "../../../styles/globalCss";
import { useState, useRef, useEffect } from "react";
import useIsDesktop from "../../../hooks/useIsDesktop";
import { Col } from "../../global/grid/Col";
import { Row } from "../../global/grid/Row";
import { IShowcase } from "../showcase";
import ShowcaseItemDesktop from "./showcase-item-desktop";
import ShowcaseItemFinalDesktop from "./showcase-item-final-desktop";


const StyledGridContainer = styled(GridContainer)`
@media all and (min-width: 2000px) {
  padding-top: 150px
}
`

const StyledSpacer = styled.div<{ start: boolean }>`
  height: 300vh;
  
  ${({ start }) => (!start && `
  height: 140vh;
  @media all and (max-width: 1024px) {
    height: 160vh;
  }
  `)}
`;

interface IStyledWrapper {
  open: boolean;
}

const StyledWrapper = styled.section<IStyledWrapper>`
  position: relative;
  height: ${({ open }) => (open ? "100vh" : "auto")};
`;

const StyledFollowingContainer = styled.div<IStyledWrapper>`
  position: ${({ open }) => (open ? "fixed" : "sticky")};
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

const StyledMotionWrapper = styled(motion.div)<IStyledWrapper>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  ${({ open }) => (open ? `height: 100vh;` : `overflow: hidden;`)}
  @media all and (max-width: ${breakpoints.sm}px) {
    display: flex;
    align-items: center;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
  }
`;

const StyledTitle = styled.h2<{ color: string }>`
  transition: 0.3s ease-in-out;
  margin-top: 0;
  font-size: ${getRemSize(dimensions.headingSizes.display2.desktop)};
  text-align: center;
  /* grid-column: 1 / span 12; */
  line-height: 225px;
  color: ${({ color }) => color};


  @media all and (max-width: 1164px) {
    font-size: ${getRemSize(dimensions.headingSizes.display2.desktop - 50)};
    line-height: 195px;
  }
  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.display2.mobile)};
    line-height: 72px;
  }
`;

export default function ShowcaseWrapperDesktop({ title, projects }: IShowcase) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false)
  const [canScale, setCanScale] = useState(false);
  const [canSnapScroll, setCanSnapScroll] = useState(false);
  const [breakpoint, setBreakpoint] = useState(0);
  const [beginScalePos, setBeginScalePos] = useState(0);
  const [fromStart, setFromStart] = useState(true);

  const ref = useRef(null);
  const { scrollY } = useScroll();
  const scale = useTransform(
    scrollY,
    [beginScalePos, beginScalePos + 1200],
    canScale ? [0.2, 1] : canSnapScroll ? [1, 1] : [0.2, 0.2]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { bottom } = ref.current.getBoundingClientRect();

        if (bottom - window.innerHeight < 1 && !breakpoint) {
          setCanScale(true);
          if (beginScalePos === 0) {
            setBeginScalePos(scrollY.get());
          }
        }

        if (scale.get() === 1 && breakpoint === 0) {
          setIsOpen(true);
          setCanSnapScroll(true);
          setBreakpoint(scrollY.get());
          setCanScale(false);
          setFromStart(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [breakpoint, beginScalePos]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const reverseScale = () => {
    setCanScale(true);
    setIsOpen(false);
    setCanSnapScroll(false);
    setBreakpoint(0);
    setFromStart(true);
  };

  const forwardScale = (isOpen: boolean) => {
    setIsOpen(isOpen);
    setFromStart(false);
    setIsFinished(true)
  };

  return (
    <StyledWrapper open={isOpen}>
      <StyledFollowingContainer
        ref={ref}
        open={isOpen}
        // reverse={!fromStart && !isOpen}
      >
        <StyledGridContainer>
          <Row>
            <Col start={1} span={12}>
              <StyledTitle color={(isOpen || isFinished) ? colors.accent : colors.white}>
                {title}
              </StyledTitle>
            </Col>
          </Row>
        </StyledGridContainer>
        <StyledMotionWrapper open={isOpen}>
          {projects.nodes.map((project, index: number) => {
            if(index !== 0 && !isOpen && !isFinished) return null
            if (index === projects.nodes.length - 1) {
              return (
                <ShowcaseItemFinalDesktop
                  key={index}
                  project={project}
                  isOpen={isOpen}
                  forwardScale={forwardScale}
                />
              );
            }

            return (
              <ShowcaseItemDesktop
                key={index}
                project={project}
                scale={index === 0 ? scale : undefined}
                isOpen={isOpen}
                isFirst={index === 0}
                reverseScale={reverseScale}
              />
            );
          })}
        </StyledMotionWrapper>
      </StyledFollowingContainer>
      <StyledSpacer start={fromStart} />
    </StyledWrapper>
  );
}
