import axios from "axios";
import { useApi as _useApi } from "./use-api";
export * from "./types";

const API_BASE = process.env.REACT_APP_API_URL || "/api";
const api = axios.create({ baseURL: API_BASE });

// Auto-add auth token if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

export function useApi() {
  const base = _useApi();
  return {
    ...base,

    // ===== NEW: Puppies =====
    getPuppies: async (params?: any) => {
      const r = await api.get("/puppies/", { params });
      return r.data;
    },
    getPuppy: async (slug: string) => {
      const r = await api.get(`/puppies/${slug}/`);
      return r.data;
    },

    // ===== NEW: Inquiries =====
    submitInquiry: async (data: any) => {
      const r = await api.post("/inquiries/", data);
      return r.data;
    },

    // ===== NEW: Subscribe =====
    subscribe: async (data: any) => {
      const r = await api.post("/subscribe/", data);
      return r.data;
    },

    // ===== ADMIN ONLY =====
    admin: {
      getDashboard: async () => (await api.get("/admin/puppies/dashboard/")).data,
      createPuppy: async (data: any) => (await api.post("/admin/puppies/", data)).data,
      updatePuppy: async (id: number, data: any) => (await api.patch(`/admin/puppies/${id}/`, data)).data,
      deletePuppy: async (id: number) => (await api.delete(`/admin/puppies/${id}/`)).data,
      updatePrice: async (id: number, price: number) => (await api.patch(`/admin/puppies/${id}/`, { price })).data,
      getInquiries: async () => (await api.get("/inquiries/")).data,
      updateInquiryStatus: async (id: number, status: string) => (await api.patch(`/inquiries/${id}/`, { status })).data,
    },

    // ===== Auth =====
    login: async (username: string, password: string) => {
      const r = await api.post("/auth/token/login/", { username, password });
      localStorage.setItem("auth_token", r.data.auth_token);
      localStorage.setItem("user_role", r.data.is_superuser ? "admin" : r.data.is_staff ? "staff" : "customer");
      return r.data;
    },
    logout: () => {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_role");
    },
    isAdmin: () => localStorage.getItem("user_role") === "admin",
    isStaff: () => ["admin", "staff"].includes(localStorage.getItem("user_role") || ""),
  };
}