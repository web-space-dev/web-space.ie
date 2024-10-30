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
import AnimateInView from "../../global/animation/animateInView";

interface IProps {
  title: string;
  fontSize: string[];
  content: DynamicTextAndImage[];
}

const StyledBigWrapper = styled.div`
  position: relative;
`;

const StyledImage = styled(motion(Image))`
  border-radius: 26px;
  object-fit: cover;
  width: 375px;
  height: auto;
  /* max-height: 774px; */
  position: fixed;
  z-index: 1000;
  /* transition: all 0.2s; */
  @media (min-width: 1350px) {
    top: 32px;
    left: 220px;
  }

  @media (min-width: 1088px) and (max-width: 1350px) {
    top: 32px;
    left: 138px;
  }

  @media (max-width: 1500px) {
    width: 300px;
  }
  @media (max-width: 1088px) {
    top: 32px;
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
  position: relative;
  overflow-y: visible; // Ensure overflow is visible
  will-change: transform;
  height: 500px;
  align-items: flex-end;
  padding-bottom: 20px;
  margin-bottom: 50px;
`;
const StyledMobileImage = styled(motion(Image))`
  border-radius: 26px;
  object-fit: cover;
  max-height: 380px;
  flex-shrink: 0;
  will-change: transform;
`;

const StyledParagraphImage = styled.span<{ selected?: boolean }>`
  color: ${({ selected }) => (selected ? colors.white : colors.accent)};
  transition: color 0.2s;

  &:hover {
    color: ${colors.white};
  }
  & > span {
    text-decoration: underline;
  }
`;
const StyledParagraph = styled.p<{ fontSize: string }>`
  font-size: ${({ fontSize }) =>
    getRemSize(
      fontSize === "Large"
        ? dimensions.textSizes.large.desktop
        : dimensions.textSizes.normal.desktop
    )};
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
  margin-bottom: 0px;
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

export default function DynamicTextAndImages({
  title,
  content,
  fontSize = ["Large"],
}: IProps) {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();
  const [hoverIndex, setHoverIndex] = useState(null);
  const [mobileHoverIndex, setMobileHoverIndex] = useState(null);

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
              {title && title !== "" && (
                <AnimateInView>
                  <Pill pillText={title} />
                </AnimateInView>
              )}
            </Col>
            <Col start={5} span={8}>
              <AnimateInView>
                <StyledParagraph fontSize={fontSize[0]}>
                  {content.map((item, index) => {
                    return item?.image ? (
                      <StyledParagraphImage
                        key={index}
                        onMouseEnter={(e) => onHover(index)}
                        // selected={mobileHoverIndex === index}
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
              </AnimateInView>
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
              {title && title !== "" && (
                <AnimateInView>
                  <Pill pillText={title} />
                </AnimateInView>
              )}
            </Col>
            <Col start={1} span={12}>
              <StyledMobileParagraph>
                {content.map((item, index) => {
                  return item?.image ? (
                    <StyledParagraphImage
                      key={index}
                      onMouseEnter={(e) => setMobileHoverIndex(index)}
                      selected={mobileHoverIndex === index}
                      onMouseLeave={(e) => onHoverOver()}
                    >
                      {" "}
                      <span>{item.text}</span>
                    </StyledParagraphImage>
                  ) : (
                    <Fragment key={index}>{" " + item.text}</Fragment>
                  );
                })}
              </StyledMobileParagraph>
              <StyledMobileImageWrapper>
                {content.map((item, index) => {
                  return (
                    item.image &&
                    item.image.node && (
                      <StyledMobileImage
                        onMouseEnter={(e) => setMobileHoverIndex(index)}
                        width={isTablet ? 212 : 162}
                        height={isTablet ? 393 : 343}
                        alt={`Gallery Image ${index}`}
                        src={item.image.node.sourceUrl}
                        // loader={() => item.image.node.sourceUrl}
                        // placeholder="blur"
                        blurDataURL={item.image.node?.placeholderDataURI}
                        key={item.text}
                        animate={
                          mobileHoverIndex === index ? "selected" : "unselected"
                        }
                        variants={{
                          unselected: {
                            y: 0,
                            transition: { type: "spring", stiffness: 300 },
                          },
                          selected: {
                            y: -50,
                            border: `2px solid ${colors.accent}`,
                            transition: { type: "spring", stiffness: 300 },
                          },
                        }}
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
