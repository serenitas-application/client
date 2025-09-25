import { DARK_THEME } from "./dark";
import { LIGHT_THEME } from "./light";
import { themeConfig } from "./themeConfig";

export const appThemeList = {
  light: themeConfig(LIGHT_THEME),
  dark: themeConfig(DARK_THEME),
};
