import axios from "axios";
import CatalogTiles from "./CatalogTiles";
import Filters from "./Filters";
import { apiUrl } from "@/vars";
import { useState, useEffect } from "react";
import { getAllAds } from "@/http/adsAPI";
import { request } from 'graphql-request';
import PagePagination from "./PagePagination";
import WrapperCatalogTilesPagination from "./WrapperCatalogTilesPagination";

const Catalog = () => {
    const [ads, setAds] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(3)

    const indexOfLastAd = currentPage * postsPerPage
    const indexOfFirstAd = indexOfLastAd - postsPerPage
    const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd)

    const getAds = async () => {
        const res = await axios.get(`${apiUrl}api/advertisement/getAll`)
        setAds(res.data)
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        getAds()
    }, [])

    useEffect(() => {
        console.log(ads)
        console.log(currentAds)
    }, [ads, currentPage])

    return (
        <div className='catalog'>
            <Filters />
            <CatalogTiles tiles={currentAds} />
            <PagePagination
                className={"catalog__pagePagination"}
                itemsPerPage={postsPerPage}
                totalItems={ads.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default Catalog;