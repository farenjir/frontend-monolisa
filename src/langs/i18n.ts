import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { getFromStorage } from "@/utils/storage";
import { DEFAULT_LANG, LANG_NAME } from "@/utils/constance";

import english from "./resources/english.json";
import deutsche from "./resources/deutsche.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: english },
    de: { translation: deutsche },
  },
  lng: getFromStorage(LANG_NAME) || DEFAULT_LANG,
  fallbackLng: getFromStorage(LANG_NAME) || DEFAULT_LANG,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
