import axios from "axios";
import type { AxiosError } from "axios";
import config from "./config";

export class ApiError extends Error {
  status?: number;
  details?: unknown;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export const axiosApi = axios.create({
  baseURL: config.backendAPI,
  withCredentials: true,
});

// interceptor setup
axiosApi.interceptors.request.use((conf) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(config.accessToken);
    if (token) {
      conf.headers.Authorization = `Bearer ${token}`;
    }
  }
  return conf;
});

export function toApiError(err: unknown): ApiError {
  // ✅ use axios.isAxiosError (module function), not api.isAxiosError
  if (!axios.isAxiosError(err)) {
    return new ApiError("Unexpected error");
  }

  const axErr = err as AxiosError<any>;
  const status = axErr.response?.status;
  const details = axErr.response?.data;

  const message =
    (details as any)?.message ||
    (details as any)?.error ||
    axErr.message ||
    `Request failed${status ? ` (${status})` : ""}`;

  return new ApiError(message, status, details);
}
