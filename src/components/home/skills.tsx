import styled from "@emotion/styled";
import { SkillCategories, Skills as IAllSkills } from "../../interfaces/home";
import { GridContainer } from "../global/grid/gridContainer";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { memo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getRemSize } from "../../styles/globalCss";
import SkillsDesktop from "./skills/skillsDesktop";
import useIsDesktop from "../../hooks/useIsDesktop";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";
import Image from "next/image";

const StyledWrapper = styled(GridContainer)`
  margin: 140px auto;
`;

const StyledHeading = styled.h2`
  grid-column: 3 / span 8;
  text-align: center;
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  font-weight: 500;
  @media all and (max-width: ${breakpoints.md}px) {
    grid-column: 1 / span 12;
    font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
  }
`;

const StyledSkillsWrapper = styled.div`
  grid-column: 1 / span 12;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SkillsMobile = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 13px;
`;

const StyledText = styled.p`
  font-size: ${getRemSize(dimensions.headingSizes.cta.mobile)};
  text-align: center;
  margin-top: 37px;
`;

interface ISkills {
  title: string;
  categories: SkillCategories;
  skills: IAllSkills;
}

function Skills({ title, categories, skills }: ISkills) {
  const isDesktop = useIsDesktop();
  return (
    <StyledWrapper>
      <Row>
        <Col start={3} span={8}>
          <StyledHeading>{title}</StyledHeading>
        </Col>
      </Row>
      <Row>
        <Col start={3} span={8}>
          <StyledSkillsWrapper>
            {isDesktop ? (
              <SkillsDesktop categories={categories} />
            ) : (
              <>
                <SkillsMobile>
                  {skills.nodes.map((skill, index) => {
                    return (
                      <Image
                        key={index}
                        src={skill.featuredImage.node.sourceUrl}
                        blurDataURL={
                          skill.featuredImage.node?.placeholderDataURI
                        }
                        alt={skill.title + "Logo"}
                        width={87}
                        height={87}
                      />
                    );
                  })}
                </SkillsMobile>
                <StyledText>10+ frame works & systems</StyledText>
              </>
            )}
          </StyledSkillsWrapper>
        </Col>
      </Row>
    </StyledWrapper>
  );
}

export default memo(Skills);
