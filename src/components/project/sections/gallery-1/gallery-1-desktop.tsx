import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Gallery } from "../../../../interfaces/project";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { breakpoints, colors } from "../../../../styles/variables";
import ArrowRight from "../../../../icons/arrowRight";
import ArrowLeft from "../../../../icons/arrowLeft";

interface IProps {
  images: Gallery;
}

const StyledGalleryWrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  margin-bottom: 180px;

  @media (min-width: ${breakpoints.md}px) {
    margin-bottom: 120px;
  }
`;

const StyledImagesWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
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
    height: 472px;
  }

  @media (min-width: 900px) {
    height: 768px;
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
  justify-content: flex-start;

  @media (min-width: 900px) {
    /* max-width: 1440px; */
    height: auto;
    right: 0;
    position: absolute;
  }
`;

const StyledButtonsWrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: 13px;
  right: 13px;
  z-index: 2;

  @media all and (max-width: ${breakpoints.md}px) {
    display: none;
  }
`;

const StyledArrowButton = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 26px;
  background: transparent;
  border: 2px solid ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px;
  z-index: 2;
  cursor: pointer;
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

export default function Gallery1Desktop({ images }: IProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.nodes.length, page);
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
            <Image
              width={1440}
              height={768}
              alt={`Gallery Image ${page}`}
              src={images.nodes[imageIndex].sourceUrl}
              // placeholder="blur"
              blurDataURL={images.nodes[imageIndex].placeholderDataURI}
              style={{ width: "100%", height: "auto" }}
            />
          </StyledImage>
        </AnimatePresence>
      </StyledImagesWrapper>
      <StyledButtonsWrapper>
        <StyledArrowButton
          onClick={(e) => {
            e.preventDefault();
            paginate(-1);
          }}
        >
          <ArrowLeft />
        </StyledArrowButton>
        <StyledArrowButton
          onClick={(e) => {
            e.preventDefault();
            paginate(1);
          }}
        >
          <ArrowRight />
        </StyledArrowButton>
      </StyledButtonsWrapper>
    </StyledGalleryWrapper>
  );
}
