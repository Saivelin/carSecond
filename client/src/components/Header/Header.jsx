import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil"
import { themeState, user } from "../../state/atoms"

const Header = () => {
    const { pathname } = useRouter();
    const [theme, setTheme] = useRecoilState(themeState);
    const [userState, setUserState] = useRecoilState(user);

    const toggleTheme = () => {
        if (theme === "white") {
            setTheme("dark")
        }
        else if (theme === "dark") {
            setTheme("white")
        }
        else {
            setTheme("white")
            console.log("theme error")
        }
    }

    return (
        <header className="header">
            <nav className="header__nav">
                <motion.div
                    className="header__nav-item header__nav-theme"
                >
                    <img src={theme === "white" ? "/sun.svg" : "/moon.svg"} alt="" onClick={toggleTheme} />
                </motion.div>
                <div className="header__nav-item"><Link href={"/"} className={pathname == "/" ? "header__nav-active" : "header__nav-hover"}>Объявления</Link></div>
                <div className="header__nav-item"><Link href={"/details"} className={pathname == "/details" ? "header__nav-active" : "header__nav-hover"}>Запчасти</Link></div>
                <div className="header__nav-item header__nav-logo">
                    <Link href={"/"} className="">
                        <img src="/logo.webp" alt="car-tron" />
                    </Link>
                </div>
                <div className="header__nav-item"><Link href={"/dilers"} className={pathname == "/dilers" ? "header__nav-active" : "header__nav-hover"}>Диллеры</Link></div>
                <div className="header__nav-item"><Link href={"/services"} className={pathname == "/services" ? "header__nav-active" : "header__nav-hover"}>Услуги</Link></div>
                <div className="header__nav-item header__nav-personal ">
                    {userState === false ?
                        <Link href={"/login"} className={pathname.includes("/users") ? "header__nav-active" : "header__nav-hover"}>
                            <button>Войти</button>
                        </Link>
                        :
                        <Link href={`/users/${userState.id}`} className={pathname.includes("/users") ? "header__nav-active" : "header__nav-hover"}>
                            <img src="/personal.webp" alt="Личный кабинет" />
                        </Link>
                    }
                </div>
            </nav >
        </header >
    );
};

export default Header;