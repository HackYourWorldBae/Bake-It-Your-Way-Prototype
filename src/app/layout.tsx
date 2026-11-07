import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bake It Your Way — Custom Artisanal Cake Studio",
  description:
    "Crafted by Science, Designed by You. Personalize foundation flours, tailored dietary sweetness, and artisanal aesthetics for on-demand bespoke cakes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-roast selection:bg-terracotta-light/30 selection:text-roast">
        {children}
      </body>
    </html>
  );
}
