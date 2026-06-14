import type { Metadata, Viewport } from "next";
import { Syncopate, Manrope } from "next/font/google";
import "./globals.css";

const display = Syncopate({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Airlink — The Aether Series",
  description:
    "Airlink Aether. A next-generation climate engine. Precision airflow, near-silent operation, HEPA-grade purity. Engineered in India.",
};

export const viewport: Viewport = {
  themeColor: "#070809",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
