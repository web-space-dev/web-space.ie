import styled from "@emotion/styled";
import { Project } from "../../../interfaces/project";
import Image from "next/image";
import { IconButton } from "../../global/iconButton";
import { getRemSize } from "../../../styles/globalCss";
import { dimensions } from "../../../styles/variables";
import { memo } from "react";

const StyledShowcaseWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 343px;
  height: 537px;
  flex-direction: column;
  margin: 0 4px 0 12px;
  scroll-snap-align: center;
`;

const StyledShowcaseImage = styled.div`
  height: 440px;
  & img {
    object-fit: cover;
    border-radius: 12px;
  }
`;

const StyledShowcaseDetails = styled.div`
  width: 100%;
  height: 86px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  margin-top: 10px;
  padding: 8px 8px 8px 24px;
`;

const StyledShowcaseTitle = styled.h3`
  margin: 0;
  font-size: ${getRemSize(dimensions.headingSizes.small.mobile)};
`;

const StyledShowcaseCategory = styled.p`
  margin: 0;
  font-size: ${getRemSize(dimensions.headingSizes.small.mobile)};
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & button {
    margin: auto;
  }
`;

interface ShowcaseItemProps {
  project: Project;
}

function ShowcaseItemMobile({ project }: ShowcaseItemProps) {
  return (
    <StyledShowcaseWrapper>
      <StyledShowcaseImage>
        <Image
          src={project.featuredImage?.node.sourceUrl}
          alt={`Cover Image for ${project.title}`}
          blurDataURL={project.featuredImage?.node?.placeholderDataURI}
          placeholder="blur"
          width={343}
          height={440}
        />
      </StyledShowcaseImage>
      <StyledShowcaseDetails>
        <div>
          {/* Title */}
          <StyledShowcaseTitle>{project.title}</StyledShowcaseTitle>
          {/* Category */}
          <StyledShowcaseCategory>
            {project.projectCategories?.nodes[0]?.name}
          </StyledShowcaseCategory>
        </div>
        {/* ArrowIcon */}
        <StyledLink href={`/projects/${project.slug}`}>
          <IconButton />
        </StyledLink>
      </StyledShowcaseDetails>
    </StyledShowcaseWrapper>
  );
}

export default ShowcaseItemMobile;
