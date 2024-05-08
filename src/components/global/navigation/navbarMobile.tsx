import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { colors, dimensions } from "../../../styles/variables";
import { getRemSize } from "../../../styles/globalCss";
import { Contact } from "../../../components/contact";
import ChatIcon from "../../../icons/chatIcon";
import CloseIcon from "../../../icons/closeIcon";
import BurgerIcon from "../../../icons/burgerIcon";
import LogoIcon from "../../../icons/logoIcon";

const StyledImageWrapper = styled.div<{ dark: boolean }>`
  position: fixed;
  top: 14px;
  left: 8px;
  z-index: 999;
  color: ${(props) => (props.dark ? colors.white : colors.black)};

  img {
    fill: currentColor;
  }
`;

const StyledNavMobile = styled.nav<{ dark: boolean; isMenuOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem;
  z-index: 999;
  backdrop-filter: ${(props) => (props.isMenuOpen ? "blur(15px)" : "0")};
  width: ${(props) => (props.isMenuOpen ? "100vw" : "auto")};
  height: ${(props) => (props.isMenuOpen ? "100vh" : "auto")};
  transition: ${(props) =>
    props.isMenuOpen ? "backdrop-filter 0.3s ease-in-out" : "none"};
  mask-image: ${(props) =>
    props.isMenuOpen
      ? "linear-gradient(to bottom, #000000 0%, #000000 50%, #000000a3 75%, #00000045 100%)"
      : "none"};
`;
const StyledBtnMobile = styled.button<{ isOpen: boolean }>`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  width: 2rem;
  height: 2rem;
  background-color: ${colors.accentLight};
  padding: 0.25rem;
  margin-bottom: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${colors.accent};
  }

  ${(props) =>
    props.isOpen &&
    `
  background-color: ${colors.blackLight};
  &:hover {
    background-color: ${colors.blackLight};
  }
  `}
`;

const StyledDivMobile = styled.div<IStyledDivMobileProps>`
  display: flex;
  background-color: ${colors.accentLight};
  backdrop-filter: blur(5px);
  border-radius: 2rem;
  border: 2px solid ${colors.blackLight};
  opacity: 0;

  animation: fadeIn 0.5s forwards;
  animation-delay: ${(props) => props.index * 0.1}s;
  transition: background-color 0.3s ease-in-out;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  &:hover {
    background-color: ${colors.accent};
  }
`;
const StyledWrapperMobile = styled.div<{ isMenuOpen: boolean }>`
  display: ${(props) => (props.isMenuOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 16px;
  align-items: flex-end;
`;
const StyledLinkMobile = styled.a<{ dark: boolean }>`
  padding: 0.25rem 0.9rem 0.4rem 0.9rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  color: ${(props) => (props.dark ? colors.white : colors.black)};
  text-decoration: none;
  font-size: ${getRemSize(dimensions.headingSizes.medium.mobile)};
  font-weight: 500;
  letter-spacing: 1.28px;

  &:hover {
    color: ${colors.white}!important;
  }

  &:focus {
    color: ${colors.white}!important;
  }
`;

const StyledDivContactMobile = styled.div`
  position: fixed;
  bottom: 0px;
  right: 22px;
`;

const StyledLinkContactMobile = styled.a<{
  dark: boolean;
  isMenuOpen: boolean;
}>`
  display: flex; // Centers the icon
  justify-content: center; // Centers the icon horizontally
  align-items: center; // Centers the icon vertically
  background-color: ${colors.accentLight};
  padding: 12px 10px 10px 10px;
  border-radius: 25px;
  width: 55px;
  height: 55px;
  margin-bottom: 1rem;
  color: ${(props) => (props.dark ? colors.white : colors.black)};
  cursor: ${(props) => (props.isMenuOpen ? "default" : "pointer")};

  ${(props) =>
    !props.isMenuOpen &&
    `
  &:hover {
    background-color: ${colors.accent};
  }
`}

  img {
    max-width: 100%;
    max-height: 100%;
    fill: currentColor;
  }
`;

interface NavbarMobileProps {
  dark: boolean;
  links: {
    name: string;
    path: string;
    icon?: JSX.Element | undefined;
  }[];
}

interface IStyledDivMobileProps {
  index: number;
}

export function NavbarMobile({ dark, links }: NavbarMobileProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [topDark, setTopDark] = useState(dark);

  useEffect(() => {
    const handleScroll = () => {
      setTopDark(window.scrollY > window.innerHeight * 0.9);
    };

    if (!dark) {
      window.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  return (
    <>
      <StyledImageWrapper dark={topDark}>
        <LogoIcon dark={topDark} />
      </StyledImageWrapper>
      <StyledNavMobile
        isMenuOpen={isMenuOpen}
        dark={dark}
        onClick={() => setIsMenuOpen(false)}
      >
        <StyledBtnMobile
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          isOpen={isMenuOpen}
        >
          {isMenuOpen ? (
            <CloseIcon dark={topDark} />
          ) : (
            <BurgerIcon dark={topDark} />
          )}
        </StyledBtnMobile>

        <StyledWrapperMobile
          isMenuOpen={isMenuOpen}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {links.slice(0, -1).map((link, index) => (
            <StyledDivMobile key={index} index={index}>
              <StyledLinkMobile href={`/${link.path}`} dark={dark}>
                {!link.icon && link.name}
              </StyledLinkMobile>
            </StyledDivMobile>
          ))}
        </StyledWrapperMobile>
        {links.length > 0 && (
          <StyledDivContactMobile>
            <StyledLinkContactMobile
              isMenuOpen={isMenuOpen}
              dark={dark}
              onClick={isMenuOpen ? undefined : openContactModal}
            >
              <ChatIcon dark={dark} />
            </StyledLinkContactMobile>
          </StyledDivContactMobile>
        )}
      </StyledNavMobile>
      <Contact
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        dark={dark}
      />
    </>
  );
}
