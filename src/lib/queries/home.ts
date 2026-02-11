export const GET_HOME_DATA_QUERY = `
query HomePage {
  page(id: "cG9zdDo5") {
    id
    title
    featuredImage {
      node {
        altText
        sourceUrl
        placeholderDataURI
      }
    }
    homeFields {
      heroTitle
      whatWeDo {
        title
        pills {
          pillText
          hoverText
          service {
            nodes {
              slug
            }
          }
        }
      }
      showcaseTitle
      showcaseProjects {
        nodes {
          ... on Project {
            id
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
      approach {
        title
        paragraph
      }
    }
  }
  skillCategories {
    nodes {
      name
      description
      slug
      skills(first: 100) {
        nodes {
          title
          skillsFields {
            link
            project {
              edges {
                node {
                  id
                  slug
                }
              }
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
  }
}
`;
