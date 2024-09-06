import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

type UseAnimatedCounterProps = {
  value: number;
  direction?: "up" | "down";
  start?: boolean;
};

const useAnimatedCounter = ({
  value,
  direction = "up",
  start = true,
}: UseAnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 80,
    stiffness: 180,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formattedValue, setFormattedValue] = useState("0");

  useEffect(() => {
    if (isInView && start) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView, value, direction, start]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setFormattedValue(Intl.NumberFormat("en-US").format(latest.toFixed(0)));
    });

    return () => unsubscribe();
  }, [springValue]);

  return { ref, formattedValue };
};

export default useAnimatedCounter;
