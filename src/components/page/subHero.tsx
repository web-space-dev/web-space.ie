import styled from "@emotion/styled";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";
import { getRemSize } from "../../styles/globalCss";
import { dimensions } from "../../styles/variables";

interface IProps {
  text: string;
}

const SubheroWrapper = styled.div`
  margin: 40px 0;
`;
const StyledText = styled.h2`
  font-weight: 500;
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  letter-spacing: 1%;
  text-indent: 70px;
`;
export function SubHero({ text }: IProps) {
  return (
    <Row>
      <Col span={4} children={""}></Col>
      <Col span={8}>
        <SubheroWrapper>
          <StyledText>{text}</StyledText>
        </SubheroWrapper>
      </Col>
    </Row>
  );
}
