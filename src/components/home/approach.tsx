import React, { memo, useEffect, useRef, useState } from "react";
import { Approach as IApproach } from "../../interfaces/home";
import styled from "@emotion/styled";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { GridContainer } from "../global/grid/gridContainer";
import Pill from "../global/pill";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { IconButton, StyledArrowDownRight } from "../global/iconButton";
import { PillIconButton } from "../global/pillIconButton";
import { getRemSize } from "../../styles/globalCss";
import useIsDesktop from "../../hooks/useIsDesktop";
import useScrollProgress from "../../hooks/useScrollProgress";
import useIsIntersecting from "../../hooks/useIsIntersecting";

interface ApproachProps {
  items: IApproach[];
}

const StyledSpacer = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  visibility: hidden;
  margin-top: -150vh;

  @media all and (max-width: ${breakpoints.md}px) {
    margin-top: 0;
    height: 100%;
    margin-bottom: 350px;
  }
`;

const StyledWrapper = styled(GridContainer)`
  position: sticky;
  height: 100vh;
  z-index: 20;
  background-color: ${colors.black};
  top: 10%;
  left: 0;
  will-change: transform;
  overflow: hidden;
  max-width: 100%;

  @media all and (max-width: ${breakpoints.md}px) {
    overflow: inherit;
    position: relative;
    height: 100%;
  }
`;

const StyledMotionWrapper = styled(motion.div)`
  display: flex;
  width: max-content;
  height: 100vh;
  overflow: auto;
  position: absolute;
  top: 140px;
  /* left: 200px; */
  bottom: 0;
  @media all and (max-width: ${breakpoints.md}px) {
    height: fit-content;
    position: relative;
    width: 100%;
    justify-content: center;
    flex-direction: column;
  }
`;

const StyledHeadingWrapper = styled(GridContainer)`
  align-items: center;
  position: relative;
  margin: 0;
  grid-column: 1 / span 12;
  padding: 0;
`;

const StyledHeading2 = styled.h2`
  font-weight: 500;
  margin-bottom: 40px;
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  grid-column: 1 / span 5;
  @media all and (max-width: ${breakpoints.md}px) {
    /* display: none; */
    margin: 0 0 -100px 0;
  }
`;

const StyledCard = styled.div<StyledCardProps>`
  margin-right: 300px;
  margin-left: ${(props) => props.marginLeft};
  margin-bottom: 10px;
  width: 100%;
  max-width: 714px;
  min-width: 250px;
  height: 303px;
  border-radius: 20px;
  padding: 30px 38px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  overflow: hidden;
  scrollbar-width: none;
  box-sizing: border-box;

  @media all and (max-width: ${breakpoints.md}px) {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 10px;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 10px;
    overflow: hidden;
  }
`;

export const StyledParagraphWrapper = styled(motion.p)`
  position: relative;
  overflow: hidden;
  padding: 0;
  box-sizing: border-box;

  @media all and (max-width: ${breakpoints.md}px) {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  @media all and (max-width: ${breakpoints.sm}px) {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
`;
export const StyledParagraphText = styled.span`
  font-weight: 400;
  line-height: 44px;
  font-size: ${getRemSize(dimensions.textSizes.large.desktop)};
  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.textSizes.large.mobile)};
    margin-top: 1rem;
  }
  @media all and (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
    line-height: 34px;
  }
`;
const StyledCardPill = styled(motion.div)`
  margin-right: 300px;
  margin-left: 20px;
  margin-bottom: 10px;
  width: 714px;
  height: 303px;
  border-radius: 20px;
  padding: 30px 38px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0 0 auto;
  scrollbar-width: none;
  overflow: hidden;
  box-sizing: border-box;
`;

export const StyledPillWrapper = styled.span`
  @media all and (min-width: ${breakpoints.md}px) {
    position: absolute;
    top: 0px;
    left: 5px;
    overflow: hidden;
  }
`;

export const StyledTextSpacer = styled.span`
  padding: 0 53px;
  visibility: hidden;
  @media all and (max-width: ${breakpoints.md}px) {
    display: none;
  }
`;

const SmallerIconButton = styled.div`
  width: 3rem;
  height: 3rem;
  margin-right: 10px;
  /* & button {
    width: 100%;
    height: 100%;
    transform: scale(0.7);
  } */
