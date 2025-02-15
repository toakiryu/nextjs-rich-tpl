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

// next-intl (i18n)
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

// next-theme
import { Provider } from "@/components/ui/provider";
import { ColorModeProvider } from "@/components/ui/color-mode";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata" });

  // titleの値を判別
  const titleData = config.themeConfig?.metadata?.title;
  let title: string;
  if (t.has(`title`)) {
    title = t(`title`);
  } else if (typeof titleData === "string") {
    title = titleData;
  } else if (titleData && "default" in titleData) {
    title = titleData.default;
  } else if (titleData && "absolute" in titleData) {
    title = titleData.absolute;
  } else {
    title = config.title;
  }

  const description =
    (t.has(`description`) && t(`description`)) ||
    config.themeConfig.metadata?.description ||
    config.description;

  return {
    title: {
      template: `%s | ${(t.has(`title`) && t(`title`)) ?? config.title}`,
      default: `${(t.has(`title`) && t(`title`)) ?? config.title}`,
    },
    description: description,
    referrer: "origin-when-cross-origin",
    keywords: ["Vercel", "Next.js"],
    authors: [{ name: "Toa Kiryu", url: "https://toakiryu.com" }],
    creator: "Toa Kiryu",
    icons: config.favicon ?? "/favicon.ico",
    generator: "Next.js",
    publisher: "Vercel",
    robots: "follow, index",
    metadataBase:
      config.themeConfig?.metadata?.metadataBase ?? new URL(config.url),
    openGraph: {
      type: "website",
      url: config.url,
      siteName: title,
      title: title,
      description: description,
      images:
        config.themeConfig.metadata?.openGraph?.images ??
        config.themeConfig.image,
      locale:
        config.themeConfig?.metadata?.openGraph?.locale ??
        config.i18n.localeConfigs[locale].htmlLang ??
        "ja-JP",
    },
    twitter: {
      card: "summary_large_image",
      site: `@${config.themeConfig?.metadata?.creator ?? "toakiryu"}`,
      title: title,
      description: description,
      creator: `@${config.themeConfig?.metadata?.creator ?? "toakiryu"}`,
      images:
        config.themeConfig.metadata?.twitter?.images ??
        config.themeConfig.image,
    },
    ...config.themeConfig?.metadata,
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`relative w-full h-full overflow-x-clip ${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Provider>
          <ColorModeProvider
            attribute="class"
            defaultTheme={config.themeConfig.colorMode.defaultMode}
            {...config.themeConfig.colorMode.custom}
          >
            <NextIntlClientProvider messages={messages}>
              <main className="w-full h-full">{children}</main>
            </NextIntlClientProvider>
          </ColorModeProvider>
        </Provider>
      </body>
    </html>
  );
}
