import { useState } from "react";
import { SkillCategories } from "../../../interfaces/home";
import { AnimatePresence, motion } from "framer-motion";
import { colors } from "../../../styles/variables";
import styled from "@emotion/styled";
import Image from "next/image";

const StyledTabs = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  border: 1px solid ${colors.accentLight};
  border-radius: 20px;
  padding: 10px;
  width: fit-content;
`;
const StyledTab = styled.button<{ isActive: boolean }>`
  position: relative;
  font-size: 32px;
  font-weight: 500;
  color: ${colors.white};
  border-radius: 9999px;
  transition: all 0.3s ease;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;
  &:hover {
    text-decoration: none;
  }
`;

const StyledLogoWrapper = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 80%;
  margin: auto;
  height: 315px;
`;

const Bubble = styled(motion.span)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: ${colors.accentLight};
  mix-blend-mode: difference;
  border-radius: 14px;
`;

interface IProps {
  categories: SkillCategories;
}

export default function SkillsDesktop({ categories }: IProps) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <AnimatePresence mode="wait">
        <StyledLogoWrapper
          key={activeTab}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {categories.nodes[activeTab].skills.nodes.map((skill, index) => (
            <Image
              key={index}
              src={skill.featuredImage.node.sourceUrl}
              blurDataURL={skill.featuredImage.node?.placeholderDataURI}
              alt={skill.title + "Logo"}
              width={158}
              height={158}
            />
          ))}
        </StyledLogoWrapper>
      </AnimatePresence>

      <StyledTabs>
        {categories.nodes.map((category, index) => (
          <StyledTab
            key={category.name}
            onClick={() => setActiveTab(index)}
            isActive={activeTab === index}
          >
            {activeTab === index && (
              <Bubble
                layoutId="bubble"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {category.name}
          </StyledTab>
        ))}
      </StyledTabs>
    </>
  );
}
