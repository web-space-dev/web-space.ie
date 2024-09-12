import Image from "next/image";
import { DynamicTextAndImage } from "../../../interfaces/project";
import { Row } from "../../global/grid/Row";
import { Col } from "../../global/grid/Col";
import Pill from "../../global/pill";
import styled from "@emotion/styled";
import { Fragment, useState } from "react";
import { dimensions, breakpoints, colors } from "../../../styles/variables";
import { getRemSize } from "../../../styles/globalCss";
import useIsDesktop from "../../../hooks/useIsDesktop";
import useIsTablet from "../../../hooks/useIsTablet";
import { motion } from "framer-motion";

interface IProps {
  title: string;
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

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export default function DynamicTextAndImages({ title, content }: IProps) {
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
              {title && title !== "" && <Pill pillText={title} />}
            </Col>
            <Col start={5} span={8}>
              <StyledParagraph>
                {content.map((item, index) => {
                  return item?.image ? (
                    <StyledParagraphImage
                      key={index}
                      onMouseEnter={(e) => onHover(index)}
                      onMouseLeave={(e) => onHoverOver()}
                    >
                      {" "}
                      <span>{item.text}</span>
                    </StyledParagraphImage>
                  ) : (
                    <Fragment key={index}>{" " + item.text}</Fragment>
                  );
                })}
              </StyledParagraph>
              {hoverIndex && (
                <StyledImage
                  onMouseEnter={(e) => onHover(hoverIndex)}
                  onMouseLeave={(e) => onHoverOver()}
                  variants={variants}
                  initial="closed"
                  animate={hoverIndex ? "open" : "closed"}
                  width={375}
                  height={774}
                  alt={`Gallery Image ${hoverIndex}`}
                  // loader={() => content[hoverIndex].image.node.sourceUrl}
                  src={content[hoverIndex].image.node.sourceUrl}
                  // placeholder="blur"
                  blurDataURL={
                    content[hoverIndex].image.node?.placeholderDataURI
                  }
                />
              )}
            </Col>
          </>
        ) : (
          <>
            <Col start={1} span={12}>
              <Pill pillText={title} />
            </Col>
            <Col start={1} span={12}>
              <StyledMobileParagraph>
                {content.map((item, index) => {
                  return item?.image ? (
                    <StyledMobileParagraphImage key={index}>
                      <span>{" " + item.text}</span>
                    </StyledMobileParagraphImage>
                  ) : (
                    <Fragment key={index}>{item.text}</Fragment>
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
                        // loader={() => item.image.node.sourceUrl}
                        src={item.image.node.sourceUrl}
                        // placeholder="blur"
                        blurDataURL={item.image.node?.placeholderDataURI}
                        key={item.text}
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
