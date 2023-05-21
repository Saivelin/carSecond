import { apiUrl } from "@/vars";
import { getDealerById } from "@/http/userAPI";
import { modalState } from "../../state/atoms"
import { useSetRecoilState } from "recoil"
import CatalogTiles from "@/components/CatalogTiles";
import { useState, useEffect } from "react";
import axios from "axios";
import { getInfo } from "@/http/userAPI";

export const getServerSideProps = async (context) => {
    const { id } = context.params
    const response = await getInfo(id)

    return {
        props: { dialer: response.user }
    }
}


const dialerIndividualPage = ({ dialer }) => {
    console.log(dialer)

    const [ads, setAds] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(9)

    const indexOfLastAd = currentPage * postsPerPage
    const indexOfFirstAd = indexOfLastAd - postsPerPage
    const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd)

    const getAds = async () => {
        // const res = await axios.get(`${apiUrl}api/advertisement/getAll`)
        setAds(dialer.advertisements)
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

    const setModal = useSetRecoilState(modalState)
    console.log(dialer)
    return (
        <div className='dialerIndividualPage'>
            <div className="dialerIndividualPage__headerImageWrapper">
                <img src={`${apiUrl}/${dialer.headerImageForDealer}`} alt={dialer.lfp} />
            </div>
            <main className="dialerIndividualPage__mainInfo">
                <div className="dialerIndividualPage__logoWrapper">
                    <img src={`${apiUrl}/${dialer.logo}`} alt="" className="dialerIndividualPage__logo" />
                </div>
                <div className="dialerIndividualPage__mainInfo-info">
                    <h2 className="dialerIndividualPage__mainInfo-title">{dialer.lfp} - авто дилер</h2>
                    <p className="dialerIndividualPage__mainInfo-dialerNowInfo">350 тыс. клиентов в год, 750 объявлний</p>
                    <p className="dialerIndividualPage__mainInfo-about">{dialer.about.substr(0, 30)}...<img
                        onClick={() => {
                            setModal(
                                <p className="dialerIndividualPage__mainInfo-about-opened">{dialer.about}</p>
                            )
                        }}
                        src="/nextarrow.webp" alt="" /></p>
                </div>
                <div className="dialerIndividualPage__mainInfo-openParams">
                    <p>Параметры</p>
                    <button className="button-secondary">Использовать фильтры для поиска</button>
                </div>
                <CatalogTiles tiles={currentAds} />
            </main>
        </div>
    );
};

export default dialerIndividualPage;