import router from "next/router";
import { PillIconButton } from "../components/global/pillIconButton";
import styled from "@emotion/styled";
import Image from "next/image";
import { dimensions } from "../styles/variables";
import { getRemSize } from "../styles/globalCss";
import Layout from "../components/layout";
import ArrowUpRight from "../icons/arrowUpRight";
import { Col } from "../components/global/grid/Col";
import { Row } from "../components/global/grid/Row";
import { GridContainer } from "../components/global/grid/gridContainer";
import useIsDesktop from "../hooks/useIsDesktop";

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 108px;
  margin bottom: 60px;
  margin-left: 90px;
  margin-right: 10px;
`;
const StyledText = styled.div`
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  line-height: 2.2rem;
`;
const StyledH1 = styled.div`
  font-size: ${getRemSize(dimensions.textSizes.large.desktop)};
  line-height: 3.5rem;
`;
const StyledButtonWrapper = styled.div`
  margin-top: 40px;
  align-self: flex-start;
`;

const StyledImageWrapper = styled.div`
  position: relative;
  height: 620px;
  width: 100%;
  margin-top: 70px;
  margin-bottom: 125px;
  margin-right: 32px;

  & img {
    border-radius: 26px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: right;
  }
`;

const StyledMobileTextWrapper = styled.div`
display: flex;
  flex-direction: column;
  margin-top: 70px;
  margin bottom: 35px;
`;

const StyledMobileImageWrapper = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  margin-top: -33px;

  & img {
    border-radius: 26px;
    width: 100%;
    height: 100%;
  }
`;

const StyledMobileH1 = styled.div`
  font-size: ${getRemSize(dimensions.textSizes.xLarge.mobile)};
  line-height: 3rem;
`;
const StyledMobileText = styled.div`
  font-size: ${getRemSize(dimensions.textSizes.large.mobile)};
  line-height: 2rem;
`;
export default function Custom404() {
  const isDesktop = useIsDesktop();
  return (
    <Layout pageTitle="404 - Page Not Found">
      <GridContainer>
        <Row>
          {isDesktop ? (
            <>
              <Col span={7}>
                <StyledTextWrapper>
                  <StyledText>404 error</StyledText>
                  <StyledH1>Whoops, not too sure what happened</StyledH1>
                  <StyledText>
                    There seems to be a missing link or a connection issue
                  </StyledText>
                  <StyledButtonWrapper>
                    <PillIconButton
                      text={"Return to home"}
                      onClick={() => router.push("/")}
                    >
                      <ArrowUpRight />
                    </PillIconButton>
                  </StyledButtonWrapper>
                </StyledTextWrapper>
              </Col>
              <Col span={5}>
                <StyledImageWrapper>
                  <Image
                    src="/404imagecropped.png"
                    alt="404"
                    width={500}
                    height={500}
                  />
                </StyledImageWrapper>
              </Col>
            </>
          ) : (
            <>
              <Col span={12}>
                <StyledMobileTextWrapper>
                  <StyledText>404 error</StyledText>
                  <StyledMobileH1>
                    Whoops, not too sure what happened
                  </StyledMobileH1>
                  <StyledMobileText>
                    There seems to be a missing link or a connection issue
                  </StyledMobileText>
                  <StyledButtonWrapper>
                    {/* <PillIconButton
                      text={"Return to home"}
                      onClick={() => router.push("/")}
                    >
                      <ArrowUpRight />
                    </PillIconButton> */}
                  </StyledButtonWrapper>
                </StyledMobileTextWrapper>
              </Col>
              <Col span={12}>
                <StyledMobileImageWrapper>
                  <Image
                    src="/404imagecropped.png"
                    alt="404"
                    width={500}
                    height={500}
                  />
                </StyledMobileImageWrapper>
              </Col>
            </>
          )}
        </Row>
      </GridContainer>
    </Layout>
  );
}
