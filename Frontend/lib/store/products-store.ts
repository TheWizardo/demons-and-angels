import { create } from "zustand"
import { type Product } from "@/models/product-model"
import { productsService } from "@/services/product-service"

interface ProductsState {
  products: Product[]
  isLoading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  addProduct: (product: Product) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  setProducts: (products: Product[]) => void
}

export const useProductsStore = create<ProductsState>()(
  (set, get) => ({
    products: [],
    isLoading: false,
    error: null,
    fetchProducts: async () => {
      set({ isLoading: true, error: null });
      try {
        const products = await productsService.getAll();
        set({ products, isLoading: false });
      } catch (e) {
        set({ error: "Failed to fetch products", isLoading: false });
      }
    },
    addProduct: (product: Product) => {
      set((state) => ({
        products: [...state.products, product],
      }))
    },
    updateProduct: (id: string, updates: Partial<Product>) => {
      set((state) => ({
        products: state.products.map((p) => (p._id === id ? { ...p, ...updates } : p)),
      }))
    },
    deleteProduct: (id: string) => {
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
      }))
    },
    setProducts: (products: Product[]) => {
      set({ products })
    },
  }),
)
