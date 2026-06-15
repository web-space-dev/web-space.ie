export const GET_SERVICE_CATEGORIES_DATA_QUERY = `
query ServicesCategoriesPage {
  serviceCategories(first: 100) {
    nodes {
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
    }
  }
}
`;
