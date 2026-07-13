import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://geodensity.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Geodensity — Understand people density around any location",
  description:
    "Geodensity estimates how many people live or work within a chosen area, helping planners compare locations and make better investment decisions.",
  openGraph: {
    title: "Know where people really are | Geodensity",
    description:
      "A more granular way to understand population, workplace density and location demand.",
    url: siteUrl,
    siteName: "Geodensity",
    images: [
      {
        url: "/geodensity-social-preview.png",
        width: 1200,
        height: 630,
        alt: "Illustrative Geodensity heatmap of the fictional city of Westbridge",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Know where people really are | Geodensity",
    description:
      "A more granular way to understand population, workplace density and location demand.",
    images: ["/geodensity-social-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-ink-secondary">
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
