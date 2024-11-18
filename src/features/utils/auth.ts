import { Md5 } from "ts-md5";
import api from "../api/index";

export const configureApiWithAuth = (username: string, password: string) => {
    const hashedPassword = Md5.hashStr(password);
    api.defaults.headers.common['Authorization'] = `Basic ${btoa(username + ':' + hashedPassword)}`;
};