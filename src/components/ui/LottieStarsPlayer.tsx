"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

interface LottieStarsPlayerProps {
  className?: string;
  triggerPlay: boolean;
  /** 1–5 stars. Defaults to 5. */
  rating?: number;
}

export default function LottieStarsPlayer({
  className = "",
  triggerPlay,
  rating = 5,
}: LottieStarsPlayerProps) {
  const [animationData, setAnimationData] = useState<any>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  // For SVG branch: track whether the entrance animation has been triggered
  const [svgPlayed, setSvgPlayed] = useState(false);

  // Only load Lottie JSON for 5-star reviews
  useEffect(() => {
    if (rating < 5) return;
    fetch("/Five-Stars.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load Lottie JSON");
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Lottie fetch error:", err));
  }, [rating]);

  // Lottie playback for 5-star case
  useEffect(() => {
    if (!animationData || !lottieRef.current) return;
    if (triggerPlay && !hasPlayed) {
      lottieRef.current.setSpeed(0.5);
      lottieRef.current.playSegments([0, 120], true);
      setHasPlayed(true);
    }
  }, [triggerPlay, animationData, hasPlayed]);

  // Trigger SVG entrance animation when scrolled into view
  useEffect(() => {
    if (rating < 5 && triggerPlay && !svgPlayed) {
      setSvgPlayed(true);
    }
  }, [triggerPlay, rating, svgPlayed]);

  // ── SVG star branch (ratings 1–4) ──────────────────────────────────────────
  if (rating < 5) {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {/* Keyframe: stars pop in from small + invisible, one by one */}
        <style>{`
          @keyframes star-pop {
            0%   { opacity: 0; transform: scale(0.4) rotate(-15deg); }
            60%  { opacity: 1; transform: scale(1.2) rotate(4deg); }
            100% { opacity: 1; transform: scale(1)   rotate(0deg); }
          }
          .star-animate {
            opacity: 0;
            animation: star-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
          }
        `}</style>

        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-5 h-5 ${svgPlayed ? "star-animate" : "opacity-0"}`}
            style={
              svgPlayed
                ? { animationDelay: `${i * 0.08}s` }
                : undefined
            }
            fill={i < rating ? "var(--color-roots-orange)" : "none"}
            stroke="var(--color-roots-orange)"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        ))}
      </div>
    );
  }

  // ── Lottie branch (5 stars) ─────────────────────────────────────────────────
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
