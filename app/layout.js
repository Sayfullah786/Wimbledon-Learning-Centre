import LenisSmooth from "@/components/LenisSmooth";
import "./globals.css";
import { Poppins, Bebas_Neue } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
})

const bebas_neue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: ["400"],
})


export const metadata = {
  title: "Wimbledon Learning Centre",
  description: "Empowering the New Generation with Next Level Education",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.variable} ${bebas_neue.variable} ${poppins.className} antialiased`}>
        <AuthProvider>
          <LenisSmooth />
          <main className="relative">
            <Navbar />
            {children}
            <Footer />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
