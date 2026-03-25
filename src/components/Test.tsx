import api from "../lib/refreshTokenCall";

const Test = () => {
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