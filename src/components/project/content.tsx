import { Fragment } from "react";
import { Content } from "../../interfaces/project";
import { ContentParagraph } from "./sections/content-paragraph";
import Gallery1 from "./sections/gallery-1";
import Gallery2 from "./sections/gallery-2";
import LargeTextArea from "./sections/largeTextArea";
import DynamicTextAndImages from "./sections/the-challenge";
import Project from "../../pages/projects/[slug]";

interface IProps {
  content: Content[];
}

export default function ProjectBody({ content }: IProps) {
  const renderContent = (item: Content) => {
    switch (item.__typename) {
      case "ProjectFieldsContentLargeTextAreaLayout":
        return <LargeTextArea text={item.largeTextArea} />;

      case "ProjectFieldsContentGallery1Layout":
        return <Gallery1 images={item.gallery1} />;

      case "ProjectFieldsContentGallery2Layout":
        return <Gallery2 images={item.gallery2} />;

      case "ProjectFieldsContentTheChallengeLayout":
        return <DynamicTextAndImages content={item.dynamicTextAndImage} />;

      case "ProjectFieldsContentParagraphFieldLayout":
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
