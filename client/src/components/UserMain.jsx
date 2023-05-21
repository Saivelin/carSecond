import { modalState } from "../state/atoms.js"
import { useSetRecoilState } from "recoil"
import EditUserProfile from "./EditUserProfile.jsx";
import { apiUrl } from "../vars/index.js"
import { motion } from "framer-motion";

const UserMain = ({ userInf, auth }) => {
    const setModal = useSetRecoilState(modalState)
    return (
        <div className=''>
            <motion.div className="userProfile">
                <img src={userInf.logo ? `${apiUrl}/${userInf.logo}` : "/user.png"} alt="" className="userProfile__logo" />
                <div className="userProfile__name">
                    <p className="">{userInf.lfpOrNick == "lfp" ? userInf.lfp : userInf.nick}</p>
                </div>
            </motion.div>
            {auth === true ?
                <div className="userProfileFooter">
                    <img src="/email.svg" alt="" />
                    <img src="/heart.svg" alt="" />
                    <img src="/preferences.svg" alt="" onClick={() => { setModal(<EditUserProfile userInf={userInf} />) }} />
                </div>
                : ""
            }
        </div>
    );
};

export default UserMain;