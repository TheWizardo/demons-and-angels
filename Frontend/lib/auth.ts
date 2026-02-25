import config from "./config";
import { User, UserRoles } from "@/models/user-model";
import { jwtDecode } from "jwt-decode";
import { axiosApi } from "./axios";


export async function login(email: string, password: string): Promise<boolean> {
  try {
    const response = await axiosApi.post<string>(`${config.authEndpoint}/login`, { email, password });
    if (response.data) {
      localStorage.setItem(config.accessToken, response.data);
      return true;
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
  return false;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(config.accessToken)
  }
}

export function getCurrentUserToken(): string | null {
  if (typeof window === "undefined") return null;
  const userToken = localStorage.getItem(config.accessToken);
  if (!userToken) return null;
  return userToken;
}

export function getUserFromToken(token: string | null): User | null {
  if (!token) return null
  try {
    const decoded = jwtDecode<{ user: User }>(token)
    return decoded.user || null
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

export function isAdmin(): boolean {
  const user = getUserFromToken(getCurrentUserToken())
  return user?.role === UserRoles.admin
}

export async function verifyAdminViaBackend(): Promise<boolean> {
  try {
    const response = await axiosApi.get(`${config.authEndpoint}/verify-admin`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
}
