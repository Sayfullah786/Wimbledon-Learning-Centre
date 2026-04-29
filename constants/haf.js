import { MapPin, HelpCircle, Utensils, Laptop, Users, BookOpen } from "lucide-react";

export const hafPartners = [
  "Croydon",
  "Merton",
  "Wandsworth",
  "Kingston and Richmond",
];

export const hafLocations = [
  {
    borough: "Merton",
    venue: "Ricards Lodge High School",
    icon: MapPin,
  },
  {
    borough: "Wandsworth",
    venue: "Aprire Centre",
    icon: MapPin,
  },
  {
    borough: "Croydon",
    venue: "Bensham Manor School",
    icon: MapPin,
  },
  {
    borough: "Kingston",
    venue: "Coombe Hill School",
    icon: MapPin,
  },
];

export const hafFaqs = [
  {
    question: "How will I know if there is an upcoming camp in the holiday?",
    answer:
      "You can check online on the Eequ or Holidays Activities platform alternatively you can contact us.",
    icon: HelpCircle,
  },
  {
    question: "What will my child learn in a day at one of your camps?",
    answer:
      "Your child will explore what programming is and how it powers the modern world. Through hands-on sessions, they will build a real-world project—like a game, app, or website—that they can actually play and share.",
    icon: BookOpen,
  },
  {
    question: "What is the food policy?",
    answer:
      'As a HAF provider, we provide a free, hot, nutritious meal every day. We also run "Food Education" sessions where kids learn about the science of nutrition or help prepare healthy snacks.',
    icon: Utensils,
  },
  {
    question: "Does my child need to bring their own laptop?",
    answer:
      "While we have laptops available on-site, we highly recommend students bring their own device if possible. This allows them to save their code easily and continue working on their exciting projects at home after the camp ends!",
    icon: Laptop,
  },
  {
    question: "Is the camp open to everyone?",
    answer:
      "Yes, our camps are open to all young programmers! We reserve a specific number of places for non-HAF bookings each holiday. Please contact us directly to see what we have available for the upcoming dates.",
    icon: Users,
  },
];
