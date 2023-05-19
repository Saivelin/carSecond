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
    let response = await getInfo(id)

    console.log(response)

    return {
        props: { userInf: response }
    }
}

const Users = ({ userInf }) => {
    const router = useRouter()
    const [authd, setAuthd] = useState(false)
    console.log(router.asPath.split("/")[2])
    console.log(userInf)
    useEffect(() => {
        if (userInf.user.role == "dialer") {
            router.push(`/dialers/${userInf.user.id}`)
        }
        if (localStorage.getItem("token")) {
            if (jwtDecode(localStorage.getItem("token")).id == router.asPath.split("/")[2]) {
                setAuthd(true)
            }
        }
        userInf.user.advertisements.forEach((el) => {
            let newPhotos = []
            el.photoForAdvertisements.map((photo) => {
                newPhotos.push(photo.url)
            })
            el.photoForAdvertisements = newPhotos
        })
        console.log(userInf)
    }, [])
    return (
        <div>
            <div className="userMain">
                {console.log(userInf.user)}
                <UserMain userInf={userInf.user} auth={authd} />
                <UserPageAddAnnouncement />
                <YourAnnouncement ads={userInf.user.advertisements} />
            </div>
            <div className="userAnnouncements">
                <CatalogTiles tiles={userInf.user.advertisements} />
            </div>
        </div>
    );
};

export default Users;