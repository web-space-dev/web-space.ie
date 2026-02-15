import { ServiceCategory } from "../../interfaces/serviceCategory";
import { colors, dimensions, breakpoints } from "../../styles/variables";
import styled from "@emotion/styled";
import { getRemSize } from "../../styles/globalCss";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";
import Image from "next/image";
import { motion } from "framer-motion";

const StyledHeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 610px;
  overflow: hidden;
  border-radius: 0px 0px 20px 20px;

  @media (max-width: ${breakpoints.md}px) {
    height: 455px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    height: 490px;
  }
`;

const StyledDivImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
    pointer-events: none;
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

const StyledTitleRow = styled(motion(Row))`
  position: relative;
  z-index: 2;
  padding-top: 313px;

  @media (max-width: ${breakpoints.md}px) {
    padding-top: 251px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    padding-top: 120px;
  }
`;

interface Props {
  category: ServiceCategory;
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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1 },
  },
};

export function ServiceHero({ category }: Props) {
  return (
    <StyledHeroContainer>
      <StyledDivImage>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          <Image
            fill
            src={category.serviceCategoryFields?.featuredImage?.node.sourceUrl}
            alt={`${category.name} Feature Image`}
            priority
            placeholder="blur"
            blurDataURL={
              category.serviceCategoryFields?.featuredImage?.node
                ?.placeholderDataURI
            }
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </StyledDivImage>
      <StyledTitleRow variants={variants} initial="closed" animate="open">
        <Col start={2} span={10}>
          <StyledHeading1>{category.name}</StyledHeading1>
        </Col>
      </StyledTitleRow>
    </StyledHeroContainer>
  );
}
