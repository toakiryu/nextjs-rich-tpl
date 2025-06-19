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

// config
import config from "../../richtpl.config";

import { headers } from "next/headers";

import { Toaster } from "sonner";

import { ThemeProvider } from "next-themes";

export async function generateMetadata(): Promise<Metadata> {
  const header = await headers();
  const origin = header.get("x-origin") ?? config.url;
  const url = header.get("x-url") ?? config.url;

  // titleの値を判別
  const titleData = config.themeConfig?.metadata?.title;
  const title =
    typeof titleData === "string"
      ? titleData
      : titleData && "default" in titleData
      ? titleData.default
      : titleData && "absolute" in titleData
      ? titleData.absolute
      : config.title
      ? config.title
      : "Next.js Rich Tpl";

  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: config.description,
    referrer: "origin-when-cross-origin",
    keywords: ["Vercel", "Next.js"],
    authors: config.themeConfig?.metadata?.authors ?? [
      { name: "Toa Kiryu", url: "https://toakiryu.com" },
    ],
    creator: "Toa Kiryu",
    icons: config.favicon ?? "/favicon.ico",
    generator: "Next.js",
    publisher: "Vercel",
    robots: "follow, index",
    openGraph: {
      type: "website",
      siteName: title,
      url: url,
      images: config.themeConfig.image,
      locale: "ja-JP",
    },
    twitter: {
      card: "summary_large_image",
      site: `@${config.themeConfig?.metadata?.creator ?? "Toa Kiryu"}`,
      creator: `@${config.themeConfig?.metadata?.creator ?? "Toa Kiryu"}`,
      images: config.themeConfig.image,
    },
    ...config.themeConfig?.metadata,
        metadataBase: new URL(
      origin ?? config.themeConfig?.metadata?.metadataBase ?? config.url
    ),
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`relative w-full h-full overflow-x-clip ${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          disableTransitionOnChange
          defaultTheme={config.themeConfig.colorMode.defaultMode}
          {...config.themeConfig.colorMode.custom}
        >
          <main className="w-full h-full">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
