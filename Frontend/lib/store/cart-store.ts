import { create } from "zustand"
import type { Product, CartItem } from "@/models/product-model"


interface CartState {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartItemsCount: () => number
}

export const useCartStore = create<CartState>()(
  (set, get) => ({
    items: [],
    addToCart: (product: Product) => {
      set((state) => {
        const existing = state.items.find((item) => item._id === product._id)
        if (existing) {
          return {
            items: state.items.map((item) =>
              item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          }
        }
        return {
          items: [...state.items, { ...product, quantity: 1 }],
        }
      })
    },
    removeFromCart: (productId: string) => {
      set((state) => ({
        items: state.items.filter((item) => item._id !== productId),
      }))
    },
    updateQuantity: (productId: string, quantity: number) => {
      if (quantity <= 0) {
        get().removeFromCart(productId)
        return
      }
      set((state) => ({
        items: state.items.map((item) => (item._id === productId ? { ...item, quantity } : item)),
      }))
    },
    clearCart: () => {
      set({ items: [] })
    },
    getCartTotal: () => {
      const state = get()
      return state.items.reduce((sum, item) => {
        const price = item.discountedPrice || item.price
        return sum + price * item.quantity
      }, 0)
    },
    getCartItemsCount: () => {
      const state = get()
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },
  }),
)
