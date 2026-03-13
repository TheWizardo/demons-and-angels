import type React from "react"
import type { Metadata, Viewport } from "next"
import { Alef } from "next/font/google"
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

export const metadata: Metadata = {
  metadataBase: new URL("https://demonsandangels.co.il"),
  title: {
    default: "שדים ומלאכים | עוז ש. סבג",
    template: "%s | שדים ומלאכים",
  },
  description: "ספרו של עוז ש. סבג, 'שדים ומלאכים' – רומן פנטזיה מותח העוסק בטוב, ברע, בפנקייקים, ובבחירות משנות גורל!",
  keywords: [
    "ספר",
    "מיסטיקה",
    "תרבויות עתיקות",
    "מלאכים",
    "שדים",
    "מיתולוגיה",
    "כתב סתרים",
    "פנטזיה",
    "הרפתקאות",
    "עוז ש. סבג",
    "Demons & Angels",
    "Demons and Angels",
    "Oz S. Sabbag",
    "נוער בוגר"
  ],
  authors: [{ name: 'עוז ש. סבג' }],
  generator: "TheWizard studio",
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
  openGraph: {
    title: "שדים ומלאכים | עוז ש. סבג",
    description:
      "ספרו של עוז ש. סבג, 'שדים ומלאכים' – רומן פנטזיה מותח העוסק בטוב וברע.",
    url: "https://demonsandangels.co.il",
    siteName: "שדים ומלאכים",
    locale: "he_IL",
    type: "book",
    images: [
      {
        url: "/Images/Covers/book-cover.png",
        width: 578,
        height: 830,
        alt: "כריכת הספר שדים ומלאכים מאת עוז ש. סבג",
      },
    ],
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
      <head >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Book",
              name: "שדים ומלאכים",
              alternateName: "Demons and Angels",
              image: "https://demonsandangels.co.il/Images/Covers/book-cover.png",
              author: {
                "@type": "Person",
                name: "עוז ש. סבג",
                alternateName: "Oz S. Sabbag",
              },
              inLanguage: "he",
              genre: "Fantasy",
              url: "https://demonsandangels.co.il",
              publisher: {
                "@type": "Organization",
                name: "TheWizard studio",
              },
            }),
          }}
        />
      </head>
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
