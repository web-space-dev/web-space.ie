export interface IProjectsData {
  projects: Projects;
}

export interface IProjectData {
  project: Project;
  projects: Projects;
}

export interface Projects {
  nodes: ProjectList[];
}

export interface ProjectList {
  title: string;
  slug: string;
  featuredImage: Image;
  tags: ProjectCategories;
  projectCategories: ProjectCategories;
}

export interface Project {
  title: string;
  slug: string;
  featuredImage: Image;
  tags: ProjectCategories;
  projectCategories: ProjectCategories;
  projectFields: ProjectFields;
}

export interface Image {
  node: Node;
}

export interface Node {
  altText: string;
  sourceUrl: string;
}

export interface ProjectCategories {
  nodes: ProjectCategoriesNode[];
}

export interface ProjectCategoriesNode {
  name: string;
  slug: string;
}

export interface ProjectFields {
  stat1: Stat;
  stat2: Stat;
  stat3: Stat;
  content: Content[];
}

export interface Stat {
  field: string;
  value: string;
}

export interface Content {
  __typename: string;
  fieldGroupName: string;
  largeTextArea?: string;
  gallery1?: Gallery;
  dynamicTextAndImage?: DynamicTextAndImage[];
  paragraphItem?: ParagraphItem[];
  gallery2?: Gallery;
}

export interface DynamicTextAndImage {
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
}

export interface Gallery {
  nodes: Node[];
}

export interface ParagraphItem {
  fieldGroupName?: string;
  title?: string;
  paragraph?: string;
  __typename?: string;
  largeParagraph?: string;
}

export interface Extensions {
  debug: Debug[];
}

export interface Debug {
  type: string;
  message: string;
}
