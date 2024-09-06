import { Projects } from "./project";

export interface IHomePage {
  page: Page;
  projects: Projects;
  skillCategories: SkillCategories;
}

export interface Page {
  id: string;
  title: string;
  featuredImage: PageFeaturedImage;
  homeFields: HomeFields;
}

export interface PageFeaturedImage {
  node: PurpleNode;
}

export interface PurpleNode {
  sourceUrl: string;
  altText: string;
  placeholderDataURI?: string;
}

export interface HomeFields {
  heroTitle: string;
  whatWeDo: WhatWeDo[];
  showcaseTitle: string;
  approach: Approach[];
}

export interface Approach {
  title: string;
  paragraph: string;
}

export interface WhatWeDo {
  title: string;
  pills: Pill[];
}

export interface Pill {
  pillText: string;
  id: number;
}

export interface SkillCategories {
  nodes: SkillCategoriesNode[];
}

export interface SkillCategoriesNode {
  name: string;
  description: string;
  skills: Skills;
}

export interface Skills {
  nodes: SkillsNode[];
}

export interface SkillsNode {
  title: string;
  featuredImage: PageFeaturedImage;
}