`;

interface IStyledApproachBorder {
  isVisible: boolean;
}

const StyledApproachBorderLeft = styled.div<IStyledApproachBorder>`
  height: 303px;
  background: linear-gradient(to left, rgba(255, 255, 255, 0), ${colors.white});
  position: absolute;
  width: 12px;
  left: 0;
  top: 140px;
  transition: 0.2s ease;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  @media all and (max-width: ${breakpoints.md}px) {
    display: none;
  }
`;
const StyledApproachBorderRight = styled.div<IStyledApproachBorder>`
  height: 303px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    ${colors.white}
  );
  position: absolute;
  width: 12px;
  right: 0;
  top: 140px;
  transition: 0.2s ease;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};

  @media all and (max-width: ${breakpoints.md}px) {
    display: none;
  }
`;

interface StyledCardProps {
  marginLeft?: string;
}

// @TODO - fix on middle screens scrolling stuff
function Approach({ items }: ApproachProps) {
  const ghostRef = useRef(null);
  const horizontalRef = useRef(null);
  const wrapperRef = useRef(null);

  const boxRef = useRef();
  const borderLeftRef = useRef();
  const borderRightRef = useRef();
  const cardsRef = useRef([]);

  const horizontalWidth = 5200;
  const isDesktop = useIsDesktop();

  const scrollProgress = useScrollProgress(ghostRef);

  const isInView = useInView(wrapperRef, { amount: 0 });

  const transform = useTransform(
    scrollProgress,
    [0, 1],
    isDesktop ? (isInView ? [500, -horizontalWidth] : [500, 500]) : [0, 0]
  );
  const cappedTransform = useMotionValue(Math.min(transform.get(), 850));

  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, items.length + 1);
  }, [items]);

  const isLeftIntersecting = useIsIntersecting(
    borderLeftRef,
    cardsRef,
    horizontalRef
  );
  const isRightIntersecting = useIsIntersecting(
    borderRightRef,
    cardsRef,
    horizontalRef
  );

  useEffect(() => {
    const unsubscribe = transform.onChange((value) => {
      cappedTransform.set(Math.max(value, -4200));
    });

    return unsubscribe;
  }, [transform, cappedTransform]);

  return (
    <div style={{ position: "relative" }}>
      <StyledWrapper ref={wrapperRef}>
        <StyledHeadingWrapper>
          <StyledHeading2>Our Approach</StyledHeading2>
        </StyledHeadingWrapper>
        {isDesktop ? (
          <>
            <StyledApproachBorderLeft
              ref={borderLeftRef}
              isVisible={isLeftIntersecting}
            />
            <StyledMotionWrapper
              ref={horizontalRef}
              style={{ x: cappedTransform }}
            >
              <Cards items={items} cardsRef={cardsRef} />
            </StyledMotionWrapper>
            <StyledApproachBorderRight
              ref={borderRightRef}
              isVisible={isRightIntersecting}
            />
          </>
        ) : (
          <StyledMotionWrapper ref={horizontalRef}>
            <Cards items={items} cardsRef={cardsRef} />
          </StyledMotionWrapper>
        )}
      </StyledWrapper>
      <StyledSpacer ref={ghostRef} height={horizontalWidth} />
    </div>
  );
}

export default Approach;

const Cards = ({ items, cardsRef }: { items: IApproach[]; cardsRef: any }) => {
  const isDesktop = useIsDesktop();

  const scrollToBottom = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {items.map((item, index) => (
        <StyledCard
          key={index}
          ref={(el) => (cardsRef.current[index + 1] = el)}
          marginLeft={index === 0 ? "0px" : "20px"}
        >
          <StyledParagraphWrapper>
            <StyledTextSpacer>{item.title}</StyledTextSpacer>
            <StyledPillWrapper>
              <Pill pillText={item.title} />
            </StyledPillWrapper>
            <StyledParagraphText>{item.paragraph}</StyledParagraphText>
          </StyledParagraphWrapper>
        </StyledCard>
      ))}
      {isDesktop ? (
        <StyledCardPill ref={(el) => (cardsRef.current[0] = el)}>
          <StyledParagraphWrapper>
            <StyledParagraphText>
              Interested? <br /> Let's have a chat.
            </StyledParagraphText>
          </StyledParagraphWrapper>
          <SmallerIconButton>
            {/* <Link href="#" onClick={scrollToBottom}> */}
            <div onClick={scrollToBottom}>
              <IconButton direction="down" />
            </div>
            {/* </Link> */}
          </SmallerIconButton>
        </StyledCardPill>
      ) : (
        <PillIconButton text="Get in touch" onClick={scrollToBottom}>
          <StyledArrowDownRight />
        </PillIconButton>
      )}
    </>
  );
};
