import styled from "@emotion/styled";
import Pill from "../global/pill";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";
import { dimensions } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";

interface IProps {
  title?: string;
  pillText?: string;
  content?: string;
}

const StyledTitle = styled.h2`
  font-size: ${getRemSize(dimensions.textSizes.large.desktop)};
`;
const StyledParagraph = styled.p`
  margin-top: 40px;
`;

export function PageSection({ title, pillText, content }: IProps) {
  return (
    <Row>
      <Col span={5}>
        <StyledTitle>{title}</StyledTitle>
      </Col>
      <Col span={7}>
        {pillText && <Pill pillText={pillText} />}
        <StyledParagraph dangerouslySetInnerHTML={{ __html: content }} />
      </Col>
    </Row>
  );
}
