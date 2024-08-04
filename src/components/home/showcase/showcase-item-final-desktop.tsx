import styled from "@emotion/styled";
import { Project } from "../../../interfaces/project";
import Link from "next/link";
import { breakpoints, colors, dimensions } from "../../../styles/variables";
import { getRemSize } from "../../../styles/globalCss";
import { IconButton } from "../../global/iconButton";
import { CustomImage } from "../../global/image";
import { motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";

interface IStyledShowcaseWrapper {
  open: boolean;
}
const StyledShowcaseWrapper = styled.div<IStyledShowcaseWrapper>`
  height: 100vh;
  display: flex;
  align-items: center;
  perspective: 500px;
  scroll-snap-align: ${({ open }) => (open ? "start" : "none")};
`;

const StyledShowcaseDetails = styled(motion.div)`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  height: -webkit-fill-available;
  margin: 40px auto;
  max-width: 1448px;
  /* height: 100%; */
  @media all and (max-width: ${breakpoints.md}px) {
    flex-direction: column;
  }
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

const StyledShowcaseImage = styled(motion.div)`
  position: relative;
  height: 100%;
  flex: 1;
  margin: auto 10px;
  overflow: hidden;
  @media all and (max-width: ${breakpoints.md}px) {
    width: -webkit-fill-available;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
`;

const StyledShowcaseContent = styled.div`
  position: absolute;
  top: 50%;
  bottom: 50%;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  & h3,
  p {
    margin: 0 15px;
  }
`;

const StyledShowcaseTitle = styled(motion.h3)`
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  font-weight: 400;
`;

const StyledShowcaseCategory = styled(motion.p)`
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  font-weight: 400;
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
  isOpen: boolean;
}

function ShowcaseItemFinalDesktop({ project, isOpen }: ShowcaseItemProps) {
  return (
    <StyledShowcaseWrapper open={isOpen}>
      <StyledShowcaseDetails>
        <StyledShowcaseImage>
          <Link href={`/projects/${project.slug}`}>
            <CustomImage
              alt={project.featuredImage.node.altText}
              width={1448}
              height={800}
              src={project.featuredImage.node.sourceUrl}
              blurDataURL={project.featuredImage.node?.placeholderDataURI}
            />
            <StyledShowcaseContent>
              <StyledShowcaseTitle>{project.title}</StyledShowcaseTitle>
              <StyledShowcaseCategory>
                {project.projectCategories?.nodes[0]?.name}
              </StyledShowcaseCategory>
            </StyledShowcaseContent>
          </Link>
        </StyledShowcaseImage>

        <StyledAllProjects>
          <StyledLink href="/projects">
            <StyledShowcaseTitle>All projects</StyledShowcaseTitle>
            <IconButton />
          </StyledLink>
        </StyledAllProjects>
      </StyledShowcaseDetails>
    </StyledShowcaseWrapper>
  );
}

export default memo(ShowcaseItemFinalDesktop);
