import {
  Monitor,
  Users,
  Clock,
  CalendarCheck,
  Code,
  ShieldCheck,
  Globe,
  Sparkles,
} from "lucide-react";

export const courseHighlights = [
  {
    title: "Online & In-Person",
    description:
      "Flexible weekly classes delivered both online and at our physical locations to suit your schedule.",
    icon: Globe,
  },
  {
    title: "Technology Focused",
    description:
      "Our curriculum is built around real-world technology fundamentals that prepare students for the digital future.",
    icon: Monitor,
  },
  {
    title: "Small Class Sizes",
    description:
      "We keep our class sizes small to ensure every student gets personalised attention and support.",
    icon: Users,
  },
  {
    title: "Expert Instructors",
    description:
      "Learn from experienced educators and industry professionals who are passionate about teaching.",
    icon: Sparkles,
  },
];

export const coursesList = [
  {
    title: "Technology Fundamentals",
    description:
      "A comprehensive introduction to computing, the internet, and digital tools. Perfect for beginners looking to build confidence with technology.",
    format: "Weekly classes",
    duration: "Term-based",
    icon: Code,
    color: "#229EBD",
  },
  {
    title: "Cyber Security Awareness",
    description:
      "Learn how to stay safe online, understand common threats, and develop security-first thinking for the modern digital world.",
    format: "Weekly classes",
    duration: "Term-based",
    icon: ShieldCheck,
    color: "#FF9800",
  },
];

export const schedule = {
  days: "Weekly sessions",
  time: "After school & weekends",
  format: "Online & In-Person",
};
