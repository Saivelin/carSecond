import UserMain from "@/components/UserMain";
import UserPageAddAnnouncement from "@/components/UserPageAddAnnouncement";
import YourAnnouncement from "@/components/YourAnnouncement";
import { useRouter } from "next/router";
import CatalogTiles from "@/components/CatalogTiles";
import { getInfo } from "@/http/userAPI";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

export const getServerSideProps = async (context) => {
    const { id } = context.params
    const response = await getInfo(id)

    return {
        props: { userInf: response }
    }
}

const Users = ({ userInf }) => {
    const router = useRouter()
    const [authd, setAuthd] = useState(false)
    console.log(router.asPath.split("/")[2])
    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (jwtDecode(localStorage.getItem("token")).id == router.asPath.split("/")[2]) {
                setAuthd(true)
            }
        }
    }, [])
    return (
        <div>
            <div className="userMain">
                <UserMain userInf={userInf.user} auth={authd} />
                <UserPageAddAnnouncement />
                <YourAnnouncement />
            </div>
            <div className="userAnnouncements">
                <CatalogTiles />
            </div>
        </div>
    );
};

export default Users;