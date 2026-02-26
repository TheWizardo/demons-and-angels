import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookMarked, User} from "lucide-react"
import { ReviewCarousel } from "@/components/review-carousel"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">אודות</h1>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <BookMarked className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">אודות הספר</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                ״שדים ומלאכים״ הוא ספר פנטזיה שמזמין את הקורא לצאת למסע אל מקום שבו אין תשובות קלות, והבחירה הנכונה לעיתים כואבת יותר מהשגויה. זהו תוצר של הרבה מחשבות ורעיונות שהצטברו לאורך השנים. הוא התחיל כרעיון מעומעם אשר עם הזמן סיפח אליו עוד ועוד מידע מעולמות תוכן שונים.
              </p>
              <p>
                במרכז העלילה עומד לוקאס מילר שנחשף למציאות נסתרת הפועלת מאחורי הקלעים ומשפיעה על החיים היומיומיים שלנו בני האדם. ככל שהסיפור מתקדם, לוקאס נאלץ לתפוס צד בין שני הכוחות שמחפשים להשתמש בכוחו החדש, אף יחד עם זאת מגיעה גם החלטה שעשויה להשפיע על רבים.
              </p>
              <p>
                ״שדים ומלאכים״ שואב השראה ממיתוסים, אמונות וסיפורים עתיקים מתרבויות שונות, ומשלב אותם לכדי עולם אחד. חלקן מוכרות יותר כמו הסיפורים על אל הברק והרעם - ת'ור מהמיתולוגיה הנורדית, וחלקן מוכרות פחות כמו סיפור המלחמה הזורואסטרי בין אהורה-מאזדה יוצר היקום לבין אהרימן התגלמות הרשע - אך כולם משרתים שאלה מרכזית אחת: האם חיוך תמים מסתיר שיניים חדות?
              </p>
              <p>זהו ספר לחובבי פנטזיה עם עומק, מתח עם משמעות, וסיפורים שלא מפחדים להציג את צידם המגעיל.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <User className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">אודות המחבר</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-base leading-relaxed space-y-4">
              <p>
                עוז הוא סופר מתחיל בעל תשוקה לקריאה וכתיבה של סיפורים מעניינים. ביניהם סיפורי פנטזיה גדושה בדמויות ומקומות מומצאים, מתח שגורם לקורא להציץ כמה פרקים קדימה מתוך סקרנות (לא שהוא תומך בזה 👀), וקלאסיקות אהובות על כולם כמו "הקוסם מארץ עוץ".
              </p>
              <p>
                נוסף על זה, עוז הוא סטודנט לתואר ראשון דו־חוגי במדעי המחשב וקוגניציה. מה שכבר אמור לרמז לכם על אהבתו לטכנולוגיה ולתודעה האנושית.
              </p>
              <p>
                בשעות הפנאי, הוא נהנה לכתוב, (בין אם זה קוד או סיפורים אחרים), לטייל בחיק הטבע, ולבלות זמן עם חברים ומשפחה.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <ReviewCarousel />
    </div>
  )
}
