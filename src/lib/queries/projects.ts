export const GET_PROJECTS_DATA_QUERY = `
 query ProjectsPage {
      projects(first: 100) {
        nodes {
          title
          slug
          projectCategories {
            nodes {
              name
              slug
            }
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
