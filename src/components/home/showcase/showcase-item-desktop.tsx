import styled from "@emotion/styled";
import { Project } from "../../../interfaces/project";
import Link from "next/link";
import { breakpoints, colors, dimensions } from "../../../styles/variables";
import { getRemSize } from "../../../styles/globalCss";
import { CustomImage } from "../../global/image";
import { MotionValue, motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { IconButton } from "../../global/iconButton";
import ArrowLeft from "../../../icons/arrowLeft";
import ArrowRight from "../../../icons/arrowRight";
import { is } from "date-fns/locale";

const StyledShowcaseWrapper = styled(motion.div)`
  height: 100vh;
  display: flex;
  align-items: center;
`;

const StyledShowcaseDetails = styled(motion.div)`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  height: -webkit-fill-available;
  margin: 40px auto;
  max-width: 1143px;
  max-height: 700px;
  overflow: hidden;
`;

const StyledButtonLeftWrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  bottom: 2px;
  left: 13px;
  z-index: 2;

  @media all and (max-width: ${breakpoints.md}px) {
    /* display: none; */
    bottom: 80px;
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

  backdrop-filter: blur(15px);
`;

const StyledButtonRightWrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  bottom: 2px;
  right: 13px;
  z-index: 2;

  @media all and (max-width: ${breakpoints.md}px) {
    /* display: none; */
    bottom: 80px;
  }
`;

const StyledShowcaseImage = styled(motion.div)`
  position: relative;
  height: 100%;
  flex: 1;
  margin: auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 24px;

  & img {
    /* width: -webkit-fill-available; */
    object-fit: cover;
    border-radius: 36px;
  }
`;

const StyledShowcaseContent = styled.div<{ last: string }>`
  position: absolute;
  top: 45%;
  left: 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 0 0.75rem 0.75rem 0;
  padding: 0 8px 8px 24px;

  & h3,
  p {
    margin: 0 15px;
  }
  @media all and (max-width: 1024px) {
    width: 60%;
  }
  @media all and (max-width: ${breakpoints.md}px) {
    width: 80%;
  }

  ${(props) =>
    props.last === "true" &&
    `
    width: 100%;
    border-radius: 0;
    padding-left: 8px;
   
    @media all and (max-width: 1024px) {
      border-radius: 0 0.75rem 0.75rem 0;
      width: 90%;
    }

  `};
`;

const StyledShowcaseTitle = styled(motion.h3)`
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  font-weight: 400;
`;

const StyledShowcaseCategory = styled(motion.p)`
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  font-weight: 400;
`;

const StyledAllProjects = styled.div`
  display: flex;
  flex: 1;
  background-color: ${colors.blackLight};
  border: 2px solid ${colors.white};
  border-radius: 12px;
  backdrop-filter: blur(10px);
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  height: -webkit-fill-available;
  margin: auto 10px;
  @media all and (max-width: ${breakpoints.md}px) {
    margin-top: 10px;
    width: -webkit-fill-available;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 15px;
  & h3 {
    margin: 0;
    transition: 0.3s ease;
  }

  &:hover {
    h3 {
      color: ${colors.accent};
    }
    button {
      background-color: ${colors.accent};
      border-color: ${colors.accent};
    }
    path {
      fill: ${colors.white};
    }
  }
`;

interface ShowcaseItemProps {
  project: Project;
  isFirst: boolean;
  isLast: boolean;
  paginate: (direction: number) => void;
}

function ShowcaseItemDesktop({
  project,
  isFirst,
  isLast,
  paginate,
}: ShowcaseItemProps) {
  return (
    <StyledShowcaseWrapper>
      <StyledShowcaseDetails>
        {!isFirst && (
          <StyledButtonLeftWrapper>
            <StyledArrowButton
              onClick={(e) => {
                e.preventDefault();
                paginate(-1);
              }}
            >
              <ArrowLeft />
            </StyledArrowButton>
          </StyledButtonLeftWrapper>
        )}
        <StyledShowcaseImage>
          <Link href={`/projects/${project.slug}`}>
            <CustomImage
              alt={project.featuredImage.node.altText}
              width={isLast ? 724 : 1143}
              height={800}
              src={project.featuredImage.node.sourceUrl}
              blurDataURL={project.featuredImage.node?.placeholderDataURI}
            />
            <StyledShowcaseContent last={isLast.toString()}>
              <StyledShowcaseTitle>{project.title}</StyledShowcaseTitle>
              <StyledShowcaseCategory>
                {project.projectCategories?.nodes[0]?.name}
              </StyledShowcaseCategory>
            </StyledShowcaseContent>
          </Link>
        </StyledShowcaseImage>

        {isLast ? (
          <StyledAllProjects>
            <StyledLink href="/projects">
              <StyledShowcaseTitle>All projects</StyledShowcaseTitle>
              <IconButton />
            </StyledLink>
          </StyledAllProjects>
        ) : (
          <StyledButtonRightWrapper>
            <StyledArrowButton
              onClick={(e) => {
                e.preventDefault();
                paginate(1);
              }}
            >
              <ArrowRight />
            </StyledArrowButton>
          </StyledButtonRightWrapper>
        )}
      </StyledShowcaseDetails>
    </StyledShowcaseWrapper>
  );
}

export default memo(ShowcaseItemDesktop);
