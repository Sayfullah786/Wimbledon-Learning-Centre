"use client";
import Image from "next/image";
import Button from "./ui/Button";
import { ArrowRight } from "lucide-react";
import LinkEffect from "./ui/LinkEffect";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Clock } from "lucide-react";
import { Mail } from "lucide-react";
import { Calendar } from "lucide-react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Highlighter } from "./ui/highlighter";
import socials from "@/constants/socials";
import contacts from "@/constants/contacts";

const Hero = () => {
  return (
    <header
      className={`p-4 flex h-[calc(100svh-0rem)] max-h-[calc(890px-0rem)] sm:max-h-[calc(980px-0rem)]`}
    >
      <div className="maxW flex relative flex-1">
        <Image
          aria-hidden
          src="/hero2.webp"
          alt="hero background"
          fill
          className="rounded-2xl absolute left-0 top-0 inset-0 object-cover block"
        />
        <div className="bg-gradient-to-t from-black to-black/0 absolute z-[3] bottom-0 left-0 h-[30%] w-full opacity-50 rounded-b-2xl"></div>
        <section className="relative bg-black/30 z-10 flex-1 flex flex-col items-center justify-center rounded-2xl">
          <Link
            href={"/"}
            className="w-22 sm:w-28 absolute left-0 top-0 rounded-br-2xl bg-background pr-2 pb-2">
            <Image
              aria-hidden
              src="/logo2.png"
              alt="logo"
              width={150}
              height={150}
              className="w-full aspect-square object-cover rounded-xl"
            />

            <div className="z-[-1] rotate-180 absolute top-0 left-full h-6 sm:h-12 aspect-square rounded-br-2xl sm:shadow-[1.5rem_1.5rem_0_0_#fff] shadow-[0.5rem_0.5rem_0_0_#fff] bg-transparent"></div>
            <div className="z-[-1] rotate-180 absolute top-full left-0 h-6 sm:h-12 aspect-square rounded-br-2xl sm:shadow-[1.5rem_1.5rem_0_0_#fff] shadow-[0.5rem_0.5rem_0_0_#fff] bg-transparent"></div>
          </Link>

          <main className=" text-white flex flex-col items-center justify-center gap-4">
            <h1 className="font-bebas h1 text-center">
              <Highlighter padding={4} action="highlight" color="#229EBD">
                Empowering
              </Highlighter>{" "}
              the Next
              <br />
              Gen with Techpert
              <br />
              <Highlighter
                strokeWidth={4}
                padding={-4}
                action="underline"
                color="#FF9800"
              >
                Education
              </Highlighter>
            </h1>
            <h4 className="text-center leading-normal h4">
              Result and Project Based
              <br />
              Education
            </h4>
            <a href="#register" data-lenis-scroll-to>
              <Button
                size="s"
                variant="primary"
                icon={ArrowRight}
                className="shadow-lg"
              >
                Register Now
              </Button>
            </a>

          </main>

          {/* bottom links */}
          <aside className="text-xs lg:text-sm text-gray-400 absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 md:px-4 py-1 max-md:flex-col-reverse md:flex-wrap">
            {/* Email */}
            <a
              href={`mailto:${contacts.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkEffect icon={Mail}>
                {contacts.email}
              </LinkEffect>
            </a>

            {/* Phone */}
            <a
              href={`tel:${contacts.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkEffect icon={Phone}>{contacts.phone}</LinkEffect>
            </a>

            {/* Open Hours */}
            <div className="absolute left-1/2 -top-3 lg:top-1/2 -translate-1/2 whitespace-nowrap flex justify-center items-center gap-2 w-fit">
              <div className="flex gap-1 items-center">
                <Calendar className="size-4 mb-0.5" />
                <p>Mon - Sun</p>
              </div>
              <span className="text-main/50">|</span>
              <div className="flex gap-1 items-center">
                <Clock className="size-4 mb-0.5" />
                <p>9:00 - 17:00</p>
              </div>
            </div>
          </aside>

          {/* top right links */}
          <aside className="max-sm:hidden absolute top-0 right-0 flex gap-2 p-2.5">
            <Link href={socials.facebook || ""} target={"_blank"} rel={"noopener noreferrer"}> <Button
              size="s"
              variant="icon"
              icon={Facebook}
              className="shadow-lg"
            /></Link>
            <Link href={socials.facebook || ""} target={"_blank"} rel={"noopener noreferrer"}>
              <Button
                size="s"
                variant="icon"
                icon={Instagram}
                className="shadow-lg"
              /></Link>
            <Link href={socials.facebook || ""} target={"_blank"} rel={"noopener noreferrer"}>
              <Button
                size="s"
                variant="icon"
                icon={Twitter}
                className="shadow-lg"
              />
            </Link>
          </aside>
        </section>
      </div>
    </header>
  );
};

export default Hero;
