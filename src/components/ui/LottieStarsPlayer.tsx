"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

interface LottieStarsPlayerProps {
  className?: string;
  triggerPlay: boolean;
}

export default function LottieStarsPlayer({ className = "", triggerPlay }: LottieStarsPlayerProps) {
  const [animationData, setAnimationData] = useState<any>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    fetch("/Five-Stars.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load Lottie JSON");
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Lottie fetch error:", err));
  }, []);

  useEffect(() => {
    if (!animationData || !lottieRef.current) return;

    if (triggerPlay && !hasPlayed) {
      lottieRef.current.setSpeed(0.5); // Gracefully slow for elegant intro
      
      // We play strictly from frame 0 to 120 (2 seconds out of 3 total) to beautifully freeze 
      // at maximum opacity, preventing Lottie's built-in disappearance/fade out sequence.
      lottieRef.current.playSegments([0, 120], true);
      setHasPlayed(true);
    }
  }, [triggerPlay, animationData, hasPlayed]);

  return (
    <div className={`relative w-28 h-8 flex items-center justify-start ${className}`}>
      {/* 
        This inline style recursively targets all structural SVG nodes 
        (paths, shapes, and structural groups) to override the Lottie embedded JSON colors, 
        making it natively match roots-orange.
      */}
      <style>{`
        .lottie-recolor svg * {
          fill: var(--color-roots-orange) !important;
          stroke: var(--color-roots-orange) !important;
        }
      `}</style>
      
      {animationData && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay={false}
          loop={false}
          className="lottie-recolor w-full h-full scale-[1.5] origin-left"
        />
      )}
    </div>
  );
}
