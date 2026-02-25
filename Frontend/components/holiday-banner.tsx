import { getCurrentHoliday } from "@/lib/data"
import { Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import styles from "@/styles/holiday-banner.module.css"

export function HolidayBanner() {
  const [holiday, setHoliday] = useState(() => getCurrentHoliday(new Date()))

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const scheduleNextMidnightUpdate = () => {
      const now = new Date()

      // next local midnight
      const nextMidnight = new Date(now)
      nextMidnight.setHours(24, 0, 0, 0)

      const msUntilMidnight = nextMidnight.getTime() - now.getTime()

      timeoutId = setTimeout(() => {
        const newHoliday = getCurrentHoliday(new Date()) 
        console.log("Midnight update: new holiday is", newHoliday) // Debug log
        setHoliday(newHoliday)
        scheduleNextMidnightUpdate() // schedule again for the next day
      }, msUntilMidnight + 50) // small buffer so we’re safely past midnight
    }

    scheduleNextMidnightUpdate()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  if (!holiday) return null

  return (
    <div className={`${styles.bannerBackground} text-white py-4 px-4`}>
      <div className="container mx-auto flex items-center justify-center gap-3">
        <Sparkles className="h-5 w-5" />
        <p className="text-lg font-bold text-center">{holiday.greeting}</p>
        <Sparkles className="h-5 w-5" />
      </div>
    </div>
  )
}