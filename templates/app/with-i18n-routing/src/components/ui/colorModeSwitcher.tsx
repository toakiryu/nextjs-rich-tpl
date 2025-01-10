"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { ColorModeSwitcherSelect } from "./colorModeSwitcherSelect";

export function ColorModeSwitcher() {
  const t = useTranslations("colorModeSwitcher");
  const { theme, themes } = useTheme();

  return (
    <ColorModeSwitcherSelect defaultValue={theme} label={t("label")}>
      {themes.map((color) => (
        <option key={color} value={color}>
          {t("color", { color: color })}
        </option>
      ))}
    </ColorModeSwitcherSelect>
  );
}
