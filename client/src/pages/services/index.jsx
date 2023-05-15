import Promo from "@/components/Promo";
import { motion } from "framer-motion";

const index = () => {

    const list = {
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                when: "afterChildren",
            },
        },
    }

    const item = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: 10 },
    }

    return (
        <div>
            <div className="services__mainImgWrapper">
                <p>Сервисы CarTron</p>
            </div>
            <motion.div className='services' initial="hidden" whileInView="visible" variants={list}>
                <motion.div className="services__item" variants={item}>
                    <Promo
                        propertyes={{
                            title: "Умный калькулятор",
                            imgTest: "Умный калькулятор",
                            img: "/calculator.webp",
                            btns: [
                                "Рассчитать для данного авто",
                                "Рассчитать"
                            ],
                            imgPosition: 2,
                            props: [
                                "Абсолютно бесплатный сервис",
                                "Расчёт средней цены содержания авто в месяц / год ",
                                "Подскажет где лучше всего обслужить авто после покупки",
                                "Найдет лучшие предложения по кредитованию / страхованию",
                                "Если авто имеет недостатки, подскажет где их можно устранить",
                                "Ищет ближайшие сервисы с лучшими отзывами",
                            ],
                        }}
                    />
                </motion.div>
                <motion.div className="services__item" variants={item}>
                    <Promo
                        propertyes={{
                            title: "Проврека по VIN",
                            imgTest: "Проверка собственника",
                            img: "/vin.webp",
                            btns: [
                                "Купить полный отчёт от 99р",
                                "Бесплатный отчёт"
                            ],
                            imgPosition: 1,
                            props: [
                                "Характеристики совпадают с ПТС",
                                "Данные о розыске и запрете на регистрацию не найдены",
                                "4 записи в истории пробегов",
                                "7 записей в истории эксплуатации",
                                "Поиск данных о залоге",
                                "Данные о ДТП не найдены"
                            ],
                        }}
                    />
                </motion.div>
                <motion.div className="services__item" variants={item}>
                    <Promo
                        propertyes={{
                            title: "Наш сервис CarTron предоставляет бесплатное продвижение новым пользователям",
                            imgTest: "",
                            img: "/car_sale_3d_minimalis_dark_bue_colors_is_basis.webp",
                            btns: [
                                "Использовать бесплатное продвижение",
                                ""
                            ],
                            imgPosition: 2,
                            props: [
                                "Продвижение товара в ленте",
                                "Выделение ценника товара",
                                "Отображение в ленте в виде двойной плитки",
                                "Проверка авто по Госномеру",
                                "Подтверждение док-ов на автомобиль",
                                "Помощь в поиске клиентов"
                            ],
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default index;