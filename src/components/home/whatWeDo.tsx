import styled from "@emotion/styled";
import { Pill as IPill, WhatWeDo as IWhatWeDo } from "../../interfaces/home";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import { GridContainer } from "../global/grid/gridContainer";
import { useRef, useState } from "react";
import Link from "next/link";
import { css } from "@emotion/react";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";
import useIsDesktop from "../../hooks/useIsDesktop";
import useIsMobile from "../../hooks/useIsMobile";
import { motion, useInView } from "framer-motion";
import AnimateInView from "../global/animation/animateInView";
import ArrowRight from "../../icons/arrowRight";

const StyledWrapper = styled(GridContainer)`
  margin: 200px 0;
  @media all and (max-width: ${breakpoints.md}px) {
    margin: 120px 0 0 0;
  }
`;

const StyledTitle = styled(motion.h2)`
  font-size: ${getRemSize(66)};

  font-weight: 500;
  letter-spacing: 0.01em;
  margin: 0 0 14px 0;
  @media all and (max-width: 1200px) {
    font-size: ${getRemSize(56)};
  }

  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
  }
`;

const StyledSubTitle = styled.p`
  margin: 0 0 80px 0;
  color: ${colors.white};
  font-size: ${getRemSize(24)};
  line-height: 1.1;
  letter-spacing: 0.06em;

  @media all and (max-width: ${breakpoints.md}px) {
    margin-bottom: 40px;
    font-size: ${getRemSize(16)};
    letter-spacing: 0.04em;
  }
`;

const StyledProcessList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledProcessItem = styled.li<{
  isBlurred: boolean;
  isExpanded: boolean;
}>`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.2fr);
  gap: 20px;
  padding: 32px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: -1px;
  transition: filter 0.3s ease-in-out;

  ${({ isBlurred }) =>
    isBlurred &&
    css`
      filter: blur(2px);
      opacity: 0.5;
    `}

  @media all and (max-width: ${breakpoints.md}px) {
    grid-template-columns: 1fr;
    gap: ${({ isExpanded }) => (isExpanded ? "16px" : "0")};
    padding: 24px 0;
    transition: gap 0.3s ease-in-out;
  }
`;

const StyledProcessTitleWrap = styled.div<{ isClickable: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${({ isClickable }) =>
    isClickable &&
    css`
      cursor: pointer;
      user-select: none;
    `}
`;

const StyledProcessListTitle = styled.h3`
  margin: 0;
  font-size: ${getRemSize(46)};
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: color 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media all and (max-width: 1200px) {
    font-size: ${getRemSize(40)};
  }

  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.medium.mobile)};
    justify-content: space-between;
    gap: 0;
  }
`;

const StyledTitleArrow = styled.span`
  display: inline-flex;
  align-items: center;
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease-in-out;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const StyledExpandIndicator = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  width: 20px;
  height: 20px;
  margin-left: auto;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease-in-out;
  }

  @media all and (min-width: ${breakpoints.md + 1}px) {
    display: none;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    margin-left: 0;
    margin-right: 5px;
  }
`;

const StyledProcessTitleLink = styled(Link)<{ disabled?: boolean }>`
  text-decoration: none;
  color: inherit;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: color 0.2s ease-in-out;

  ${({ disabled }) =>
    disabled
      ? css`
          pointer-events: none;
        `
      : css`
          &:hover {
            color: ${colors.accent};

            ${StyledTitleArrow} {
              transform: translateX(8px);
            }
          }
        `}
