"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap-config";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const BRAND_BG = "#FEFCF8";
const STORAGE_KEY = "rootsHeroSeen";

export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false); // false prevents SSR flash
  const [visible, setVisible] = useState(true);
  const [heroData, setHeroData] = useState<any>(null);
  const lottieRef = useRef<any>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem(STORAGE_KEY);
    if (!hasSeen && window.location.pathname === "/") {
      setShow(true);
      sessionStorage.setItem(STORAGE_KEY, "true");
      // Lazy fetch the JSON only when needed to save 1MB+ in initial JS bundle
      fetch("/animations/hero2.json")
        .then((res) => res.json())
        .then((data) => setHeroData(data))
        .catch(console.error);
    } else {
      setShow(false);
      setVisible(false);
    }
  }, []);

  const handleComplete = () => {
    if (wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        yPercent: -100,
        duration: 1.0,
        ease: "power3.inOut",
        onComplete: () => setVisible(false)
      });
    } else {
      setVisible(false);
    }
  };

  return (
    <>
      <div aria-hidden="true">
          {show && visible && (
            <div
              ref={wrapperRef}
              className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden transform-gpu"
              style={{ background: BRAND_BG }}
              aria-live="polite"
              aria-busy="true"
            >
              <div className="w-[100vw] md:w-[70vw] max-w-[900px] mx-auto px-0 md:px-8 scale-[2.5] sm:scale-[2] md:scale-100 origin-center">
                {heroData && (
                  <Lottie
                    lottieRef={lottieRef}
                    onDOMLoaded={() => {
                      if (lottieRef.current) {
                        lottieRef.current.setSpeed(2.5);
                      }
                    }}
                    animationData={heroData}
                    loop={false}
                    autoplay
                    onComplete={handleComplete}
                  />
                )}
              </div>
            </div>
          )}
      </div>

      {children}
    </>
  );
}
