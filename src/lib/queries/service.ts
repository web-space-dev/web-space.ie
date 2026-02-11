export const GET_SERVICE_DATA_QUERY = `
query PostBySlug($slug: String!) {
  serviceBy(slug: $slug) {
    title
    slug
    featuredImage {
      node {
        altText
        sourceUrl
        placeholderDataURI
      }
    }
    tags {
      nodes {
        name
        slug
      }
    }
    servicesFields {
      content {
        fieldGroupName
        ... on ServicesFieldsContentLargeTextAreaLayout {
          fieldGroupName
          largeTextArea
          subHeroLargeText
        }
        ... on ServicesFieldsContentGallery1Layout {
          __typename
          gallery1 {
            nodes {
              sourceUrl
              altText
              placeholderDataURI
            }
          }
        }
        ... on ServicesFieldsContentGallery2Layout {
          __typename
          gallery2 {
            nodes {
              sourceUrl
              altText
              placeholderDataURI
            }
          }
        }
        ... on ServicesFieldsContentDynamicTextImageLayout {
          __typename
          title
          fontSize
          dynamicTextAndImage {
            ... on ServicesFieldsContentDynamicTextAndImageTextLayout {
              __typename
              text
            }
            ... on ServicesFieldsContentDynamicTextAndImageTextAndImageLayout {
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
        ... on ServicesFieldsContentParagraphFieldLayout {
          __typename
          paragraphItem {
            ... on ServicesFieldsContentParagraphItemTitleLayout {
              __typename
              title
            }
            ... on ServicesFieldsContentParagraphItemParagraphLayout {
              __typename
              paragraph
            }
            ... on ServicesFieldsContentParagraphItemLargeParagraphLayout {
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
