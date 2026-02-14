import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../components/layout";
import {
  getServiceCategoryData,
  getAllServiceCategoriesWithSlug,
  getServiceCategoriesData,
  getSiteData,
  getServiceData,
  getAllServicesWithSlug,
} from "../../lib/api";
import { ISiteData } from "../../interfaces/site";
import { IServiceCategoryData } from "../../interfaces/serviceCategory";
import { IServiceData } from "../../interfaces/service";
import { GridContainer } from "../../components/global/grid/gridContainer";
import { Col } from "../../components/global/grid/Col";
import { Row } from "../../components/global/grid/Row";
import { useRouter } from "next/router";
import { ServiceCategoryList } from "../../components/service/serviceCategoryList";
import { ServiceCategoryDetail } from "../../components/service/serviceCategoryDetail";
import ServicesBody from "../../components/service/content";

interface ICategoryProps {
  siteData: ISiteData;
  pageData: IServiceCategoryData | IServiceData;
  isDetailView?: boolean;
}

export default function Services({ siteData, pageData }: ICategoryProps) {
  const router = useRouter();
  const slug = router.query.slug as string[] | undefined;
  const isServiceDetail = slug && slug.length === 2;
  const isCategoryDetail = slug && slug.length === 1;

  // Service detail view - /services/[category]/[service]
  if (isServiceDetail) {
    const serviceData = pageData as IServiceData;

    if (!serviceData.service) {
      return (
        <Layout pageTitle="Service" siteData={siteData}>
          <GridContainer>
            <Row>
              <Col span={12}>
                <h1>Service not found</h1>
              </Col>
            </Row>
          </GridContainer>
        </Layout>
      );
    }

    return (
      <Layout pageTitle={serviceData.service.title} siteData={siteData}>
        <ServicesBody content={serviceData.service.servicesFields.content} />
      </Layout>
    );
  }

  // Category detail view - /services/[category]
  if (isCategoryDetail) {
    const categoryData = (pageData as IServiceCategoryData)
      .serviceCategoryBySlug;

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

  // List view - all service categories at /services
  const categories =
    (pageData as IServiceCategoryData).serviceCategories?.nodes || [];

  return (
    <Layout siteData={siteData}>
      <ServiceCategoryList categories={categories} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allCategories = await getAllServiceCategoriesWithSlug();
  const allServices = await getAllServicesWithSlug();

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
    // Individual service routes (category/service)
    ...allServices.edges.flatMap(
      (serviceEdge) =>
        serviceEdge.node.serviceCategories?.edges.map((categoryEdge) => ({
          params: {
            slug: [categoryEdge.node.slug, serviceEdge.node.slug],
          },
        })) || [],
    ),
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

    // Service detail view - fetch single service
    if (slug.length === 2) {
      const serviceSlug = slug[1];
      const pageData = await getServiceData(serviceSlug);

      return {
        props: { siteData, pageData },
        revalidate: 10,
      };
    }

    // Category detail view - fetch single category
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
