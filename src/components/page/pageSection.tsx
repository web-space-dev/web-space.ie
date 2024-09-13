import styled from "@emotion/styled";
import Pill from "../global/pill";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";
import { breakpoints, dimensions } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";

interface IProps {
  title?: string;
  pillText?: string;
  content?: string;
}

const StyledTitle = styled.h2`
  font-size: ${getRemSize(dimensions.textSizes.large.desktop)};
  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.cta.desktop)};
  }
`;
const StyledParagraph = styled.div`
  margin-top: 40px;
  @media all and (max-width: ${breakpoints.md}px) {
    margin-top: 15px;
    font-size: ${getRemSize(dimensions.textSizes.normal.mobile)};
  }
`;

export function PageSection({ title, pillText, content }: IProps) {
  return (
    <Row>
      <Col span={4}>
        <StyledTitle>{title}</StyledTitle>
      </Col>
      <Col span={8}>
        {pillText && <Pill pillText={pillText} />}
        <StyledParagraph dangerouslySetInnerHTML={{ __html: content }} />
      </Col>
    </Row>
  );
}
