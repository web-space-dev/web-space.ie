import { Fragment } from "react";
import { Content } from "../../interfaces/page";

import Project from "../../pages/projects/[slug]";
import { ContentParagraph } from "../project/sections/content-paragraph";
import Gallery1 from "../project/sections/gallery-1";
import Gallery2 from "../project/sections/gallery-2";
import LargeTextArea from "../project/sections/largeTextArea";
import DynamicTextAndImages from "../project/sections/the-challenge";
import { SubHero } from "./subHero";
import { PageSection } from "./pageSection";

interface IProps {
  content: Content[];
}

export default function PageBody({ content }: IProps) {
  const renderContent = (item: Content) => {
    switch (item.__typename) {
      case "PageFieldsContentSubHeroLargeTextLayout":
        return <SubHero text={item.subHeroLargeText} />;
      case "PageFieldsContentSimpleSectionLayout":
        return (
          <PageSection
            title={item.title}
            pillText={item.pillText}
            content={item.content}
          />
        );
      case "PageFieldsContentLargeTextAreaLayout":
        return <LargeTextArea text={item.largeTextArea} />;

      case "PageFieldsContentGallery1Layout":
        return <Gallery1 images={item.gallery1} />;

      case "PageFieldsContentGallery2Layout":
        return <Gallery2 images={item.gallery2} />;

      case "PageFieldsContentDynamicTextImageLayout":
        return (
          <DynamicTextAndImages
            title={item.title || ""}
            content={item.dynamicTextAndImage}
            fontSize={item.fontSize}
          />
        );

      case "PageFieldsContentParagraphFieldLayout":
        return <ContentParagraph content={item.paragraphItem} />;
    }
  };

  return (
    <>
      {content?.map((item, index) => {
        return <Fragment key={index}>{renderContent(item)}</Fragment>;
      })}
    </>
  );
}
