import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/" // Currently you need to set the `baseUrl` yourself
};

export default withNextIntl(nextConfig);
