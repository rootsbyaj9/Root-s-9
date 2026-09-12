"use client";

/**
 * SkarCredit.tsx
 *
 * Animated footer credit: "Made with [cycling word] by skar"
 * Words cycle on an interval with a vertical-flip CSS animation.
 *
 * Props:
 *   accentColor — hex/css color for the animated word highlight
 *   words       — array of strings to cycle through
 *   className   — extra classes on the wrapper <p>
 */

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SkarCreditProps {
  accentColor?: string;
  words?: string[];
  className?: string;
}

export default function SkarCredit({
  accentColor = "#d96b1f",
  words = ["❤️", "love", "care", "passion", "<3"],
  className,
}: SkarCreditProps) {
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFlip(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setFlip(false);
      }, 200); // swap at midpoint of flip
    }, 1800);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <p className={cn("flex items-center gap-1.5 select-none", className)}>
      Made with{" "}
      <span
        className="inline-block min-w-[2ch] text-center font-semibold"
        style={{
          color: accentColor,
          transform: flip ? "rotateX(90deg)" : "rotateX(0deg)",
          transition: "transform 0.2s ease",
          display: "inline-block",
          transformOrigin: "center",
        }}
        aria-live="polite"
        aria-label={words[index]}
      >
        {words[index]}
      </span>{" "}
      by{" "}
      <a
        href="https://www.skarcreation.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="border-b pb-px ml-0.5 font-medium transition-colors duration-200 text-parchment/60 border-parchment/20 hover:text-roots-orange hover:border-roots-orange"
      >
        skar
      </a>
    </p>
  );
}
