import { useState, useRef, useEffect, memo } from "react";
import styled from "@emotion/styled";
import { breakpoints, colors, dimensions } from "../../../styles/variables";
import { GridContainer } from "../../global/grid/gridContainer";
import { motion, useScroll, useTransform } from "framer-motion";
import { getRemSize } from "../../../styles/globalCss";
import { Col } from "../../global/grid/Col";
import { Row } from "../../global/grid/Row";
import { IShowcase } from "../showcase";
import ShowcaseItemDesktop from "./showcase-item-desktop";
import ShowcaseItemFinalDesktop from "./showcase-item-final-desktop";
import AnimateInView from "../../global/animation/animateInView";

const StyledGridContainer = styled(GridContainer)`
  height: 100vh;
  display: flex;
  align-items: center;
  @media all and (min-width: 2000px) {
    padding-top: 90px;
  }
`;

const StyledSpacer = styled.div<{ start: string }>`
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

const StyledMotionWrapper = styled(motion.div)<{ scroll: string }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow-y: scroll;
  ${({ scroll }) =>
    scroll === "true" ? `overflow-y: scroll;` : `overflow: hidden;`}
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
  /* grid-column: 1 / span 12; */
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
  const [canScale, setCanScale] = useState(false);
  const [canSnapScroll, setCanSnapScroll] = useState(false);
  const [breakpoint, setBreakpoint] = useState(0);
  const [beginScalePos, setBeginScalePos] = useState(0);
  const [fromStart, setFromStart] = useState(true);
  const [inView, setInView] = useState(false);

  const ref = useRef(null);
  const { scrollY } = useScroll();
  const scale = useTransform(
    scrollY,
    [beginScalePos, beginScalePos + 1200],
    canScale ? [0.1, 1] : canSnapScroll ? [1, 1] : [0.1, 0.1]
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 1.0, // Ensure the entire section is in view
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  // useEffect(() => {
  //   if (inView &&isOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [isOpen]);

  const reverseScale = () => {
    setCanScale(true);
    setIsOpen(false);
    setCanSnapScroll(false);
    setBreakpoint(0);
    setFromStart(true);
  };

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
        <StyledMotionWrapper scroll={inView && isOpen ? "true" : "false"}>
          {projects.nodes.map((project, index: number) => {
            if (index === projects.nodes.length - 1) {
              return (
                <ShowcaseItemFinalDesktop
                  key={index}
                  project={project}
                  isOpen={isOpen}
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
      <StyledSpacer start={fromStart.toString()} />
    </StyledWrapper>
  );
}

export default memo(ShowcaseWrapperDesktop);
