import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get Me a Chai – Empowering Creators, One Chai at a Time",
  description: "Get Me a Chai is a Patreon-inspired platform designed to connect creators with their supporters. By offering exclusive content and personalized experiences, creators can monetize their passions while fans contribute to their success—because every creative journey deserves a warm cup of chai.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden bg-slate-950`}>
      <SessionWrapper>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-t from-gray-800 via-gray-900 to-black">
          {children}
        </div>
        {/* <Footer /> */}
        </SessionWrapper>
      </body>
    </html>
  );
}


