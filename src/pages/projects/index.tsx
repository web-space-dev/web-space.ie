import { GetStaticProps } from "next";
import { ISiteData } from "../../interfaces/site";
import Layout from "../../components/layout";
import { getProjectsData, getSiteData } from "../../lib/api";
import { IProjectsData } from "../../interfaces/project";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { IconButton } from "../../components/global/iconButton";
import React from "react";
import ArrowDown from "../../icons/arrowDown";
import {
  breakpoints,
  colors,
  DesktopOnly,
  dimensions,
  MobileAndTabletOnly,
} from "../../styles/variables";
import { GridContainer } from "../../components/global/grid/gridContainer";
import { Col } from "../../components/global/grid/Col";
import { Row } from "../../components/global/grid/Row";
import { getRemSize } from "../../styles/globalCss";
import { motion } from "framer-motion";
import AnimateInView from "../../components/global/animation/animateInView";

interface IIndex {
  siteData: ISiteData;
  pageData: IProjectsData;
}

const StyledContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  height: 440px;
  cursor: pointer;

  @media (min-width: ${breakpoints.md}px) {
    height: 480px;
    margin-bottom: 32px;
  }
`;

const StyledImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3); // Adjust the opacity as needed
    z-index: 1; // Ensure it is above the image but below other content
  }

  @media (min-width: 1440px) {
    & img {
      width: 100%;
      height: revert-layer;
      object-fit: cover;
    }
  }
`;

const StyledProjectInfo = styled.div`
  height: 86px;

  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 0.75rem;
  margin: 11px 0 32px 0;
  display: flex;
  justify-content: space-between;
  padding: 0 8px 0 24px;

  @media (min-width: ${breakpoints.md}px) {
    margin: 0;
    width: 60%;
    position: absolute;
    bottom: 0.75rem;
    right: 0.75rem;
    z-index: 10;
  }
`;

const StyledProjectDetails = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  & h2,
  p {
    font-weight: 400;
    margin: 0;
    font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  }

  @media (max-width: ${breakpoints.md}px) {
    flex-direction: column;
    justify-content: center;
    align-items: start;

    & h2,
    p {
      margin: 0;
      font-size: ${getRemSize(dimensions.textSizes.normal.mobile)};
    }
  }
`;

const StyledLink = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledArrow = styled(ArrowDown)`
  fill: ${colors.white};
  @media (max-width: ${breakpoints.md}px) {
    transform: scale(0.9);
    position: relative;
    top: 3px;
    margin-left: 10px;
  }
  @media (max-width: ${breakpoints.sm}px) {
    transform: scale(0.7);
  }
`;

const H2 = styled.h2`
  margin: 0;
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  line-height: 1.25rem;
  font-weight: 400;

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.cta.mobile)};
  }
`;

const H1 = styled.h1`
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};

  @media (max-width: ${breakpoints.md}px) {
    font-size: 55px;
  }
  @media (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
  }
`;

const StyledShowcaseCategory = styled.p`
  margin: 0;
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  line-height: 1.25rem;

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.cta.mobile)};
  }
`;

const StyledHeader = styled(motion.h1)`
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};

  text-align: center;
  margin-top: 50px;
  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(55)};
    text-align: left;
    margin-top: 84px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
  }
`;

const titleVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const parentVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const childVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export default function Index({ siteData, pageData }: IIndex) {
  return (
    <Layout pageTitle={"Projects"} siteData={siteData}>
      <GridContainer>
        <Row>
          <Col span={12}>
            <StyledHeader
              variants={titleVariants}
              initial="closed"
              animate="open"
            >
              Take a look at our Projects <StyledArrow />
            </StyledHeader>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <motion.div
              variants={parentVariants}
              initial="closed"
              animate="open"
            >
              {pageData.projects.nodes.map((project) => {
                return (
                  <AnimateInView>
                    <DesktopOnly>
                      <StyledContainer>
                        <Link href={`/projects/${project.slug}`}>
                          <StyledImageWrapper>
                            <Image
                              src={project.featuredImage.node.sourceUrl}
                              blurDataURL={
                                project.featuredImage.node?.placeholderDataURI
                              }
                              // placeholder="blur"
                              width={1440}
                              height={480}
                              style={{ objectFit: "cover" }}
                              alt={`Cover Image for ${project.title}`}
                            />
                          </StyledImageWrapper>
                          <StyledProjectInfo>
                            <StyledProjectDetails>
                              <h2>{project.title}</h2>
                              <p>{project.projectCategories?.nodes[0]?.name}</p>
                              <StyledLink>
                                <IconButton />
                              </StyledLink>
                            </StyledProjectDetails>
                          </StyledProjectInfo>
                        </Link>
                      </StyledContainer>
                    </DesktopOnly>
                    <MobileAndTabletOnly>
                      <Link href={`/projects/${project.slug}`}>
                        <StyledContainer>
                          <StyledImageWrapper>
                            <Image
                              src={project.featuredImage.node.sourceUrl}
                              blurDataURL={
                                project.featuredImage.node?.placeholderDataURI
                              }
                              // placeholder="blur"
                              alt={`Cover Image for ${project.title}`}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </StyledImageWrapper>
                        </StyledContainer>
                        <StyledProjectInfo>
                          <StyledProjectDetails>
                            <h2>{project.title}</h2>
                            <p>{project.projectCategories?.nodes[0]?.name}</p>
                          </StyledProjectDetails>
                          <StyledLink>
                            <IconButton />
                          </StyledLink>
                        </StyledProjectInfo>
                      </Link>
                    </MobileAndTabletOnly>
                  </AnimateInView>
                );
              })}
            </motion.div>
          </Col>
        </Row>
      </GridContainer>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getProjectsData();
  const siteData = await getSiteData();

  return {
    props: { siteData, pageData },
    revalidate: 10,
  };
};
