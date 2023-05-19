import jwtDecode from "jwt-decode";
import { $authHost, $host } from "./index";

export const getAllAds = async () => {
    const { data } = await $host.get(`api/advertisement/getAll`)
    return data
}

export const getById = async (id) => {
    const { data } = await $host.get(`api/advertisement/getById/${id}`)
    return data
}

export const getUserByIdOfAd = async (id) => {
    const { data } = await $host.get(`api/advertisement/getUserByIdOfAd/${id}`)
    return data
}