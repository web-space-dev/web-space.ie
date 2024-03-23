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
import Navbar from "../components/navbar";

interface IIndex {
  siteData: ISiteData;
  pageData: IHomePage;
  preview: boolean;
}

export default function Index({ siteData, pageData, preview }: IIndex) {
  const { page, projects, skillCategories } = pageData;

  return (
    <Layout preview={preview} pageTitle={page.title} siteData={siteData}>
      {/* Hero section */}
      <Hero title={page.homeFields.heroTitle} />

      {/* What we do */}
      <WhatWeDo items={page.homeFields.whatWeDo} />
      {/* Showcase */}
      <Showcase title={page.homeFields.showcaseTitle} projects={projects} />

      {/* Skills */}
      <Skills
        title={page.homeFields.skillsTitle}
        categories={skillCategories}
      />

      {/* Approach */}
      <Approach items={page.homeFields.approach} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const pageData = await getHomeData(preview);
  const siteData = await getSiteData();

  return {
    props: { siteData, pageData, preview },
    revalidate: 10,
  };
};
