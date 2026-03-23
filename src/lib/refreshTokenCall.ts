import axios from "axios";
import { useAuthStore } from "../datastore/store";

const BACKENDURL = "http://localhost:3001";

const api = axios.create({
    baseURL: BACKENDURL,
});

api.interceptors.request.use(
    (config) => {
        const accessToken = useAuthStore.getState().token?.accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const currentToken = useAuthStore.getState().token;

                if (!currentToken?.refreshToken) {
                    throw new Error("No refresh token found");
                }

                const res = await axios.post(`${BACKENDURL}/refreshToken`, {
                    refreshToken: currentToken.refreshToken,
                });

                const newTokens = res.data?.tokens;

                if (!newTokens?.accessToken || !newTokens?.refreshToken) {
                    throw new Error("Invalid refresh response");
                }

                useAuthStore.getState().setToken(newTokens);

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