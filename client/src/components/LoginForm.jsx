import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { login } from "../http/userAPI";
import { useRecoilState } from "recoil"
import { user } from "../state/atoms.js"
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';


const LoginForm = () => {
    const { push } = useRouter()

    const [userAuth, setUserAuth] = useRecoilState(user)

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm();

    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (e) => {
        const userData = await login(phone, password)
        console.log(userData)
        setUserAuth(userData)
        push(`/users/${userData.id}`)
    }

    const handleClick = () => {
        setUserAuth(false)
    }

    useEffect(() => {
        console.log(userAuth)
        if (userAuth != false || localStorage.getItem("token")) {
            push(`/users/${userAuth.id}`)
        }
    }, [])

    return (
        <motion.div className='login login-login' initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}>
            <form className="login__registeredForm" onSubmit={handleSubmit(onSubmit)}>
                {/* <img src="/logo.webp" alt="car-tron" /> */}
                <h2>Войти в аккаунт</h2>
                <input
                    {...register("phone",
                        {
                            required: "Данное поле обязательно для заполнения",
                            minLength: { value: 2, message: "Минимальная длина данного поля: 2 символа" },
                            pattern: { value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i, message: "В данном поле должен быть указан Ваш номер телефона" },
                        })}
                    type="text"
                    className="login__registeredForm__input"
                    placeholder="Номер телефона"
                    onChange={(e) => { setPhone(e.target.value); }} />
                {
                    errors?.phone
                        ?
                        errors?.phone.message
                            ?
                            <motion.p initial={{ x: 10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}>{errors?.phone.message}</motion.p>
                            :
                            <motion.p initial={{ x: 10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}>Error</motion.p>
                        : ""
                }
                <input
                    {...register("password",
                        {
                            required: "Данное поле обязательно для заполнения",
                        })}
                    type="password"
                    className="login__registeredForm__input"
                    placeholder="Пароль"
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                {
                    errors?.password
                        ?
                        errors?.password?.message
                            ?
                            <motion.p initial={{ x: 10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}>{errors?.password.message}</motion.p>
                            :
                            <motion.p initial={{ x: 10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}>Error</motion.p>
                        : ""
                }
                <p>Нет аккаута? <Link href={"/registration"}><strong>Зарегистрируйтесь</strong></Link></p>
                <button className="login__registeredForm__registeredButton" type="submit">Войти</button>
            </form>
            <button onClick={handleClick}>Exit</button>
        </motion.div>
    );
};

export default LoginForm;