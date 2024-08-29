import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import { PageBySlug } from "../interfaces/page";
import { ISiteData } from "../interfaces/site";
import { getAllPagesWithSlug, getPageData, getSiteData } from "../lib/api";
import { GridContainer } from "../components/global/grid/gridContainer";
import { Row } from "../components/global/grid/Row";
import { Col } from "../components/global/grid/Col";
import PageBody from "../components/page/content";

interface IProject {
  siteData: ISiteData;
  page: PageBySlug;
}

export default function Project({ siteData, page }: IProject) {
  const router = useRouter();

  if (!page || (!router.isFallback && !page?.slug)) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout pageTitle={page?.title} siteData={siteData}>
      <Navbar dark={true} />

      {router.isFallback ? (
        <h2>Loading</h2>
      ) : (
        <>
          <GridContainer>
            <Row>
              <Col span={12}>
                <h1>{page.title}</h1>
                <PageBody content={page.pageFields.content} />
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
  const pageData = await getPageData(slug);
  const siteData = await getSiteData();

  return {
    props: {
      siteData,
      page: pageData.pageBySlug,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPages = await getAllPagesWithSlug();

  return {
    paths: allPages.edges.map(({ node }) => `/${node.slug}`) || [],
    fallback: true,
  };
};
