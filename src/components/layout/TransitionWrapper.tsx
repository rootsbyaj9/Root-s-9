"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import heroData from "../../../public/animations/hero2.json";

const BRAND_BG = "#FEFCF8";
const STORAGE_KEY = "rootsHeroSeen";

export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false); // false prevents SSR flash
  const [visible, setVisible] = useState(true);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem(STORAGE_KEY);
    if (!hasSeen && window.location.pathname === "/") {
      setShow(true);
      sessionStorage.setItem(STORAGE_KEY, "true");
    } else {
      setShow(false);
      setVisible(false);
    }
  }, []);

  return (
    <>
      <div aria-hidden="true">
        <AnimatePresence>
          {show && visible && (
            <motion.div
              key="hero-loader"
              initial={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
              style={{ background: BRAND_BG }}
              aria-live="polite"
              aria-busy="true"
            >
              <div className="w-[100vw] md:w-[70vw] max-w-[900px] mx-auto px-0 md:px-8 scale-[2.5] sm:scale-[2] md:scale-100 origin-center">
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
                  onComplete={() => setVisible(false)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {children}
    </>
  );
}
