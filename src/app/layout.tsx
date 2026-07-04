import LayoutShell from "@/components/layout/layout-shell";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: "%s — Sean Jeon",
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.social.github }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.shortName,
    url: siteConfig.siteUrl,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} antialiased`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
