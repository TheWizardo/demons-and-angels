import { MapPinOff } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function NotFound() {
  return (
    <div dir="rtl" className="flex min-h-[80vh] flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="flex items-center justify-center">
        <span className="text-8xl font-bold text-primary/50 select-none leading-none">
          4
        </span>
        <MapPinOff
          className="h-20 w-20 text-primary translate-y-[1ch]"
          strokeWidth={1.2}
        />
        <span className="text-8xl font-bold text-primary/50 select-none leading-none">
          4
        </span>
      </div>
      <Image
        src="/Images/what-huh.gif"
        alt="מה?"
        loading="lazy"
      />

      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          העמוד לא נמצא
        </h1>
        <p className="max-w-md text-muted-foreground leading-relaxed">
          הגעת לעמוד שלא קיים (שזה מאוד מוזר כי כבר לא מקלידים כתובות באופן ידני). ייתכן שהכתובת השתנתה או שהעמוד הוסר (או שאנחנו מחפשים אוצרות? 😉)
        </p>
      </div>

      <div className="flex gap-3">
        <Button asChild>
          <Link href="/">חזרה לדף הבית</Link>
        </Button>
        <Button variant="outline" asChild className="bg-transparent">
          <Link href="/store">לחנות</Link>
        </Button>
      </div>
    </div>
  )
}
