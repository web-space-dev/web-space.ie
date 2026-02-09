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
      skills {
        nodes {
          title
          skillsFields {
            link
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
