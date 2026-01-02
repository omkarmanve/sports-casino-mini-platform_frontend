
import { api } from "./client";

export const registerApi = (payload) => api("/auth/register", { method: "POST", body: payload });
export const loginApi = (payload) => api("/auth/login", { method: "POST", body: payload });
