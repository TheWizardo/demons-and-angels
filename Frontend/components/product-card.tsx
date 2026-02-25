"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/models/product-model"
import { ShoppingCart, Check, ChevronRight, ChevronLeft } from "lucide-react"
import { useCartStore } from "@/lib/store/cart-store"
import { ImageMetadata } from "@/models/product-model"
import { productsService } from "@/services/product-service"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [wasAdded, setWasAdded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const addToCart = useCartStore((state) => state.addToCart)

  const hasDiscount = product.discountedPrice && product.discountedPrice < product.price
  const displayPrice = hasDiscount ? product.discountedPrice : product.price

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(product)

    setTimeout(() => {
      setIsAdding(false)
      setWasAdded(true)

      setTimeout(() => {
        setWasAdded(false)
      }, 2000)
    }, 600)
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }

  const getImageUrl = (image: (typeof product.images)[0]) => {
    return `/placeholder.svg?height=${image.height}&width=${image.width}&query=${encodeURIComponent(product.nameEn + " book")}`
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="aspect-square relative overflow-hidden rounded-t-lg group">
          <img
            src={productsService.getImageUrl(product.images[currentImageIndex]) || "/placeholder.svg?height=400&width=400"}
            alt={product.nameEn}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />

          {/* Navigation arrows - only show if multiple images */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="תמונה הבאה"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="תמונה קודמת"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Image dots indicator */}
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_: ImageMetadata, index: number) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-primary" : "bg-background/60"
                  }`}
                  aria-label={`תמונה ${index + 1}`}
                />
              ))}
            </div>
          )}

          {hasDiscount && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
              חיסכון {Math.round(((product.price - product.discountedPrice!) / product.price) * 100)}%
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <h3 className="font-bold text-xl mb-4">{product.nameHe}</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">₪{displayPrice?.toFixed(2)}</span>
          {hasDiscount && (
            <span className="text-lg line-through text-muted-foreground">₪{product.price.toFixed(2)}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full transition-all"
          disabled={isAdding}
          variant={wasAdded ? "secondary" : "default"}
        >
          {isAdding ? (
            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full ml-2" />
          ) : wasAdded ? (
            <Check className="ml-2 h-4 w-4 animate-scale-in" />
          ) : (
            <ShoppingCart className="ml-2 h-4 w-4" />
          )}
          {wasAdded ? "נוסף לסל!" : "הוסף לסל"}
        </Button>
      </CardFooter>
    </Card>
  )
}
