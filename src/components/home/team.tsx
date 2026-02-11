import styled from "@emotion/styled";
import { breakpoints, colors } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import { SkillCategoriesNode } from "@/interfaces/home";
import {
  SectionWrapper,
  SectionHeading,
  SectionSubheading,
  SectionHeadingWrapper,
  ContentWrapper,
} from "./sharedSectionComponents";

const StyledHeading = styled(SectionHeading)``;

const StyledSubheading = styled(SectionSubheading)``;

const StyledTeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 23px 22px;
  align-items: end;
  max-width: 837px;

  @media all and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    max-width: 650px;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    max-width: 400px;
    margin: 0 auto;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    gap: 12px;
    max-width: 320px;
  }
`;

const StyledTeamWrapper = styled(ContentWrapper)`
  align-items: end;
`;

const StyledTeamMember = styled.div`
  width: 100%;
  max-width: 263px;
  height: auto;
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledSpacer = styled.div`
  width: 100%;
  max-width: 263px;
  height: auto;
  aspect-ratio: 1;
`;

interface ITeam {
  skillCategory: SkillCategoriesNode | undefined;
}

function Team({ skillCategory }: ITeam) {
  if (!skillCategory) return null;
  const { description, skills } = skillCategory;

  return (
    <SectionWrapper>
      <SectionHeadingWrapper centerOnMobile>
        <StyledHeading>{description}</StyledHeading>
      </SectionHeadingWrapper>

      <StyledTeamWrapper>
        <StyledTeamGrid>
          <StyledSpacer />
          {skills.nodes.map((member) => (
            <StyledTeamMember key={member.title}>
              <img
                src={member.featuredImage.node.sourceUrl}
                alt={member.title}
              />
            </StyledTeamMember>
          ))}
          <StyledSpacer />
        </StyledTeamGrid>
      </StyledTeamWrapper>
    </SectionWrapper>
  );
}

export default Team;
