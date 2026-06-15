import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://reconalyst.com"; 

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Reconalyst | AI-Powered Company Research & Analysis",
    template: "%s | Reconalyst",
  },

  description:
    "Reconalyst helps you research, analyze, and understand companies using AI-powered insights, competitor analysis, and business intelligence.",

  keywords: [
    "Reconalyst",
    "AI company analysis",
    "business intelligence",
    "company research",
    "competitor analysis",
    "market research",
    "startup research",
    "AI insights",
  ],

  applicationName: "Reconalyst",

  authors: [
    {
      name: "Reconalyst",
    },
  ],

  creator: "Reconalyst",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "https://res.cloudinary.com/dpotlq8na/image/upload/v1781370402/icon_xnumxx.png",
      },
    ],
    shortcut:
      "https://res.cloudinary.com/dpotlq8na/image/upload/v1781370402/icon_xnumxx.png",
    apple:
      "https://res.cloudinary.com/dpotlq8na/image/upload/v1781370402/icon_xnumxx.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Reconalyst",
    title: "Reconalyst",
    description:
      "Research and analyze companies faster with AI-powered business intelligence.",
    images: [
      {
        url: "https://res.cloudinary.com/dpotlq8na/image/upload/v1781370402/icon_xnumxx.png",
        width: 1200,
        height: 630,
        alt: "Reconalyst",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Reconalyst",
    description:
      "Research and analyze companies faster with AI-powered business intelligence.",
    images: [
      "https://res.cloudinary.com/dpotlq8na/image/upload/v1781370402/icon_xnumxx.png",
    ],
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}