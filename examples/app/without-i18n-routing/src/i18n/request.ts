import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "../services/locale";
import deepmerge from "deepmerge";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getUserLocale();

  const userMessages = (await import(`../../messages/${locale}.json`)).default;
  const defaultMessages = (await import(`../../messages/ja.json`)).default;
  const messages = deepmerge(defaultMessages, userMessages);

  return {
    locale,
    messages: messages,
  };
});