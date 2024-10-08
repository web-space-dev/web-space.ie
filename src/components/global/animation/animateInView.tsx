import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const defaultVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
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

interface AnimateInViewProps {
  children: React.ReactNode;
  initial?: string;
  animate?: string;
  variants?: any;
  className?: string;
}

const AnimateInView: React.FC<AnimateInViewProps> = ({
  children,
  initial = "closed",
  animate = "open",
  variants = defaultVariants,
  className,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

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
