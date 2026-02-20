import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import LogoFull from "../../icons/logoFull";
import AnimateInView from "./animation/animateInView";
import { GridContainer } from "./grid/gridContainer";
import { Row } from "./grid/Row";
import { Col } from "./grid/Col";
import { getRemSize } from "../../styles/globalCss";
import ChatIcon from "../../icons/chatIcon";
import { Contact } from "../contact";
import { useState } from "react";

// const StyledWrapper = styled(motion.div)`
//   position: absolute;
//   z-index: 1;
//   opacity: 0;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);

//   @media (max-width: ${breakpoints.sm}px) {
//     svg {
//       width: 300px;
//     }
//   }
// `;

const StyledWrapper = styled(motion.div)<{ fillwhite: string }>`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  height: 100vh;
  padding: 0 24px;
  background: ${(props) =>
    props.fillwhite === "false" &&
    `radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    ${colors.black} 70%
  );`} 
  flex-direction: column;
`;

const StyledLogoWrapper = styled.div`
  max-width: 420px;
  width: 100%;

  svg {
    width: 100%;
    height: auto;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    max-width: 320px;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    max-width: 260px;
  }
`;

const StyledTitle = styled(motion.h1)<{ color: string }>`
  transition: 0.3s ease-in-out;
  margin: 0;
  font-weight: 500;
  font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};

  text-align: center;
  line-height: 1.1;
  letter-spacing: 0.01em;
  color: ${({ color }) => color};

  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
  }
  @media all and (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(dimensions.headingSizes.medium.mobile)};
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

const StyledLinksWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;

  a {
    color: ${colors.white};
    text-decoration: underline;
    font-size: ${getRemSize(16)};
    transition: color 0.3s ease;

    &:hover {
      color: ${colors.accent};
    }
  }
`;

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

const ComingSoon = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openContactModal = () => {
    setModalOpen(true);
  };

  const closeContactModal = () => {
    setModalOpen(false);
  };
  return (
    <StyledWrapper fillwhite={"false"} transition={{ duration: 1 }}>
      <AnimateInView variants={variants}>
        <StyledLogoWrapper>
          <LogoFull />
        </StyledLogoWrapper>
      </AnimateInView>
      <AnimateInView variants={variants}>
        <StyledTitle color={colors.white}>
          We're improving our website and will be back soon. <br />
          But don't worry, you can still chat to us
          <StyledIconButton onClick={openContactModal}>
            <ChatIcon />
          </StyledIconButton>
        </StyledTitle>
      </AnimateInView>
      <AnimateInView variants={variants}>
        <StyledLinksWrapper>
          <a href="/hosting-maintenance-sla">Hosting Maintenance SLA</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </StyledLinksWrapper>
      </AnimateInView>
      <Contact isOpen={isModalOpen} onClose={closeContactModal} dark={true} />
    </StyledWrapper>
  );
};

export default ComingSoon;
