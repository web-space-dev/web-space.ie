import {
  colors,
  dimensions,
  breakpoints,
} from "../../../../src/styles/variables";
import styled from "@emotion/styled";
import { getRemSize } from "../../../../src/styles/globalCss";
import { Row } from "../../global/grid/Row";
import { Col } from "../../global/grid/Col";
import AnimateInView from "../../global/animation/animateInView";

interface IProps {
  text: string;
}

const StyledTitleRow = styled(Row)`
  margin: 120px 0 120px 0;

  @media (max-width: ${breakpoints.md}px) {
    margin: 120px 0 20px 0;
  }
`;

const StyledHeading = styled.h2`
  text-indent: 100px;
  line-height: 1.2;
  align-items: center;
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  font-weight: 500;
  letter-spacing: 2px;
  margin: 0px;

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
    text-indent: 81px;
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 1.1;
  }
`;

export default function LargeTextArea({ text }: IProps) {
  return (
    <StyledTitleRow>
      <Col start={2} span={10}>
        <AnimateInView>
          <StyledHeading>{text}</StyledHeading>
        </AnimateInView>
      </Col>
    </StyledTitleRow>
  );
}
