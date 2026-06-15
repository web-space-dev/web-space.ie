import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Global, css } from "@emotion/react";
import Cursor from "../../icons/cursor";

const CursorContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
`;

const CursorWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  transform: translate(-50%, -50%);
`;

const CursorEllipse = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

const CursorIcon = styled.div`
  position: absolute;
  left: 13.46px;
  top: 11.54px;
  width: 24px;
  height: 24px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const globalStyles = css`
  a,
  button,
  [role="button"],
  input[type="submit"],
  input[type="button"],
  label[for] {
    cursor: none !important;
  }
`;

function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Auto-hide cursor after 3 seconds on mobile tap
  useEffect(() => {
    if (!isHovering) return;

    const timer = setTimeout(() => {
      setIsHovering(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isHovering]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const checkIfInteractive = (element: HTMLElement | null): boolean => {
      if (!element || element === document.body) return false;

      const interactiveTags = ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"];
      const isInteractiveTag = interactiveTags.includes(element.tagName);
      const hasRole = element.getAttribute("role") === "button";
      const hasCursorPointer =
        window.getComputedStyle(element).cursor === "pointer";

      if (isInteractiveTag || hasRole || hasCursorPointer) {
        return true;
      }

      // Check parent elements recursively
      return checkIfInteractive(element.parentElement);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(checkIfInteractive(target));
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <Global styles={globalStyles} />
      <CursorContainer
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      >
        <CursorWrapper>
          <CursorEllipse
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovering ? 1 : 0,
              scale: isHovering ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          />
          <CursorIcon
            style={{
              opacity: isHovering ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          >
            <Cursor />
          </CursorIcon>
        </CursorWrapper>
      </CursorContainer>
    </>
  );
}

export default CustomCursor;
