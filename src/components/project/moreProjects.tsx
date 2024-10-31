import { Projects } from "../../interfaces/project";
import { IconButton } from "../global/iconButton";
import styled from "@emotion/styled";
import { breakpoints, dimensions } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import useIsDesktop from "../../hooks/useIsDesktop";
import { Fragment } from "react";
import Image from "next/image";

interface IProjectsData {
  projects: Projects;
}

const StyledHeading = styled.h2`
  font-weight: 400;
  text-align: center;
  width: 100%;
  margin-bottom: 60px;
  margin-left: auto;
  margin-right: auto;
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
    margin-bottom: 45px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
    margin-bottom: 32px;
  }
`;

const StyledProjectCardsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  gap: 11px;

  @media (max-width: ${breakpoints.md}px) {
    flex-direction: column;
  }
`;
const StyledProjectCard = styled.div`
  max-width: 680px;
  min-width: 200px;
  width: 100%;
  height: 264px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  & img {
    max-width: 100%;
    border-radius: 26px;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: center;
    z-index: -1;
    filter: brightness(0.7);
  }

  @media (max-width: ${breakpoints.md}px) {
    margin-right: auto;
    margin-left: auto;
  }
`;
const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 8px 8px 8px 24px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  margin: 0px 27px 20px 20px;
`;

const StyledTitleWrapperMobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 8px 8px 8px 24px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  margin-bottom: 9px;
  width: 100%;
`;
const StyledProjectDetailes = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  justify-content: center;
  align-items: start;
  @media (min-width: 1157px) {
    flex-direction: row;
  }
`;
const H2 = styled.h2`
  margin: 0;
  font-size: ${getRemSize(dimensions.headingSizes.cta.mobile)};
  line-height: 1.25rem;
  font-weight: 500;
  letter-spacing: 1px;

  @media (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(dimensions.headingSizes.small.mobile)};
  }
  @media (min-width: 1157px) {
    margin-right: 30px;
  }
`;
const StyledShowcaseCategory = styled.p`
  margin: 0;
  font-size: ${getRemSize(dimensions.headingSizes.cta.mobile)};
  line-height: 1.25rem;
  font-weight: 500;
  letter-spacing: 1px;

  @media (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(dimensions.headingSizes.small.mobile)};
  }
`;
const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export function MoreProjects({ projects }: IProjectsData) {
  const isDesktop = useIsDesktop();
  return (
    <>
      <StyledHeading>More projects</StyledHeading>
      {isDesktop ? (
        <StyledProjectCardsWrapper>
          {projects.nodes.map((project, index) => (
            <StyledProjectCard key={index}>
              {project?.featuredImage?.node.sourceUrl && (
                <Image
                  src={project.featuredImage.node.sourceUrl}
                  alt={project.title}
                  width={714}
                  height={264}
                  blurDataURL={project.featuredImage.node?.placeholderDataURI}
                  placeholder="blur"
                />
              )}
              <StyledTitleWrapper>
                <StyledProjectDetailes>
                  <H2>{project.title}</H2>
                  <StyledShowcaseCategory>
                    {project.projectCategories?.nodes[0]?.name}
                  </StyledShowcaseCategory>
                </StyledProjectDetailes>
                <StyledLink href={`/projects/${project.slug}`}>
                  <IconButton />
                </StyledLink>
              </StyledTitleWrapper>
            </StyledProjectCard>
          ))}
        </StyledProjectCardsWrapper>
      ) : (
        <StyledProjectCardsWrapper>
          {projects.nodes.map((project, index) => (
            <Fragment key={index}>
              <StyledProjectCard>
                {project?.featuredImage?.node.sourceUrl && (
                  <Image
                    src={project.featuredImage.node.sourceUrl}
                    alt={project.title}
                    width={714}
                    height={264}
                    blurDataURL={project.featuredImage.node?.placeholderDataURI}
                    placeholder="blur"
                  />
                )}
              </StyledProjectCard>
              <StyledTitleWrapperMobile>
                <StyledProjectDetailes>
                  <H2>{project.title}</H2>
                  <StyledShowcaseCategory>
                    {project.projectCategories?.nodes[0]?.name}
                  </StyledShowcaseCategory>
                </StyledProjectDetailes>
                <StyledLink href={`/projects/${project.slug}`}>
                  <IconButton />
                </StyledLink>
              </StyledTitleWrapperMobile>
            </Fragment>
          ))}
        </StyledProjectCardsWrapper>
      )}
    </>
  );
}
