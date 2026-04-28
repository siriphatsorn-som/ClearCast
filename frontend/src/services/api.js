import axios from "axios";
import { auth } from "../config/firebase";

const BASE_URL = "http://localhost:5000/api";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(async (config) => {
  const token = await auth.currentUser?.getIdToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      await auth.signOut();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

//Home content
export const getWeather = (city) => api.get(`/weather?city=${city}`);
export const getPhotoScore = (city) => api.get(`/photo?city=${city}`);
export const getNews = (city) => api.get(`/news?city=${city}`);

//Favoeites
export const getFavorites = () => api.get("/favorites");
export const addFavorite = (city) => api.post("/favorites", { city });
export const deleteFavorite = (id) => api.delete(`/favorites/${id}`);

// reviews
export const getReviews = (city) => api.get(`/reviews?city=${city}`);
export const addReview = (data) => api.post("/reviews", data);
export const updateReview = (id, data) => api.put(`/reviews/${id}`, data);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

// challenge
export const getCollection = () => api.get("/collection");
export const uploadEntry = (key, formData) =>
  api.post(`/collection/${key}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateEntry = (key, data) => api.put(`/collection/${key}`, data);
export const deleteEntry = (key) => api.delete(`/collection/${key}`);
export const getCommunity = (condition, limit) => {
  const params = new URLSearchParams();
  if (condition) params.append("condition", condition);
  if (limit) params.append("limit", limit);
  return api.get(`/collection/community?${params}`);
};