`;

interface IStyledProcessDescription {
  isVisible: boolean;
}

const StyledProcessDescription = styled.p<IStyledProcessDescription>`
  margin: 0;
  color: ${colors.white};
  font-size: ${getRemSize(18)};
  line-height: 1.1;
  letter-spacing: 0.06em;
  transition:
    opacity 0.3s ease-in-out,
    max-height 0.3s ease-in-out,
    margin-top 0.3s ease-in-out;

  ${({ isVisible }) =>
    isVisible
      ? css`
          opacity: 1;
          max-height: 200px;
          margin-top: 14px;
        `
      : css`
          opacity: 0;
          max-height: 0;
          margin-top: 0;
          overflow: hidden;
        `}

  @media all and (max-width: ${breakpoints.md}px) {
    opacity: 1;
    max-height: none;
    margin-top: 10px;
    font-size: ${getRemSize(16)};
    letter-spacing: 0.04em;
  }
`;

const StyledPillList = styled.ul<{ isExpanded: boolean; isMobile: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;

  ${({ isExpanded, isMobile }) =>
    isMobile && !isExpanded
      ? css`
          max-height: 0;
        `
      : css`
          max-height: 1000px;
        `}
`;

const StyledPillItemWrapper = styled(motion.li)`
  font-size: ${getRemSize(32)};
  letter-spacing: 0.04em;
  line-height: 1.4;

  @media all and (max-width: 1200px) {
    font-size: ${getRemSize(28)};
  }

  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.textSizes.normal.mobile)};
  }
`;

const StyledPillArrow = styled.span`
  display: inline-flex;
  align-items: center;
  width: 14px;
  height: 14px;
  transition: transform 0.3s ease-in-out;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const StyledPillLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${colors.accent};

    ${StyledPillArrow} {
      transform: translateX(4px);
    }
  }
`;

const StyledSeeMoreWrap = styled.div<{
  isExpanded: boolean;
  isMobile: boolean;
}>`
  margin-top: ${({ isExpanded, isMobile }) =>
    isMobile && !isExpanded ? "0" : "18px"};
  overflow: hidden;
  transition:
    max-height 0.3s ease-in-out,
    margin-top 0.3s ease-in-out;

  ${({ isExpanded, isMobile }) =>
    isMobile && !isExpanded
      ? css`
          max-height: 0;
        `
      : css`
          max-height: 60px;
        `}

  @media all and (min-width: ${breakpoints.md + 1}px) {
    display: none;
  }
`;

const StyledSeeMoreLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: ${getRemSize(16)};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${colors.accent};

    ${StyledPillArrow} {
      transform: translateX(4px);
    }
  }
