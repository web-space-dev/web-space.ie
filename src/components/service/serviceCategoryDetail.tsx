import { useState } from "react";
import { GridContainer } from "../global/grid/gridContainer";
import { ServiceCategory } from "../../interfaces/serviceCategory";
import { ServiceHero } from "./serviceHero";
import { ServiceCategoryContent } from "../serviceCategory/ServiceCategoryContent";
import { Contact } from "../contact";

interface ServiceCategoryDetailProps {
  categoryData: ServiceCategory;
}

export function ServiceCategoryDetail({
  categoryData,
}: ServiceCategoryDetailProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState("");

  const handleCtaClick = (ctaText?: string) => {
    setContactSubject(ctaText || "");
    setIsContactOpen(true);
  };

  return (
    <>
      <ServiceHero category={categoryData} />
      <GridContainer>
        <ServiceCategoryContent
          content={categoryData.serviceCategoryFields?.contentBody || []}
          services={categoryData.services}
          categorySlug={categoryData.slug}
          onCtaClick={handleCtaClick}
        />
      </GridContainer>
      <Contact
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        dark={true}
        defaultSubject={contactSubject}
      />
    </>
  );
}
