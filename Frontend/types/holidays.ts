export type HebrewMonth =
  | "Nisan" | "Iyar" | "Sivan" | "Tamuz" | "Av" | "Elul"
  | "Tishri" | "Cheshvan" | "Kislev" | "Tevet" | "Shevat"
  | "Adar" | "Adar I" | "Adar II"

export type HebrewDayMonth = { day: number; month: HebrewMonth }

export type GregorianMonth =
  | "January" | "February" | "March" | "April" | "May" | "June"
  | "July" | "August" | "September" | "October" | "November" | "December"

export type GregorianDayMonth = { day: number; month: GregorianMonth }

export type HolidayDef = {
  name: string
  greeting: string
  startDate: { day: number; month: string }
  endDate: { day: number; month: string }
}
