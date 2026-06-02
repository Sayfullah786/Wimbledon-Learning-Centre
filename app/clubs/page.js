import ClubsPage from "@/components/ClubsPage";
import { Suspense } from "react";

export const metadata = {
  title: "After School Clubs | Wimbledon Learning Centre",
  description:
    "Coding and STEM focused after school club sessions at schools in Merton and Wandsworth. Register your child for Python, MakeCode Arcade and more.",
};

export default function Clubs() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading clubs...</div>}>
      <ClubsPage />
    </Suspense>
  );
}
