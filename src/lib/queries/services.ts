export const GET_SERVICES_DATA_QUERY = `
query ServicesPage {
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
`;
