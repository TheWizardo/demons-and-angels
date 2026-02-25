import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { WorkInProgress } from "@/components/work-in-progress"

export default function OrderSuccessPage() {
    return <WorkInProgress pageName="עמוד זה" />
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-3xl">ההזמנה בוצעה בהצלחה!</CardTitle>
            <CardDescription className="text-lg">תודה על הרכישה</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">פרטי ההזמנה נשלחו לכתובת הדואר האלקטרוני שלך.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg">
                <Link href="/">חזרה לדף הבית</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/store">המשך קנייה</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
