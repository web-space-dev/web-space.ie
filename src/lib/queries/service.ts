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
    serviceCategories {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
    servicesFields {
      content {
        fieldGroupName
        ... on ServicesFieldsContentSubHeroLargeTextLayout {
          __typename
          subHeroLargeText
        }
        ... on ServicesFieldsContentSimpleSectionLayout {
          __typename
          title
          pillText
          content
        }
        ... on ServicesFieldsContentLargeTextAreaLayout {
          __typename
          largeTextArea
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
