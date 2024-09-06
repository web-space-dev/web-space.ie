export const GET_HOME_DATA_QUERY = `
query HomePage {
  page(id: "cG9zdDo5") {
    id
    title
    featuredImage {
      node {
        altText
        sourceUrl
        
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
      skillsTitle
      approach {
        title
        paragraph
      }
    }
  }
  projects(first: 3) {
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
          
        }
      }
    }
  }
  skillCategories {
    nodes {
      name
      description
      skills {
        nodes {
          title
          featuredImage {
            node {
              altText
              sourceUrl
              
            }
          }
        }
      }
    }
  }
}
`;
