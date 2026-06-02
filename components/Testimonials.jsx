"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import TiltCard from "./ui/TiltCard";
import testimonials from "@/constants/testimonials"; 

const Testimonials = ({ direction = "left", speed = 0.2 }) => {
  const marquee = useRef(null);
  const first = useRef(null);
  const second = useRef(null);
  let xPercent = 0;

  const items = [...testimonials, ...testimonials]; // only double is enough

  useEffect(() => {
    const rightAnimation = () => {
      if (xPercent > 0) {
        xPercent = -100;
      }
      if (first.current && second.current) {
        gsap.to([first.current, second.current], {
          xPercent: xPercent,
          duration: 0,
          ease: "none",
        });
      }
      requestAnimationFrame(rightAnimation);
      xPercent += speed / 10;
    };

    const leftAnimation = () => {
      if (xPercent < -100) {
        xPercent = 0;
      }
      if (first.current && second.current) {
        gsap.to([first.current, second.current], {
          xPercent: xPercent,
          duration: 0,
          ease: "none",
        });
      }
      requestAnimationFrame(leftAnimation);
      xPercent -= speed / 10;
    };

    if (direction === "left") {
      requestAnimationFrame(leftAnimation);
    } else {
      requestAnimationFrame(rightAnimation);
    }
  }, [direction]);

  const renderCards = (arr) =>
    arr.map((item, i) => (
      <TiltCard
        key={i}
        className={`${
          i % 2 === 0
            ? "bg-gradient-to-br from-main/30 to-mainD/30"
            : "bg-gradient-to-br from-sec/30 to-secD/30"
        } w-[12rem] sm:w-[17rem] lg:w-[22rem] aspect-[.8] sm:aspect-[1.1] rounded-3xl mx-1 sm:mx-2`}
        innerClassName={`${
          i % 2 === 0
            ? "bg-white border border-main"
            : "bg-white border border-sec"
        } rounded-2xl p-1 flex flex-col gap-4 justify-between`}
      >
        <div className="w-full h-full p-2 lg:p-4 flex flex-col gap-1 sm:gap-2 text-light">
          <div className="text-xs sm:text-sm opacity-75 max-sm:mb-2">
            {item.role}
          </div>
          <h4 className="mt-auto text-lg sm:text-xl lg:text-3xl font-medium">
            {item.name}
          </h4>
          <p className="text-xs sm:text-sm lg:text-base opacity-80">
            {item.testimonial}
          </p>
        </div>
      </TiltCard>
    ));

  return (
    <section id="Curriculum" className="maxW p-sec flex flex-col gap-2">
      <h1 className="font-bebas h1 text-center">
        <span className="text-main">Our</span> Testimonials
      </h1>

      <div
        className="flex justify-center items-center py-6 sm:py-10 lg:py-16 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          ref={marquee}
          className="relative flex flex-nowrap w-fit border-y border-white/10"
        >
          <div
            ref={first}
            className="flex flex-nowrap items-center flex-shrink-0"
          >
            {renderCards(items)}
          </div>
          <div
            ref={second}
            className="flex flex-nowrap items-center flex-shrink-0 absolute left-full top-0"
          >
            {renderCards(items)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
