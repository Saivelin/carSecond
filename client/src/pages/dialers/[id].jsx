import { apiUrl } from "@/vars";
import { getDealerById } from "@/http/userAPI";
import { modalState } from "../../state/atoms"
import { useSetRecoilState } from "recoil"
import CatalogTiles from "@/components/CatalogTiles";

export const getServerSideProps = async (context) => {
    const { id } = context.params
    const response = await getDealerById(id)

    return {
        props: { dialer: response[0] }
    }
}

const dialerIndividualPage = ({ dialer }) => {
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
                <CatalogTiles />
            </main>
        </div>
    );
};

export default dialerIndividualPage;