import router from "next/router";
import { PillIconButton } from "../components/global/pillIconButton";
import styled from "@emotion/styled";
import Image from "next/image";
import { dimensions } from "../styles/variables";
import { getRemSize } from "../styles/globalCss";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import ArrowRight from "../icons/arrowRight";
const StyledWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
`;
const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 326px;
  margin bottom: 60px;
`;
const StyledText = styled.div`
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
`;
const StyledH1 = styled.div`
  font-size: ${getRemSize(dimensions.textSizes.large.desktop)};
`;
const StyledButtonWrapper = styled.div`
  margin-top: 40px;
  align-self: felx-start;
`;
const StyledArrowRight = styled(ArrowRight)`
  fill: black;
  transition: fill 0.3s ease, transform 0.3s ease;

  &:hover {
    fill: white;
    transform: rotate(-45deg);
  }
`;

export default function Custom404() {
  return (
    <Layout pageTitle="404 - Page Not Found">
      <Navbar dark={true} />
      <StyledWrapper>
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
              <StyledArrowRight />{" "}
            </PillIconButton>
          </StyledButtonWrapper>
        </StyledTextWrapper>
        <Image src="/public/404image.png" alt="404" width={400} height={400} />
      </StyledWrapper>
    </Layout>
  );
}
