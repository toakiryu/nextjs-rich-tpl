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

// next-theme
import { Provider } from "@/components/ui/provider";
import { ColorModeProvider } from "@/components/ui/color-mode";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: `%s | ${config.themeConfig?.metadata?.title || config.title}`,
      default: `${config.themeConfig?.metadata?.title || config.title}`,
    },
    description: `${config.themeConfig?.metadata?.title || config.description}`,
    referrer:
      config.themeConfig?.metadata?.referrer || "origin-when-cross-origin",
    keywords: config.themeConfig?.metadata?.keywords || ["Vercel", "Next.js"],
    authors: config.themeConfig?.metadata?.authors || [
      { name: "Toa Kiryu", url: "https://toakiryu.com" },
    ],
    creator: config.themeConfig?.metadata?.creator || "Toa Kiryu",
    icons: config.favicon || "/favicon.ico",
    generator: config.themeConfig?.metadata?.generator || "Next.js",
    publisher: config.themeConfig?.metadata?.publisher || "Vercel",
    robots: config.themeConfig?.metadata?.robots || "follow, index",
    metadataBase:
      config.themeConfig?.metadata?.metadataBase || new URL(config.url),
    openGraph: {
      type: "website",
      url: config.url,
      siteName:
        config.themeConfig?.metadata?.openGraph?.siteName ||
        config.themeConfig?.metadata?.title ||
        config.title,
      title: {
        template: `%s | ${
          config.themeConfig?.metadata?.openGraph?.title ||
          config.themeConfig?.metadata?.title ||
          config.title
        }`,
        default: `${
          config.themeConfig?.metadata?.openGraph?.title ||
          config.themeConfig?.metadata?.title ||
          config.title
        }`,
      },
      description:
        config.themeConfig?.metadata?.openGraph?.description ||
        config.themeConfig?.metadata?.title ||
        config.description,
      images:
        config.themeConfig.metadata?.openGraph?.images ||
        config.themeConfig.image,
      locale: config.themeConfig?.metadata?.openGraph?.locale || "ja-JP",
    },
    twitter: {
      card: "summary_large_image",
      site: `@${
        config.themeConfig?.metadata?.twitter?.site ||
        config.themeConfig?.metadata?.creator ||
        "Toa Kiryu"
      }`,
      title: {
        template: `%s | ${
          config.themeConfig?.metadata?.openGraph?.title ||
          config.themeConfig?.metadata?.title ||
          config.title
        }`,
        default: `${
          config.themeConfig?.metadata?.openGraph?.title ||
          config.themeConfig?.metadata?.title ||
          config.title
        }`,
      },
      description:
        config.themeConfig?.metadata?.twitter?.description ||
        config.themeConfig?.metadata?.title ||
        config.description,
      creator: `@${
        config.themeConfig?.metadata?.twitter?.creator ||
        config.themeConfig?.metadata?.creator ||
        "Toa Kiryu"
      }`,
      images:
        config.themeConfig.metadata?.twitter?.images ||
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
  return (
    <html lang="ja" suppressHydrationWarning>
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
            <main className="w-full h-full">{children}</main>
          </ColorModeProvider>
        </Provider>
      </body>
    </html>
  );
}
