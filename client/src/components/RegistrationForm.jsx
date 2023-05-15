import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { registration } from "../http/userAPI";

import { useRecoilState } from "recoil"
import { user } from "../state/atoms.js"

const RegistrationForm = () => {
    const [lfp, setLfp] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const [userAuth, setUserAuth] = useRecoilState(user)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = await registration(lfp, password, phone)
        setUserAuth(userData)
    }

    return (
        <motion.div className='login' initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}>
            <form className="login__registeredForm" onSubmit={handleSubmit}>
                {/* <img src="/logo.webp" alt="car-tron" /> */}
                <h2>Регистрация</h2>
                <input type="text" className="login__registeredForm__input" placeholder="Номер" onChange={(e) => { setPhone(e.target.value) }} />
                <input type="text" className="login__registeredForm__input" placeholder="Код смс-сообщения" />
                <input type="text" className="login__registeredForm__input" placeholder="ФИО" onChange={(e) => { setLfp(e.target.value) }} />
                <p className="login__registeredForm__warningText">Укажите ваши настоящие данные,
                    в ином случае могут возникнуть
                    проблемы с работой сервиса.</p>
                <Link className="login__registeredForm__warningLink" href={"#"}>Для чего нам нужны ваши настоящие ФИО.</Link>
                <input type="password" className="login__registeredForm__input" placeholder="Придумайте пароль" onChange={(e) => { setPassword(e.target.value) }} />
                <input type="password" className="login__registeredForm__input" placeholder="Повторте пароль" />
                <button className="login__registeredForm__registeredButton" type="submit">Заргестрироваться</button>
                <p className="login__registeredForm__privacyPolicy">Нажимая кнопку, я принимаю <Link className="login__registeredForm__privacyPolicy-link" href={"#"}>пользовательское соглашение</Link></p>
            </form>
        </motion.div>
    );
};

export default RegistrationForm;