import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/layout";
import {
  getAllServicesWithSlug,
  getServiceData,
  getSiteData,
} from "../../lib/api";
import { ISiteData } from "../../interfaces/site";
import { IProjectData } from "../../interfaces/project";
import { Hero } from "../../components/project/hero";
import ProjectBody from "../../components/project/content";
import { GridContainer } from "../../components/global/grid/gridContainer";
import { MoreProjects } from "../../components/project/moreProjects";
import { IServiceData } from "@/interfaces/service";
import { Row } from "@/components/global/grid/Row";
import PageBody from "@/components/page/content";

import { Col } from "@/components/global/grid/Col";
import { breakpoints, dimensions } from "@/styles/variables";
import { getRemSize } from "@/styles/globalCss";
import styled from "@emotion/styled";
import ServicesBody from "@/components/service/content";

interface IService extends IServiceData {
  siteData: ISiteData;
}

const StyledTitle = styled.h1`
  font-size: ${getRemSize(dimensions.textSizes.xLarge.desktop)};
  margin: 200px 0px 140px 32px;
  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.display2.mobile)};
    margin: 120px 0;
  }
`;

export default function Service({ siteData, service }: IService) {
  const router = useRouter();

  if (!service || (!router.isFallback && !service?.slug)) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout pageTitle={service?.title} siteData={siteData}>
      {router.isFallback ? (
        <h2>Loading</h2>
      ) : (
        <>
          <GridContainer>
            <Row>
              <Col span={12}>
                <StyledTitle>{service.title}</StyledTitle>
                <ServicesBody content={service.servicesFields.content} />
              </Col>
            </Row>
          </GridContainer>
        </>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = typeof params.slug === "string" ? params.slug : params.slug[0];
  const { service } = await getServiceData(slug);
  const siteData = await getSiteData();

  return {
    props: {
      siteData,
      service,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allServices = await getAllServicesWithSlug();

  return {
    paths: allServices.edges.map(({ node }) => `/services/${node.slug}`) || [],
    fallback: true,
  };
};
