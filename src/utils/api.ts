import axios from "axios";
import { getLocalStorage } from "./localStorage";
import { USER_KEY } from "@/constans/general.const";
import { generateSign } from "./methods";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
});

const abortController = new AbortController();

// Handle all configuration of request
api.interceptors.request.use((config) => {
    const sign = generateSign(config);
    const key = getLocalStorage(USER_KEY);
    if (key) config.headers["Key"] = key;
    if (sign) config.headers["SIGN"] = sign;
    return config;
});

// Handle errors of all responses
api.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (err) => {
        if (err?.response) throw err.response?.data;
        else throw { message: "Something went wrong" };
    }
);

export { abortController };
export default api;
