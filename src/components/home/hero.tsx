import styled from "@emotion/styled";
import { colors, breakpoints } from "../../styles/variables";
import { GridContainer } from "../global/grid/gridContainer";
import Image from "next/image";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";
import useIsDesktop from "../../hooks/useIsDesktop";
import { memo } from "react";

const StyledWrapper = styled(GridContainer)`
  height: 100vh;
  align-items: center;
`;

const Background = styled.span`
  background-color: ${colors.white};
  width: 100%;
  height: 100vh;
`;

const StyledRow = styled(Row)`
  height: 100vh;
  align-items: center;
`;

const StyledHeading = styled.h1`
  color: ${colors.black};
  font-weight: 500;

  @media all and (max-width: ${breakpoints.md}px) {
    text-indent: 60px;
  }
`;

const StyledImage = styled(Image)`
  margin-right: 65px;
  margin-bottom: -5px;
`;

function Hero({ title }) {
  const isDesktop = useIsDesktop();

  return (
    <Background>
      <StyledWrapper>
        <StyledRow>
          <Col start={2} span={10}>
            <StyledHeading>
              {isDesktop ? (
                <StyledImage
                  src={"/logo-icon.png"}
                  alt="WebSpace Icon"
                  width="33"
                  height="40"
                />
              ) : null}
              {title}
            </StyledHeading>
          </Col>
        </StyledRow>
      </StyledWrapper>
    </Background>
  );
}

export default memo(Hero);
