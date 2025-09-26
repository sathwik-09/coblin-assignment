import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        localStorage.removeItem("accessToken");
        window.location.href = "/signin";
        return Promise.reject(error);
      }

      try {
        const res = await api.post("/auth/refresh", { refreshToken });
        const newAccessToken = res.data.accessToken;

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } else {
          throw new Error("No new access token returned");
        }
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/signin";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export async function registerApi(payload) {
  return api.post("/auth/register", payload);
}

export async function loginApi(payload) {
  return api.post("/auth/signin", payload);
}

export async function refreshApi(refreshToken) {
  return api.post("/auth/refresh", { refreshToken });
}

export async function getProfileApi() {
  return api.get("/users/profile");
}

export default api;