`;

interface IProcessItem {
  title: string;
  description: string;
  pills: IPill[];
  index: number;
  hoverItems: boolean[];
  setHoverItems: (items: boolean[]) => void;
  serviceCategorySlug?: string;
  expandedItems: boolean[];
  setExpandedItems: (items: boolean[]) => void;
}

const ProcessItem = ({
  title,
  description,
  pills,
  hoverItems,
  setHoverItems,
  index,
  serviceCategorySlug,
  expandedItems,
  setExpandedItems,
}: IProcessItem) => {
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px" });

  const setHovering = (option: boolean) => {
    if (isDesktop) {
      const newHoverItems = hoverItems;
      newHoverItems[index] = option;

      setHoverItems([...newHoverItems]);
    }
  };

  const toggleExpanded = () => {
    if (isMobile) {
      const newExpandedItems = [...expandedItems];
      newExpandedItems[index] = !newExpandedItems[index];
      setExpandedItems(newExpandedItems);
    }
  };

  const pillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const isBlurred = () => {
    if (isDesktop) {
      return !hoverItems[index] && hoverItems.some((item) => item);
    }
    return false;
  };
  return (
    <StyledProcessItem
      ref={itemRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      isBlurred={isBlurred()}
      isExpanded={expandedItems[index]}
    >
      <StyledProcessTitleWrap isClickable={isMobile} onClick={toggleExpanded}>
        <StyledProcessListTitle>
          {serviceCategorySlug && !isMobile ? (
            <StyledProcessTitleLink
              href={`/services?type=${serviceCategorySlug}`}
              disabled={isMobile && !expandedItems[index]}
              onClick={(e) => {
                if (isMobile && !expandedItems[index]) {
                  e.preventDefault();
                }
              }}
            >
              {title}
              {(!isMobile || expandedItems[index]) && (
                <StyledTitleArrow aria-hidden="true">
                  <ArrowRight dark />
                </StyledTitleArrow>
              )}
            </StyledProcessTitleLink>
          ) : (
            <span>{title}</span>
          )}
          {isMobile && (
            <StyledExpandIndicator
              animate={{ rotate: expandedItems[index] ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            >
              <ArrowRight dark />
            </StyledExpandIndicator>
          )}
        </StyledProcessListTitle>

        <StyledProcessDescription
          isVisible={isDesktop ? hoverItems[index] : true}
        >
          {description}
        </StyledProcessDescription>
      </StyledProcessTitleWrap>
      <StyledPillList isExpanded={expandedItems[index]} isMobile={isMobile}>
        {pills.map((pill, pillIndex) => {
          const serviceSlug = pill.service?.nodes?.[0]?.slug;
          return (
            <StyledPillItemWrapper
              key={`${pill.pillText}-${pill.id}`}
              custom={pillIndex}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={pillVariants}
            >
              {serviceSlug ? (
                <StyledPillLink href={`/services/${serviceSlug}`}>
                  {pill.pillText}
                  <StyledPillArrow aria-hidden="true">
                    <ArrowRight dark />
                  </StyledPillArrow>
                </StyledPillLink>
              ) : (
                pill.pillText
              )}
            </StyledPillItemWrapper>
          );
        })}
      </StyledPillList>
      {serviceCategorySlug && (
        <StyledSeeMoreWrap
          isExpanded={expandedItems[index]}
          isMobile={isMobile}
        >
          <StyledSeeMoreLink href={`/services?type=${serviceCategorySlug}`}>
            See more
            <StyledPillArrow aria-hidden="true">
              <ArrowRight dark />
            </StyledPillArrow>
          </StyledSeeMoreLink>
        </StyledSeeMoreWrap>
      )}
    </StyledProcessItem>
  );
};

interface WhatWeDoProps {
  items: IWhatWeDo[];
  whatWeDoSubtitle: string;
}

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
      delay: 0.1,
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

function WhatWeDo({ items, whatWeDoSubtitle }: WhatWeDoProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [hoverItems, setHoverItems] = useState(
    new Array(items.length).fill(false),
  );

  const [expandedItems, setExpandedItems] = useState(
    new Array(items.length).fill(false),
  );

  let pillId = 0;
  const itemsWithUniqueIds = items.map((item) => ({
    ...item,
    pills: item.pills.map((pill) => ({
      ...pill,
      id: pillId++,
    })),
  }));

  return (
    <StyledWrapper>
      <Row>
        <Col start={1} span={12} spanTablet={12} spanMobile={12}>
          <StyledTitle
            ref={ref}
            initial="closed"
            animate={isInView ? "open" : "closed"}
            variants={variants}
            transition={{ delay: 0.2 }}
          >
            What we do.
          </StyledTitle>
          {whatWeDoSubtitle && (
            <StyledSubTitle>{whatWeDoSubtitle}</StyledSubTitle>
          )}
        </Col>
        <Col start={1} span={12} spanMobile={12}>
          <StyledProcessList>
            {itemsWithUniqueIds.map((item, index) => {
              const serviceCategorySlug =
                item.serviceCategory?.edges?.[0]?.node?.slug;
              return (
                <AnimateInView key={index}>
                  <ProcessItem
                    title={item.title}
                    description={item.description}
                    pills={item.pills}
                    index={index}
                    hoverItems={hoverItems}
                    setHoverItems={setHoverItems}
                    serviceCategorySlug={serviceCategorySlug}
                    expandedItems={expandedItems}
                    setExpandedItems={setExpandedItems}
                  />
                </AnimateInView>
              );
            })}
          </StyledProcessList>
        </Col>
      </Row>
    </StyledWrapper>
  );
}

export default WhatWeDo;
