import { useState } from "react";
import type { theme as themeType } from "antd";

import { getFromStorage, setToStorage } from "@/utils/storage";

const tokens = {
  default: {
 //    borderRadius: 8,
    colorPrimary: "#1677ff",
    // colorPrimaryActive: "#1677ff",
    // colorBgContainer: "#1677ff0a",
    // *** custom
    colorPrimaryLight: "#1677ff1a",
    colorPrimaryLighter: "#1677ff0a",
  },
  black: {
 //    borderRadius: 8,
    colorPrimary: "#1c4e80",
    // colorPrimaryActive: "#1c4e80",
    // colorBgContainer: "#1c4e800a",
    // *** custom
    colorPrimaryLight: "#1c4e801a",
    colorPrimaryLighter: "#1c4e800a",
  },
  green: {
 //    borderRadius: 8,
    colorPrimary: "#1dc362",
    // colorPrimaryActive: "#1dc362",
    // colorBgContainer: "#1dc3620a",
    // *** custom
    colorPrimaryLight: "#1dc3621a",
    colorPrimaryLighter: "#1dc3620a",
  },
  orange: {
 //    borderRadius: 8,
    colorPrimary: "#ea6a47",
    // colorPrimaryActive: "#ea6a47",
    // colorBgContainer: "#ea6a470a",
    // *** custom
    colorPrimaryLight: "#ea6a471a",
    colorPrimaryLighter: "#ea6a470a",
  },
};

type Tokens = keyof typeof tokens;

const defaultTheme = getFromStorage("theme") || "default";
const defaultFontSize = getFromStorage("fontSize") || "none";
const defaultToken = getFromStorage("tokenColor") || "default";

export function useTheme<T extends typeof themeType>(theme: T) {
  const [themeMode, setThemeMode] = useState(defaultTheme);
  const [fontMode, setFontSize] = useState(defaultFontSize);
  const [selectedToken, setToken] = useState(defaultToken);
  // themeAntMode
  const changeTheme = (mode: Tokens) => {
    setThemeMode(mode);
    setToStorage("theme", mode);
  };
  const themeAntMode = theme[`${themeMode}Algorithm` as keyof T] || [];
  // fontAntMode
  const changeFontMode = (mode: Tokens) => {
    setFontSize(mode);
    setToStorage("fontSize", mode);
  };
  const fontAntMode = [theme[`${fontMode}Algorithm` as keyof T]].filter(Boolean);
  // tokenMode
  const changeTokenMode = (mode: Tokens) => {
    setToken(mode);
    setToStorage("tokenColor", mode);
  };
  const themColorObject = tokens[selectedToken as Tokens];
  // return
  return {
    changeTheme,
    themeAntMode,
    themeMode,
    changeFontMode,
    fontAntMode,
    fontMode,
    changeTokenMode,
    tokens,
    selectedToken,
    themColorObject,
  };
}
