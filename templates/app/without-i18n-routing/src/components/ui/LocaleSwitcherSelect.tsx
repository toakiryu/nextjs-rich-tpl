"use client";

import { Locale, setUserLocale } from "@/services/locale";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      setUserLocale(nextLocale);
      router.refresh();
    });
  }

  return (
    <label
      htmlFor="LocaleSwitcherSelect"
      suppressHydrationWarning
      className={clsx(
        "relative",
        isPending && "transition-opacity disabled:opacity-30"
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        id="LocaleSwitcherSelect"
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  );
}
