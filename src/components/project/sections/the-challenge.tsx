import Image from "next/image";
import { DynamicTextAndImage } from "../../../interfaces/project";
import { Row } from "../../global/grid/Row";
import { Col } from "../../global/grid/Col";
import Pill from "../../global/pill";
import styled from "@emotion/styled";
import { useState } from "react";
import { dimensions, breakpoints, colors } from "../../../styles/variables";
import { getRemSize } from "../../../styles/globalCss";
import useIsDesktop from "../../../hooks/useIsDesktop";
import useIsTablet from "../../../hooks/useIsTablet";
import { motion } from "framer-motion";

interface IProps {
  content: DynamicTextAndImage[];
}

const StyledBigWrapper = styled.div`
  position: relative;
`;

const StyledImage = styled(motion(Image))`
  border-radius: 26px;
  object-fit: cover;
  width: 375px;
  height: 774px;
  position: absolute;
  @media (min-width: 1350px) {
    top: 92px;
    left: 220px;
  }

  @media (min-width: 1088px) and (max-width: 1350px) {
    top: 92px;
    left: 138px;
  }

  @media (max-width: 1088px) {
    top: 92px;
    left: 75px;
  }
`;
const StyledMobileImageWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  gap: 8px;
  width: 100%;
  scrollbar-width: none;
`;
const StyledMobileImage = styled(Image)`
  border-radius: 26px;
  object-fit: cover;
  width: 212px;
  height: 393px;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.sm}px) {
    width: 162px;
    height: 343px;
  }
`;

const StyledParagraphImage = styled.span`
  color: ${colors.accent};
  transition: color 0.2s;

  &:hover {
    color: ${colors.white};
  }
  & > span {
    text-decoration: underline;
  }
`;
const StyledParagraph = styled.p`
  font-size: ${getRemSize(dimensions.textSizes.large.desktop)};
  line-height: 1.15;
  letter-spacing: 2px;
  font-weight: 500;
`;

const StyledMobileParagraph = styled.p`
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  line-height: 1.3;
  letter-spacing: 1px;
  font-weight: 400;
  text-indent: 72px;
  margin-bottom: 40px;
`;
const StyledMobileParagraphImage = styled.span`
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
`;
export default function DynamicTextAndImages({ content }: IProps) {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();
  const [hoverIndex, setHoverIndex] = useState(null);
  const onHover = (index) => {
    setHoverIndex(index);
  };

  const onHoverOver = () => {
    setHoverIndex(null);
  };
  return (
    <StyledBigWrapper>
      <Row>
        {isDesktop ? (
          <>
            <Col start={1} span={4}>
              <Pill pillText="The challenge" />
            </Col>
            <Col start={5} span={8}>
              <StyledParagraph>
                {content.map((item, index) => {
                  return item?.image ? (
                    <StyledParagraphImage
                      onMouseEnter={(e) => onHover(index)}
                      onMouseLeave={(e) => onHoverOver()}
                    >
                      {" "}
                      <span>{item.text}</span>
                    </StyledParagraphImage>
                  ) : (
                    <>{item.text}</>
                  );
                })}
              </StyledParagraph>
              {hoverIndex && (
                <StyledImage
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                  width={375}
                  height={774}
                  onMouseEnter={(e) => onHover(hoverIndex)}
                  onMouseLeave={(e) => onHoverOver()}
                  alt={`Gallery Image ${hoverIndex}`}
                  loader={() => content[hoverIndex].image.node.sourceUrl}
                  src={content[hoverIndex].image.node.sourceUrl}
                />
              )}
            </Col>
          </>
        ) : (
          <>
            <Col start={1} span={12}>
              <Pill pillText="The challenge" />
            </Col>
            <Col start={1} span={12}>
              <StyledMobileParagraph>
                {content.map((item, index) => {
                  return item?.image ? (
                    <StyledMobileParagraphImage>
                      <span>{" " + item.text}</span>
                    </StyledMobileParagraphImage>
                  ) : (
                    <>{item.text}</>
                  );
                })}
              </StyledMobileParagraph>
              <StyledMobileImageWrapper>
                {content.map((item, index) => {
                  return (
                    item.image &&
                    item.image.node && (
                      <StyledMobileImage
                        width={isTablet ? 212 : 162}
                        height={isTablet ? 393 : 343}
                        alt={`Gallery Image ${index}`}
                        loader={() => item.image.node.sourceUrl}
                        src={item.image.node.sourceUrl}
                      />
                    )
                  );
                })}
              </StyledMobileImageWrapper>
            </Col>
          </>
        )}
      </Row>
    </StyledBigWrapper>
  );
}
