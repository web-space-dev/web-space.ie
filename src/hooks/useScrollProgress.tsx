import { useMotionValue } from "framer-motion";
import { useEffect } from "react";

const useScrollProgress = (ref) => {
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      const end = start + rect.height;
      const scrollPos = window.scrollY - start;
      const progress = Math.max(0, Math.min(scrollPos / (end - start), 1));
      scrollProgress.set(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, scrollProgress]);

  return scrollProgress;
};

export default useScrollProgress;
