import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../components/layout";
import {
  getServiceCategoryData,
  getAllServiceCategoriesWithSlug,
  getServiceCategoriesData,
  getSiteData,
} from "../../lib/api";
import { ISiteData } from "../../interfaces/site";
import { IServiceCategoryData } from "../../interfaces/serviceCategory";
import styled from "@emotion/styled";
import { GridContainer } from "../../components/global/grid/gridContainer";
import { Col } from "../../components/global/grid/Col";
import { Row } from "../../components/global/grid/Row";
import { breakpoints, dimensions, colors } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimateInView from "../../components/global/animation/animateInView";
import { IconButton } from "../../components/global/iconButton";
import React, { useState } from "react";
import { useRouter } from "next/router";
import ArrowDown from "../../icons/arrowDown";

interface ICategoryProps {
  siteData: ISiteData;
  pageData: IServiceCategoryData;
  isDetailView?: boolean;
}

const StyledContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  position: relative;
  cursor: pointer;
  margin-bottom: 32px;
`;

const StyledImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 1rem;
  overflow: hidden;

  @media (min-width: ${breakpoints.md}px) {
    height: 200px;
  }
`;

const StyledProjectInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 8px 0 8px;
  gap: 16px;
`;

const StyledProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;

  & h2 {
    font-weight: 500;
    margin: 0;
    font-size: ${getRemSize(dimensions.headingSizes.cta.desktop)};
    line-height: 1.2;
    transition: color 0.2s ease;
  }

  & p {
    font-weight: 400;
    margin: 0;
    font-size: ${getRemSize(dimensions.textSizes.small.desktop)};
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.2s ease;
  }

  @media (max-width: ${breakpoints.md}px) {
    & h2 {
      font-size: ${getRemSize(dimensions.headingSizes.cta.mobile)};
    }

    & p {
      font-size: ${getRemSize(dimensions.textSizes.small.mobile)};
    }
  }
`;

const StyledLink = styled(motion.span)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;

  button {
    border: none;
  }
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

const StyledHeader = styled(motion.h1)`
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(55)};
    text-align: left;
    margin-top: 84px;
    margin-bottom: 16px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
  }
`;

const StyledSubheading = styled(motion.p)`
  font-size: ${getRemSize(22)};
  line-height: 1.4;
  text-align: center;
  margin: 0 auto 60px auto;
  max-width: 900px;
  font-weight: 400;
  color: ${colors.white};
  letter-spacing: 0.5px;

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(18)};
    text-align: left;
    max-width: 100%;
    margin-bottom: 40px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(16)};
  }
`;

const StyledDetailHeader = styled(motion.h1)`
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(55)};
    margin-bottom: 16px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
  }
`;

const StyledDetailDescription = styled(motion.p)`
  font-size: ${getRemSize(22)};
  line-height: 1.4;
  margin: 0 0 60px 0;
  font-weight: 400;
  color: ${colors.white};
  letter-spacing: 0.5px;
  max-width: 900px;

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(18)};
    margin-bottom: 40px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(16)};
  }
`;

const StyledDetailImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 60px;

  @media (max-width: ${breakpoints.md}px) {
    height: 300px;
    margin-bottom: 40px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    height: 200px;
    margin-bottom: 30px;
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

interface ICategoryProps {
  siteData: ISiteData;
  pageData: IServiceCategoryData;
  isDetailView?: boolean;
}

export default function Services({ siteData, pageData }: ICategoryProps) {
  const router = useRouter();
  const slug = router.query.slug as string[] | undefined;
  const isDetailView = slug && slug.length > 0;

  // Detail view - single service category
  if (isDetailView) {
    const categoryData = pageData.serviceCategoryBySlug;

    if (!categoryData) {
      return (
        <Layout pageTitle="Service" siteData={siteData}>
          <GridContainer>
            <Row>
              <Col span={12}>
                <h1>Service category not found</h1>
              </Col>
            </Row>
          </GridContainer>
        </Layout>
      );
    }

    return (
      <Layout pageTitle={categoryData.name} siteData={siteData}>
        <GridContainer>
          <Row>
            <Col span={12}>
              <StyledDetailHeader
                variants={titleVariants}
                initial="closed"
                animate="open"
              >
                {categoryData.name}
              </StyledDetailHeader>
              {categoryData.description && (
                <StyledDetailDescription
                  variants={titleVariants}
                  initial="closed"
                  animate="open"
                >
                  {categoryData.description}
                </StyledDetailDescription>
              )}
            </Col>
          </Row>

          {categoryData.serviceCategoryFields?.featuredImage && (
            <Row>
              <Col span={12}>
                <AnimateInView>
                  <StyledDetailImageWrapper>
                    <Image
                      src={
                        categoryData.serviceCategoryFields.featuredImage.node
                          .sourceUrl
                      }
                      blurDataURL={
                        categoryData.serviceCategoryFields.featuredImage.node
                          ?.placeholderDataURI
                      }
                      placeholder="blur"
                      alt={`${categoryData.name} featured image`}
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </StyledDetailImageWrapper>
                </AnimateInView>
              </Col>
            </Row>
          )}
        </GridContainer>
      </Layout>
    );
  }

  // List view - all service categories
  const categories = pageData.serviceCategories?.nodes || [];

  return (
    <Layout siteData={siteData}>
      <GridContainer>
        <Row>
          <Col span={12}>
            <StyledHeader
              variants={titleVariants}
              initial="closed"
              animate="open"
            >
              What we offer <StyledArrow />
            </StyledHeader>
            <StyledSubheading
              variants={titleVariants}
              initial="closed"
              animate="open"
            >
              Explore our comprehensive range of services designed to take your
              digital presence to the next level.
            </StyledSubheading>
          </Col>
        </Row>

        <Row>
          <motion.div
            variants={parentVariants}
            initial="closed"
            animate="open"
            style={{ display: "contents" }}
          >
            {categories.map((category) => {
              const [isHovered, setIsHovered] = useState(false);

              return (
                <Col span={6} spanMobile={12} key={category.id}>
                  <AnimateInView>
                    <Link href={`/services/${category.slug}`}>
                      <StyledContainer
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        {category.serviceCategoryFields?.featuredImage && (
                          <StyledImageWrapper
                            animate={{
                              scale: isHovered ? 1.05 : 1,
                            }}
                            transition={{
                              duration: 0.3,
                              ease: "easeOut",
                            }}
                          >
                            <Image
                              src={
                                category.serviceCategoryFields.featuredImage
                                  .node.sourceUrl
                              }
                              blurDataURL={
                                category.serviceCategoryFields.featuredImage
                                  .node?.placeholderDataURI
                              }
                              placeholder="blur"
                              alt={category.name}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </StyledImageWrapper>
                        )}

                        <StyledProjectInfo>
                          <StyledProjectDetails>
                            <motion.h2
                              animate={{
                                color: isHovered ? colors.accent : colors.white,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              {category.name}
                            </motion.h2>
                            <p>{category.description}</p>
                          </StyledProjectDetails>
                          <AnimatePresence>
                            {isHovered && (
                              <StyledLink
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                              >
                                <IconButton />
                              </StyledLink>
                            )}
                          </AnimatePresence>
                        </StyledProjectInfo>
                      </StyledContainer>
                    </Link>
                  </AnimateInView>
                </Col>
              );
            })}
          </motion.div>
        </Row>
      </GridContainer>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allCategories = await getAllServiceCategoriesWithSlug();

  const paths = [
    // Root /services route (no slug)
    {
      params: {
        slug: [],
      },
    },
    // Individual category routes
    ...allCategories.edges.map((edge) => ({
      params: {
        slug: [edge.node.slug],
      },
    })),
  ];

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string[] | undefined;

  try {
    const siteData = await getSiteData();

    // List view - fetch all categories
    if (!slug || slug.length === 0) {
      const pageData = await getServiceCategoriesData();
      return {
        props: { siteData, pageData },
        revalidate: 10,
      };
    }

    // Detail view - fetch single category
    const categorySlug = slug[0];
    const pageData = await getServiceCategoryData(categorySlug);

    return {
      props: { siteData, pageData },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
};
