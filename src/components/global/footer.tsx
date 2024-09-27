import styled from "@emotion/styled";
import { GridContainer } from "../global/grid/gridContainer";
import { PillIconButton as OriginalPillIconButton } from "../global/pillIconButton";
import Pill from "../global/pill";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import ChatIcon from "../../icons/chatIcon";
import Image from "next/image";
import Link from "next/link";
import { getRemSize } from "../../styles/globalCss";
import eoanPicture from "../../../public/eoan-picture-2.png";
import {
  StyledParagraphWrapper as OriginalStyledParagraphWrapper,
  StyledParagraphText as OriginalStyledParagraphText,
  StyledPillWrapper as OriginalStyledPillWrapper,
} from "../../components/home/approach";
import useIsDesktop from "../../hooks/useIsDesktop";
import { Row } from "./grid/Row";
import { Col } from "./grid/Col";
import React, { useEffect, useRef, useState } from "react";
import { Contact } from "../contact";
import { motion, useInView } from "framer-motion";

const StyledFooter = styled.footer`
  position: relative;
`;

const StyledWrapper = styled(GridContainer)`
  margin: 300px auto 260px auto;
  /* margin: 0 auto; */
  /* padding: 300px 0 260px 0; */
  /* margin-top:50 */

  @media all and (max-width: ${breakpoints.md}px) {
    margin: 159px 0;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    margin: 119px 0;
  }
`;

const StyledContent = styled(motion.div)`
  grid-column: 3 / span 8;
  padding: 0;
  margin: 0;

  @media all and (max-width: ${breakpoints.md}px) {
    grid-column: 2 / span 10;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    grid-column: 1 / span 12;
  }
`;

// Imported from approach.tsx, but with additional styles
const StyledParagraphWrapper = styled(OriginalStyledParagraphWrapper)`
  @media all and (max-width: ${breakpoints.md}px) {
    margin: initial;
    display: initial;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    margin: initial;
    display: initial;
  }

  @media all and (max-width: 330px) {
    display: flex;
  }
`;

const StyledParagraphText = styled(OriginalStyledParagraphText)`
  line-height: 1;
  font-size: ${getRemSize(dimensions.headingSizes.large.desktop)};
  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
    line-height: 72px;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(dimensions.headingSizes.display2.mobile)};
    line-height: 72px;
  }

  @media all and (max-width: 330px) {
    margin-top: 2rem;
  }
`;

const StyledPillWrapper = styled(OriginalStyledPillWrapper)`
  top: -20px !important;
  @media all and (max-width: ${breakpoints.md}px) {
    position: absolute;
    left: 0;
  }
`;

const StyledTextSpacer = styled.span`
  position: relative;
  padding: 0 40px;

  color: transparent;
  @media all and (max-width: ${breakpoints.md}px) {
    display: initial;
    padding: 0 43px;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    display: initial;
    padding: 0 31px;
  }
`;

const StyledImage = styled(Image)`
  width: 80px;
  height: 80px;
  margin-left: 25px;
  margin-top: -15px;
  vertical-align: middle;
  position: relative;

  @media all and (max-width: ${breakpoints.md}px) {
    width: 60px;
    height: 60px;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    display: none;
  }
`;

const StyledIconButton = styled.button`
  width: 70px;
  height: 70px;
  margin-left: 25px;
  padding: 0;
  border: 2px solid ${colors.blackLight};
  transition: 0.3s ease;
  border-radius: 26px;
  vertical-align: middle;

  &:hover {
    background-color: ${colors.accent};
    border-color: ${colors.accent};
  }
`;

const PillIconButton = styled(OriginalPillIconButton)`
  max-width: 257px;
  margin: 60px 0;
  font-size: 24px;
  font-weight: 500;
  & .styled-icon {
    top: 28%;
  }
`;

const StyledLinkWrapper = styled.div`
  display: flex;
  height: 9px;
  color: #f8f8f8;
  font-weight: 400;
  opacity: 0.5;
  margin-bottom: 17px;
  justify-content: end;

  & > a {
    margin-right: 1.5rem;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    justify-content: center;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    justify-content: center;
    font-size: ${getRemSize(dimensions.textSizes.small.mobile)};
  }
`;

