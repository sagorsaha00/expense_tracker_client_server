import axios from "axios";
import { useAuthStore } from "../datastore/store";

const BACKENDURL = import.meta.env.VITE_BACKEND_URL || "https://backend-of-expense-and-calenderevent-ai-2.onrender.com";

const api = axios.create({
    baseURL: BACKENDURL,
});

// Request interceptor
api.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().token?.accessToken;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = useAuthStore.getState().token?.refreshToken;

                if (!refreshToken) {
                    useAuthStore.getState().logout();
                    window.location.href = "/auth/login";
                    return Promise.reject(error);
                }

                const res = await axios.post(`${BACKENDURL}/refreshToken`, {
                    refreshToken,
                });

                const newTokens = res.data?.tokens;

                if (!newTokens?.accessToken) {
                    throw new Error("New access token not found");
                }

                useAuthStore.getState().setToken(newTokens);

                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                useAuthStore.getState().logout();
                window.location.href = "/auth/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;