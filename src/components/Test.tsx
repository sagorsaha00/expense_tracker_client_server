import api from "../lib/refreshTokenCall";



const Test = () => {
    api.interceptors.request.use((config) => {
        console.log("➡️ Request sent with token");
        return config;
    });
    api.interceptors.response.use(
        (response) => {
            console.log("✅ Response success");
            return response;
        },
        async (error) => {
            console.log("❌ Error:", error.response?.status);

            if (error.response?.status === 401) {
                console.log("🔄 Trying refresh token...");
            }

            return Promise.reject(error);
        }
    );
    const callApi = async () => {
        try {
            const res = await api.get("/auth/test");
            console.log("SUCCESS:", res.data);
        } catch (err: any) {
            console.log("ERROR:", err.response?.data);
        }
    };

    return <button onClick={callApi}>Test API</button>;
};

export default Test;