import dayjs from "dayjs";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import "dayjs/locale/tr";
import "dayjs/locale/de";
import "dayjs/locale/it";
import "dayjs/locale/fa";

import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import timeZones from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
import buddhistEra from "dayjs/plugin/buddhistEra";
import calendar from "dayjs/plugin/calendar";

dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.extend(timeZones);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(buddhistEra);
dayjs.extend(calendar);

export const initDayjs = (lang: "en" | "de") => {
  dayjs.locale(lang);
};
