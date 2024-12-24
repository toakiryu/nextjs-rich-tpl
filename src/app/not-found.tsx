"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { usePathname } from "@/i18n/routing";
import config from "../../richtpl.config";

export default function NotFoundPage() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const preLang = getCookie("NEXT_LOCALE");
  const useLang = preLang || window.navigator.language.slice(0, 2);
  const isLang = config.i18n.locales.some((lang) => lang === useLang);
  const redirectUrl = `/${isLang ? useLang : config.i18n.defaultLocale}/${
    params.locale
  }${pathname}`;

  useEffect(() => {
    router.replace(redirectUrl);
  }, []);

  return null;
}
