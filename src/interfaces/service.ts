export interface IServicesData {
  services: Services;
}

export interface IServiceData {
  service: Service;
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
  serviceCategories?: ServiceCategories;
}

export interface ServiceCategories {
  edges: ServiceCategoryEdge[];
}

export interface ServiceCategoryEdge {
  node: ServiceCategoryNode;
}

export interface ServiceCategoryNode {
  id: string;
  name: string;
  slug: string;
}

export interface Content {
  fieldGroupName: string;
  largeTextArea?: string;
  subHeroLargeText?: null;
  __typename: string;
  gallery1?: Tags;
  gallery2?: Tags;
  title?: string;
  pillText?: string | null;
  content?: string;
  dynamicTextAndImage?: DynamicTextAndImage[];
  paragraphItem?: ParagraphItem[];
}

export interface DynamicTextAndImage {
  __typename: string;
  fieldGroupName: string;
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
