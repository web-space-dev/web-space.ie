import { getAllPagesWithSlug, getAllProjectsWithSlug } from "../lib/api";

const BASE_URL = "https://web-space.ie";

function generateSiteMap(pages, projects) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
           <loc>${`${BASE_URL}`}</loc>
           <changefreq>weekly</changefreq>
           <priority>0.8</priority>
       </url>
          <url>
           <loc>${`${BASE_URL}/projects`}</loc>
           <changefreq>weekly</changefreq>
           <priority>0.8</priority>
       </url>
     ${pages.edges
       .map(({ node }) => {
         return `
       <url>
           <loc>${`${BASE_URL}/${node.slug}`}</loc>
           <changefreq>weekly</changefreq>
           <priority>0.8</priority>
       </url>
     `;
       })
       .join("")}
     ${projects.edges
       .map(({ node }) => {
         return `
       <url>
           <loc>${`${BASE_URL}/projects/${node.slug}`}</loc>
           <changefreq>weekly</changefreq>
           <priority>0.8</priority>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  try {
    // We make API calls to gather the URLs for our site
    const pages = await getAllProjectsWithSlug();
    const projects = await getAllProjectsWithSlug();
    // We generate the XML sitemap with the pages and projects data
    const sitemap = generateSiteMap(pages, projects);

    res.setHeader("Content-Type", "text/xml");
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end("Error generating sitemap");
    return {
      props: {},
    };
  }
}

export default SiteMap;
