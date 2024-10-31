import styled from "@emotion/styled";
import { SkillCategories, Skills as IAllSkills } from "../../interfaces/home";
import { GridContainer } from "../global/grid/gridContainer";
import { breakpoints, dimensions } from "../../styles/variables";
import { memo, useState } from "react";
import { motion } from "framer-motion";
import { getRemSize } from "../../styles/globalCss";
import SkillsTabs from "./skills/skillsTabs";
import useIsDesktop from "../../hooks/useIsDesktop";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";

const StyledWrapper = styled(GridContainer)`
  margin: 140px auto;
`;

const StyledHeading = styled(motion.h2)`
  grid-column: 3 / span 8;
  text-align: center;
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  font-weight: 500;
  height: 190px;
  @media all and (max-width: ${breakpoints.md}px) {
    grid-column: 1 / span 12;
    font-size: ${getRemSize(dimensions.headingSizes.large.mobile - 5)};
    height: 200px;
  }
`;

const StyledSkillsWrapper = styled.div`
  grid-column: 1 / span 12;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ISkills {
  categories: SkillCategories;
}

function Skills({ categories }: ISkills) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <StyledWrapper>
      <Row style={{ marginBottom: 0 }}>
        <Col start={3} span={8}>
          <StyledHeading
            key={activeTab} // This will trigger the animation on activeTab change
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            dangerouslySetInnerHTML={{
              __html: categories.nodes[activeTab].description,
            }}
          ></StyledHeading>
        </Col>
      </Row>
      <Row>
        <Col start={3} span={8}>
          <StyledSkillsWrapper>
            <SkillsTabs
              categories={categories}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </StyledSkillsWrapper>
        </Col>
      </Row>
    </StyledWrapper>
  );
}

export default Skills;
