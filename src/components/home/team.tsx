import styled from "@emotion/styled";
import { breakpoints, colors } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import { SkillCategoriesNode } from "@/interfaces/home";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import ArrowUpRight from "../../icons/arrowUpRight";
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
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledTeamMemberImage = styled.div`
  width: 100%;
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

const StyledPopup = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${colors.white};
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  padding: 10px;
  font-size: ${getRemSize(20)};
  line-height: 1.2;
  letter-spacing: 0.24px;

  @media all and (max-width: ${breakpoints.md}px) {
    display: none;
  }
`;

const StyledPopupLink = styled(Link)`
  padding: 0 5px;
  display: flex;
  width: fit-content;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: ${colors.white};
  text-decoration: none;

  :hover {
    color: ${colors.white};
  }
`;

const StyledTeamMemberName = styled.p`
  font-size: ${getRemSize(24)};
  text-align: center;
  line-height: 1.2;
  margin: 0;
  color: ${colors.white};
  letter-spacing: 0.24px;
  display: none;

  @media all and (max-width: ${breakpoints.md}px) {
    display: block;
    font-size: ${getRemSize(20)};
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(18)};
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
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <SectionWrapper>
      <SectionHeadingWrapper centerOnMobile>
        <StyledHeading>{description}</StyledHeading>
      </SectionHeadingWrapper>

      <StyledTeamWrapper>
        <StyledTeamGrid onMouseLeave={() => setHoveredMember(null)}>
          <StyledSpacer />
          {skills.nodes.map((member, index) => (
            <StyledTeamMember
              key={member.title}
              onMouseEnter={() => setHoveredMember(index)}
            >
              <StyledTeamMemberImage>
                <img
                  src={member.featuredImage.node.sourceUrl}
                  alt={member.title}
                />
                {hoveredMember === index && (
                  <StyledPopup
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {member.skillsFields?.link ? (
                      <StyledPopupLink
                        href={member.skillsFields.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {member.title}
                        <ArrowUpRight fill="#fff" />
                      </StyledPopupLink>
                    ) : (
                      member.title
                    )}
                  </StyledPopup>
                )}
              </StyledTeamMemberImage>
              <StyledTeamMemberName>{member.title}</StyledTeamMemberName>
            </StyledTeamMember>
          ))}
          <StyledSpacer />
        </StyledTeamGrid>
      </StyledTeamWrapper>
    </SectionWrapper>
  );
}

export default Team;
