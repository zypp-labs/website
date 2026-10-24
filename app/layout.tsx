import type { Metadata, Viewport } from "next";
import { Host_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import GsapSmoothScroll from "@/components/providers/GsapSmoothScroll";
import Nav from "@/components/nav/Nav";

// Primary typeface.
const grotesk = Host_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

// Used only for small technical labels, tags and button text.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zypp Labs | Payments that work offline",
    template: "%s | Zypp Labs",
  },
  description:
    "Zypp Labs is a research and engineering lab building offline-capable payment infrastructure for banks, fintechs and wallets.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#04120a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <GsapSmoothScroll>{children}</GsapSmoothScroll>
      </body>
    </html>
  );
}