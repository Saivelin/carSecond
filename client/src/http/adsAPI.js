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

export const getBodyTypes = async () => {
    const res = await $host.get("api/advertisement/getBodyTypes")
    return res.data
}

export const getFilteredCatalogData = async (
    id = undefined,
    mark = undefined,
    model = undefined,
    generation = undefined,
    bodyType = undefined,
    transmission = undefined,
    // engine = undefined,
    drive = undefined,
    priceFrom = undefined,
    priceTo = undefined,
    valueFrom = undefined,
    valueTo = undefined,
    mileageFrom = undefined,
    mileageTo = undefined) => {
    let postdata = {}
    if (mark) {
        postdata.mark = mark
        if (model) {
            postdata.model = model
            if (generation) {
                postdata.generation = generation
            }
        }
    }
    if (bodyType) {
        postdata.bodyType = bodyType
    }
    if (drive) {
        postdata.drive = drive
    }
    if (transmission) {
        postdata.transmission = transmission
    }
    if (priceFrom) {
        postdata.priceFrom = priceFrom
    }
    if (priceTo) {
        postdata.priceTo = priceTo
    }
    if (valueFrom) {
        postdata.valueFrom = valueFrom
    }
    if (valueTo) {
        postdata.valueTo = valueTo
    }
    if (mileageFrom) {
        postdata.mileageFrom = mileageFrom
    }
    if (mileageTo) {
        postdata.mileageTo = mileageTo
    }
    console.log(postdata)

    const { data } = await $host.post(`api/advertisement/getByFiltersFrom`, postdata)
    console.log(data)
    return data;
}