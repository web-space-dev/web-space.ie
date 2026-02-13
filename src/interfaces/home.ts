import { Projects } from "./project";

export interface IHomePage {
  page: Page;
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
  whatWeDoSubtitle: string;
  whatWeDo: WhatWeDo[];
  showcaseTitle: string;
  showcaseProjects: Projects;
  approach: Approach[];
}

export interface Approach {
  title: string;
  paragraph: string;
}

export interface WhatWeDo {
  title: string;
  description: string;
  pills: Pill[];
  serviceCategory?: ServiceCategory;
}

export interface ServiceCategory {
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

export interface Pill {
  pillText: string;
  id: number;
  hoverText?: string;
  service?: PillService;
}

export interface PillService {
  nodes: PillServiceNode[];
}

export interface PillServiceNode {
  slug: string;
}

export interface SkillCategories {
  nodes: SkillCategoriesNode[];
}

export interface SkillCategoriesNode {
  name: string;
  description: string;
  slug: string;
  skills: Skills;
}

export interface Skills {
  nodes: SkillsNode[];
}

export interface SkillsNode {
  title: string;
  featuredImage: PageFeaturedImage;
  skillsFields: SkillsFields;
}

export interface SkillsFields {
  link?: string;
  project?: SkillsProject;
}

export interface SkillsProject {
  edges: SkillsProjectEdge[];
}

export interface SkillsProjectEdge {
  node: SkillsProjectNode;
}

export interface SkillsProjectNode {
  id: string;
  slug: string;
}
