import { HolidayDef, GregorianMonth, GregorianDayMonth, HebrewMonth, HebrewDayMonth } from "@/types/holidays"
import { Geo, isAfterSunset } from "./sunset-service"
/* =========================================================
   GEO (for sunset logic)
========================================================= */

export const DEFAULT_GEO_TEL_AVIV: Geo = { lat: 32.0853, lon: 34.7818 }

/* =========================================================
   Generic Month-Day Comparer (wrap aware)
========================================================= */

function createMonthComparer<M extends string>(order: readonly M[]) {
  function monthIndex(m: M): number {
    const idx = order.indexOf(m)
    if (idx === -1) throw new Error(`Unknown month: ${m}`)
    return idx
  }

  function cmp(a: { day: number; month: M }, b: { day: number; month: M }) {
    const am = monthIndex(a.month)
    const bm = monthIndex(b.month)
    if (am !== bm) return am < bm ? -1 : 1
    if (a.day !== b.day) return a.day < b.day ? -1 : 1
    return 0
  }

  function inRange(
    md: { day: number; month: M },
    start: { day: number; month: M },
    end: { day: number; month: M }
  ) {
    const wraps = cmp(start, end) > 0
    if (!wraps) return cmp(start, md) <= 0 && cmp(md, end) <= 0
    return cmp(start, md) <= 0 || cmp(md, end) <= 0
  }

  return { inRange }
}

/* =========================================================
   Gregorian Implementation (midnight-based)
========================================================= */

