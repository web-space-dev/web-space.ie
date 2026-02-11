export interface IServicesData {
  services: Services;
}

export interface IServiceData {
  service: Service;
  services: Services;
}

export interface Services {
  nodes: Service[];
}

export interface ServiceList {
  title: string;
  slug: string;
  featuredImage: null;
  tags: Tags;
  servicesFields: ServicesFields;
}

export interface ServicesFields {
  description: string;
  content: Content[];
}

export interface Service {
  title: string;
  slug: string;
  featuredImage: Image;
  servicesFields: ServicesFields;
}

export interface Content {
  fieldGroupName: string;
  largeTextArea?: string;
  subHeroLargeText?: null;
  __typename?: string;
  gallery1?: Tags;
  gallery2?: Tags;
  title?: string;
  fontSize?: string[];
  dynamicTextAndImage?: DynamicTextAndImage[];
  paragraphItem?: ParagraphItem[];
}

export interface DynamicTextAndImage {
  __typename: string;
  text: string;
  image?: Image;
}

export interface Image {
  node: Node;
}

export interface Node {
  altText: string;
  sourceUrl: string;
  placeholderDataURI: string;
}

export interface Tags {
  nodes: Node[];
}

export interface ParagraphItem {
  __typename: string;
  title?: string;
  paragraph?: string;
  largeParagraph?: string;
}
