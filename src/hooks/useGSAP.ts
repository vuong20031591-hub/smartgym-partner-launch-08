import { useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAP = () => {
  useLayoutEffect(() => {
    // Initialize GSAP with custom settings
    gsap.config({
      nullTargetWarn: false
    });

    // Set defaults
    gsap.defaults({
      duration: 0.8,
      ease: "power2.out"
    });

    return () => {
      // Cleanup ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return { gsap, ScrollTrigger };
};

export { gsap, ScrollTrigger };