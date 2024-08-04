import { useState, useEffect } from "react";

export default function useFps() {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastUpdateTime = Date.now();
    const loop = () => {
      frameCount++;
      const now = Date.now();
      const timeDiff = now - lastUpdateTime;

      if (timeDiff >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastUpdateTime = now;
      }

      requestAnimationFrame(loop);
    };

    const animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return fps;
}
