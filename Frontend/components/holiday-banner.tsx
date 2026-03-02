import { getCurrentHoliday, DEFAULT_GEO_TEL_AVIV } from "@/services/holidayService"
import { Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import styles from "@/styles/holiday-banner.module.css"
import { getSunset } from "@/services/sunset-service"

export function HolidayBanner() {
  const [now, setNow] = useState(new Date());
  const [holiday, setHoliday] = useState(() => getCurrentHoliday(new Date()))

  const nextLocalMidnight = (now: Date) => {
    const d = new Date(now)
    d.setHours(24, 0, 0, 0)
    return d
  }
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const scheduleNextBoundaryUpdate = () => {
      // candidate #1: next midnight
      const midnight = nextLocalMidnight(now)

      // candidate #2: next sunset (today if still ahead, else tomorrow)
      let sunset = getSunset(now, DEFAULT_GEO_TEL_AVIV)
      if (sunset.getTime() <= now.getTime()) {
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
        sunset = getSunset(tomorrow, DEFAULT_GEO_TEL_AVIV)
      }

      // choose the earlier of the two
      const next = sunset.getTime() < midnight.getTime() ? sunset : midnight

      // tiny buffer so we're safely past the boundary
      const delayMs = Math.max(0, next.getTime() - now.getTime() + 100)
      console.info(`Scheduling next holiday check at ${next} (in ${delayMs}ms)`)

      timeoutId = setTimeout(() => {
        const newHoliday = getCurrentHoliday(next)
        setHoliday(newHoliday)
        setNow(next)
        scheduleNextBoundaryUpdate()
      }, delayMs)
    }

    scheduleNextBoundaryUpdate()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [now])

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