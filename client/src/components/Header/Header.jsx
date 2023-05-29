import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil"
import { themeState, user } from "../../state/atoms"

const Header = () => {
    const { pathname } = useRouter();
    const router = useRouter()
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

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => {
            const delay = 0;//1 + i * 0.5;
            return {
                pathLength: 1,
                opacity: 1,
                transition: {
                    pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                    opacity: { delay, duration: 0.01 }
                }
            };
        }
    };

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
                <div className="header__nav-item"><Link href={"/dialers"} className={pathname == "/dilers" ? "header__nav-active" : "header__nav-hover"}>Диллеры</Link></div>
                <div className="header__nav-item"><Link href={"/services"} className={pathname == "/services" ? "header__nav-active" : "header__nav-hover"}>Услуги</Link></div>
                <div className="header__nav-item header__nav-personal ">
                    {userState === false ?
                        <Link href={"/login"} className={pathname.includes("/users") ? "header__nav-active" : "header__nav-hover"}>
                            <button>Войти</button>
                        </Link>
                        :
                        <>
                            <motion.svg
                                onClick={() => { router.push(`/users/${userState.id}`) }}
                                width="75"
                                height="75"
                                viewBox="0 0 100 100"
                                initial="hidden"
                                whileHover="visible"
                                animate={pathname.includes("/users") ? "visible" : ""}
                                style={{ position: "absolute", marginLeft: "5.025%", cursor: "pointer" }}
                            >
                                <motion.circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    stroke="#4069C9"
                                    variants={draw}
                                    custom={1}
                                />
                            </motion.svg>
                            <Link href={`/users/${userState.id}`}>
                                <img src="/personal.webp" alt="Личный кабинет" />
                            </Link>
                        </>
                    }
                </div>
            </nav >
        </header >
    );
};

export default Header;