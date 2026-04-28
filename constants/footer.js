import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import contacts from "./contacts";

const FooterLinks = [
  {
    title: "Wimbledon Learning Centre",
    content: [
      {
        title: contacts.email,
        src: `mailto:${contacts.email}`
        ,
        blank: true,
        icon: Mail,
      },
      {
        title: contacts.phone,
        src: `tel:${contacts.phone}`,
        blank: true,
        icon: Phone,
      },
    ],
  },
  {
    title: "About",
    content: [
      {
        title: "Why Us",
        src: "#aboutus",
      },
      {
        title: "Enquiry",
        src: "#enquiry",
      },
      {
        title: "Portfolios",
        src: "#portfolios",
      },
    ],
  },
  {
    title: "Other",
    content: [
      {
        title: "Courses",
        src: "/courses",
      },
      {
        title: "Curriculum",
        src: "/curriculum",
      },
      {
        title: "HAF Camps",
        src: "/haf",
      },
      {
        title: "Matts App",
        src: "#mattsapp",
      },
      {
        title: "Resources",
        src: "#ressources",
      },
    ],
  },
];

export default FooterLinks;