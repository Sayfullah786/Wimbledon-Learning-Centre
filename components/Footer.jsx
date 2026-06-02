"use client";

import Image from "next/image";
import Link from "next/link";
import LinkEffect from "./ui/LinkEffect";
import { Facebook, Twitter, Instagram } from "lucide-react";

import Button from "./ui/Button";
import FooterLinks from "@/constants/footer";
import socials from "@/constants/socials";

const Footer = () => {
  return (
    <footer className="w-full relative overflow-hidden">
      <div className="bg-[#111] text-white w-full">
        <div className="maxWSec px-4 sm:px-12 py-6 sm:py-12 gap-6 flex max-sm:flex-col w-full">
          <Link href={"/"} name="home link" className="flex-shrink-0">
            <Image
              src={"/logo.png"}
              width={400}
              height={400}
              alt="Logo"
              priority
              className={`w-20 sm:w-24 max-sm:mx-auto rounded-lg`}
            />
          </Link>
          <div className="flex-1 flex max-sm:flex-col flex-grow gap-8 whitespace-nowrap w-fit">
            {FooterLinks.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex-1 flex justify-center text-base ${index === 0
                    ? "mr-auto w-fit grow-0"
                    : "w-full max-w-[10rem] grow"
                    }`}
                >
                  <div className="flex sm:flex-col items-start flex-wrap text-sm sm:text-base text-gray">
                    <h5 className="text-white w-full font-medium tracking-wide text-xl mb-1">
                      {item.title}
                    </h5>
                    {item.content.map((subItem, subIndex) => {
                      return (
                        <a
                          data-lenis-scroll-to
                          key={subIndex}
                          href={subItem.src}
                          target={item.blank ? "_blank" : "_self"}
                          rel={item.blank ? "noopener noreferrer" : ""}
                        >
                          <LinkEffect icon={subItem.icon} className="px-0!">
                            {subItem.title}
                          </LinkEffect>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="border-t py-2 sm:py-4 border-[#333]">
          <div className="maxWSec max-sm:pb-8 text-sm sm:text-base flex flex-wrap justify-between items-center max-sm:flex-col relative px-4">
            <div className="max-md:py-2 flex gap-1 sm:gap-4 items-center text-base">
              © 2025 Wimbledon Learning Centre
            </div>

            <div className="max-md:py-2 flex gap-2 sm:gap-4 items-center text-xl text-black">
              <Link href={socials.facebook || ""} target={"_blank"} rel={"noopener noreferrer"}>
                <Button
                  size="m"
                  variant="icon"
                  icon={Facebook}
                  className="shadow-lg"
                />
              </Link>
              <Link href={socials.instagram || ""} target={"_blank"} rel={"noopener noreferrer"}>
                <Button
                  size="m"
                  variant="icon"
                  icon={Instagram}
                  className="shadow-lg"
                />
              </Link>
              <Link href={socials.twitter || ""} target={"_blank"} rel={"noopener noreferrer"}>
                <Button
                  size="m"
                  variant="icon"
                  icon={Twitter}
                  className="shadow-lg"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
