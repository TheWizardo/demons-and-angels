"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Sparkles } from "lucide-react"
import { HolidayBanner } from "@/components/holiday-banner"
import { BookReaderModal } from "@/components/book-reader-modal"
import Link from "next/link"
import styles from '@/styles/cypher.module.css'
import Image from "next/image"

export default function Home() {
  const [readerOpen, setReaderOpen] = useState(false)


  return (
    <div className="relative">
      {/* Holiday Banner */}
      <HolidayBanner />

      {/* Hero Section - Book Block */}
      <section className="mx-auto max-w-6xl px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 md:order-1 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 leading-tight">
              "אם הייתה לכם אפשרות להרוג את האדם הכי רשע בעולם, הייתם עושים את זה?"
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              לוקאס מילר מאז ומתמיד היה תלמיד תיכון נורמלי, לפחות עד שיום אחד קיבל בדרך מסתורית את היכולת לראות שדים ומלאכים. לאחר ששני הצדדים מגלים זאת, הם מנסים לגייס אותו לטובתם והוא קרוע בין גן עדן לגיהינום. כעת אין לו ברירה אלא להתמודד מול שדים מרובי ראשים, מלאכים מרובי כנפיים, ושאלה אחת.
              <br />
              "שדים ומלאכים" הוא סיפור מותח, סוחף ולעיתים גם מבעית שמשלב מוסר ואתיקה, הרפתקאות גדושות אלימות אשר רק השדים הנוראיים ביותר מסוגלים לה, קמצוץ רומנטיקה וגיבורים מכל קצוות תבל.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => setReaderOpen(true)}>
                <BookOpen className="ml-2 h-5 w-5" />
                חלק ראשון
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/store">
                  <Sparkles className="ml-2 h-5 w-5" />
                  לרכישה
                </Link>
              </Button>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <Image
              fetchPriority="high"
              src="/Images/Covers/cover.webp"
              alt="כריכת הספר"
              className="rounded-lg shadow-2xl w-full max-w-sm lg:max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Cipher Block */}
      <section className="bg-muted/70 py-16 border-y">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-3xl text-center font-bold tracking-wider py-6 bg-card rounded-lg border shadow-sm">
            ᚫ ᛏᚫᛚᛖ ᚦᚫᛏ ᚲᚢᛖᛋᛏᛁᛟᚾ ᚲᚢᛚᛏᚢᚱᛖᛋ
          </div>
          <div className={`${styles.ltr} text-3xl text-center font-bold tracking-wider py-6 bg-card rounded-lg border shadow-sm`}>
            <div className={styles.word}><span>𓆑𓍯</span><span className={styles.stack}><span className={styles.character}>𓂋</span><span className={styles.character}>𓎼</span></span><span>𓇋𓏏</span></div> <div className={styles.word}><span>𓇋𓆑𓇋𓂋𓇌</span><span className={styles.stack}><span className={styles.character}>𓍿</span><span className={styles.character}>𓏭</span></span><span>𓋔𓎼</span></div> <span>𓇌𓍯𓅱</span> <span>𓎡𓋔𓍯𓅱</span>
          </div>
          <div className="text-3xl text-center font-bold tracking-wider py-6 bg-card rounded-lg border shadow-sm">
            𐤊𐤅𐤋𐤌  𐤌𐤀𐤌𐤉𐤍𐤉𐤌  𐤁𐤀𐤅𐤕𐤅  𐤄𐤃𐤁𐤓
          </div>
          <div className="text-3xl text-center font-bold tracking-wider py-6 bg-card rounded-lg border shadow-sm">
            𒉡𒋾𒅔𒄖 𒄑 𒋼𒊒
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">בואו נכיר</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            עוז הוא סופר מתחיל בתחביבו והייטקיסט במקצועו, עם סקרנות גדולה ואהבה לתרבויות שונות ומשונות.
            <br />
            "שדים ומלאכים" הוא ספר הביכורים של עוז שראה אור בשנת 2023 ומאז מכר מאות עותקים. זהו ספר פנטזיה קצר וקליל שטומן בתוכו שאלות הרות גורל, מסעות ארוכים, ופנקייקים!
          </p>
          <Button variant="outline" className="mt-6 bg-transparent" asChild>
            <Link href="/about">קרא עוד</Link>
          </Button>
        </div>
      </section>

      {/* Book Reader Modal */}
      <BookReaderModal open={readerOpen} onOpenChange={setReaderOpen} />
    </div>
  )
}
