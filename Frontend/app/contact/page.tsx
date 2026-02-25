import { ContactForm } from "@/components/contact-form"
import { Facebook, Instagram, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import styles from "@/styles/contact.module.css"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">צור קשר</h1>
        <p className="text-center text-muted-foreground mb-12">יש לכם שאלות? רוצים לשתף משוב? נשמח לשמוע מכם!</p>
        <ContactForm />
      </div>

      <div className="max-w-6xl mx-auto mt-16">
        <div className="border-t border-border pt-8">
          <h2 className="text-2xl font-bold text-center mb-6">עוד ממני</h2>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <Button variant="outline" size="lg" className={`gap-2 bg-transparent ${styles.social} ${styles.instagram}`} asChild>
              <a href="https://www.instagram.com/books.by.oss/" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
                <span>Instagram</span>
              </a>
            </Button>
            <Button variant="outline" size="lg" className={`gap-2 bg-transparent ${styles.social} ${styles.facebook}`} asChild>
              <a href="https://www.facebook.com/people/%D7%A2%D7%95%D7%96-%D7%A9-%D7%A1%D7%91%D7%92/pfbid0P1be6EPPrXgaku4HCKkV3yyxD1pc8Uust5d2dve9sHNS6hjZJd7trTSK3mQMAFEgl/" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
                <span>Facebook</span>
              </a>
            </Button>
            <Button variant="outline" size="lg" className={`gap-2 bg-transparent ${styles.social} ${styles.mail}`} asChild>
              <a href="mailto:books.by.oss@gmail.com">
                <Mail className="h-5 w-5" />
                <span>Email</span>
              </a>
            </Button>
            {/* <Button className={`gap-2 bg-transparent ${styles.social} ${styles.spotify}`} variant="outline" size="lg" ><span>spotify</span></Button>
            <Button className={`gap-2 bg-transparent ${styles.social} ${styles.appleMusic}`} variant="outline" size="lg" ><span>apple</span></Button>
            <Button className={`gap-2 bg-transparent ${styles.social} ${styles.tiktok}`} variant="outline" size="lg" ><span>tiktok</span></Button>
            <Button className={`gap-2 bg-transparent ${styles.social} ${styles.youtube}`} variant="outline" size="lg" ><span>youtube</span></Button>
            <Button className={`gap-2 bg-transparent ${styles.social} ${styles.x}`} variant="outline" size="lg" ><span>x</span></Button>
            <Button className={`gap-2 bg-transparent ${styles.social} ${styles.reddit}`} variant="outline" size="lg" ><span>reddit</span></Button>
            <Button className={`gap-2 bg-transparent ${styles.social} ${styles.snapchat}`} variant="outline" size="lg" ><span>snapchat</span></Button>
            <Button className={`gap-2 bg-transparent ${styles.social} ${styles.whatsapp}`} variant="outline" size="lg" ><span>whatsapp</span></Button> */}
          </div>
        </div>
      </div>
    </div>
  )
}
