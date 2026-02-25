"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import type { CartItem } from "@/models/product-model"
import { toast } from "sonner"
import { WorkInProgress } from "@/components/work-in-progress"


function CheckoutForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [requiresShipping, setRequiresShipping] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  // useEffect(() => {
  //   const cartParam = searchParams.get("cart")
  //   if (cartParam) {
  //     try {
  //       const parsedCart = JSON.parse(decodeURIComponent(cartParam))
  //       setCart(parsedCart)

  //       // Check if any item requires shipping
  //       const needsShipping = parsedCart.some((item: CartItem) => item.requiresShipment)
  //       setRequiresShipping(needsShipping)
  //     } catch (error) {
  //       console.error("Error parsing cart:", error)
  //       toast.error("שגיאה בטעינת הסל")
  //     }
  //   }
  // }, [searchParams])

  const cartTotal = cart.reduce((sum, item) => {
    const price = item.discountedPrice || item.price
    return sum + price * item.quantity
  }, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockOrderId = Math.random().toString(36).substring(7)
      toast.success("ההזמנה נוצרה בהצלחה!")
      router.push(`/order-success?orderId=${mockOrderId}`)
    } catch (error) {
      console.error("Error creating order:", error)
      toast.error("שגיאה ביצירת ההזמנה")
    } finally {
      setIsLoading(false)
    }
  }

  // if (cart.length === 0) {
  //   return (
  //     <div className="container mx-auto px-4 py-12">
  //       <Card>
  //         <CardHeader>
  //           <CardTitle>הסל שלך ריק</CardTitle>
  //           <CardDescription>אין פריטים בסל. בחר מוצרים מהחנות.</CardDescription>
  //         </CardHeader>
  //         <CardContent>
  //           <Button onClick={() => router.push("/store")}>חזרה לחנות</Button>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   )
  // }

  return <WorkInProgress pageName="תשלום" />

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">תשלום</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>פרטי לקוח</CardTitle>
                <CardDescription>אנא מלא את הפרטים שלך להשלמת ההזמנה</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">שם מלא *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">דואר אלקטרוני *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">טלפון *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {requiresShipping && (
                  <div className="space-y-2">
                    <Label htmlFor="address">כתובת למשלוח *</Label>
                    <Input
                      id="address"
                      required={requiresShipping}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="רחוב, מספר בית, עיר, מיקוד"
                    />
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "מעבד..." : "השלם הזמנה"}
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>סיכום הזמנה</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{item.nameHe}</p>
                    <p className="text-sm text-muted-foreground">כמות: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₪{((item.discountedPrice || item.price) * item.quantity).toFixed(2)}</p>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between items-center text-lg font-bold">
                <span>סה"כ לתשלום:</span>
                <span>₪{cartTotal.toFixed(2)}</span>
              </div>

              {requiresShipping && <p className="text-sm text-muted-foreground">* ההזמנה כוללת פריטים הדורשים משלוח</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12">טוען...</div>}>
      <CheckoutForm />
    </Suspense>
  )
}
