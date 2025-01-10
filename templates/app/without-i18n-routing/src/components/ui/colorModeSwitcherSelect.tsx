"use client";

import { clsx } from "clsx";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

type ColorModeSwitcherSelectProps = {
  children: ReactNode;
  defaultValue?: string;
  label: string;
};

export function ColorModeSwitcherSelect({
  children,
  defaultValue,
  label,
}: ColorModeSwitcherSelectProps) {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <label
      htmlFor="ColorModeSwitcherSelect"
      suppressHydrationWarning
      className={clsx(
        "relative",
        !theme && "transition-opacity [&:disabled]:opacity-30"
      )}
    >
      <p className="sr-only" suppressHydrationWarning>
        {label}
      </p>
      <select
        id="ColorModeSwitcherSelect"
        suppressHydrationWarning
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={defaultValue}
        disabled={!setTheme}
        onChange={(e) => setTheme(e.target.value)}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  );
}
