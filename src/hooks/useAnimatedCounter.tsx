import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

type UseAnimatedCounterProps = {
  value: number;
  direction?: "up" | "down";
  start?: boolean;
  duration?: number;
  decimalPlaces?: number;
};

const useAnimatedCounter = ({
  value,
  direction = "up",
  start = true,
  duration = 1, // Default duration to 1 second
  decimalPlaces = 0, // Default decimal places to 0
}: UseAnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 80,
    stiffness: 180,
    duration, // Use the duration prop
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formattedValue, setFormattedValue] = useState("0");

  useEffect(() => {
    if (start) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView, value, direction, start]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setFormattedValue(
        Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(latest)
      );
    });

    return () => unsubscribe();
  }, [springValue, decimalPlaces]);

  return { ref, formattedValue };
};

export default useAnimatedCounter;
