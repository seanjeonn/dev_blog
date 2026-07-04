import LayoutShell from "@/components/layout/layout-shell";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";

const pretendard = localFont({
  src: "../../../public/fonts/PretendardVariable.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: `${siteConfig.name} — ${dict.hero.role}`,
      template: "%s — Sean Jeon",
    },
    description: dict.meta.homeDescription,
    authors: [{ name: siteConfig.name, url: siteConfig.social.github }],
    creator: siteConfig.name,
    openGraph: {
      type: "website",
      siteName: siteConfig.shortName,
      url: `${siteConfig.siteUrl}/${locale}`,
      title: `${siteConfig.name} — ${dict.hero.role}`,
      description: dict.meta.homeDescription,
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ko: "/ko",
        "x-default": "/en",
      },
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={locale}>
      <body className={`${pretendard.variable} antialiased`}>
        <LayoutShell locale={locale as Locale} dict={dict}>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
