import type React from "react"
import type { Metadata, Viewport } from "next"
import { Alef, Courier_Prime } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { SiteBanner } from "@/components/site-banner"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/toaster"

const alef = Alef({
  subsets: ["hebrew", "latin"],
  weight: ["400", "700"],
})

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
})

// TBD
export const metadata: Metadata = {
  title: "שדים ומלאכים | עוז ש. סבג",
  description:
    "גלו את הסודות שהוצפנו במשך אלפי שנים. מסע מרתק דרך רונות נורדיות עתיקות, היירוגליפים המצריים, הכתב הפיניקי והשפה הסומרית.",
  keywords: ["ספר", "מיסטיקה", "תרבויות עתיקות", "רונות", "היירוגליפים", "פיניקי", "סומרי"],
  authors: [{ name: 'עוז ש. סבג' }],
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1612" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={`${alef.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteBanner />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
