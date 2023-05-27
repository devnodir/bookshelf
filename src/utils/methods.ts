import { SIGN_UP } from "@/constans/api.const";
import { USER_SECRET } from "@/constans/general.const";
import { InternalAxiosRequestConfig } from "axios";
import { getLocalStorage } from "./localStorage";
import md5 from "md5";

export const generateSign = (config: InternalAxiosRequestConfig<any>) => {
    const secret = getLocalStorage(USER_SECRET);
    if (config.url !== SIGN_UP) {
        const result =
            config.method?.toUpperCase() +
            (config.url || "") +
            (config?.data ? JSON.stringify(config.data) : "") +
            secret;
        console.log(result);
        console.log(md5(result));
        return md5(result);
    }
};

export const parseDataArray = (res: any) => {
    if (Array.isArray(res?.data)) return res.data;
    return [];
};
