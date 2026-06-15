import styled from "@emotion/styled";
import { breakpoints, colors } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";

export const SectionWrapper = styled.section<{ noPaddingOnMobile?: boolean }>`
  background: ${colors.black};
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 200px 32px;
  display: flex;
  gap: 20px;
  align-items: flex-start;

  @media all and (max-width: 1200px) {
    gap: 32px;
    padding: 150px 24px;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    flex-direction: column;
    padding: ${(props) => (props.noPaddingOnMobile ? "80px 0" : "80px 24px")};
    gap: 40px;
  }
`;

export const SectionHeading = styled.h2`
  font-size: ${getRemSize(66)};
  line-height: 1;
  margin: 0;
  color: ${colors.white};
  letter-spacing: 0.66px;
  width: 100%;

  @media all and (max-width: 1200px) {
    font-size: ${getRemSize(52)};
  }

  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(36)};
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(28)};
  }
`;

export const SectionSubheading = styled.p`
  font-size: ${getRemSize(30)};
  line-height: 1.1;
  margin: 0;
  color: ${colors.white};
  letter-spacing: 1.8px;
  font-weight: 400;
  width: 347px;

  @media all and (max-width: 1200px) {
    font-size: ${getRemSize(26)};
    width: 300px;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(22)};
    width: 100%;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(18)};
  }
`;

export const StickyTextWrapper = styled.div<{ centerOnMobile?: boolean }>`
  width: 591px;
  flex-shrink: 0;
  white-space: pre-wrap;

  @media all and (max-width: 1200px) {
    width: 450px;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    width: 100%;
    position: sticky;
    top: 0px;
    z-index: 10;
    backdrop-filter: blur(9px);
    background: rgba(29, 29, 29, 0.8);
    padding: 80px 16px 20px 16px;

    text-align: ${(props) => (props.centerOnMobile ? "center" : "left")};
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  min-width: 0;
  justify-content: center;
  width: 100%;
`;

export const SectionHeadingWrapper = styled(StickyTextWrapper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  position: sticky;
  top: 0;

  @media all and (max-width: ${breakpoints.md}px) {
    margin-bottom: 30px;
  }
`;
