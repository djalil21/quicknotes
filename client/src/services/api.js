import axios from "axios";
import { store } from "../redux/store";
import { updateAccessToken } from "../redux/userSlice";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";


const publicRequest = axios.create({
    baseURL
});

const privateRequest = axios.create({
    baseURL
});

privateRequest.interceptors.request.use(
    (config) => {
        const token = store.getState().user.accessToken;
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

privateRequest.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response) {
            if (err.response.status === 498 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await privateRequest.post("/auth/refresh-token", {
                        refreshToken: store.getState().user.refreshToken,
                    });

                    const { accessToken } = rs.data;


                    store.dispatch(updateAccessToken({ accessToken }));


                    return privateRequest(originalConfig);
                } catch (error) {
                    return Promise.reject(error);
                }
            }
        }

        return Promise.reject(err)
    }
);

export { publicRequest, privateRequest };