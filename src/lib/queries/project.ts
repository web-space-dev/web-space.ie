export const GET_PROJECT_DATA_QUERY = `
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
        link
      }
      stat2 {
        field
        value
        link
      }
      stat3 {
        field
        value
        link
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
        ... on ProjectFieldsContentDynamicTextImageLayout {
          __typename
          title
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
  projects(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
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
`;
