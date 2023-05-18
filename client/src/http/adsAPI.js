import jwtDecode from "jwt-decode";
import { $authHost, $host } from "./index";

export const getAll = async () => {
    const { data } = await $host.get(`api/advertisement/getAll`)
    return data
}