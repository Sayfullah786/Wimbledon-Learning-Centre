import AboutUs from "@/components/AboutUs";
import Appointment from "@/components/Appointment";
import Enquiry from "@/components/Enquiry";
import Hero from "@/components/Hero";
import Mattsapp from "@/components/Mattsapp";
import Portfolios from "@/components/Portfolios";
import Ressources from "@/components/Ressources";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Mattsapp />
      <Ressources />
      <Testimonials />
      <Portfolios />
      <Appointment />
      <Enquiry />
    </>
  );
}
