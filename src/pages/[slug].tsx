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
import Pill from "../components/global/pill";

interface IProject {
  siteData: ISiteData;
  page: PageBySlug;
}

export default function Project({ siteData, page }: IProject) {
  const router = useRouter();

  if (!page || (!router.isFallback && !page?.slug)) {
    return <ErrorPage statusCode={404} />;
  }

  const content = page.content;
  const paragraphs = content
    .split("\n")
    .filter((paragraph) => paragraph.trim() !== "");

  return (
    <Layout pageTitle={page?.title} siteData={siteData}>
      <Navbar dark={true} />

      {router.isFallback ? (
        <h2>Loading</h2>
      ) : (
        <>
          <GridContainer>
            <Row>
              {paragraphs.map((paragraph, index) => {
                const tag = paragraph.match(/^<(\w+)/)?.[1];
                const content = paragraph.replace(/^<\w+>(.*)<\/\w+>$/, "$1");

                switch (tag) {
                  case "h2":
                    const headingContent = content.replace(
                      /<\/?[^>]+(>|$)/g,
                      ""
                    );
                    return (
                      <Col span={4} key={index}>
                        <h2>{headingContent}</h2>
                      </Col>
                    );
                  case "h4":
                    const pillContent = content.replace(/<\/?[^>]+(>|$)/g, "");
                    return (
                      <>
                        <Col span={8} key={index}>
                          <Pill pillText={pillContent}></Pill>
                        </Col>
                        <br />
                      </>
                    );
                  case "p":
                    const paragraphContent = content.replace(
                      /<\/?[^>]+(>|$)/g,
                      ""
                    );
                    return (
                      <>
                        <Col span={8} key={index}>
                          <p>{paragraphContent}</p>
                        </Col>
                        <br />
                      </>
                    );
                  case "ul":
                    const ulContent = content.replace(/<\/?[^>]+(>|$)/g, "");
                    return (
                      <Col span={8} key={index}>
                        <p>{ulContent}</p>
                      </Col>
                    );
                  case "li":
                    const liContent = content.replace(/<\/?[^>]+(>|$)/g, "");
                    return (
                      <Col span={8} key={index}>
                        <p>{liContent}</p>
                      </Col>
                    );

                  default:
                    return (
                      <div dangerouslySetInnerHTML={{ __html: content }} />
                    );
                }
              })}
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
