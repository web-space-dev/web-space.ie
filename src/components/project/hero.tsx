import { Project } from "../../interfaces/project";
import {
  colors,
  dimensions,
  breakpoints,
  DesktopOnly,
  MobileAndTabletOnly,
} from "../../styles/variables";
import styled from "@emotion/styled";
import { getRemSize } from "../../styles/globalCss";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";
import ArrowUpRight from "../../icons/arrowUpRight";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimateInView from "../global/animation/animateInView";
import { HeroStat } from "./heroStat";

const StyledDivImage = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 585px;
  left: 0;
  top: 0;
  z-index: -1;
  border-radius: 0px 0px 20px 20px;

  & div img {
    width: auto;
    height: inherit;
    object-fit: cover;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3); // Adjust the opacity as needed
    z-index: 1; // Ensure it is above the image but below other content
  }

  @media (max-width: ${breakpoints.md}px) {
    & div img {
      height: 650px;
    }
  }
`;

const StyledHeading1 = styled(motion.h1)`
  font-size: ${getRemSize(dimensions.headingSizes.display2.mobile)};
  font-weight: 400;
  letter-spacing: 6px;
  color: ${colors.white};

  @media all and (max-width: 1100px) {
    font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  }
  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.display2.mobile)};
    font-weight: 500;
    letter-spacing: 2px;
    line-height: 1;
    margin: 0;
  }
`;

const StyledHeading2 = styled.h2`
  font-size: ${getRemSize(dimensions.headingSizes.cta.mobile)};
  font-weight: 400;
  letter-spacing: 6px;
  color: ${colors.white};

  @media all and (max-width: 1100px) {
    font-size: ${getRemSize(dimensions.headingSizes.cta.mobile)};
    letter-spacing: 3px;
  }
  @media all and (max-width: 1001px) {
    font-size: ${getRemSize(dimensions.headingSizes.cta.mobile)};
    letter-spacing: 1px;
  }
  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.cta.desktop)};
    letter-spacing: 2px;
    /* line-height: 0; */
    margin: -20 px 0 0 0;
  }
`;

const StyledTitleRow = styled(motion(Row))`
  margin: 239px 0 112px 0;

  @media (max-width: 1100px) {
    margin: 313px 0 112px 0;
  }
  @media (max-width: ${breakpoints.md}px) {
    margin: 251px 0 82px 0;
  }

  @media (max-width: ${breakpoints.sm}px) {
    margin: 120px 0 82px 0;
  }
`;

const StyledProjectFieldsDiv = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  background-color: transparent;

  @media (max-width: ${breakpoints.md}px) {
    flex-direction: column;
    wiqth: 100%;
  }
`;

const StyledTagsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.md}px) {
    margin-top: 24px;
    justify-content: left;
    flex-wrap: wrap;
  }
`;
const StyledTag = styled.div`
  display: flex;
  flex-direction: column;
  padding: 11px 35px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  margin: 10px;
  backdrop-filter: blur(15px);
  gap: 16px;
  letter-spacing: 1px;
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  font-weight: 400;

  @media (max-width: 1100px) {
    font-size: ${getRemSize(dimensions.textSizes.normal.mobile)};
  }

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.textSizes.normal.mobile)};
    margin: 4px;
    padding: 4px 24px 6px 24px;
  }
`;

const StyledArrowUpRight = styled(ArrowUpRight)`
  margin-left: 21px;
  @media (max-width: 1100px) {
    margin-left: 12px;
  }
`;

const StyledOutlineArrowButton = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 16px;
  backgorund-color: ${colors.black};
  border: 2px solid ${colors.white};
  border-radius: 20px;
  color: ${colors.white};
  cursor: pointer;
  font-size: ${getRemSize(dimensions.headingSizes.cta.mobile)};
  font-weight: 400;
  transition: 0.3s ease;
  letter-spacing: 2px;
  path {
    fill: ${colors.white};
  }

  &:hover {
    border: 2px solid ${colors.accent};
    color: ${colors.accent};
    path {
      fill: ${colors.accent};
    }
  }
  &:hover .styled-icon {
    transform: rotate(45deg);
  }

  @media (max-width: 1100px) {
    font-size: ${getRemSize(dimensions.textSizes.normal.mobile)};
    padding: 9px 18px 10px 18px;
  }

  @media (max-width: ${breakpoints.md}px) {
    width: 100%;
    margin-top: 20px;
    justify-content: center;
    padding: 18px 16px 20px 16px;
  }
`;

interface Props {
  project: Project;
}

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0, backgroundColor: colors.black }, // Initial state with background color: ;
  visible: {
    opacity: 1,
    backgroundColor: "transparent",
    transition: { duration: 1 },
  }, // Fade-in effect
};

export function Hero({ project }: Props) {
  // const isDesktop = useIsDesktop();

  return (
    <>
      <StyledDivImage>
        <DesktopOnly>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            style={{ width: "100%", height: "100%" }} // Ensure the motion div covers the image
          >
            <Image
              fill
              src={project.featuredImage?.node.sourceUrl}
              alt={`${project.title} Feature Image`}
              // placeholder="blur"
              blurDataURL={project.featuredImage.node?.placeholderDataURI}
            />
          </motion.div>
        </DesktopOnly>

        <MobileAndTabletOnly>
          <Image
            src={project.featuredImage?.node.sourceUrl}
            alt={`${project.title} Feature Image`}
            // placeholder="blur"
            blurDataURL={project.featuredImage.node?.placeholderDataURI}
            width={374}
            height={649}
          />
        </MobileAndTabletOnly>
      </StyledDivImage>
      <StyledTitleRow variants={variants} initial="closed" animate="open">
        <Col start={2} span={7}>
          <StyledHeading1>{project.title}</StyledHeading1>
        </Col>
        <Col span={3}>
          <StyledHeading2>
            <span>{project?.projectCategories?.nodes[0]?.name}</span>
          </StyledHeading2>
        </Col>
      </StyledTitleRow>
      <Col span={12}>
        <StyledProjectFieldsDiv>
          <HeroStat stat={project.projectFields.stat1} />
          <HeroStat stat={project.projectFields.stat2} />
          <HeroStat stat={project.projectFields.stat3} />
        </StyledProjectFieldsDiv>
      </Col>
      <Col span={12}>
        <StyledTagsWrapper>
          {project.tags.nodes.map((tag, index) => (
            <StyledTag key={`tag-${index}`}>
              <span>{tag.name}</span>
            </StyledTag>
          ))}
          {project.projectFields.cta?.buttonName &&
            project.projectFields.cta?.buttonUrl && (
              <StyledOutlineArrowButton
                href={project.projectFields.cta.buttonUrl}
              >
                {project.projectFields.cta.buttonName}
                <StyledArrowUpRight className="styled-icon" />
              </StyledOutlineArrowButton>
            )}
        </StyledTagsWrapper>
      </Col>
    </>
  );
}
