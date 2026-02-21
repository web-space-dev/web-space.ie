import styled from "@emotion/styled";
import Image from "next/image";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import AnimateInView from "../global/animation/animateInView";
import { ImageList } from "../../interfaces/serviceCategory";

const StyledSectionWrapper = styled.section`
  background: ${colors.black};
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 120px 32px;
  display: flex;
  gap: 20px;
  align-items: flex-start;

  @media all and (max-width: 1200px) {
    gap: 32px;
    padding: 120px 24px;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    flex-direction: column;
    padding: 80px 0;
    gap: 40px;
  }
`;

const StyledStickyTextWrapper = styled.div`
  width: 591px;
  flex-shrink: 0;
  white-space: pre-wrap;
  position: sticky;
  top: 140px;

  @media all and (max-width: 1200px) {
    width: 450px;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    width: 100%;
    top: 0px;
    z-index: 10;
    backdrop-filter: blur(9px);
    background: rgba(29, 29, 29, 0.8);
    padding: 80px 16px 20px 16px;
  }
`;

const StyledStickyTitle = styled.h2`
  margin: 0;
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  font-weight: 500;
  letter-spacing: 2px;
  width: 100%;

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
    letter-spacing: 1px;
  }
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  min-width: 0;
  width: 100%;

  @media (max-width: ${breakpoints.md}px) {
    padding: 0 40px;
  }
`;

const StyledImageListItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const StyledImageListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 20px;
  border-radius: 20px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(57, 151, 156, 0.2);
  }

  @media (max-width: ${breakpoints.md}px) {
    padding: 14px 0;
    border-radius: 0;
  }
`;

const StyledImageListImage = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  border-radius: 14px;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.md}px) {
    width: 70px;
    height: 70px;
  }
`;

const StyledImageListText = styled.p`
  margin: 0;
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: rgba(255, 255, 255, 0.85);

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.textSizes.normal.mobile)};
  }
`;

const StyledImageListDivider = styled.div`
  height: 1px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
`;

interface ServiceCategoryImageListProps {
  imageList: ImageList[];
  title?: string;
}

export function ServiceCategoryImageList({
  imageList,
  title,
}: ServiceCategoryImageListProps) {
  return (
    <StyledSectionWrapper>
      {title && (
        <StyledStickyTextWrapper>
          <StyledStickyTitle>{title}</StyledStickyTitle>
        </StyledStickyTextWrapper>
      )}
      <StyledContentWrapper>
        <StyledImageListItems>
          {imageList.map((item, index) => (
            <div key={`image-list-${index}`}>
              <AnimateInView>
                <StyledImageListItem>
                  <StyledImageListImage>
                    <Image
                      src={item.image.node.sourceUrl}
                      alt={item.image.node.altText}
                      fill
                      style={{ objectFit: "cover" }}
                      placeholder="blur"
                      blurDataURL={item.image.node.placeholderDataURI}
                    />
                  </StyledImageListImage>
                  <StyledImageListText>{item.text}</StyledImageListText>
                </StyledImageListItem>
              </AnimateInView>
              {index < imageList.length - 1 && <StyledImageListDivider />}
            </div>
          ))}
        </StyledImageListItems>
      </StyledContentWrapper>
    </StyledSectionWrapper>
  );
}
