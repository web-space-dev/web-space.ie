import { Fragment } from "react";
import { Content } from "../../interfaces/page";

import Project from "../../pages/projects/[slug]";
import { ContentParagraph } from "../project/sections/content-paragraph";
import Gallery1 from "../project/sections/gallery-1";
import Gallery2 from "../project/sections/gallery-2";
import LargeTextArea from "../project/sections/largeTextArea";
import DynamicTextAndImages from "../project/sections/the-challenge";
import { SubHero } from "../page/subHero";
import { PageSection } from "../page/pageSection";

interface IProps {
  content: Content[];
}

export default function ServicesBody({ content }: IProps) {
  const renderContent = (item: Content) => {
    switch (item.__typename) {
      case "ServicesFieldsContentSubHeroLargeTextLayout":
        return <SubHero text={item.subHeroLargeText || ""} />;
      case "ServicesFieldsContentSimpleSectionLayout":
        return (
          <PageSection
            title={item.title || ""}
            pillText={item.pillText || ""}
            content={item.content}
          />
        );
      case "ServicesFieldsContentLargeTextAreaLayout":
        return <LargeTextArea text={item.largeTextArea || ""} />;

      case "ServicesFieldsContentGallery1Layout":
        return <Gallery1 images={item.gallery1} />;

      case "ServicesFieldsContentGallery2Layout":
        return <Gallery2 images={item.gallery2} />;

      case "ServicesFieldsContentDynamicTextImageLayout":
        return (
          <DynamicTextAndImages
            title={item.title || ""}
            content={item.dynamicTextAndImage}
            fontSize={item.fontSize || ["Large"]}
          />
        );

      case "ServicesFieldsContentParagraphFieldLayout":
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
