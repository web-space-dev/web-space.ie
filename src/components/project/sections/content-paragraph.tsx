import { ParagraphItem } from "../../../interfaces/project";
import { Col } from "../../global/grid/Col";
import { getRemSize } from "../../../../src/styles/globalCss";
import styled from "@emotion/styled";
import { dimensions, breakpoints } from "../../../../src/styles/variables";
import Pill from "../../global/pill";
import { Row } from "../../global/grid/Row";
import AnimateInView from "../../global/animation/animateInView";

interface IProps {
  content: ParagraphItem[] | undefined;
}

const StyledPillWrapper = styled.div``;

const StyledParagraphFirst = styled.p`
  font-weight: 500;
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  line-height: 1.35;
  text-indent: 100px;
  letter-spacing: 2px;
  margin-bottom: 40px;

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.textSizes.normal.mobile)};
    text-indent: 60px;
    letter-spacing: 1px;
    margin-bottom: -15px;
  }
`;

const StyledParagraphSecond = styled.p`
  font-weight: 500;
  line-height: 1.1;
  text-indent: 100px;
  letter-spacing: 2px;
  font-size: ${getRemSize(dimensions.textSizes.large.desktop)};

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.textSizes.large.mobile)};
    text-indent: 60px;
    letter-spacing: 1px;
  }
`;

export function ContentParagraph({ content }: IProps) {
  return (
    <Row>
      {content?.map((paragraph, index) => {
        if (paragraph.title)
          return (
            <Col start={1} span={4} key={`title-${index}`}>
              <AnimateInView>
                <StyledPillWrapper>
                  <Pill pillText={paragraph.title} />
                </StyledPillWrapper>
              </AnimateInView>
            </Col>
          );
        if (paragraph.paragraph)
          return (
            <Col start={5} span={8} key={`firstParagraph-${index}`}>
              <AnimateInView>
                <StyledParagraphFirst>
                  {paragraph.paragraph}
                </StyledParagraphFirst>
              </AnimateInView>
            </Col>
          );
        if (paragraph.largeParagraph)
          return (
            <Col start={5} span={8} key={`secondParagraph-${index}`}>
              <AnimateInView>
                <StyledParagraphSecond>
                  {paragraph.largeParagraph}
                </StyledParagraphSecond>
              </AnimateInView>
            </Col>
          );
      })}
    </Row>
  );
}
