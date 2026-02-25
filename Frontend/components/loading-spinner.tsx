import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  text?: string
}

export function LoadingSpinner({ text = "טוען..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-lg text-muted-foreground">{text}</p>
    </div>
  )
}
