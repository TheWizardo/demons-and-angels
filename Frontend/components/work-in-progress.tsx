import { Construction } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface WorkInProgressProps {
  pageName?: string
}

export function WorkInProgress({ pageName }: WorkInProgressProps) {
  return (
    <div dir="rtl" className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-primary/10 animate-pulse" />
        <Construction className="relative h-16 w-16 text-primary" strokeWidth={1.5} />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {pageName} בבנייה
        </h1>
        <p className="max-w-md text-muted-foreground leading-relaxed">
          העמוד הזה עדיין בפיתוח. נחזור אליו בקרוב עם תוכן חדש ומרגש.
        </p>
      </div>

      <Button variant="outline" asChild className="bg-transparent">
        <Link href="/">חזרה לדף הבית</Link>
      </Button>
    </div>
  )
}
