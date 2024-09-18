import { useState } from "react";
import { SkillCategories } from "../../../interfaces/home";
import { AnimatePresence, motion } from "framer-motion";
import { breakpoints, colors } from "../../../styles/variables";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import ArrowUpRight from "../../../icons/arrowUpRight";

const StyledLogoWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 100%;
  margin: auto;
  height: auto;
  gap: 20px;
  height: 500px;
  align-content: center;

  & img {
    border-radius: 14px;
  }

  @media (max-width: 1200px) {
    margin: 20px 0;
    & img {
      width: 120px;
      height: 120px;
    }
  }

  @media (max-width: ${breakpoints.md}px) {
    height: 235px;
    max-width: 90%;
    & img {
      width: 100px;
      height: 100px;
    }
  }
  @media (max-width: ${breakpoints.sm}px) {
    & img {
      width: 90px;
      height: 90px;
    }
  }

  @media (max-width: 400px) {
    height: 340px;

    & img {
      width: 80px;
      height: 80px;
    }
  }
`;

const Popup = styled(motion.div)`
  color: ${colors.white};
  padding: 5px 10px;
  border-radius: 14px;
  z-index: 10;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  text-align: center;
  color: #f8f8f8;
  padding: 5px 10px;
  border-radius: 5px;

  align-content: center;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);

  @media (max-width: ${breakpoints.sm}px) {
    left: -40%;
    top: unset;
    width: 150px;
    padding: 0;
  }
`;

const StyledPopupLink = styled(Link)`
  padding: 0 5px;
  display: flex;
  width: fit-content;
  flex-wrap: wrap;
  justify-content: center;
  :hover {
    color: ${colors.white};
  }
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

const StyledTabs = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  border: 1px solid ${colors.accentLight};
  border-radius: 20px;
  padding: 10px;
  width: fit-content;

  @media (max-width: 550px) {
    margin-top: 60px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    width: 100%;
    flex-wrap: wrap;
  }

  @media (max-width: 400px) {
    margin-top: 0;
  }
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
  padding: 19px 24px;
  margin: 0 10px;
  &:hover {
    text-decoration: none;
  }
`;

interface IProps {
  categories: SkillCategories;
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export default function SkillsTabs({
  categories,
  activeTab,
  setActiveTab,
}: IProps) {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  return (
    <>
      <AnimatePresence mode="wait">
        <StyledLogoWrapper
          key={activeTab}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseLeave={() => setHoveredSkill(null)}
        >
          {categories.nodes[activeTab].skills.nodes.map((skill, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredSkill(index)}
              // onMouseLeave={() => setHoveredSkill(null)}
              style={{ position: "relative" }}
            >
              <Image
                src={skill.featuredImage?.node?.sourceUrl}
                blurDataURL={skill.featuredImage?.node?.placeholderDataURI}
                alt={skill.title}
                width={158}
                height={158}
              />
              {hoveredSkill === index && (
                <Popup
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {skill.skillsFields?.link ? (
                    <StyledPopupLink
                      href={skill.skillsFields.link}
                      target="_blank"
                    >
                      {skill.title}
                      <ArrowUpRight fill="#fff" />
                    </StyledPopupLink>
                  ) : (
                    skill.title
                  )}
                </Popup>
              )}
            </div>
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
