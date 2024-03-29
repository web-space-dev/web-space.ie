import { useEffect, useState, useRef } from "react";

export default function useIsIntersecting(
  element: React.RefObject<HTMLElement>,
  otherElements: { current: HTMLElement[] },
  listener: React.RefObject<HTMLElement>
) {
  const [isOverlapping, setIsOverlapping] = useState(false);

  useEffect(() => {
    function checkIfElementsAreOverlapping() {
      if (element.current) {
        const a = element.current.getBoundingClientRect();
        let anyOverlap = false;

        otherElements.current.forEach((otherElement) => {
          if (otherElement) {
            const b = otherElement.getBoundingClientRect();
            if (
              a.right >= b.left &&
              a.left <= b.right &&
              a.bottom >= b.top &&
              a.top <= b.bottom
            ) {
              anyOverlap = true;
            }
          }
        });

        setIsOverlapping(anyOverlap);
      }
    }

    function watchScroll() {
      listener.current.addEventListener(
        "scroll",
        checkIfElementsAreOverlapping
      );
    }
    if (listener.current) {
      watchScroll();
    }
    return () => {
      listener.current.removeEventListener(
        "scroll",
        checkIfElementsAreOverlapping
      );
    };
  }, []);

  return isOverlapping;
}
