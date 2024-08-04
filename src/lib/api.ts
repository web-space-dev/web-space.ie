import { IHomePage } from "../interfaces/home";
import { IPageData } from "../interfaces/page";
import { IProjectData, IProjectsData } from "../interfaces/project";
import { ISiteData } from "../interfaces/site";

const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  // console.log('response!')
  // console.log(json)
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getAllProjectsWithSlug() {
  const data = await fetchAPI(`
    {
      projects(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.projects;
}

export async function getAllPagesWithSlug() {
  const data = await fetchAPI(`
  {
    pages(where: {notIn: ["cG9zdDo5", "cG9zdDo0NA=="]}, first: 10000) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `);
  return data?.pages;
}

export async function getSiteData(): Promise<ISiteData> {
  const data = await fetchAPI(
    `
    query {
      generalSettings {
        title
        description
      }
    }
    `
  );

  return data;
}

export async function getHomeData(): Promise<IHomePage> {
  const data = await fetchAPI(
    `
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
      skills(first: 6) {
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
  `
  );

  return data;
}

export async function getProjectsData(): Promise<IProjectsData> {
  const data = await fetchAPI(`
    query ProjectsPage {
      projects {
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
    }`);

  return data;
}

export async function getProjectAndMoreProjects(
  slug: string
): Promise<IProjectData> {
  const data = await fetchAPI(
    `
      query PostBySlug($slug: String!) {
        projectBy(slug: $slug) {
          title
          slug
          featuredImage {
            node {
              altText
              sourceUrl
              
            }
          }
          tags {
            nodes {
              name
              slug
            }
          }
          projectCategories {
            nodes {
              name
              slug
            }
          }
          projectFields {
            stat1 {
              field
              value
            }
            stat2 {
              field
              value
            }
            stat3 {
              field
              value
            }
            content {
              fieldGroupName
              ... on ProjectFieldsContentLargeTextAreaLayout {
                __typename
                largeTextArea
              }
              ... on ProjectFieldsContentGallery1Layout {
                __typename
                gallery1 {
                  nodes {
                    sourceUrl
                    
                    altText
                  }
                }
              }
              ... on ProjectFieldsContentGallery2Layout {
                __typename
                gallery2 {
                  nodes {
                    sourceUrl
                    
                    altText
                  }
                }
              }
              ... on ProjectFieldsContentTheChallengeLayout {
                __typename
                dynamicTextAndImage {
                  ... on ProjectFieldsContentDynamicTextAndImageTextLayout {
                    __typename
                    text
                  }
                  ... on ProjectFieldsContentDynamicTextAndImageTextAndImageLayout {
                    __typename
                    text
                    image {
                      node {
                        altText
                        sourceUrl
                        
                      }
                    }
                  }
                }
              }
              ... on ProjectFieldsContentParagraphFieldLayout {
                __typename
                paragraphItem {
                  ... on ProjectFieldsContentParagraphItemTitleLayout {
                    __typename
                    title
                  }
                  ... on ProjectFieldsContentParagraphItemParagraphLayout {
                    __typename
                    paragraph
                  }
                  ... on ProjectFieldsContentParagraphItemLargeParagraphLayout {
                    __typename
                    largeParagraph
                  }
                }
              }
            }
          }

        }
        projects(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
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
      }

  `,
    {
      variables: {
        slug,
      },
    }
  );

  // Filter out the main project
  data.projects.nodes = data.projects.nodes.filter(
    (node) => node.slug !== slug
  );
  // If there are still 3 projects, remove the last one
  if (data.projects.nodes.length > 2) data.projects.nodes.pop();

  return { project: data.projectBy, projects: data.projects };
}

export async function getPageData(slug: string): Promise<IPageData> {
  const data = await fetchAPI(
    `
  query PageBySlug($slug: String!) {

    pageBySlug(slug: $slug) {
      id
      title
      slug
      content
    }
  }
  `,
    {
      variables: {
        slug,
      },
    }
  );

  return data;
}
