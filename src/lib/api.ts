import { IServiceData, IServicesData } from "@/interfaces/service";
import { IHomePage } from "../interfaces/home";
import { IPageData } from "../interfaces/page";
import { IProjectData, IProjectsData } from "../interfaces/project";
import { ISiteData } from "../interfaces/site";
import { GET_HOME_DATA_QUERY } from "./queries/home";
import { GET_PAGE_DATA_QUERY } from "./queries/page";
import { GET_PROJECT_DATA_QUERY } from "./queries/project";
import { GET_PROJECTS_DATA_QUERY } from "./queries/projects";
import { GET_SERVICES_DATA_QUERY } from "./queries/services";
import { GET_SITE_DATA_QUERY } from "./queries/site";
import { GET_SERVICE_DATA_QUERY } from "./queries/service";

const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers["Authorization"] =
      `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  // console.log('response!')
  // console.log(json)
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getAllProjectsWithSlug() {
  const data = await fetchAPI(`
    {
      projects(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.projects;
}

export async function getAllPagesWithSlug() {
  const data = await fetchAPI(`
  {
    pages(where: {notIn: ["cG9zdDo5", "cG9zdDo0NA=="]}, first: 10000) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `);
  return data?.pages;
}

export async function getAllServicesWithSlug() {
  const data = await fetchAPI(`
  {
    services(first: 10000) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `);
  return data?.services;
}

export async function getSiteData(): Promise<ISiteData> {
  const data = await fetchAPI(GET_SITE_DATA_QUERY);

  return data;
}

export async function getHomeData(): Promise<IHomePage> {
  const data = await fetchAPI(GET_HOME_DATA_QUERY);

  return data;
}

export async function getProjectsData(): Promise<IProjectsData> {
  const data = await fetchAPI(GET_PROJECTS_DATA_QUERY);

  return data;
}

export async function getServicesData(): Promise<IServicesData> {
  const data = await fetchAPI(GET_SERVICES_DATA_QUERY);

  return data;
}

export async function getServiceData(slug: string): Promise<IServiceData> {
  const data = await fetchAPI(GET_SERVICE_DATA_QUERY, {
    variables: {
      slug,
    },
  });

  return { service: data.serviceBy };
}

export async function getProjectAndMoreProjects(
  slug: string,
): Promise<IProjectData> {
  const data = await fetchAPI(GET_PROJECT_DATA_QUERY, {
    variables: {
      slug,
    },
  });

  // Filter out the main project
  data.projects.nodes = data.projects.nodes.filter(
    (node) => node.slug !== slug,
  );
  // If there are still 3 projects, remove the last one
  if (data.projects.nodes.length > 2) data.projects.nodes.pop();

  return { project: data.projectBy, projects: data.projects };
}

export async function getPageData(slug: string): Promise<IPageData> {
  const data = await fetchAPI(GET_PAGE_DATA_QUERY, {
    variables: {
      slug,
    },
  });

  return data;
}
