import { Fragment } from "react";
import LargeTextArea from "../project/sections/largeTextArea";
import { ContentBody } from "../../interfaces/serviceCategory";
import { Services } from "../../interfaces/service";
import { ServiceCategoryImageList } from "./ServiceCategoryImageList";
import { ServiceCategoryCta } from "./ServiceCategoryCta";
import { ServiceCategoryServicesList } from "./ServiceCategoryServicesList";

interface ServiceCategoryContentProps {
  content: ContentBody[];
  services?: Services;
  categorySlug: string;
  onCtaClick?: (ctaText?: string) => void;
}

export function ServiceCategoryContent({
  content,
  services,
  categorySlug,
  onCtaClick,
}: ServiceCategoryContentProps) {
  return (
    <>
      {content?.map((item, index) => {
        switch (item.__typename) {
          case "ServiceCategoryFieldsContentBodyLargeTextAreaLayout":
            return item.largeTextArea ? (
              <Fragment key={`content-${index}`}>
                <LargeTextArea text={item.largeTextArea} />
              </Fragment>
            ) : null;
          case "ServiceCategoryFieldsContentBodyImageListLayout":
            return item.imageList && item.imageList.length > 0 ? (
              <Fragment key={`content-${index}`}>
                <ServiceCategoryImageList
                  imageList={item.imageList}
                  title={item.imageListTitle}
                />
              </Fragment>
            ) : null;
          case "ServiceCategoryFieldsContentBodyCtaLayout":
            return (
              <Fragment key={`content-${index}`}>
                <ServiceCategoryCta
                  text={item.text}
                  ctaText={item.ctaText}
                  onClick={() => onCtaClick?.(item.ctaText)}
                />
              </Fragment>
            );
          case "ServiceCategoryFieldsContentBodyServicesListLayout":
            return (
              <Fragment key={`content-${index}`}>
                <ServiceCategoryServicesList
                  services={services}
                  categorySlug={categorySlug}
                  title={item.servicesListTitle}
                />
              </Fragment>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
