import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Attach access token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("perch_access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── API functions ─────────────────────────────
export const servicesAPI = {
  getAll: (params) => api.get("/services", { params }),
  getBySlug: (slug) => api.get(`/services/${slug}`),
};

export const galleryAPI = {
  getAll: (params) => api.get("/gallery", { params }),
};

export const testimonialsAPI = {
  getAll: (params) => api.get("/testimonials", { params }),
};

export const businessAPI = {
  get: () => api.get("/business"),
};

export const faqAPI = {
  getAll: (params) => api.get("/faqs", { params }),
};

export const contactAPI = {
  submit: (data) => api.post("/contact", data),
};

export const newsletterAPI = {
  subscribe: (data) => api.post("/newsletter/subscribe", data),
};

export default api;
