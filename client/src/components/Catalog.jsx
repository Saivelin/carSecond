import axios from "axios";
import CatalogTiles from "./CatalogTiles";
import Filters from "./Filters";
import { apiUrl } from "@/vars";
import { useState, useEffect } from "react";
import { getAllAds } from "@/http/adsAPI";

const Catalog = () => {
    const [ads, setAds] = useState()

    const getAds = async () => {
        const res = await axios.get(`${apiUrl}api/advertisement/getAll`)
        setAds(res.data)
    }

    useEffect(() => {
        getAds()
    }, [])

    useEffect(() => {
        console.log(ads)
    }, [ads])

    return (
        <div className='catalog'>
            <Filters />
            <CatalogTiles tiles={ads} />
        </div>
    );
};

export default Catalog;