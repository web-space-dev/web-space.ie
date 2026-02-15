export const GET_SERVICE_CATEGORY_DATA_QUERY = `
query ServicesCategoryPag($slug: String!) {
  serviceCategoryBySlug(slug: $slug) {
    id
    name
    slug
    description
    serviceCategoryFields {
      featuredImage {
        node {
          altText
          sourceUrl
          placeholderDataURI
        }
      }
      contentBody {
        __typename
        ... on ServiceCategoryFieldsContentBodyLargeTextAreaLayout {
          __typename
          largeTextArea
        }
        ... on ServiceCategoryFieldsContentBodyImageListLayout {
          __typename
          imageListTitle
          imageList {
            image {
              node {
                altText
                sourceUrl
                placeholderDataURI
              }
            }
            text
          }
        }
        ... on ServiceCategoryFieldsContentBodyCtaLayout {
          __typename
          ctaText
          text
        }
        ... on ServiceCategoryFieldsContentBodyServicesListLayout {
          __typename
          servicesListTitle
        }
      }
    }
    services(first: 100) {
      nodes {
        title
        slug
        servicesFields {
          description
        }
        featuredImage {
          node {
            altText
            sourceUrl
            placeholderDataURI
          }
        }
      }
    }
  }
}
`;
