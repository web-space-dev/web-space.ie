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
import { GridContainer } from "../../components/global/grid/gridContainer";
import { Col } from "../../components/global/grid/Col";
import { Row } from "../../components/global/grid/Row";
import { useRouter } from "next/router";
import { ServiceCategoryList } from "../../components/service/serviceCategoryList";
import { ServiceCategoryDetail } from "../../components/service/serviceCategoryDetail";

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
        <ServiceCategoryDetail categoryData={categoryData} />
      </Layout>
    );
  }

  // List view - all service categories
  const categories = pageData.serviceCategories?.nodes || [];

  return (
    <Layout siteData={siteData}>
      <ServiceCategoryList categories={categories} />
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
