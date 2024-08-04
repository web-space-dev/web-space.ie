"use client";
import styled from "@emotion/styled";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { breakpoints, colors, dimensions } from "../styles/variables";
import { getRemSize } from "../styles/globalCss";
import { NavbarMobile } from "./global/navigation/navbarMobile";
import useIsDesktop from "../hooks/useIsDesktop";
import { Contact } from "./contact";
import ArrowLeft from "../icons/arrowLeft";
import { SVGProps } from "react";
import ChatIcon from "../icons/chatIcon";
import Link from "next/link";
import Image from "next/image";

const StyledLogoImage = styled.div<{ dark: boolean }>`
  position: fixed;
  top: 14px;
  left: 8px;
  z-index: 1005;
  color: ${(props) => (props.dark ? colors.white : colors.black)};
  img {
    fill: currentColor;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  position: fixed;
  padding: 0px 0px 0px 3px;
  border-radius: 0.75rem;
  background-color: rgba(57, 151, 156, 0.2);
  width: max-content;
  backdrop-filter: blur(5px);
  z-index: 999;

  @media (min-width: 700px) {
    height: auto;
    bottom: 16px;
    left: 5%;
    right: 5%;
    margin: auto;
    gap: 0.5rem;

    @media (max-width: 700px) {
      display: none;
    }
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & a:first-of-type {
    margin: 0.3rem 0.4rem 0.3rem 0.2rem;
  }

  & a:last-of-type {
    margin: 0.3rem 0.5rem 0.3rem 0.4rem;
  }

  & a:not(:first-of-type):not(:last-of-type) {
    margin: 0.3rem 0.4rem;
  }
`;

const StyledLink = styled.a<NavbarProps>`
  padding: 0px 16px 2px 16px;
  margin: 16px;
  letter-spacing: 0.05455rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  color: ${(props) => (props.dark ? colors.white : colors.black)};
  text-decoration: none;
  font-size: ${getRemSize(dimensions.headingSizes.medium.mobile)};

  &:hover,
  &:active,
  &:visited {
    background-color: rgba(57, 151, 156, 0.2);
    color: ${(props) => (props.dark ? colors.white : colors.black)};
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const StyledBackbutton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const StyledBackLink = styled.a<NavbarProps>`
  padding: 9px 35px 9px 20px;
  margin-left: 20px;
  letter-spacing: 0.05455rem;
  border-radius: 18px;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  background-color: rgba(57, 151, 156, 0.2);
  backdrop-filter: blur(5px);
  color: ${(props) => (props.dark ? colors.white : colors.black)};
  text-decoration: none;
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  position: relative;
  position: fixed;
  bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    color: ${(props) => (props.dark ? colors.white : colors.black)};
    z-index: 2;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(57, 151, 156, 0);
    border-radius: 18px;
    transition: background-color 0.3s ease;
    z-index: -1;
  }

  &:hover::before {
    background-color: rgba(57, 151, 156, 0.2);
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

type StyledSpanProps = {
  isActive: boolean;
};

interface NavbarProps {
  dark: boolean;
}

export const StyledNavSpan = styled.span<StyledSpanProps & NavbarProps>`
  box-shadow: 0 -0.5px 0 0.5px ${(props) => (!props.isActive ? "transparent" : props.dark ? colors.white : colors.black)};
  width: 1.5rem;
  transition: all 0.3s ease-in-out;

  @media (max-width: 700px) {
    display: none;
  }
`;

export default function Navbar({ dark }) {
  const pathname = usePathname();
  const isDesktop = useIsDesktop();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const links = [
    { name: "About", path: "" },
    { name: "Projects", path: "projects" },
    { name: "Client space", path: "#" },
    {
      name: "chat",
      path: "#",
      icon: <ChatIcon dark={dark} />,
      onClick: openContactModal,
    },
  ];

  const projectsPageElements = (
    <StyledBackbutton>
      <StyledBackLink href="/projects" dark={dark}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "30px",
          }}
        >
          <ArrowLeft dark={dark} />
        </span>
        Projects
      </StyledBackLink>
    </StyledBackbutton>
  );

  return (
    <>
      {/* desktop */}
      {isDesktop ? (
        <>
          <StyledLogoImage dark={false}>
            <Link href="/">
              <Image
                src="/svg/logo-icon-white.svg"
                alt="Logo"
                width={40}
                height={40}
              />
            </Link>
          </StyledLogoImage>
          <StyledNav>
            {links.map((link, index) => (
              <StyledDiv key={index}>
                <StyledLink
                  href={`/${link.path}`}
                  dark={dark}
                  onClick={(event) => {
                    if (link.onClick) {
                      event.preventDefault();
                      link.onClick();
                    }
                  }}
                >
                  {index === links.length - 1 ? link.icon : link.name}
                </StyledLink>
                <StyledNavSpan
                  isActive={pathname === `/${link.path}`}
                  dark={dark}
                />
              </StyledDiv>
            ))}
          </StyledNav>
          {pathname.startsWith("/projects/") && projectsPageElements}
        </>
      ) : (
        <NavbarMobile dark={dark} links={links} />
      )}
      <Contact
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        dark={dark}
      />
    </>
  );
}
