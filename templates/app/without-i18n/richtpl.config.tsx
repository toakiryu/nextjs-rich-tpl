import Config from "@/types/richtpl.config";

/**
 * Site configuration object.
 * Contains general site information, i18n settings, and theme configuration.
 */
const config: Config = {
  // Tagline for the site
  tagline: "Next.js Template",

  // URL to the favicon
  favicon: "/favicon.ico",

  // Production URL of the site
  url: "https://nextjs-rich-tpl.toakiryu.com",

  // Base URL pathname (for GitHub Pages deployment)
  baseUrl: "/",

  title: "nextjs-rich-tpl",

  // GitHub deployment configuration
  organizationName: "toakiryu", // GitHub organization/user name
  projectName: "nextjs-rich-tpl", // GitHub repository name

  // Theme and layout configuration
  themeConfig: {
    // Color mode settings
    colorMode: {
      defaultMode: "system", // Default color mode (light, dark, or system)
      selectSwitch: true, // Whether to allow switching color modes
    },
    // URL to the social card image (replace with your project's image)
    image: "/image/upload/front/nextjs/twitter-card.png",
    // Metadata for the site
    metadata: {
      keywords: [
        "Template",
        "template",
        "Next.js",
        "autoprefixer",
        "rich",
        "tailwindcss",
        "framer-motion",
        "next-themes",
        "vercel-hosting",
        "next-intl",
        "lucide-icons",
      ],
      authors: { name: "toakiryu", url: "https://toakiryu.com" },
      creator: "toakiryu",
      icons: "/favicon.ico",
      generator: "Next.js",
      publisher: "Vercel",
      robots: "follow, index",
      metadataBase: new URL("https://nextjs-rich-tpl.toakiryu.com"),

      title: {
        template: "%s | Next.js Rich Tpl",
        default: "Next.js Rich Tpl",
      },
    },
    // Sitemap Configuration
    sitemap: {
      excludedDirs: [
        "error", // Directory for error pages
        "not-found", // Directory for 404 pages
        "[...rest]", // Directory for [...rest] pages
      ],
    },
  },
};

export default config;
