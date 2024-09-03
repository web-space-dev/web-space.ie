import { DynamicTextAndImage, Gallery, ParagraphItem } from "./project";

export interface IPageData {
  pageBySlug: PageBySlug;
}

export interface PageBySlug {
  id: string;
  title: string;
  slug: string;
  content: string;
  pageFields: PageFields;
}

export interface PageFields {
  content: Content[];
}

export interface Content {
  __typename: string;
  fieldGroupName: string;
  largeTextArea?: string;
  subHeroLargeText?: string;
  title?: null | string;
  pillText?: null | string;
  content?: string;
  gallery1?: Gallery;
  dynamicTextAndImage?: DynamicTextAndImage[];
  paragraphItem?: ParagraphItem[];
  gallery2?: Gallery;
}
