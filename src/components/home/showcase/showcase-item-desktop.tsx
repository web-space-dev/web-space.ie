import styled from "@emotion/styled";
import { Project } from "../../../interfaces/project";
import Link from "next/link";
import { breakpoints, dimensions } from "../../../styles/variables";
import { getRemSize } from "../../../styles/globalCss";
import { CustomImage } from "../../global/image";
import { MotionValue, motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";

const StyledShowcaseWrapper = styled(motion.div)`
  height: 100vh;
  display: flex;
  align-items: center;
`;

const StyledShowcaseDetails = styled(motion.div)`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  height: -webkit-fill-available;
  margin: 40px auto;
  max-width: 1448px;
  max-height: 800px;
  overflow: hidden;
`;

const StyledShowcaseImage = styled(motion.div)`
  position: relative;
  height: 100%;
  flex: 1;
  margin: auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    /* width: -webkit-fill-available; */
    object-fit: cover;
    border-radius: 36px;
  }
`;

const StyledShowcaseContent = styled.div`
  position: absolute;
  top: 45%;
  left: 0;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 0 0.75rem 0.75rem 0;
  padding: 0 8px 8px 24px;

  & h3,
  p {
    margin: 0 15px;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    width: 80%;
  }
`;

const StyledShowcaseTitle = styled(motion.h3)`
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  font-weight: 400;
`;

const StyledShowcaseCategory = styled(motion.p)`
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  font-weight: 400;
`;

interface ShowcaseItemProps {
  project: Project;
  // scale?: MotionValue;
  // isOpen: boolean;
  // isFirst: boolean;
  // reverseScale: () => void;
}

function ShowcaseItemDesktop({
  project,
}: // scale,
// isOpen,
// isFirst,
// reverseScale,
ShowcaseItemProps) {
  // const ref = useRef(null);
  // const scrollRef = useRef(
  //   typeof window !== "undefined"
  //     ? { y: window.pageYOffset, direction: null }
  //     : { y: 0, direction: null }
  // );
  // const [listening, setListening] = useState(false);

  // useEffect(() => {
  //   const wiggleRoom = 200;
  //   const handleScrollUp = (e: WheelEvent) => {
  //     if (e.deltaY < 0) {
  //       scrollRef.current.y -= e.deltaY;
  //       if (scrollRef.current.y > wiggleRoom) {
  //         reverseScale();
  //         scrollRef.current.y = 0;
  //       }
  //     } else {
  //       scrollRef.current.y = 0;
  //     }
  //   };

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (isFirst) {
  //         if (entry.isIntersecting && !listening) {
  //           // Oh also we check if the window is defined because of SSR
  //           if (typeof window !== "undefined") {
  //             setListening(true);

  //             window.addEventListener("wheel", handleScrollUp);
  //           }
  //         } else {
  //           // Element is not in view, remove the event listener
  //           if (typeof window !== "undefined") {
  //             window.removeEventListener("wheel", handleScrollUp);

  //             setListening(false);
  //           }
  //         }
  //       }
  //     },
  //     { threshold: 1.0 }
  //   );

  //   if (ref.current) {
  //     observer.observe(ref.current);
  //   }

  //   return () => {
  //     if (ref.current) {
  //       observer.unobserve(ref.current);
  //     }
  //     if (typeof window !== "undefined") {
  //       // window.removeEventListener("wheel", handleScroll);
  //       window.removeEventListener("wheel", handleScrollUp);
  //     }
  //   };
  // }, []);

  return (
    <StyledShowcaseWrapper
    // layout
    // transition={{ duration: 1 }}
    // open={isOpen}
    // ref={ref}
    // style={scale ? { scale } : {}}
    >
      <StyledShowcaseDetails>
        <StyledShowcaseImage>
          <Link href={`/projects/${project.slug}`}>
            <CustomImage
              alt={project.featuredImage.node.altText}
              width={1448}
              height={800}
              src={project.featuredImage.node.sourceUrl}
              blurDataURL={project.featuredImage.node?.placeholderDataURI}
            />
            <StyledShowcaseContent>
              <StyledShowcaseTitle>{project.title}</StyledShowcaseTitle>
              <StyledShowcaseCategory>
                {project.projectCategories?.nodes[0]?.name}
              </StyledShowcaseCategory>
            </StyledShowcaseContent>
          </Link>
        </StyledShowcaseImage>
      </StyledShowcaseDetails>
    </StyledShowcaseWrapper>
  );
}

export default ShowcaseItemDesktop;
