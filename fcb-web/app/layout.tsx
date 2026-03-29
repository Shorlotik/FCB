import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { getSiteMeta } from "@/lib/content";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["600", "700", "800"],
});

const site = getSiteMeta();
const defaultTitle = "FCBMINSK — рекламное агентство полного цикла";
const defaultDesc =
  "Стратегия, креатив, медиа, digital и продакшн. Работаем с брендами в Беларуси и за её пределами.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: "%s · FCBMINSK",
  },
  description: defaultDesc,
  openGraph: {
    type: "website",
    locale: "ru_BY",
    url: site.url,
    siteName: site.name,
    title: defaultTitle,
    description: defaultDesc,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDesc,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${unbounded.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <div className="future-backdrop" aria-hidden />
        <div className="future-grid" aria-hidden />
        <div className="future-stack flex min-h-screen min-w-0 flex-1 flex-col">
          <OrganizationJsonLd />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-elevated"
          >
            К содержанию
          </a>
          <SiteHeader />
          <main id="main" className="relative z-0 w-full min-w-0 flex-1 overflow-x-clip">
            {children}
          </main>
          <SiteFooter />
          <CookieBanner />
        </div>
      </body>
    </html>
  );
}
