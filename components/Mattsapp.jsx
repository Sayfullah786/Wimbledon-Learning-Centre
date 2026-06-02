import React from "react";
import Button from "./ui/Button";
import Image from "next/image";
import { SparklesText } from "./ui/sparkles-text";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const Mattsapp = () => {
  return (
    <section id="mattsapp" data-lenis-scroll-to className="p-sec">
      <div className="maxWSec mx-auto bg-black relative rounded-4xl overflow-hidden">
        <Image
          aria-hidden
          src="/mattsapp.png"
          alt="mattsapp background"
          fill
          className="absolute inset-0 w-full h-full object-cover object-bottom block"
        />
        <main className="relative z-10 text-white flex flex-col items-center justify-center gap-4 py-[min(8rem,8vw)]">
          <h1 className="font-bebas h1 text-center">
            <SparklesText sparklesCount={8}>Matts App</SparklesText>
          </h1>
          <h4 className="text-center leading-normal h4">
            Make math fun!
            <br />
            Gamified Maths Learning
          </h4>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={"https://cerulean-zuccutto-d17a7d.netlify.app/#home"}
          >
            <Button
              size="s"
              variant="primary"
              icon={ArrowUpRight}
              className="shadow-lg mt-[min(3rem,3vw)]"
            >
              Let's Start
            </Button>
          </Link>
        </main>
      </div>
    </section>
  );
};

export default Mattsapp;
