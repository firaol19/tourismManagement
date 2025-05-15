import "./globals.css";
import "./globals.css"; // Import your global styles if needed
import {  } from "next/font/google";

import { Geist, Geist_Mono } from "next/font/google";

import { Libre_Baskerville } from "next/font/google";
import { Lobster } from "next/font/google";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Providers from "./Providers";
import { Roboto } from "next/font/google";
import ThemeToggle from "@/components/themeToggle";

const roboto = Roboto({
  subsets: ["latin"], // Select the subsets of characters you want
  weight: ["400", "500"], // Define the font weights you want to use
});
const libre = Libre_Baskerville({
  subsets: ["latin"], // Select the subsets of characters you want
  weight: ["400", "700"], // Define the font weights you want to use
});
const lobster = Lobster({
  subsets: ["latin"], // Select the subsets of characters you want
  weight: ["400"], // Define the font weights you want to use
});

//import ThemeToggle from "@/components/themeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ETHIO TOUR",
  description: "Tourism management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} ${lobster.className} ${libre.className} ${geistSans.variable} ${geistMono.variable} antialiased font-serif overflow-x-hidden-hidden w-full bg-background dark:bg-background2`}
      >
        <Providers>
          <div className="z-50">
            <NavBar/>
          </div>
        {children}
        </Providers>
        <div className="flex justify-end w-full">
          <ThemeToggle/>
        </div>
      </body>
    </html>
  );
}
