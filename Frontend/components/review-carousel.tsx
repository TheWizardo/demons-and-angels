"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"

interface CarouselItemData {
  image: string
  href: string
  title: string
  ignoreAbove?: boolean
  ignoreBelow?: boolean
  description: string
}

const carouselItems: CarouselItemData[] = [
  {
    image: "agambell.jpg",
    href: "https://www.instagram.com/p/DC1NNiMIjFB/",
    title: "@agambell_",
    description:
      "בסופו של דבר, הספר שונה ומיוחד. הוא לא מתאים לכל אחת, במיוחד אם אתם מחפשים סיפור קליל ופשוט, אבל למי שמחפש ספר עם משמעות ועומק, זו יכולה להיות התשובה בשבילו"
  },
  {
    image: "bookislife7.jpg",
    href: "https://www.instagram.com/p/C6Jbp3xtwd7/",
    title: "@bookislife_7",
    description:
      "שילוב של מיתולוגיות/שדים/מלאכים והעולם שלנו.\nהעלילה מרתקת, עם תפנית בסוף-ברמות כאלה שחיפשתי עמודים נוספים כדי באמת לברר אם ככה מסתיים הסיפור של לוק. ספר ממש נחמד"
  },
  {
    image: "bein_hashurot.jpg",
    href: "https://www.instagram.com/p/DTYAmYeiJQb",
    title: "@bein_hashurot",
    ignoreBelow: true,
    description: `שדים ומלאכים זורם, הכתיבה של הסופר חלקה ומושכת להמשיך לקרוא. סיימתי אותו בשתי ישיבות בלבד!
היו הרבה מאוד ציטוטים שאהבתי, 
ממליצה בחום!`
  }
]

export function ReviewCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScroll, setCanScroll] = useState(true);
  const [current, setCurrent] = useState(0);

  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // User Interaction
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())

      // Pause autoplay
      setCanScroll(false)

      // Reset pause timer
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }

      pauseTimeoutRef.current = setTimeout(() => {
        setCanScroll(true)
      }, 4000)
    }

    api.on("select", onSelect)
    onSelect()

    return () => {
      api.off("select", onSelect)
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }
    }
  }, [api])


  // Auto-play functionality
  useEffect(() => {
    if (!api) return

    const intervalId = setInterval(() => {
      if (!canScroll) return

      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, 4000)

    return () => clearInterval(intervalId)
  }, [api, canScroll])


  return (
    <div className="w-full max-w-6xl mx-auto mt-16">
      <h2 className="text-3xl font-bold text-center mb-8">ומה אחרים אמרו?</h2>

      <Carousel setApi={setApi} className="w-full" opts={{ loop: true, direction: "rtl" }}>
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <Card className="border-0 shadow-lg">
                <div className="grid md:grid-cols-2 gap-8 p-8 items-center">
                  {/* Image on the left */}
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-muted order-2 md:order-1">
                    <a href={item.href} target="_blank">
                      <Image src={`/Images/ReviewCovers/${item.image || "/placeholder.svg"}`} alt={item.title} fill className="object-cover" />
                    </a>
                  </div>

                  {/* Text on the right */}
                  <div className="space-y-4 order-1 md:order-2">
                    <h3 className={`text-2xl font-bold text-primary ltr`}>{item.title}</h3>
                    <p className="text-lg italic leading-relaxed text-muted-foreground whitespace-pre-line">"{item?.ignoreAbove ? "" : "[...] "}{item.description}{item?.ignoreBelow ? "" : " [...]"}"</p>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots indicator */}
        <div className="flex justify-center gap-4 mt-6">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all ${current === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              aria-label={`עבור לשקופית ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}