const GREGORIAN_ORDER: GregorianMonth[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const gregComparer = createMonthComparer(GREGORIAN_ORDER)

const GREGORIAN_HOLIDAYS: HolidayDef[] = [
  {
    name: "New Year's Eve",
    greeting: "שנה אזרחית טובה! 🎆🎉",
    startDate: { day: 31, month: "December" },
    endDate: { day: 1, month: "January" },
  }
]

function getGregorianHoliday(date: Date): HolidayDef | undefined {
  const month = date.toLocaleString("en-US", { month: "long" }) as GregorianMonth
  const md: GregorianDayMonth = { day: date.getDate(), month }

  return GREGORIAN_HOLIDAYS.find(h =>
    gregComparer.inRange(
      md,
      h.startDate as GregorianDayMonth,
      h.endDate as GregorianDayMonth
    )
  )
}

/* =========================================================
   Hebrew Implementation (sunset rollover)
========================================================= */

const HEBREW_ORDER: HebrewMonth[] = [
  "Nisan", "Iyar", "Sivan", "Tamuz", "Av", "Elul",
  "Tishri", "Cheshvan", "Kislev", "Tevet", "Shevat",
  "Adar", "Adar I", "Adar II"
]

const hebComparer = createMonthComparer(HEBREW_ORDER)



function normalizeHebrewMonth(m: string): HebrewMonth {
  const map: Record<string, HebrewMonth> = {
    Nisan: "Nisan",
    Iyar: "Iyar",
    Iyyar: "Iyar",
    Sivan: "Sivan",
    Tamuz: "Tamuz",
    Tammuz: "Tamuz",
    Av: "Av",
    Elul: "Elul",
    Tishrei: "Tishri",
    Tishri: "Tishri",
    Cheshvan: "Cheshvan",
    Heshvan: "Cheshvan",
    Kislev: "Kislev",
    Tevet: "Tevet",
    Shevat: "Shevat",
    Shebat: "Shevat",
    Adar: "Adar",
    "Adar I": "Adar I",
    "Adar II": "Adar II",
    "Adar Alef": "Adar I",
    "Adar Bet": "Adar II",
    "Adar Rishon": "Adar I",
    "Adar Sheni": "Adar II",
    "Adar 1": "Adar I",
    "Adar 2": "Adar II",
  }
  return map[m.trim()] ?? (() => { throw new Error(`Unknown Hebrew month: ${m}`) })()
}

const HEBREW_HOLIDAYS: HolidayDef[] = [
  {
    name: "ראש השנה",
    greeting: "שנה טובה ומתוקה! 🍎🍯",
    startDate: { day: 1, month: "Tishri" },
    endDate: { day: 2, month: "Tishri" },
  },
  {
    name: "יום כיפור",
    greeting: "גמר חתימה טובה",
    startDate: { day: 10, month: "Tishri" },
    endDate: { day: 10, month: "Tishri" },
  },
  {
    name: "סוכות",
    greeting: "חג סוכות שמח! 🌿",
    startDate: { day: 15, month: "Tishri" },
    endDate: { day: 21, month: "Tishri" }, // Israel (diaspora ends 22)
  },
  {
    name: "שמיני עצרת / שמחת תורה",
    greeting: "שמחת תורה שמח! 📜",
    startDate: { day: 22, month: "Tishri" },
    endDate: { day: 22, month: "Tishri" }, // Israel
  },
  {
    name: "יום הזיכרון לחללי מלחמת חרבות ברזל",
    greeting: "יזכור🕯️🎗️",
    startDate: { day: 24, month: "Tishri" },
    endDate: { day: 24, month: "Tishri" }, // Israel
  },
  {
    name: "חנוכה",
    greeting: "חג חנוכה שמח! 🕎",
    startDate: { day: 25, month: "Kislev" },
    endDate: { day: 2, month: "Tevet" },
  },
  {
    name: "ט\"ו בשבט",
    greeting: "חג האילנות שמח! 🌳",
    startDate: { day: 15, month: "Shevat" },
    endDate: { day: 15, month: "Shevat" },
  },
  {
    name: "פורים",
    greeting: "פורים שמח! 🎭",
    startDate: { day: 14, month: "Adar" },
    endDate: { day: 14, month: "Adar" },
  },
  {
    name: "פורים",
    greeting: "פורים שמח! 🎭",
    startDate: { day: 14, month: "Adar II" },
    endDate: { day: 14, month: "Adar II" },
  },
  {
    name: "פסח",
    greeting: "חג פסח כשר ושמח! 🍷",
    startDate: { day: 15, month: "Nisan" },
    endDate: { day: 21, month: "Nisan" }, // Israel (diaspora ends 22)
  },
  {
    name: "יום הזיכרון לשואה ולגבורה",
    greeting: "יזכור🕯️",
    startDate: { day: 27, month: "Nisan" },
    endDate: { day: 27, month: "Nisan" },
  },
  {
    name: "יום הזיכרון לחללי מערכות ישראל",
    greeting: "יהי זכרם ברוך 🇮🇱",
    startDate: { day: 4, month: "Iyar" },
    endDate: { day: 4, month: "Iyar" },
  },
  {
    name: "יום העצמאות",
    greeting: "יום עצמאות שמח! 🇮🇱🎉",
    startDate: { day: 5, month: "Iyar" },
    endDate: { day: 5, month: "Iyar" },
  },
  {
    name: "ל\"ג בעומר",
    greeting: "ל\"ג בעומר שמח! 🔥",
    startDate: { day: 18, month: "Iyar" },
    endDate: { day: 18, month: "Iyar" },
  },
  {
    name: "שבועות",
    greeting: "חג שבועות שמח! 🥛📜",
    startDate: { day: 6, month: "Sivan" },
    endDate: { day: 6, month: "Sivan" }, // Israel (diaspora ends 7)
  },
]

function getHebrewHoliday(date: Date, geo: Geo): HolidayDef | undefined {
  const effective = isAfterSunset(date, geo)
    ? new Date(date.getTime() + 86400000)
    : date

  const dtf = new Intl.DateTimeFormat("en-u-ca-hebrew", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const parts = dtf.formatToParts(effective)
  const day = Number(parts.find(p => p.type === "day")?.value)
  const monthRaw = parts.find(p => p.type === "month")?.value
  if (!monthRaw) return undefined

  const month = normalizeHebrewMonth(monthRaw)
  const md: HebrewDayMonth = { day, month }

  return HEBREW_HOLIDAYS.find(h =>
    hebComparer.inRange(
      md,
      h.startDate as HebrewDayMonth,
      h.endDate as HebrewDayMonth
    )
  )
}

/* =========================================================
   PUBLIC API
========================================================= */

export function getCurrentHoliday(
  now: Date = new Date(),
  geo: Geo = DEFAULT_GEO_TEL_AVIV,
): HolidayDef | undefined {

  // Hebrew has precedence
  return getHebrewHoliday(now, geo)
    ?? getGregorianHoliday(now)
}