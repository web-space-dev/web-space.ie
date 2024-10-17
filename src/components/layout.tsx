import { useState, useEffect } from "react";
import { ISiteData } from "../interfaces/site";
import { StyledWrapper } from "../styles/styled-wrapper";
import Footer from "./global/footer";
import Wrapper from "./global/wrapper";
import Navbar from "./navbar";
import styled from "@emotion/styled";
import Loader from "./global/loader";

import { GoogleAnalytics } from "@next/third-parties/google";
import ComingSoon from "./global/comingSoon";

const gaId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

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
  disableFooter?: boolean;
}

export default function Layout({
  pageTitle,
  siteData,
  children,
  isHomePage = false,
  disableFooter = false,
}: ILayout) {
  const isHome = isHomePage;
  const [isLoading, setIsLoading] = useState(isHome);
  const [dark, setDark] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  const isProduction = process.env.NODE_ENV === "production";
  const isComingSoon = process.env.NEXT_PUBLIC_COMING_SOON === "true";

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

  useEffect(() => {
    const hasVisitedHome = localStorage.getItem("hasVisitedHome");

    if (hasVisitedHome) {
      setIsLoading(false);
    } else {
      localStorage.setItem("hasVisitedHome", "true");
    }
  }, []);

  if (isComingSoon) {
    return (
      <StyledWrapper>
        <Wrapper pageTitle={"WEB Space"} siteData={siteData} />

        <main id="content">
          <ComingSoon />
        </main>

        {process.env.NODE_ENV === "production" && gaId && (
          <GoogleAnalytics gaId={gaId} />
        )}
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <Wrapper pageTitle={pageTitle} siteData={siteData} />

      <StyledLink className="skip-to-content" href="#content">
        Skip to Content
      </StyledLink>

      {isProduction && isLoading && isHome ? (
        <Loader finishLoading={() => setIsLoading(false)} />
      ) : (
        <>
          <Navbar dark={dark} sticky={true} />

          <main id="content">{children}</main>

          {!disableFooter && <Footer setFooterInView={setFooterInView} />}
          {process.env.NODE_ENV === "production" && gaId && (
            <GoogleAnalytics gaId={gaId} />
          )}
        </>
      )}
    </StyledWrapper>
  );
}