const StyledSlider = styled.div`
  height: 155px;
  margin: auto;
  width: 100%;
  display: grid;
  place-items: center;
  overflow: hidden;
  padding-top: 38px;

  @media all and (max-width: ${breakpoints.md}px) {
    height: 103px;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    height: 74px;
  }
`;

const StyledSlideTrack = styled.div`
  display: flex;
  width: calc(1725px * 4); // total width of all slides
  animation: scroll 8s linear infinite;

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-1725px);
    }
  }

  @media all and (max-width: ${breakpoints.md}px) {
    width: calc(1000px * 4);
    animation: scroll 6s linear infinite;

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-1000px);
      }
    }
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    width: calc(600px * 4);
    animation: scroll 4s linear infinite;

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-600px);
      }
    }
  }
`;

const StyledSlide = styled.div`
  width: 1725px;
  display: flex;
  align-items: center;

  @media all and (max-width: ${breakpoints.md}px) {
    width: 1000px;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    width: 600px;
  }
`;

const StyledSlideText = styled.span`
  font-weight: 600;
  font-size: 344px;
  letter-spacing: 0.6rem;
  width: 100%;
  line-height: 72px;
  text-shadow: 9px 0px ${colors.accentDark};

  @media all and (max-width: ${breakpoints.md}px) {
    font-size: 185px;
    line-height: 40px;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    font-size: 103px;
    line-height: 21.6px;
    text-shadow: none;
  }
`;

const StyledPillIconButton = styled(PillIconButton)`
  &:hover .styled-icon {
    transform: rotate(0deg);
  }
  &:hover {
    path {
      stroke: ${colors.white};
      fill: none;
    }
  }
`;
const StyledChatIcon = styled(ChatIcon)`
  position: relative;
  top: -10px;
`;

interface IProps {
  setFooterInView: (value: boolean) => void;
}

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
      delay: 0.5,
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

export default function Footer({ setFooterInView }: IProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterInView(entry.isIntersecting);
      },
      {
        root: null, // Use the viewport as the root
        threshold: 0.1, // Trigger when 10% of the footer is in view
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const openContactModal = () => {
    setModalOpen(true);
  };

  const closeContactModal = () => {
    setModalOpen(false);
  };

  return (
    <StyledFooter ref={footerRef} id="footer">
      <StyledWrapper>
        <Row>
          <Col start={2} span={10}>
            <StyledContent
              variants={variants}
              initial="closed"
              animate={isInView ? "open" : "closed"}
            >
              <StyledParagraphWrapper>
                <StyledTextSpacer>
                  {"Interested?"}
                  <StyledPillWrapper>
                    <Pill pillText={"Interested?"} />
                  </StyledPillWrapper>
                </StyledTextSpacer>
                <StyledParagraphText>
                  Get in contact, have a chat with Eoan
                  {
                    <Link
                      href="https://www.linkedin.com/in/eoanodea/"
                      target="_blank"
                    >
                      <StyledImage src={eoanPicture} alt="Eoan" />
                    </Link>
                  }{" "}
                  or chat
                  {isDesktop && (
                    <StyledIconButton onClick={openContactModal}>
                      <ChatIcon />
                    </StyledIconButton>
                  )}{" "}
                  with us
                </StyledParagraphText>
              </StyledParagraphWrapper>
              {!isDesktop && (
                <StyledPillIconButton
                  text="Chat with us"
                  onClick={openContactModal}
                >
                  <StyledChatIcon />
                </StyledPillIconButton>
              )}
            </StyledContent>
          </Col>
          <Contact
            isOpen={isModalOpen}
            onClose={closeContactModal}
            dark={true}
          />
        </Row>
      </StyledWrapper>
      <StyledLinkWrapper>
        <Link href="/privacy-policy">Legal Information</Link>
        <Link href="#">@WebSpace 2021</Link>
      </StyledLinkWrapper>
      <StyledSlider>
        <StyledSlideTrack>
          <StyledSlide>
            <StyledSlideText>WEBSPACE</StyledSlideText>
          </StyledSlide>
          <StyledSlide>
            <StyledSlideText>WEBSPACE</StyledSlideText>
          </StyledSlide>
          <StyledSlide>
            <StyledSlideText>WEBSPACE</StyledSlideText>
          </StyledSlide>
          <StyledSlide>
            <StyledSlideText>WEBSPACE</StyledSlideText>
          </StyledSlide>
        </StyledSlideTrack>
      </StyledSlider>
    </StyledFooter>
  );
}
