"use client"

import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, X } from "lucide-react"
import Link from "next/link"
import { useProductsStore } from "@/lib/store/products-store"
import { useCartStore } from "@/lib/store/cart-store"
import { productsService } from "@/services/product-service"
import { useEffect, useRef, useState } from "react"
import { Product } from "@/models/product-model"
import { LoadingSpinner } from "@/components/loading-spinner"
import { WorkInProgress } from "@/components/work-in-progress"
import { redirect, RedirectType } from "next/navigation"


export default function StorePage() {
  const { items: cart, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount } = useCartStore()

  const [activeProducts, setActiveProducts] = useState<Product[]>([]);
  const { fetchProducts, products, isLoading } = useProductsStore();
  const [isFetching, setIsFetching] = useState(true);
  const loadStartRef = useRef<number>(Date.now());

  redirect("https://bookpod.co.il/?sku=9651", RedirectType.replace);

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // useEffect(() => {
  //   setActiveProducts(products.filter((p) => p.isActive));
  // }, [products]);

  // useEffect(() => {
  //   // Phase 1: loading started
  //   if (isLoading) {
  //     loadStartRef.current = Date.now();
  //     setIsFetching(true);
  //     return;
  //   }

  //   // Phase 2: loading finished
  //   const elapsed = Date.now() - loadStartRef.current;
  //   const remaining = Math.max(2000 - elapsed, 0);

  //   const timer = setTimeout(() => {
  //     setIsFetching(false);
  //   }, remaining);

  //   return () => clearTimeout(timer);
  // }, [isLoading]);

  // if (isFetching) {
  //   return (
  //     <div className="container mx-auto px-4 py-12">
  //       <LoadingSpinner text="טוען מוצרים..." />
  //     </div>
  //   )
  // }
  
  return <WorkInProgress pageName="החנות" />
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">החנות</h1>
          <p className="text-muted-foreground">בחר את הפורמט המועדף עליך</p>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="lg" className="relative bg-transparent">
              <ShoppingCart className="ml-2 h-5 w-5" />
              סל קניות
              {getCartItemsCount() > 0 && (
                <Badge className="absolute -top-2 -left-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                  {getCartItemsCount()}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>סל הקניות שלך</SheetTitle>
            </SheetHeader>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <ShoppingCart className="h-24 w-24 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">הסל שלך ריק</p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-auto py-6">
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item._id} className="flex gap-4 border-b pb-4">
                        {console.log("Rendering cart item:", item) == undefined}
                        {console.log("photoURL:", productsService.getImageUrl(item.images.filter(img => img.isPrimary)[0])) == undefined}
                        <img
                          src={productsService.getImageUrl(item.images.filter(img => img.isPrimary)[0]) || "/placeholder.svg?height=80&width=80"}
                          alt={item.nameEn}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.nameHe}</h4>
                          <p className="text-sm text-muted-foreground">
                            ₪{(item.discountedPrice || item.price).toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item._id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>סה"כ:</span>
                    <span>₪{getCartTotal().toFixed(2)}</span>
                  </div>
                  <Button asChild className="w-full" size="lg">
                    <Link href={`/checkout?cart=${encodeURIComponent(JSON.stringify(cart))}`}>המשך לתשלום</Link>
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
