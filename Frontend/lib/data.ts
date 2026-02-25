// Frontend-only mock data for the book landing page

type HebrewMonth =
  | "Nisan" | "Iyar" | "Sivan" | "Tammuz" | "Av" | "Elul"
  | "Tishrei" | "Cheshvan" | "Kislev" | "Tevet" | "Shevat"
  | "Adar" | "Adar I" | "Adar II"

type HebrewDayMonth = { day: number; month: HebrewMonth }

export type HolidayDef = {
  name: string
  greeting: string
  startDate: HebrewDayMonth
  endDate: HebrewDayMonth
}

const MONTH_ORDER: HebrewMonth[] = [
  "Nisan", "Iyar", "Sivan", "Tammuz", "Av", "Elul",
  "Tishrei", "Cheshvan", "Kislev", "Tevet", "Shevat",
  "Adar", "Adar I", "Adar II",
]

function monthIndex(m: HebrewMonth): number {
  const idx = MONTH_ORDER.indexOf(m)
  if (idx === -1) throw new Error(`Unknown Hebrew month: ${m}`)
  return idx
}

function cmpMD(a: HebrewDayMonth, b: HebrewDayMonth): number {
  const am = monthIndex(a.month)
  const bm = monthIndex(b.month)
  if (am !== bm) return am < bm ? -1 : 1
  if (a.day !== b.day) return a.day < b.day ? -1 : 1
  return 0
}

function inRange(md: HebrewDayMonth, start: HebrewDayMonth, end: HebrewDayMonth): boolean {
  const wraps = cmpMD(start, end) > 0 // e.g. 25 Kislev -> 2 Tevet
  if (!wraps) return cmpMD(start, md) <= 0 && cmpMD(md, end) <= 0
  return cmpMD(start, md) <= 0 || cmpMD(md, end) <= 0
}

/**
 * Convert a Gregorian Date -> Hebrew calendar parts using Intl (no external libs).
 */
function getHebrewDateParts(date: Date): { day: number; month: HebrewMonth; year: number } {
  const dtf = new Intl.DateTimeFormat("en-u-ca-hebrew", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  // If the runtime lacks Hebrew calendar ICU data, month/year may not behave as expected.
  const parts = dtf.formatToParts(date)
  const dayStr = parts.find(p => p.type === "day")?.value
  const monthStrRaw = parts.find(p => p.type === "month")?.value
  const yearStr = parts.find(p => p.type === "year")?.value

  if (!dayStr || !monthStrRaw || !yearStr) {
    throw new Error(
      "Hebrew calendar Intl data not available in this runtime (missing full ICU)."
    )
  }

  const day = Number(dayStr)
  const year = Number(yearStr)

  // Normalize month names that differ across engines/locales
  const month = normalizeHebrewMonth(monthStrRaw)

  if (!Number.isFinite(day) || !Number.isFinite(year)) {
    throw new Error("Failed to parse Hebrew date parts from Intl formatter.")
  }

  return { day, month, year }
}

function normalizeHebrewMonth(m: string): HebrewMonth {
  const s = m.trim()

  // Common variations across engines:
  // Cheshvan can appear as Heshvan/Cheshvan
  // Tevet can appear as Teveth/Tevet (rare)
  // Adar I/II can appear with roman numerals or punctuation in some implementations
  const map: Record<string, HebrewMonth> = {
    "Nisan": "Nisan",
    "Iyar": "Iyar",
    "Iyyar": "Iyar",
    "Sivan": "Sivan",
    "Tammuz": "Tammuz",
    "Av": "Av",
    "Elul": "Elul",
    "Tishrei": "Tishrei",
    "Cheshvan": "Cheshvan",
    "Heshvan": "Cheshvan",
    "Kislev": "Kislev",
    "Tevet": "Tevet",
    "Teveth": "Tevet",
    "Shevat": "Shevat",
    "Shebat": "Shevat",
    "Adar": "Adar",
    "Adar I": "Adar I",
    "Adar II": "Adar II",
    "Adar 1": "Adar I",
    "Adar 2": "Adar II",
  }

  const normalized = map[s]
  if (!normalized) {
    // As a last resort, handle things like "Adar I" with weird spacing
    if (s.startsWith("Adar") && s.includes("I")) return "Adar I"
    if (s.startsWith("Adar") && s.includes("II")) return "Adar II"
    throw new Error(`Unrecognized Hebrew month from Intl: "${m}"`)
  }
  return normalized
}

/**
 * Main function:
 * returns holiday match (if any) for "today" (or a provided date).
 */

export const JEWISH_DAYS: HolidayDef[] = [
  {
    name: "ראש השנה",
    greeting: "שנה טובה ומתוקה! 🍎🍯",
    startDate: { day: 1, month: "Tishrei" },
    endDate: { day: 2, month: "Tishrei" },
  },
  {
    name: "צום גדליה",
    greeting: "צום קל",
    startDate: { day: 3, month: "Tishrei" },
    endDate: { day: 3, month: "Tishrei" },
  },
  {
    name: "יום כיפור",
    greeting: "גמר חתימה טובה",
    startDate: { day: 10, month: "Tishrei" },
    endDate: { day: 10, month: "Tishrei" },
  },
  {
    name: "סוכות",
    greeting: "חג סוכות שמח! 🌿",
    startDate: { day: 15, month: "Tishrei" },
    endDate: { day: 21, month: "Tishrei" }, // Israel (diaspora ends 22)
  },
  {
    name: "שמיני עצרת / שמחת תורה",
    greeting: "שמחת תורה שמח! 📜",
    startDate: { day: 22, month: "Tishrei" },
    endDate: { day: 22, month: "Tishrei" }, // Israel
  },
  {
    name: "יום הזיכרון לחללי מלחמת חרבות ברזל",
    greeting: "יזכור🕯️🎗️",
    startDate: { day: 24, month: "Tishrei" },
    endDate: { day: 24, month: "Tishrei" }, // Israel
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

export function getHebrewHolidayAt(
  date: Date = new Date(),
): {
  isHoliday: boolean
  holiday?: HolidayDef
  hebrew: { day: number; month: HebrewMonth; year: number }
} {
  const hebrew = getHebrewDateParts(date)
  const md: HebrewDayMonth = { day: hebrew.day, month: hebrew.month }

  const hit = JEWISH_DAYS.find(h => inRange(md, h.startDate, h.endDate))

  return { isHoliday: Boolean(hit), holiday: hit, hebrew }
}


export function getCurrentHoliday(now: Date = new Date()): HolidayDef | undefined {
  const jewishDay = getHebrewHolidayAt(now);
  return jewishDay.holiday
}
