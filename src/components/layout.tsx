import { useState, useEffect } from "react";
import { ISiteData } from "../interfaces/site";
import { StyledWrapper } from "../styles/styled-wrapper";
import Footer from "./global/footer";
import Wrapper from "./global/wrapper";
import Navbar from "./navbar";

interface ILayout {
  children: React.ReactNode;
  pageTitle?: string;
  siteData?: ISiteData;
}

export default function Layout({ pageTitle, siteData, children }: ILayout) {
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
      <Navbar dark={dark} sticky={!footerInView} />

      <main>{children}</main>

      <Footer setFooterInView={setFooterInView} />
    </StyledWrapper>
  );
}
