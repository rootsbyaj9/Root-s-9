"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";

import heroData from "../../../public/animations/hero2.json";

const BRAND_BG = "#FEFCF8";
const STORAGE_KEY = "rootsHeroSeen";

export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false); // false prevents SSR flash
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // the user wants the intro logo animation to appear every time they reload the site on the home page
    if (window.location.pathname === "/") {
      setShow(true);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {show && visible && (
          <motion.div
            key="hero-loader"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[99999] flex items-center justify-center"
            style={{ background: BRAND_BG }}
            aria-live="polite"
            aria-busy="true"
          >
            <div className="w-full max-w-[640px] mx-auto px-8">
              <Lottie
                animationData={heroData}
                loop={false}
                autoplay
                onComplete={() => setVisible(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
