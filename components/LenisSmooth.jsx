"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
gsap.registerPlugin(ScrollTrigger);

const LenisSmooth = () => {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
  }, [pathname, lenisRef]);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    // Enable smooth anchor scrolling
    document.querySelectorAll("[data-lenis-scroll-to]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          lenis.scrollTo(target, {
            duration: 1,
            offset: 0,
          });
        }
      });
    });


    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 800);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return true;
};

export default LenisSmooth;
