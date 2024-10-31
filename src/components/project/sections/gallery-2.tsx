import Image from "next/image";
import { Gallery } from "../../../interfaces/project";
import styled from "@emotion/styled";
import { breakpoints } from "../../../styles/variables";
import useIsDesktop from "../../../hooks/useIsDesktop";
import useIsTablet from "../../../hooks/useIsTablet";
import { Col } from "../../global/grid/Col";
import { GridContainer } from "../../global/grid/gridContainer";
import { Row } from "../../global/grid/Row";

interface IProps {
  images: Gallery;
}
const StyledImageWrapper = styled.div`
  display: flex;
  max-height: 768px;
  margin-top: 120px;
  margin-bottom: 180px;
  justify-content: center;

  & img:not(:last-child) {
    margin-right: 20px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    flex-direction: column;
    margin-bottom: 120px;
    & img {
      border-radius: 26px;
    }
    & img:not(:last-child) {
      margin-bottom: 8px;
    }
  }
`;

export default function Gallery2({ images }: IProps) {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();
  return (
    <Row>
      <Col span={12}>
        <StyledImageWrapper>
          {images.nodes.map((image, index) => {
            return (
              <Image
                key={index}
                width={
                  isDesktop ? (index === 0 ? 836 : 592) : isTablet ? 686 : 343
                }
                height={isDesktop ? 768 : isTablet ? 428 : 236}
                alt={`Gallery Image ${index}`}
                src={image.sourceUrl}
                placeholder="blur"
                blurDataURL={image?.placeholderDataURI}
                style={
                  isDesktop
                    ? { height: "auto" }
                    : { height: "auto", width: "100%" }
                }
              />
            );
          })}
        </StyledImageWrapper>
      </Col>
    </Row>
  );
}
