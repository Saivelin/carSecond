import axios from "axios";
import CatalogTiles from "./CatalogTiles";
import Filters from "./Filters";
import { apiUrl } from "@/vars";
import { useState, useEffect } from "react";
import { getAll } from "@/http/adsAPI";

const Catalog = ({ adsFromServer }) => {
    const [ads, setAds] = useState(adsFromServer)
    console.log(adsFromServer)

    return (
        <div className='catalog'>
            <Filters />
            <CatalogTiles tiles={ads} />
        </div>
    );
};

export default Catalog;