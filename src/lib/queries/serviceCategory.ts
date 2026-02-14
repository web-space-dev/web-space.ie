export const GET_SERVICE_CATEGORY_DATA_QUERY = `
query ServicesCategoryPag($slug:String!) {
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
