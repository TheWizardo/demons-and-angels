import { User } from "@/models/user-model"
import { create } from "zustand"
import * as auth from "@/lib/auth"


interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAdmin: () => boolean
}

export const useAuthStore = create<AuthState>()(
  (set, get) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    login: async (email: string, password: string) => {
      const success = await auth.login(email, password);
      if (success) {
        const token = auth.getCurrentUserToken();
        const user = auth.getUserFromToken(token);
        set({ user, token, isAuthenticated: true });
      }
      return success;
    },
    logout: () => {
      set({ user: null, token: null, isAuthenticated: false })
    },
    isAdmin: () => {
      const state = get()
      return state.user?.role === "admin"
    },
  })
)
