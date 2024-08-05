import React from "react";
import { GetStaticProps } from "next";
import { ISiteData } from "../../interfaces/site";
import { getSiteData } from "../../lib/api";
import Head from "next/head";

interface IWrapper {
  pageTitle: string;
  siteData: ISiteData;
}

export default function Wrapper({ pageTitle, siteData }: IWrapper) {
  const renderTitle = siteData
    ? pageTitle
      ? `${pageTitle} | ${siteData.generalSettings.title}`
      : siteData.generalSettings.title
    : "";

  const renderDescription = siteData
    ? siteData.generalSettings.description
    : "";

  return (
    <Head>
      <title>{renderTitle}</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="description" content={renderDescription} />
      <meta property="og:image" content={"/preview.png"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={renderTitle} />
      <meta name="twitter:description" content={renderDescription} />
      <meta name="twitter:image" content="/preview.png" />
    </Head>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const siteData = await getSiteData();

  return {
    props: { siteData },
  };
};
