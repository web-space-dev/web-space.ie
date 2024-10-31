import styled from "@emotion/styled";
import { getRemSize } from "../../styles/globalCss";
import { breakpoints, dimensions } from "../../styles/variables";
import Link from "next/link";
import ArrowUpRight from "../../icons/arrowUpRight";
import { useEffect, useRef, useState } from "react";
import useAnimatedCounter from "../../hooks/useAnimatedCounter";
import { useInView } from "framer-motion";
import AnimateInView from "../global/animation/animateInView";

const StyledProjectField = styled.div`
  min-width: 347px;
  min-height: 127px;
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  margin: 10px;
  backdrop-filter: blur(15px);

  @media (max-width: 1100px) {
    min-width: 260px;
    min-height: 92px;
  }

  @media (max-width: ${breakpoints.md}px) {
    flex-direction: row;
    width: 100%;
    min-height: 78px;
    padding: 20px 26px;
    align-items: center;
    justify-content: space-between;
    margin: 4px;
  }
`;
const StyledProjectFieldName = styled.p`
  font-weight: 500;
  letter-spacing: 4px;
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  opacity: 80%;
  margin: 0px;
  padding: 0px;

  @media (max-width: 1100px) {
    font-size: ${getRemSize(dimensions.textSizes.normal.mobile)};
  }

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.textSizes.normal.mobile)};
    letter-spacing: 1px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(dimensions.textSizes.small.mobile)};
    letter-spacing: 1px;
  }
`;

const StyledProjectFieldValue = styled.p`
  font-weight: 500;
  letter-spacing: 4px;
  font-size: ${getRemSize(dimensions.textSizes.large.desktop)};
  margin: 0px;
  padding: 0px 0px 6px 0px;
  line-height: 0.67;
  text-wrap: nowrap;

  @media (max-width: 1100px) {
    font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
  }

  @media (max-width: ${breakpoints.md}px) {
    letter-spacing: 1px;
  }
`;

const StyledArrowUpRight = styled(ArrowUpRight)`
  margin-left: 21px;
  @media (max-width: 1100px) {
    margin-left: 12px;
  }
`;

interface IProps {
  stat: {
    field: string;
    value: string;
    link?: string;
  };
  //   initialAnimationComplete: boolean;
}

export function HeroStat({ stat }: IProps) {
  const [numberValue, setNumberValue] = useState<number | null>(null);
  const [prefix, setPrefix] = useState<string>("");
  const [suffix, setSuffix] = useState<string>("");
  const [decimalPlaces, setDecimalPlaces] = useState<number>(0);

  const wrapperRef = useRef(null);
  const inView = useInView(wrapperRef, { once: true, amount: 0.6 });

  useEffect(() => {
    const match = stat.value.match(/(\D*)(\d{1,3}(?:,\d{3})*(?:\.\d+)?)(\D*)/);
    if (match) {
      setPrefix(match[1]);
      setNumberValue(parseFloat(match[2].replace(/,/g, "")));
      setSuffix(match[3]);

      const decimalMatch = match[2].match(/\.(\d+)/);
      setDecimalPlaces(decimalMatch ? decimalMatch[1].length : 0);
    }
  }, [stat.value]);

  const { ref, formattedValue } = useAnimatedCounter({
    value: numberValue || 0,
    direction: "up",
    start: inView,
    duration: 2,
    decimalPlaces,
  });

  return (
    <StyledProjectField ref={wrapperRef}>
      <StyledProjectFieldName>{stat.field}</StyledProjectFieldName>
      <AnimateInView>
        <StyledProjectFieldValue>
          {stat.link ? (
            <Link href={stat.link} target="_blank">
              {stat.value}

              <StyledArrowUpRight className="styled-icon" fill="#fff" />
            </Link>
          ) : numberValue !== null ? (
            <span ref={ref}>
              {prefix}
              {formattedValue}
              {suffix}
            </span>
          ) : (
            stat.value
          )}
        </StyledProjectFieldValue>
      </AnimateInView>
    </StyledProjectField>
  );
}
