import { WhatWeDo } from "./home";
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
  fontSize: string[];
  dynamicTextAndImage?: DynamicTextAndImage[];
  paragraphItem?: ParagraphItem[];
  gallery2?: Gallery;
  whatWeDo?: WhatWeDo[];
  approach?: Approach[];
}

export interface Approach {
  title: string;
  paragraph: string;
}

// export interface WhatWeDo {
//   title: string;
//   pills: Pill[];
// }

export interface Pill {
  pillText: string;
}
