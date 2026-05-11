/**
 * PERCH Frontend Integration Guide
 * =================================
 * Drop this folder into your React (Vite) project:
 *   src/api/
 *   src/hooks/
 *
 * Install:
 *   npm install axios @tanstack/react-query
 */

// ══════════════════════════════════════════════════════════════════
// src/api/axios.js  — Axios instance with interceptors
// ══════════════════════════════════════════════════════════════════

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // sends refresh-token cookie
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor — attach access token ────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('perch_access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Response interceptor — auto refresh on 401 ──────────────────
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => (error ? prom.reject(error) : prom.resolve(token)));
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(Promise.reject);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(`${API_BASE}/auth/refresh`, {}, { withCredentials: true });
        const newToken = res.data.data.accessToken;
        localStorage.setItem('perch_access_token', newToken);
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('perch_access_token');
        window.dispatchEvent(new Event('auth:logout'));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// ══════════════════════════════════════════════════════════════════
// src/api/endpoints.js  — All API call functions
// ══════════════════════════════════════════════════════════════════

// ── Auth ──────────────────────────────────────────────────────────
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// ── Business ─────────────────────────────────────────────────────
export const businessAPI = {
  get: () => api.get('/business'),
  update: (data) => api.post('/business', data),
  updateHours: (businessHours) => api.put('/business/hours', { businessHours }),
  updateSocial: (socialLinks) => api.put('/business/social', { socialLinks }),
};

