"use client";

import { Facebook, Twitter, Instagram } from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./ui/Button";
import socials from "@/constants/socials";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Courses", href: "/courses" },
  { title: "Curriculum", href: "/curriculum" },
  { title: "HAF Camps", href: "/haf" },
  { title: "Clubs", href: "/clubs" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const { scrollY } = useScroll();
  const marginTop = useTransform(scrollY, [0, 100], ["1.5rem", "0.5rem"]);
  const backgroundColor = useTransform(scrollY, [0, 100], ["#ffffff", "#ffffffd0"]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <motion.nav
        style={{ marginTop, backgroundColor }}
        className={`max-sm:mt-6! max-sm:bg-white! rounded-2xl fixed top-0 right-6 sm:right-1/2 sm:translate-x-1/2 z-[60] py-2 backdrop-blur-lg shadow-sm`}
      >
        <div className="maxWSec flex items-center justify-center px-2 sm:px-4 h-fit">

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${pathname === link.href
                  ? scrolled || !isHome
                    ? "text-main"
                    : "text-white"
                  : scrolled || !isHome
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-white/80 hover:text-white"
                  }`}
              >
                {link.title}
                <span
                  className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-main transition-all duration-300 ${pathname === link.href
                    ? "w-[70%]"
                    : "w-0 group-hover:w-4"
                    }`}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden relative z-[600] mr-auto p-1 rounded-lg text-gray-900`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu — rendered outside nav so it can fill the viewport */}
      <div
        className={`md:hidden fixed inset-0 z-[55] bg-white transition-all duration-500 ${isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-2 px-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1 rounded-lg text-3xl font-bebas tracking-wider transition-all duration-500 text-white! ${isOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
                } ${pathname === link.href
                  ? "bg-gray-800"
                  : "bg-main"
                }`}
              style={{ transitionDelay: isOpen ? `${index * 80 + 100}ms` : "0ms" }}
            >
              {link.title}
            </Link>
          ))}
          <a
            href={pathname === "/" ? "#register" : "/#register"}
            className={`mt-4 transition-all duration-500 ${isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
              }`}
            style={{ transitionDelay: isOpen ? `${navLinks.length * 80 + 100}ms` : "0ms" }}
          >
            <Button size="m" variant="primary" className="shadow border" icon={ArrowRight}>
              Register Now
            </Button>
          </a>
          <aside className="mt-4 flex gap-2 p-2.5">
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
