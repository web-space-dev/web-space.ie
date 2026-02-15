import styled from "@emotion/styled";
import Image from "next/image";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import AnimateInView from "../global/animation/animateInView";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";
import { ImageList } from "../../interfaces/serviceCategory";

const StyledImageListRow = styled(Row)`
  margin: 120px 0;

  @media (max-width: ${breakpoints.md}px) {
    margin: 120px 0 40px 0;
  }
`;

const StyledStickyTitle = styled.h2`
  margin: 0;
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  font-weight: 500;
  letter-spacing: 2px;
  position: sticky;
  top: 140px;

  @media (max-width: ${breakpoints.md}px) {
    position: static;
    font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
    letter-spacing: 1px;
    margin-bottom: 24px;
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
    <StyledImageListRow>
      <Col span={4} spanMobile={12}>
        {title && <StyledStickyTitle>{title}</StyledStickyTitle>}
      </Col>
      <Col span={8} spanMobile={12}>
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
      </Col>
    </StyledImageListRow>
  );
}
