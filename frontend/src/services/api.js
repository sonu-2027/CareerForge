import axios from "axios";

// Single place that knows where the backend lives.
// Set VITE_API_URL in Vercel (e.g. https://your-backend.onrender.com).
export const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const API = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 30000, // Render free tier can take a while to wake up
});

// Attach the JWT to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If the token is expired/invalid, log out and send the user to /login
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.assign("/login");
    }
    return Promise.reject(err);
  },
);

export const errorMessage = (err, fallback = "Something went wrong.") =>
  err.response?.data?.message ||
  (err.code === "ERR_NETWORK"
    ? "Cannot reach the server. Please try again in a moment."
    : fallback);

export default API;
