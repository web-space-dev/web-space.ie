import React, { useState, useRef, useMemo, memo } from "react";

import styled from "@emotion/styled";
import { motion, AnimatePresence, MotionValue } from "framer-motion";
import { wrap } from "popmotion";

import { Projects } from "../../../interfaces/project";
import { breakpoints, colors } from "../../../styles/variables";
import ShowcaseItemDesktop from "./showcase-item-desktop";

const StyledGalleryWrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  margin-bottom: 180px;

  @media (min-width: ${breakpoints.md}px) {
    margin-bottom: 120px;
  }
  @media (max-width: ${breakpoints.md}px) {
    max-width: 98%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledImagesWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  overflow-y: hidden;
  width: 100%;
  border-radius: 20px;
  height: 236px;
  align-items: center;

  & img {
    border-radius: 20px;
  }

  @media (min-width: ${breakpoints.sm}px) {
    height: 100%;
  }

  @media (min-width: 900px) {
    height: 100vh;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    padding-left: 0;
  }
`;
const StyledImage = styled(motion.div)`
  position: absolute;
  overflow: hidden;
  flex: 0 0 100vw;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: center;

  @media (min-width: 900px) {
    /* max-width: 1440px; */
    height: auto;
    right: 0;
    position: absolute;
  }
`;

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 1000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface IProps {
  items: Projects;
}

function ShowcaseGalleryDesktop({ items }: IProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, items.nodes.length, page);
  const wrapperRef = useRef(null);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <StyledGalleryWrapper>
      <StyledImagesWrapper ref={wrapperRef}>
        <AnimatePresence initial={false} custom={direction}>
          <StyledImage
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <ShowcaseItemDesktop
              project={items.nodes[imageIndex]}
              isFirst={imageIndex === 0}
              isLast={imageIndex === items.nodes.length - 1}
              paginate={paginate}
            />
          </StyledImage>
        </AnimatePresence>
      </StyledImagesWrapper>
    </StyledGalleryWrapper>
  );
}

export default memo(ShowcaseGalleryDesktop);
