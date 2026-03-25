import axios, { type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../datastore/store";

const BACKENDURL =
    import.meta.env.VITE_BACKEND_URL ||
    "https://backend-of-expense-and-calenderevent-ai-2.onrender.com";

// _retry flag এর জন্য type extend করো
interface RetryConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const api = axios.create({
    baseURL: BACKENDURL,
});

// ✅ Request interceptor — একদম ঠিক আছে
api.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().token?.accessToken;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// ✅ Response interceptor — fixed version
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as RetryConfig;

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

                // ✅ আলাদা axios instance দিয়ে call করো
                // (api instance use করলে infinite loop হবে!)
                const res = await axios.post(
                    `${BACKENDURL}/token/refreshToken`,
                    { refreshToken },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const newTokens = res.data?.tokens;

                if (!newTokens?.accessToken) {
                    throw new Error("New access token not found");
                }

                // ✅ Store update করো
                useAuthStore.getState().setToken(newTokens);

                // ✅ সঠিকভাবে header set করো
                originalRequest.headers.set(
                    "Authorization",
                    `Bearer ${newTokens.accessToken}`
                );

                // ✅ Original request retry করো
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
