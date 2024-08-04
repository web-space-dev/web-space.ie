import styled from "@emotion/styled";
import { IconButton } from "../../global/iconButton";
import { getRemSize } from "../../../styles/globalCss";
import { colors, dimensions } from "../../../styles/variables";

const StyledShowcaseWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 343px;
  height: 537px;
  justify-content: space-between;
  margin: 0 8px 0 12px;
  scroll-snap-align: center;
  padding: 8px 8px 8px 24px;
  background-color: ${colors.black};
  border: 1px solid #fff;
  border-radius: 20px;
`;

const StyledShowcaseTitle = styled.h3`
  margin: 0;
  font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & button {
    margin: auto;
  }
`;

export default function ShowcaseItemMobileAllProjects() {
  return (
    <StyledShowcaseWrapper>
      {/* Title */}
      <StyledShowcaseTitle>All projects</StyledShowcaseTitle>

      {/* ArrowIcon */}
      <StyledLink href={`/projects`}>
        <IconButton />
      </StyledLink>
    </StyledShowcaseWrapper>
  );
}
