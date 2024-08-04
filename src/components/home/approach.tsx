import React, { memo, useEffect, useRef, useState } from "react";
import { Approach as IApproach } from "../../interfaces/home";
import styled from "@emotion/styled";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { GridContainer } from "../global/grid/gridContainer";
import Pill from "../global/pill";
import { motion } from "framer-motion";
import { IconButton } from "../global/iconButton";
import { PillIconButton } from "../global/pillIconButton";
import Link from "next/link";
import { getRemSize } from "../../styles/globalCss";
import useIsIntersecting from "../../hooks/useIsIntersecting";
import useIsDesktop from "../../hooks/useIsDesktop";
import ArrowUpRight from "../../icons/arrowUpRight";

interface ApproachProps {
  items: IApproach[];
}

const StyledWrapper = styled(GridContainer)`
  align-items: center;
  position: relative;
  margin: auto 0;
  grid-column: 1 / span 12;
`;

const StyledHeading2 = styled.h2`
  font-weight: 500;
  margin-bottom: 40px;
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  grid-column: 1 / span 5;
  @media all and (max-width: ${breakpoints.md}px) {
    display: none;
  }
`;

const StyledBoxWrapper = styled.div`
  position: relative;
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
  top: 0;
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
  top: 0;
  transition: 0.2s ease;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};

  @media all and (max-width: ${breakpoints.md}px) {
    display: none;
  }
`;

const StyledBox = styled(motion.div)`
  padding-left: 20px;
  display: flex;
  width: 100%;
  height: 331px;
  border: 0px 0px 5px 0px;
  overflow-x: auto;
  scrollbar-width: none;
  position: relative;
  overflow-y: hidden;

  @media all and (max-width: ${breakpoints.md}px) {
    height: auto;
    flex-direction: column;
    overflow-x: visible;
    padding-right: 20px;
  }
  @media all and (max-width: ${breakpoints.sm}px) {
    height: auto;
    flex-direction: column;
    overflow-x: visible;
    padding-right: 20px;
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

export const StyledParagraphWrapper = styled.p`
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
  // min-width: 470px;
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
  & > * {
    width: 100%;
    height: 100%;
    transform: scale(0.7);
  }
`;

// const StyledIcon = styled(ArrowUpRight)`
//   width: 30px;
//   height: 30px;
//   margin-left: -2px;
//   position: absolute;
//   top: 25%;
//   right: 6%;

//   transition: 0.3s ease;

//   @media all and (max-width: ${breakpoints.md}px) {
//     top: 38%;
//     right: 6%;
//   }

//   @media all and (max-width: ${breakpoints.sm}px) {
//     top: 30%;
//     right: 4%;
// `;

// const StyledPillButton = styled(motion.div)`
//   width: 47%;
//   max-width: 777px;
//   min-width: 237px;
//   margin-left: auto;
//   margin-right: auto;
//   margin-top: 24px;
//   background-color: ${colors.white};
//   color: ${colors.black};
//   font-weight: 500;
//   border-radius: 26px;
//   padding: 4vw;
//   font-size: 25px;
//   letter-spacing: 2px;
//   display: flex;
//   align-items: center;
//   position: relative;
//   border: 2px solid rgba(29, 29, 29, 0.1);

//   &:hover .styled-icon {
//     transform: rotate(45deg);
//   }

//   @media all and (max-width: ${breakpoints.sm}px) {
//     min-width: 237px;
//     padding: 4vw;
//     font-size: 25px;
//   }
// `;

interface StyledCardProps {
  marginLeft?: string;
}

function Approach({ items }: ApproachProps) {
  const boxRef = useRef(null);
  const borderLeftRef = useRef();
  const borderRightRef = useRef();
  const isDesktop = useIsDesktop();

  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, items.length + 1);
  }, [items]);

  const isLeftIntersecting = useIsIntersecting(borderLeftRef, cardsRef, boxRef);
  const isRightIntersecting = useIsIntersecting(
    borderRightRef,
    cardsRef,
    boxRef
  );

  return (
    <>
      <StyledWrapper>
        <StyledHeading2>Our approach</StyledHeading2>
      </StyledWrapper>
      <StyledBoxWrapper>
        <StyledApproachBorderLeft
          ref={borderLeftRef}
          isVisible={isLeftIntersecting}
        />
        <StyledBox ref={boxRef}>
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
                  Check out <br /> our work.
                </StyledParagraphText>
              </StyledParagraphWrapper>
              <SmallerIconButton>
                <Link href="/projects">
                  <IconButton />
                </Link>
              </SmallerIconButton>
            </StyledCardPill>
          ) : (
            <PillIconButton text="Check out more" onClick={() => {}}>
              <ArrowUpRight />
            </PillIconButton>
          )}
        </StyledBox>
        <StyledApproachBorderRight
          ref={borderRightRef}
          isVisible={isRightIntersecting}
        />
      </StyledBoxWrapper>
    </>
  );
}

export default memo(Approach);
