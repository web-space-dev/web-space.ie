import { Services } from "./service";

export interface IServicesData {
  serviceCategories?: IServiceCategoryData;
}

export interface IServiceCategoryData {
  serviceCategories?: ServiceCategories;
  serviceCategoryBySlug?: ServiceCategory | null;
}

export interface ServiceCategories {
  nodes: ServiceCategory[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: null | string;
  serviceCategoryFields: ServiceCategoryFields;
  services?: Services;
}

export interface ServiceCategoryFields {
  featuredImage?: FeaturedImage | null;
  contentBody: ContentBody[];
}

export interface FeaturedImage {
  node: FeaturedImageNode;
}

export interface FeaturedImageNode {
  altText: string;
  sourceUrl: string;
  placeholderDataURI: string;
}

export interface ContentBody {
  __typename: string;
  servicesListTitle?: string;
  largeTextArea?: string;
  imageListTitle?: string;
  imageList?: ImageList[];
  ctaText?: string;
  text?: string;
}

export interface ImageList {
  image: Image;
  text: string;
}

export interface Image {
  node: FeaturedImageNode;
}
