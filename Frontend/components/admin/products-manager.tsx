"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { Product, ImageMetadata } from "@/models/product-model"
import { Pencil, Trash2, Plus, X, ImageIcon, Star, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useProductsStore } from "@/lib/store/products-store"
import { productsService } from "@/services/product-service"

export function ProductsManager() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductsStore()
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleSave = (product: Product) => {
    ////////////////// SEND TO BACKEND HERE //////////////////
    if (editingProduct) {
      updateProduct(product._id, product)
      toast({ title: "מוצר עודכן בהצלחה" })
    } else {
      const newProduct = { ...product, _id: Date.now().toString() }
      addProduct(newProduct)
      toast({ title: "מוצר נוסף בהצלחה" })
    }
    setEditingProduct(null)
    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    if (confirm("האם אתה בטוח שברצונך למחוק מוצר זה?")) {
      deleteProduct(id)
      toast({ title: "מוצר נמחק בהצלחה" })
    }
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setIsDialogOpen(true)
  }

  const openNewDialog = () => {
    setEditingProduct(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">ניהול מוצרים</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}>
              <Plus className="ml-2 h-4 w-4" />
              הוסף מוצר
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "ערוך מוצר" : "הוסף מוצר חדש"}</DialogTitle>
            </DialogHeader>
            <ProductForm product={editingProduct} onSave={handleSave} onCancel={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product._id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle>{product.nameHe}</CardTitle>
                  <p className="text-sm text-muted-foreground">{product.nameEn}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => openEditDialog(product)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(product._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">מחיר מקורי:</span>
                  <span className="mr-2 font-medium">{"₪"}{product.price.toFixed(2)}</span>
                </div>
                {product.discountedPrice && (
                  <div>
                    <span className="text-muted-foreground">מחיר מבצע:</span>
                    <span className="mr-2 font-medium">{"₪"}{product.discountedPrice.toFixed(2)}</span>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground">דורש משלוח:</span>
                  <span className="mr-2 font-medium">{product.requiresShipment ? "כן" : "לא"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">פעיל:</span>
                  <span className="mr-2 font-medium">{product.isActive ? "כן" : "לא"}</span>
                </div>
              </div>

              {product.images.length > 0 && (
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">גלריית תמונות ({product.images.length})</span>
                  <div className="flex gap-2 flex-wrap">
                    {product.images.map((image) => (
                      <div
                        key={image._id}
                        className={`relative w-20 h-20 rounded-md border-2 overflow-hidden bg-muted ${
                          image.isPrimary ? "border-primary ring-2 ring-primary/30" : "border-border"
                        }`}
                      >
                        <img src={productsService.getImageUrl(image)} alt="" className="w-full h-full object-cover" />
                        {image.isPrimary && (
                          <span className="absolute top-0.5 right-0.5 bg-primary text-primary-foreground text-[10px] px-1 rounded">
                            ראשית
                          </span>
                        )}
                        <span className="absolute bottom-0.5 left-0.5 text-[10px] text-muted-foreground bg-background/70 px-0.5 rounded">
                          {image.width}{"x"}{image.height}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product: Product | null
  onSave: (product: Product) => void
  onCancel: () => void
}) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<Product>(
    product || {
      _id: "",
      nameEn: "",
      nameHe: "",
      price: 0,
      discountedPrice: undefined,
      requiresShipment: true,
      isActive: true,
      images: [],
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    console.log("Submitting product:", formData)
    e.preventDefault()
    onSave(formData)
  }

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    for (const file of Array.from(files)) {
      const format = file.name.split(".").pop()?.toLowerCase() || "jpg"
      const objectUrl = URL.createObjectURL(file)
      const img = new window.Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        const newImage: ImageMetadata = {
          _id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
          format,
          width: img.naturalWidth,
          height: img.naturalHeight,
          isPrimary: false,
        }
        setFormData((prev) => {
          const isFirst = prev.images.length === 0
          return {
            ...prev,
            images: [...prev.images, { ...newImage, isPrimary: isFirst }],
          }
        })
      }
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl)
        toast({ title: "שגיאה בטעינת הקובץ " + file.name, variant: "destructive" })
      }
      img.src = objectUrl
    }

    e.target.value = ""
  }

  const removeImage = (imageId: string) => {
    const removed = formData.images.find((img) => img._id === imageId)
    const updatedImages = formData.images.filter((img) => img._id !== imageId)
    if (updatedImages.length > 0 && !updatedImages.some((img) => img.isPrimary)) {
      updatedImages[0].isPrimary = true
    }
    setFormData({ ...formData, images: updatedImages })
  }

  const setPrimaryImage = (imageId: string) => {
    const updatedImages = formData.images.map((img) => ({
      ...img,
      isPrimary: img._id === imageId,
    }))
    setFormData({ ...formData, images: updatedImages })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="space-y-2">
        <Label htmlFor="nameHe">שם המוצר (עברית)</Label>
        <Input
          id="nameHe"
          value={formData.nameHe}
          onChange={(e) => setFormData({ ...formData, nameHe: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nameEn">שם המוצר (אנגלית)</Label>
        <Input
          id="nameEn"
          value={formData.nameEn}
          onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
          required
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>גלריית תמונות ({formData.images.length})</Label>
          <Button type="button" variant="outline" size="sm" onClick={openFilePicker}>
            <Upload className="h-4 w-4 ml-1" />
            בחר תמונות
          </Button>
        </div>

        {formData.images.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {formData.images.map((image) => (
              <div
                key={image._id}
                className={`relative rounded-lg border-2 overflow-hidden bg-muted transition-all ${
                  image.isPrimary
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border hover:border-muted-foreground/40"
                }`}
              >
                <div className="aspect-square relative">
                  <img
                      src={productsService.getImageUrl(image)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                </div>

                {image.isPrimary && (
                  <div className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                    <Star className="h-2.5 w-2.5 fill-current" />
                    ראשית
                  </div>
                )}

                <div className="absolute top-1.5 left-1.5">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-6 w-6 rounded-full"
                    onClick={() => removeImage(image._id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>

                <div className="border-t bg-background/80 backdrop-blur-sm p-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span className="uppercase font-medium">{image.format}</span>
                    <span>{image.width} {"x"} {image.height}</span>
                  </div>
                  {!image.isPrimary && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full h-6 text-[10px] bg-transparent"
                      onClick={() => setPrimaryImage(image._id)}
                    >
                      <Star className="h-2.5 w-2.5 ml-1" />
                      הגדר כתמונה ראשית
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <button
            type="button"
            onClick={openFilePicker}
            className="flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed border-muted-foreground/25 py-8 gap-2 hover:border-primary/50 hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <Upload className="h-10 w-10 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">לחץ לבחירת תמונות</p>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">{"מחיר מקורי (₪)"}</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="discountedPrice">{"מחיר מבצע (₪)"}</Label>
          <Input
            id="discountedPrice"
            type="number"
            step="0.01"
            value={formData.discountedPrice || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                discountedPrice: e.target.value ? Number.parseFloat(e.target.value) : undefined,
              })
            }
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 space-x-reverse">
        <Switch
          id="requiresShipment"
          checked={formData.requiresShipment}
          onCheckedChange={(checked) => setFormData({ ...formData, requiresShipment: checked })}
        />
        <Label htmlFor="requiresShipment">דורש משלוח</Label>
      </div>

      <div className="flex items-center space-x-2 space-x-reverse">
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
        />
        <Label htmlFor="isActive">מוצר פעיל</Label>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          ביטול
        </Button>
        <Button type="submit">שמור</Button>
      </div>
    </form>
  )
}
