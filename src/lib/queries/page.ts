export const GET_PAGE_DATA_QUERY = `
query PageBySlug($slug: String!) {
  pageBySlug(slug: $slug) {
    title
    slug
    featuredImage {
      node {
        altText
        sourceUrl
        placeholderDataURI
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
              placeholderDataURI
            }
          }
        }
        ... on PageFieldsContentGallery2Layout {
          __typename
          gallery2 {
            nodes {
              sourceUrl
              altText
              placeholderDataURI
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
                  placeholderDataURI
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
        ... on PageFieldsContentWhatWeDoLayout {
          __typename
          title
          whatWeDo {
            title
            pills {
              pillText
            }
          }
        }
        ... on PageFieldsContentApproachLayout {
          __typename
          title
          approach {
            title
            paragraph
          }
        }
      }
    }
  }
}
  `;
