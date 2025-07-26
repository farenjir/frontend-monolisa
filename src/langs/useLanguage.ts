import { useEffect, useState } from "react";
import i18next from "i18next";

import localeEn from "antd/es/locale/en_US";
import localeDe from "antd/es/locale/de_DE";

import dateEn from "antd/es/date-picker/locale/en_US";
import dateDe from "antd/es/date-picker/locale/de_DE";

import { getFromStorage, setToStorage } from "@/utils/storage";
import { LANG_NAME } from "@/constants/app";

import { initDayjs } from "./configs/dayjs";

type LangType = "en" | "de";

const defaultLanguage = (getFromStorage(LANG_NAME) || "en") as LangType;

export const useLanguage = () => {
  const [language, setLanguage] = useState<LangType>(defaultLanguage);
  // handles
  const handleChangeDateType = (type: LangType = "en") => {
    initDayjs(type);
    setToStorage(LANG_NAME, type);
  };
  const changeLanguage = (lang: LangType = "en") => {
    i18next.changeLanguage(lang);
    setToStorage(LANG_NAME, lang);
    setLanguage(lang);
    handleChangeDateType(lang);
  };
  // init langs
  useEffect(() => {
    changeLanguage();
  }, []);
  // configs
  const locals = {
    en: localeEn,
    de: localeDe,
  };
  const datePicker = {
    en: dateEn,
    de: dateDe,
  };
  const buddhistLocale = {
    ...(datePicker[language]?.lang || {}),
    // fieldDateFormat: 'BBBB-MM-DD',
    // fieldDateTimeFormat: 'BBBB-MM-DD HH:mm:ss',
    // yearFormat: 'BBBB',
    // cellYearFormat: 'BBBB',
  };
  const configs = {
    direction: "ltr", 
    deDirection: "rtl",
    placement: "right",
    dePlacement: "left",
  } as const
  // return
  return {
    language,
    changeLanguage,
    handleChangeDateType,
    locale: locals[language],
    locals,
    dateConfigs: Object.assign({}, datePicker[language], { lang: buddhistLocale }),
    ...configs,
  };
};

