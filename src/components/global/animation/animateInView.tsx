import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface AnimateInViewProps {
  children: React.ReactNode;
  variants: any;
  initial?: string;
  animate?: string;
  className?: string;
}

const AnimateInView: React.FC<AnimateInViewProps> = ({
  children,
  variants,
  initial = "hidden",
  animate = "visible",
  className,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start(animate);
    }
  }, [controls, inView, animate]);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateInView;
