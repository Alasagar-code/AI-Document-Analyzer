import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "";

console.log("[API] Initializing axios with baseURL:", baseURL);

const api = axios.create({
  baseURL,
  withCredentials: true // send cookies (backend must allow credentials + specific origin)
});

console.log("[API] withCredentials enabled for cookie sending");

// Attach token from localStorage if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("[API] Request to:", config.url, "| Token present:", !!token, "| Method:", config.method);
// Cookie-based authentication handled automatically via withCredentials: true
// No need to manually attach tokens
  return config;
});

// Log responses
api.interceptors.response.use(
  (response) => {
    console.log("[API] Response from:", response.config.url, "| Status:", response.status);
    return response;
  },
  (error) => {
    console.error("[API] Error from:", error.config?.url, "| Status:", error.response?.status, "| Message:", error.message);
    return Promise.reject(error);
  }
);

export default api;
