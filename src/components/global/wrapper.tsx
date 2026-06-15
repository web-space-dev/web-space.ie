import React from "react";
import { GetStaticProps } from "next";
import { ISiteData } from "../../interfaces/site";
import { getSiteData } from "../../lib/api";
import Head from "next/head";
import { useRouter } from "next/router";

interface IWrapper {
  pageTitle?: string;
  siteData?: ISiteData;
  pageDescription?: string;
}

export default function Wrapper({
  pageTitle,
  siteData,
  pageDescription,
}: IWrapper) {
  const router = useRouter();
  const siteUrl = (
    siteData?.generalSettings.url || "https://web-space.ie"
  ).replace(/\/$/, "");
  const currentPath = (router.asPath || "/").split("?")[0].split("#")[0];
  const canonicalUrl = `${siteUrl}${currentPath === "/" ? "" : currentPath}`;

  const renderTitle = siteData
    ? pageTitle
      ? `${pageTitle} | ${siteData.generalSettings.title}`
      : siteData.generalSettings.title
    : "Web Space";

  const renderDescription = pageDescription
    ? pageDescription
    : siteData
      ? siteData.generalSettings.description
      : "Creative development studio with a goal to conceptualise & execute creative solutions that meet unique needs and objectives, helping to effectively achieve creative goals.";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Web Space",
    url: "https://web-space.ie",
    serviceType: [
      "WordPress Engineering",
      "Custom Booking Systems",
      "Product & MVP Development",
      "Technical Training & Research",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "WordPress Engineering",
          itemListElement: [
            {
              "@type": "Service",
              name: "WordPress Rescue & Rebuild",
            },
            {
              "@type": "Service",
              name: "Performance & Accessibility Optimisation",
            },
            {
              "@type": "Service",
              name: "Managed Maintenance & Security",
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Custom Booking Systems",
          itemListElement: [
            {
              "@type": "Service",
              name: "Custom Cake Booking Systems",
            },
            {
              "@type": "Service",
              name: "Class & Event Booking Platforms",
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Product & MVP Development",
          itemListElement: [
            {
              "@type": "Service",
              name: "Concept to MVP Build",
            },
            {
              "@type": "Service",
              name: "Product Iteration & Scaling",
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Technical Training & Research",
          itemListElement: [
            {
              "@type": "Service",
              name: "Software Engineering Workshops",
            },
            {
              "@type": "Service",
              name: "Green Software & Sustainability Talks",
            },
          ],
        },
      ],
    },
  };

  return (
    <Head>
      <title>{renderTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
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
      <meta name="description" content={renderDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={renderTitle} />
      <meta property="og:description" content={renderDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${siteUrl}/preview.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={renderTitle} />
      <meta name="twitter:description" content={renderDescription} />
      <meta name="twitter:image" content={`${siteUrl}/preview.png`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const siteData = await getSiteData();

  return {
    props: { siteData },
  };
};
