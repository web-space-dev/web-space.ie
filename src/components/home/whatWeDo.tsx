import styled from "@emotion/styled";
import { Pill as IPill, WhatWeDo as IWhatWeDo } from "../../interfaces/home";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import { GridContainer } from "../global/grid/gridContainer";
import { memo, useRef, useState } from "react";
import { css } from "@emotion/react";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";
import useIsDesktop from "../../hooks/useIsDesktop";
import { delay, motion, useInView } from "framer-motion";

const StyledWrapper = styled(GridContainer)`
  margin: 140px 0;
`;

const StyledTitle = styled(motion.h2)`
  font-size: ${getRemSize(dimensions.headingSizes.medium.mobile)};
  font-weight: 400;
  @media all and (max-width: ${breakpoints.md}px) {
    grid-column: 1 / span 12;
    margin-bottom: 0px;
  }
`;

const StyledProcessList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledProcessListTitle = styled.h3`
  margin-top: 0;
  font-size: ${getRemSize(dimensions.headingSizes.large.desktop)};
  transition: 0.3s ease-in-out;
  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
    font-weight: 400;
    letter-spacing: 2px;
  }
  @media all and (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(dimensions.headingSizes.medium.mobile)};
  }
  ${({ isGlassy }: { isGlassy: boolean }) =>
    isGlassy &&
    css`
      filter: blur(4px);
    `}
`;

interface IStyledProcessItemExpand {
  isExpanded: boolean;
}

const StyledProcessItemExpand = styled.div<IStyledProcessItemExpand>`
  margin: 0;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: 0.3s ease-in-out;
  @media all and (max-width: ${breakpoints.md}px) {
    margin: 8px 0 32px 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
    align-items: start;
  }

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      margin: 60px 0 40px 0;
      max-height: 500px;
      opacity: 1;
    `}
`;

const marginLeftValues = [
  "0px",
  "30px",
  "00px",
  "30px",
  "60px",
  "30px",
  "30px",
  "60px",
  "30px",
];
const marginRightValues = [
  "13px",
  "56px",
  "0px",
  "91px",
  "18px",
  "62px",
  "76px",
  "61px",
  "0px",
  "0px",
];

const StyledPillNumber = styled.span`
  background-color: ${colors.white};
  color: ${colors.black};
  display: inline-block;
  text-align: center;
  border-radius: 10px;
  width: 33px;
  height: 33px;
  margin: 0 10px;
  letter-spacing: 0px;
`;

const StyledPillText = styled.span`
  text-align: left;
`;

const StyledPill = styled.span<{ index: number }>`
  /* background-color: ${colors.white}; */
  /* color: ${colors.black}; */
  padding: 10px 30px 12px 30px;
  margin: 0px 16px;
  border-radius: 50px;
  font-weight: 500;
  letter-spacing: 2px;
  display: flex;

  @media all and (max-width: ${breakpoints.md}px) {
    margin: 12px 16px;
    text-align: center;
    padding: 10px 0;
    width: 100%;
    font-size: ${getRemSize(dimensions.textSizes.normal.mobile)};
  }

  @media all and (max-height: 700px) {
    @media all and (max-width: ${breakpoints.md}px) {
      font-size: ${getRemSize(dimensions.textSizes.normal.mobile - 5)};
    }
  }
`;

interface IProcessItem {
  title: string;
  pills: IPill[];
  index: number;
  hoverItems: boolean[];
  setHoverItems: (items: boolean[]) => void;
  totalPillsBefore: number;
}

const ProcessItem = ({
  title,
  pills,
  hoverItems,
  setHoverItems,
  index,
  totalPillsBefore,
}: IProcessItem) => {
  const isDesktop = useIsDesktop();

  const setHovering = (option: boolean) => {
    if (isDesktop) {
      const newHoverItems = hoverItems;
      newHoverItems[index] = option;

      setHoverItems([...newHoverItems]);
    }
  };
  const isGlassy = () => {
    if (isDesktop) {
      return !hoverItems[index] && hoverItems.some((item) => item);
    }
  };

  return (
    <li
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <StyledProcessListTitle isGlassy={isGlassy()}>
        {title}
      </StyledProcessListTitle>
      <StyledProcessItemExpand
        isExpanded={isDesktop ? hoverItems[index] : true}
      >
        {pills.map((pill, innerIndex) => {
          const pillNumber = totalPillsBefore + innerIndex;
          return (
            <StyledPill key={`${pill.pillText}-${pill.id}`} index={pill.id}>
              <StyledPillNumber>
                {pillNumber < 10 && "0"}
                {pillNumber + 1}
              </StyledPillNumber>

              <StyledPillText>{pill.pillText}</StyledPillText>
            </StyledPill>
          );
        })}
      </StyledProcessItemExpand>
    </li>
  );
};

interface WhatWeDoProps {
  items: IWhatWeDo[];
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

function WhatWeDo({ items }: WhatWeDoProps) {
  let totalPillsBefore = 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [hoverItems, setHoverItems] = useState(
    new Array(items.length).fill(false)
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
        <Col start={1} span={2} spanMobile={6}>
          <StyledTitle
            ref={ref}
            initial="closed"
            animate={isInView ? "open" : "closed"}
            variants={variants}
            transition={{ delay: 0.2 }}
          >
            What we do.
          </StyledTitle>
        </Col>
        <Col start={3} span={10}>
          <StyledProcessList
            initial="closed"
            animate={isInView ? "open" : "closed"}
            variants={variants}
            transition={{ delay: 1.8 }}
          >
            {itemsWithUniqueIds.map((item, index) => {
              const currentTotalPillsBefore = totalPillsBefore;
              totalPillsBefore += item.pills.length;

              return (
                <motion.div key={index}>
                  <ProcessItem
                    key={index}
                    title={item.title}
                    pills={item.pills}
                    index={index}
                    hoverItems={hoverItems}
                    setHoverItems={setHoverItems}
                    totalPillsBefore={currentTotalPillsBefore}
                  />
                </motion.div>
              );
            })}
          </StyledProcessList>
        </Col>
      </Row>
    </StyledWrapper>
  );
}

export default memo(WhatWeDo);