// ── Services ─────────────────────────────────────────────────────
export const servicesAPI = {
  getAll: (params) => api.get('/services', { params }),
  getBySlug: (slug) => api.get(`/services/${slug}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
  reorder: (order) => api.put('/services/reorder', { order }),
};

// ── Gallery ──────────────────────────────────────────────────────
export const galleryAPI = {
  getAll: (params) => api.get('/gallery', { params }),
  getCategories: () => api.get('/gallery/categories'),
  getById: (id) => api.get(`/gallery/${id}`),
  upload: (formData) => api.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => api.put(`/gallery/${id}`, data),
  delete: (id) => api.delete(`/gallery/${id}`),
};

// ── Testimonials ─────────────────────────────────────────────────
export const testimonialsAPI = {
  getAll: (params) => api.get('/testimonials', { params }),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

// ── Contact ──────────────────────────────────────────────────────
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  // Admin
  getAll: (params) => api.get('/contact', { params }),
  getById: (id) => api.get(`/contact/${id}`),
  updateStatus: (id, status, adminNotes) => api.patch(`/contact/${id}/status`, { status, adminNotes }),
  delete: (id) => api.delete(`/contact/${id}`),
};

// ── Newsletter ───────────────────────────────────────────────────
export const newsletterAPI = {
  subscribe: (data) => api.post('/newsletter/subscribe', data),
  unsubscribe: (token) => api.get(`/newsletter/unsubscribe/${token}`),
  // Admin
  getAll: (params) => api.get('/newsletter', { params }),
  delete: (id) => api.delete(`/newsletter/${id}`),
};

// ── FAQs ─────────────────────────────────────────────────────────
export const faqAPI = {
  getAll: (params) => api.get('/faqs', { params }),
  create: (data) => api.post('/faqs', data),
  update: (id, data) => api.put(`/faqs/${id}`, data),
  delete: (id) => api.delete(`/faqs/${id}`),
};

// ── SEO ──────────────────────────────────────────────────────────
export const seoAPI = {
  getByPage: (page) => api.get(`/seo/${page}`),
  getAll: () => api.get('/seo'),
  upsert: (data) => api.post('/seo', data),
  delete: (id) => api.delete(`/seo/${id}`),
};

// ── Bookings ─────────────────────────────────────────────────────
export const bookingAPI = {
  create: (data) => api.post('/bookings', data),
  getByCode: (code) => api.get(`/bookings/confirm/${code}`),
  // Admin
  getAll: (params) => api.get('/bookings', { params }),
  updateStatus: (id, status, adminNotes) => api.patch(`/bookings/${id}/status`, { status, adminNotes }),
  delete: (id) => api.delete(`/bookings/${id}`),
};

// ── Analytics ────────────────────────────────────────────────────
export const analyticsAPI = {
  track: (event, page, metadata) => api.post('/analytics/track', { event, page, metadata }),
  getDashboard: () => api.get('/analytics/dashboard'),
  getPageViews: (days) => api.get('/analytics/pageviews', { params: { days } }),
};

// ── Settings ─────────────────────────────────────────────────────
export const settingsAPI = {
  getPublic: () => api.get('/settings/public'),
  getAll: (group) => api.get('/settings', { params: { group } }),
  update: (settings) => api.post('/settings', { settings }),
};

// ── Upload ───────────────────────────────────────────────────────
export const uploadAPI = {
  image: (formData) => api.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  serviceImage: (formData) => api.post('/upload/service-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  avatar: (formData) => api.post('/upload/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (publicId) => api.delete('/upload', { data: { publicId } }),
};

// ══════════════════════════════════════════════════════════════════
// src/hooks/useServices.js — React Query hooks example
// ══════════════════════════════════════════════════════════════════

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useServices = (params = {}) =>
  useQuery({
    queryKey: ['services', params],
    queryFn: () => servicesAPI.getAll(params).then((r) => r.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

export const useService = (slug) =>
  useQuery({
    queryKey: ['service', slug],
    queryFn: () => servicesAPI.getBySlug(slug).then((r) => r.data),
    enabled: !!slug,
  });

// ══════════════════════════════════════════════════════════════════
// src/hooks/useBusiness.js
// ══════════════════════════════════════════════════════════════════

export const useBusiness = () =>
  useQuery({
    queryKey: ['business'],
    queryFn: () => businessAPI.get().then((r) => r.data),
    staleTime: 10 * 60 * 1000,
  });

// ══════════════════════════════════════════════════════════════════
// src/hooks/useGallery.js
// ══════════════════════════════════════════════════════════════════

export const useGallery = (params = {}) =>
  useQuery({
    queryKey: ['gallery', params],
    queryFn: () => galleryAPI.getAll(params).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

export const useGalleryCategories = () =>
  useQuery({
    queryKey: ['gallery-categories'],
    queryFn: () => galleryAPI.getCategories().then((r) => r.data),
  });

// ══════════════════════════════════════════════════════════════════
// src/hooks/useTestimonials.js
// ══════════════════════════════════════════════════════════════════

export const useTestimonials = (params = {}) =>
  useQuery({
    queryKey: ['testimonials', params],
    queryFn: () => testimonialsAPI.getAll(params).then((r) => r.data),
    staleTime: 10 * 60 * 1000,
  });

// ══════════════════════════════════════════════════════════════════
// src/hooks/useFAQs.js
// ══════════════════════════════════════════════════════════════════

export const useFAQs = (category) =>
  useQuery({
    queryKey: ['faqs', category],
    queryFn: () => faqAPI.getAll(category ? { category } : {}).then((r) => r.data),
  });

// ══════════════════════════════════════════════════════════════════
// src/hooks/useContact.js — Contact form mutation
// ══════════════════════════════════════════════════════════════════

export const useContactForm = () => {
  return useMutation({
    mutationFn: (formData) => contactAPI.submit(formData).then((r) => r.data),
    onSuccess: (data) => {
      console.log('Contact form submitted:', data.message);
    },
    onError: (error) => {
      console.error('Contact form error:', error.response?.data?.message);
    },
  });
};

// ══════════════════════════════════════════════════════════════════
// src/hooks/useNewsletter.js
// ══════════════════════════════════════════════════════════════════

export const useNewsletter = () => {
  return useMutation({
    mutationFn: ({ email, name }) =>
      newsletterAPI.subscribe({ email, name }).then((r) => r.data),
  });
};

// ══════════════════════════════════════════════════════════════════
// src/hooks/useSEO.js — Page-level SEO injection
// ══════════════════════════════════════════════════════════════════

export const useSEO = (page) => {
  const { data } = useQuery({
    queryKey: ['seo', page],
    queryFn: () => seoAPI.getByPage(page).then((r) => r.data.data),
    staleTime: 30 * 60 * 1000,
  });

  // Inject into <head> via useEffect
  if (data) {
    document.title = data.metaTitle || 'PERCH Wine & Coffee Bar';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', data.metaDescription || '');
  }

  return data;
};

// ══════════════════════════════════════════════════════════════════
// src/hooks/useAnalytics.js — Auto-track page views
// ══════════════════════════════════════════════════════════════════

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    analyticsAPI.track('page_view', location.pathname).catch(() => {});
  }, [location.pathname]);
};

// ══════════════════════════════════════════════════════════════════
// src/context/AuthContext.jsx — Auth state management
// ══════════════════════════════════════════════════════════════════

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    const token = localStorage.getItem('perch_access_token');
    if (!token) { setLoading(false); return; }
    try {
      const res = await authAPI.getMe();
      setUser(res.data.data);
    } catch {
      localStorage.removeItem('perch_access_token');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
    window.addEventListener('auth:logout', () => {
      setUser(null);
      localStorage.removeItem('perch_access_token');
    });
  }, [fetchMe]);

  const login = async (credentials) => {
    const res = await authAPI.login(credentials);
    const { accessToken, user } = res.data.data;
    localStorage.setItem('perch_access_token', accessToken);
    setUser(user);
    return user;
  };

  const logout = async () => {
    await authAPI.logout().catch(() => {});
    localStorage.removeItem('perch_access_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

// ══════════════════════════════════════════════════════════════════
// src/main.jsx — React Query setup
// ══════════════════════════════════════════════════════════════════

/*
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
*/

// ══════════════════════════════════════════════════════════════════
// VITE environment variable (.env in your React project)
// ══════════════════════════════════════════════════════════════════

/*
VITE_API_URL=http://localhost:5000/api
*/

// ══════════════════════════════════════════════════════════════════
// Example: Replacing static services data in a component
// ══════════════════════════════════════════════════════════════════

/*
// BEFORE (static)
import { services } from '../data/services.js';

// AFTER (dynamic)
import { useServices } from '../hooks/useServices';

const ServicesSection = () => {
  const { data, isLoading, error } = useServices({ featured: true });

  if (isLoading) return <ServicesSkeleton />;
  if (error) return <p>Failed to load services.</p>;

  const services = data?.data || [];

  return (
    <section>
      {services.map(service => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </section>
  );
};
*/
