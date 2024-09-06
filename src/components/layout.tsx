import { useState, useEffect } from "react";
import { ISiteData } from "../interfaces/site";
import { StyledWrapper } from "../styles/styled-wrapper";
import Footer from "./global/footer";
import Wrapper from "./global/wrapper";
import Navbar from "./navbar";
import styled from "@emotion/styled";
import Loader from "./global/loader";

const StyledLink = styled.a`
  position: absolute;
  top: auto;
  left: -999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: -99;

  &:focus,
  &:active {
    background-color: #000;
    color: #fff;
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    overflow: auto;
    z-index: 99;
  }
`;

interface ILayout {
  children: React.ReactNode;
  pageTitle?: string;
  siteData?: ISiteData;
  isHomePage?: boolean;
}

export default function Layout({
  pageTitle,
  siteData,
  children,
  isHomePage = false,
}: ILayout) {
  const isHome = isHomePage;
  const [isLoading, setIsLoading] = useState(isHome);
  const [dark, setDark] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setDark(window.scrollY > 20);
    };

    if (window.location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      setDark(true);
    }
  }, []);

  return (
    <StyledWrapper>
      <Wrapper pageTitle={pageTitle} siteData={siteData} />

      <StyledLink className="skip-to-content" href="#content">
        Skip to Content
      </StyledLink>

      {isLoading && isHome ? (
        <Loader finishLoading={() => setIsLoading(false)} />
      ) : (
        <>
          <Navbar dark={dark} sticky={true} />

          <main id="content">{children}</main>

          <Footer setFooterInView={setFooterInView} />
        </>
      )}
    </StyledWrapper>
  );
}
