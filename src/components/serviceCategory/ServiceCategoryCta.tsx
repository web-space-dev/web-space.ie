import styled from "@emotion/styled";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";
import AnimateInView from "../global/animation/animateInView";
import ArrowUpRight from "../../icons/arrowUpRight";

const StyledCtaRow = styled(Row)`
  margin: 120px 0;
`;

const StyledCtaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 28px 32px;
  flex-wrap: wrap;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.04);
  flex-direction: column;
  @media (max-width: ${breakpoints.md}px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
  }
`;

const StyledCtaTitle = styled.h3`
  margin: 0;
  font-size: ${getRemSize(dimensions.headingSizes.cta.desktop)};
  font-weight: 500;
  letter-spacing: 1.5px;
  flex: 1 1 60%;
  min-width: 220px;

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.cta.mobile)};
    max-width: 100%;
  }
`;

const StyledCtaButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  height: 70px;
  border-radius: 20px;
  border: 2px solid ${colors.white};
  color: ${colors.white};
  background: transparent;
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  font-weight: 400;
  letter-spacing: 1px;
  transition: 0.3s ease;
  cursor: pointer;
  flex-shrink: 0;
  width: auto;

  white-space: nowrap;

  &:hover {
    border-color: ${colors.accent};
    color: ${colors.accent};
  }

  @media (max-width: ${breakpoints.md}px) {
    width: 100%;
    justify-content: center;
    font-size: ${getRemSize(dimensions.textSizes.normal.mobile)};
  }
`;

const StyledCtaArrow = styled(ArrowUpRight)`
  flex-shrink: 0;
  width: 20px;
  height: 20px;

  path {
    fill: ${colors.white};
  }

  ${StyledCtaButton}:hover & path {
    fill: ${colors.accent};
  }
`;

interface ServiceCategoryCtaProps {
  text?: string;
  ctaText?: string;
  onClick?: () => void;
}

export function ServiceCategoryCta({
  text,
  ctaText,
  onClick,
}: ServiceCategoryCtaProps) {
  if (!text && !ctaText) {
    return null;
  }

  return (
    <StyledCtaRow>
      <Col start={2} span={10}>
        <AnimateInView>
          <StyledCtaContainer>
            <StyledCtaTitle>{text || ""}</StyledCtaTitle>
            {ctaText && (
              <StyledCtaButton type="button" onClick={onClick}>
                {ctaText}
                <StyledCtaArrow />
              </StyledCtaButton>
            )}
          </StyledCtaContainer>
        </AnimateInView>
      </Col>
    </StyledCtaRow>
  );
}
