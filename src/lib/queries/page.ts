export const GET_PAGE_DATA_QUERY = `
query PageBySlug($slug: String!) {
  pageBySlug(slug: $slug) {
    title
    slug
    featuredImage {
      node {
        altText
        sourceUrl
      }
    }
    pageFields {
      content {
        fieldGroupName
        ... on PageFieldsContentSubHeroLargeTextLayout {
          __typename
          largeTextArea
          subHeroLargeText
        }
        ... on PageFieldsContentSimpleSectionLayout {
          __typename
          title
          pillText
          content
        }
        ... on PageFieldsContentLargeTextAreaLayout {
          __typename
          largeTextArea
        }
        ... on PageFieldsContentGallery1Layout {
          __typename
          gallery1 {
            nodes {
              sourceUrl
              altText
            }
          }
        }
        ... on PageFieldsContentGallery2Layout {
          __typename
          gallery2 {
            nodes {
              sourceUrl
              altText
            }
          }
        }
        ... on PageFieldsContentDynamicTextImageLayout {
          __typename
          title
          dynamicTextAndImage {
            ... on PageFieldsContentDynamicTextAndImageTextLayout {
              __typename
              text
            }
            ... on PageFieldsContentDynamicTextAndImageTextAndImageLayout {
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
        ... on PageFieldsContentParagraphFieldLayout {
          __typename
          paragraphItem {
            ... on PageFieldsContentParagraphItemTitleLayout {
              __typename
              title
            }
            ... on PageFieldsContentParagraphItemParagraphLayout {
              __typename
              paragraph
            }
            ... on PageFieldsContentParagraphItemLargeParagraphLayout {
              __typename
              largeParagraph
            }
          }
        }
      }
    }
  }
}
  `;
