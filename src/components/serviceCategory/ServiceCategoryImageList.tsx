import styled from "@emotion/styled";
import Image from "next/image";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import AnimateInView from "../global/animation/animateInView";
import { ImageList } from "../../interfaces/serviceCategory";
import ArrowUpRight from "../../icons/arrowUpRight";

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

const imageListItemStyles = `
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

const StyledImageListItem = styled.div`
  ${imageListItemStyles}
`;

const StyledImageListItemLink = styled.a`
  ${imageListItemStyles}
  cursor: pointer;
  text-decoration: none;
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

const StyledImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.08);
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

const StyledImageListTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  flex: 1;
`;

const StyledImageListSubText = styled.p`
  margin: 0;
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop - 10)};
  line-height: 1.4;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 0.6);
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.6);
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.28s ease;
  }

  a:hover &::after,
  a:focus-visible &::after {
    transform: scaleX(1);
  }

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.textSizes.normal.mobile - 10)};
  }
`;

const StyledSubTextRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
`;

const StyledSubTextArrow = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 0;
  overflow: visible;

  @media (max-width: ${breakpoints.md}px) {
    svg {
      width: 16px;
      height: 16px;
    }
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

interface ImageListRowProps {
  item: ImageList;
}

function ImageListRow({ item }: ImageListRowProps) {
  const hasLink = !!item.link;

  const rowContent = (
    <>
      <StyledImageListImage>
        {item.image?.node?.sourceUrl ? (
          <Image
            src={item.image.node.sourceUrl}
            alt={item.image.node.altText || item.text}
            fill
            style={{ objectFit: "cover" }}
            placeholder="blur"
            blurDataURL={item.image.node.placeholderDataURI}
          />
        ) : (
          <StyledImagePlaceholder aria-hidden="true" />
        )}
      </StyledImageListImage>

      <StyledImageListTextWrapper>
        <StyledImageListText>{item.text}</StyledImageListText>
        {item.subText && (
          <StyledSubTextRow>
            <StyledImageListSubText>{item.subText}</StyledImageListSubText>
            {hasLink && (
              <StyledSubTextArrow aria-hidden="true">
                <ArrowUpRight fill="rgba(255, 255, 255, 0.6)" />
              </StyledSubTextArrow>
            )}
          </StyledSubTextRow>
        )}
      </StyledImageListTextWrapper>
    </>
  );

  if (!hasLink) {
    return <StyledImageListItem>{rowContent}</StyledImageListItem>;
  }

  return (
    <StyledImageListItemLink
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {rowContent}
    </StyledImageListItemLink>
  );
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
                <ImageListRow item={item} />
              </AnimateInView>
              {index < imageList.length - 1 && <StyledImageListDivider />}
            </div>
          ))}
        </StyledImageListItems>
      </StyledContentWrapper>
    </StyledSectionWrapper>
  );
}
