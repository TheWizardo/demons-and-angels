"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Send } from "lucide-react"
import Contact from "@/models/contact-model"
import { contactService } from "@/services/contact-service"


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const maxSubjectLength = 50
const minSubjectLength = 2
const maxMessageLength = 500
const minMessageLength = 10
const minNameLength = 2

function validateForm(data: Contact) {
  const errors: Record<string, string> = {}
  if (!data.from_name.trim()) errors.from_name = "שם מלא הוא שדה חובה"
  if (!data.from_name.trim().length || data.from_name.trim().length < minNameLength) errors.from_name = `שם מלא חייב להכיל לפחות ${minNameLength} תווים`
  if (!emailRegex.test(data.reply_to)) errors.reply_to = "כתובת דואר אלקטרוני לא תקינה"
  if (!data.subject.trim()) errors.subject = "נושא הוא שדה חובה"
  if (data.subject.trim().length < minSubjectLength) errors.subject = `הנושא חייב להכיל לפחות ${minSubjectLength} תווים`
  if (data.subject.trim().length > maxSubjectLength) errors.subject = `הנושא חייב להכיל עד ${maxSubjectLength} תווים`
  if (!data.message.trim()) errors.message = "הודעה היא שדה חובה"
  if (data.message.trim().length < minMessageLength) errors.message = `ההודעה חייבת להכיל לפחות ${minMessageLength} תווים`
  if (data.message.trim().length > maxMessageLength) errors.message = `ההודעה חייבת להכיל עד ${maxMessageLength} תווים`
  return errors
}

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [formData, setFormData] = useState<Contact>({
    from_name: "",
    reply_to: "",
    subject: "",
    message: "",
  })

  const errors = hasSubmitted ? validateForm(formData) : {}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setHasSubmitted(true)

    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) return

    setIsLoading(true)

    try {
      await contactService.send(formData);

      toast.success("ההודעה נשלחה בהצלחה!")
      setFormData({ from_name: "", reply_to: "", subject: "", message: "" })
      setHasSubmitted(false)
    } catch (error) {
      console.error("Error submitting contact form:", error)
      toast.error("שגיאה בשליחת ההודעה")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">צור קשר</CardTitle>
        <CardDescription>שלח לנו הודעה ונחזור אליך בהקדם</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <Label htmlFor="contact-name">שם מלא *</Label>
              <p className={`text-xs text-destructive transition-opacity ${errors.from_name ? "opacity-100" : "opacity-0"}`} aria-live="polite">
                {errors.from_name || "\u00A0"}
              </p>
            </div>
            <Input
              id="contact-name"
              required
              value={formData.from_name}
              onChange={(e) => setFormData({ ...formData, from_name: e.target.value })}
              placeholder="שמך המלא"
              aria-invalid={!!errors.from_name}
              className={errors.from_name ? "border-destructive" : ""}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <Label htmlFor="contact-email">דואר אלקטרוני *</Label>
              <p className={`text-xs text-destructive transition-opacity ${errors.reply_to ? "opacity-100" : "opacity-0"}`} aria-live="polite">
                {errors.reply_to || "\u00A0"}
              </p>
            </div>
            <Input
              id="contact-email"
              type="email"
              required
              value={formData.reply_to}
              onChange={(e) => setFormData({ ...formData, reply_to: e.target.value })}
              placeholder="example@email.com"
              aria-invalid={!!errors.reply_to}
              className={errors.reply_to ? "border-destructive" : ""}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <Label htmlFor="contact-subject">נושא *</Label>
              <p className={`text-xs text-destructive transition-opacity ${errors.subject ? "opacity-100" : "opacity-0"}`} aria-live="polite">
                {errors.subject || "\u00A0"}
              </p>
            </div>

            <div className="relative">
              <Textarea
                id="contact-subject"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="על מה בא לכם שנדבר?"
                aria-invalid={!!errors.subject}
                rows={1}
                className={`min-h-12 h-12 resize-none overflow-hidden pl-14 ${errors.subject ? "border-destructive" : ""}`}
              />

              <span
                className={`absolute bottom-1 left-3 text-xs ${formData.subject.length > maxSubjectLength
                  ? "text-destructive"
                  : "text-muted-foreground"
                  }`}
              >
                {formData.subject.length}/{maxSubjectLength}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <Label htmlFor="contact-message">הודעה *</Label>
              <p className={`text-xs text-destructive transition-opacity ${errors.message ? "opacity-100" : "opacity-0"}`} aria-live="polite">
                {errors.message || "\u00A0"}
              </p>
            </div>

            <div className="relative">
              <Textarea
                id="contact-message"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="פה אפשר לכתוב מה שרוצים..."
                rows={6}
                aria-invalid={!!errors.message}
                className={`max-h-60 pl-14 ${errors.message ? "border-destructive" : ""}`}
              />

              <span
                className={`absolute bottom-2 left-3 text-xs ${formData.message.length > maxMessageLength
                  ? "text-destructive"
                  : "text-muted-foreground"
                  }`}
              >
                {formData.message.length}/{maxMessageLength}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? "שולח..." : "שלח הודעה"}
            <Send className="mr-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
