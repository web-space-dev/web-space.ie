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
import { useEffect, useState } from "react";

interface IIndex {
  siteData: ISiteData;
  pageData: IHomePage;
}

export default function Index({ siteData, pageData }: IIndex) {
  const { page, skillCategories } = pageData;

  return (
    <Layout pageTitle={page.title} siteData={siteData} isHomePage={true}>
      {/* Hero section */}
      <Hero title={page.homeFields.heroTitle} />

      {/* What we do */}
      <WhatWeDo items={page.homeFields.whatWeDo} />
      {/* Showcase */}
      <Showcase
        title={page.homeFields.showcaseTitle}
        projects={page.homeFields.showcaseProjects}
      />

      {/* Skills */}
      <Skills categories={skillCategories} />

      {/* Approach */}
      <Approach items={page.homeFields.approach} />
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
