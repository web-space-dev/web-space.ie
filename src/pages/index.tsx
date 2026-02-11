import { GetStaticProps } from "next";

import { getHomeData, getSiteData } from "../lib/api";
import { IHomePage } from "../interfaces/home";
import { ISiteData } from "../interfaces/site";

import Layout from "../components/layout";
import Hero from "../components/home/hero";
import WhatWeDo from "../components/home/whatWeDo";
import Showcase from "../components/home/showcase";
import Skills from "../components/home/skills";
import Approach from "../components/home/approach";
import Clients from "@/components/home/clients";
import Team from "@/components/home/team";

interface IIndex {
  siteData: ISiteData;
  pageData: IHomePage;
}

export default function Index({ siteData, pageData }: IIndex) {
  const { page, skillCategories } = pageData;

  const clientSkillCategory = skillCategories.nodes.find(
    (category) => category.slug === "clients",
  );
  const teamSkillCategory = skillCategories.nodes.find(
    (category) => category.slug === "people",
  );
  return (
    <Layout pageTitle={page.title} siteData={siteData} isHomePage={true}>
      {/* Hero section */}
      <Hero title={page.homeFields.heroTitle} />

      {/* What we do */}
      <WhatWeDo items={page.homeFields.whatWeDo} />

      {/* Clients */}
      <Clients skillCategory={clientSkillCategory} />

      {/* Team */}
      <Team skillCategory={teamSkillCategory} />

      {/* Approach */}
      {/* <Approach items={page.homeFields.approach} /> */}

      {/* Showcase */}
      {/* <Showcase
        title={page.homeFields.showcaseTitle}
        projects={page.homeFields.showcaseProjects}
      /> */}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getHomeData();
  const siteData = await getSiteData();

  return {
    props: { siteData, pageData },
    revalidate: 10,
  };
};
