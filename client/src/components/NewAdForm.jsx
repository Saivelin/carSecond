import { Input, Textarea } from "@chakra-ui/react";
import NewAdSelect from "./UI/NewAdSelect"
import Promo from "@/components/Promo";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { user } from "@/state/atoms";
import { useRecoilValue } from "recoil";
import { apiUrl } from "@/vars";


const NewAdForm = ({ classes, propertyes, userNow }) => {
    const userAuthd = useRecoilValue(user)

    const [marks, setMarks] = useState([{ name: "BMW", value: "BMW" }]);
    const [markNow, setMarkNow] = useState(false);

    const [models, setModels] = useState([]);
    const [modelNow, setModelNow] = useState(false);

    const [generation, setGeneration] = useState([]);
    const [generationNow, setGenerationNow] = useState(false);

    useEffect(() => {
        // getMarksOfCars()
        getAnyForSelect("https://cars-base.ru/api/cars/", "name", setMarks)
    }, [])

    useEffect(() => {
        console.log(markNow)
        if (markNow) {
            getAnyForSelect(`https://cars-base.ru/api/cars/${markNow}`, "name", setModels)
        }
    }, [markNow])

    useEffect(() => {
        console.log(modelNow)
        if (modelNow) {
            getAnyForSelect(`https://cars-base.ru/api/cars/${markNow}/${modelNow}?key=399f98497`, "name", setGeneration)
        }
    }, [modelNow])


    const getAnyForSelect = async (url, titleOfVal, setter) => {
        await axios.get(url).then((res) => {
            let newAny = []
            console.log(res.data)
            res.data.forEach((el) => {
                newAny.push({ name: el[titleOfVal], value: el.id })
            })
            setter(newAny)
        })
    }


    const [driveNow, setDriveNow] = useState()
    const [transmission, setTransmission] = useState()

    const filterColors = (inputValue) => {
        return colourOptions.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterColors(inputValue));
        }, 1000);
    };


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


    const handleSubmit = (e) => {
        e.preventDefault()
        let formDat = new FormData(e.target)
        formDat.append("mark", markNow)
        formDat.append("model", modelNow)
        formDat.append("generation", "1")
        formDat.append("userId", userAuthd.id)

        // drive,
        // modification,
        // features,
        // howToContactType,
        // vin,
        // price,
        // cleared,
        // whenVehicleBought,
        // typeOfDocument,

        for (let pair of formDat.entries()) {
            console.log(pair[0] + ' - ' + pair[1]);
        }
        axios.post(`${apiUrl}api/advertisement/add`, formDat).then((res) => { console.log(res) })
        axios({
            method: "post",
            url: `${apiUrl}api/advertisement/add`,
            data: formDat,
            headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${localStorage.getItem('token')}` }
        }).then(() => { })
    }


    return (

        <form className={classes ? "newAdForm " + classes : "newAdForm"} onSubmit={handleSubmit}>
            <div className="newAdForm__left newAdForm__left-sectionOne">
                <label htmlFor="addImageForNewAd">
                    <input type="file" size={"md"} id="addImageForNewAd" className="newAdForm__addImageForNewAd" name="photo" />
                    <div className="newAdForm__addImageForNewAdWrapper">
                        <div className="newAdForm__addImageForNewAdWrapper-content">
                            <img src="/addPhoto.svg" alt="" />
                            <p>Добавить фото</p>
                        </div>
                    </div>
                </label>
                <div className="newAdForm__left-inputsWrapper">
                    <div className="newAdForm__left-document">
                        <label className="radioWrapper" htmlFor="originalDocType">
                            <input value={"Бензин"} type="radio" id="originalDocType" name="carRegistrationCertificate" className="radioWrapper__radio" />
                            <div className="transmissionWrapper" style={{ textAlign: "center", display: "block" }}>Оригинал / Электронный ПТС</div>
                        </label>
                        <label className="radioWrapper" htmlFor="duplicateDocType">
                            <input value={"Дубликат"} type="radio" id="duplicateDocType" name="carRegistrationCertificate" className="radioWrapper__radio" />
                            <div className="transmissionWrapper" style={{ textAlign: "center", display: "block" }}>Дубликат</div>
                        </label>
                        <label className="radioWrapper" htmlFor="noneDocumentType">
                            <input value={"Нет ПТС"} type="radio" id="noneDocumentType" name="carRegistrationCertificate" className="radioWrapper__radio" />
                            <div className="transmissionWrapper" style={{ textAlign: "center", display: "block" }}>Нет ПТС</div>
                        </label>
                        {/* <label className="radioWrapper" htmlFor="original">
                            <input type="radio" id="original" name="document" className="radioWrapper__radio" />
                            <div className="documentWrapper">Оригинал / Электронный ПТС</div>
                        </label>
                        <label className="radioWrapper" htmlFor="duplicate">
                            <input type="radio" id="duplicate" name="document" className="radioWrapper__radio" />
                            <div className="documentWrapper">Дубликат</div>
                        </label>
                        <label className="radioWrapper" htmlFor="noneDocument">
                            <input type="radio" id="noneDocument" name="document" className="radioWrapper__radio" />
                            <div className="documentWrapper">Нет ПТС</div>
                        </label> */}
                    </div>
                    <input type="date" className="newAdForm__input-primary" placeholder="Когда было куплено авто" />
                    <div className="newAdForm__left-rightLeft">
                        <div>
                            <input type="checkbox" id="garant" name="isUnderWarranty" />
                            <label htmlFor="garant">На гарантии</label>
                        </div>
                        <div>
                            <input type="checkbox" id="rastomoge" name="cleared" />
                            <label htmlFor="rastomoge">Не растоможено</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="newAdForm__right newAdForm__right-sectionOne">
                <NewAdSelect placeholder={"Марка"} options={marks} updateData={(value) => { setMarkNow(value) }} />
                <NewAdSelect placeholder={"Модель"} options={models} disabled={markNow === false ? true : false} updateData={(value) => { setModelNow(value) }} />
                <NewAdSelect placeholder={"Поколение"} options={generation} disabled={modelNow === false ? true : false} />
                <input type="text" className="newAdForm__input-primary" placeholder="Год выпуска" name="year" />
                <input type="text" className="newAdForm__input-primary" placeholder="Пробег, км" name="mileage" />
                <input type="text" className="newAdForm__input-primary" placeholder="Тип кузова" name="bodyType" />
                <input type="text" className="newAdForm__input-primary" placeholder="Гос номер" name="licensePlate" />
                {/* <NewAdSelect placeholder={"Тип кузова"} /> */}
                <div className="newAdForm__right-flexAuto">
                    <label className="radioWrapper" htmlFor="autoBox">
                        <input value={"Бензин"} type="radio" id="autoBox" name="fuel" className="radioWrapper__radio" />
                        <div className="transmissionWrapper"><img src="/desB.webp" alt="" /><span>Бензин</span></div>
                    </label>
                    <label className="radioWrapper" htmlFor="mechBox">
                        <input value={"Дизель"} type="radio" id="mechBox" name="fuel" className="radioWrapper__radio" />
                        <div className="transmissionWrapper"><img src="/desT.webp" alt="" /><span>Дизель</span></div>
                    </label>
                </div>
                <NewAdSelect updateData={(value) => { setDriveNow(value) }} placeholder={"Привод"} options={[{ name: "Задний", value: "Задний" }, { name: "Полный", value: "Полный" }, { name: "Передний", value: "Передний" }]} />
                <NewAdSelect updateData={(value) => { setTransmission(value) }} placeholder={"Коробка передач"} />
                <NewAdSelect placeholder={"Модификация"} />
                <div className="newAdForm__right-rightLeft">
                    <div>
                        <input type="checkbox" id="1" />
                        <label htmlFor="1">286 л.с. (30d / 3.0d AT)</label>
                    </div>
                    <div>
                        <input type="checkbox" id="2" />
                        <label htmlFor="2">265 л.с. (30d / 3.0d AT)</label>
                    </div>
                    <div>
                        <input type="checkbox" id="3" />
                        <label htmlFor="3">400 л.с. (M50d / 3.0d AT)</label>
                    </div>
                    <div>
                        <input type="checkbox" id="4" />
                        <label htmlFor="4">340 л.с. (40d / 3.0d AT)</label>
                    </div>
                    <div>
                        <input type="checkbox" id="5" />
                        <label htmlFor="5">249 л.с. (30d / 3.0d AT)</label>
                    </div>
                </div>
            </div>


            <div className="newAdForm__left newAdForm__left-sectionTwo">
                <div className="newAdForm__left-inputsWrapper">
                    <textarea className="newAdForm__input-primary newAdForm__input-primary-text" placeholder="Ваш комментарий / описание" name="comment" />
                    <div className="newAdForm__left-rightLeft">
                        <div>
                            <input type="checkbox" id="caTronOnly" name="caTronOnly" />
                            <label htmlFor="caTronOnly">Моё объявление есть только на CarTron</label>
                        </div>
                        <div>
                            <input type="checkbox" id="broken" name="broken" />
                            <label htmlFor="broken">Битый или не на ходу</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="newAdForm__right newAdForm__right-sectionTwo">
                <input type="text" className="newAdForm__input-primary" placeholder="Цвет" name="color" />
                <div className="newAdForm__right-colorSelection">
                    <input name="colorCar" type="radio" value="black" />
                    <input name="colorCar" type="radio" value="grey" />
                    <input name="colorCar" type="radio" value="white" />
                    <input name="colorCar" type="radio" value="blackGrey" />
                    <input name="colorCar" type="radio" value="red" />
                    <input name="colorCar" type="radio" value="green" />
                    <input name="colorCar" type="radio" value="brown" />
                    <input name="colorCar" type="radio" value="beige" />
                    <input name="colorCar" type="radio" value="orange" />
                    <input name="colorCar" type="radio" value="vinous" />
                    <input name="colorCar" type="radio" value="purple" />
                    <input name="colorCar" type="radio" value="yellow" />
                </div>
                {/* <input type="text" className="newAdForm__input-primary" placeholder="Пробег, км" /> */}
                <NewAdSelect placeholder={"Особенности"} />
                <div className="newAdForm__right-rightLeft">
                    <div>
                        <input type="checkbox" id="gasFeature" name="gasFeature" />
                        <label htmlFor="gasFeature">Газобалонное оборудование</label>
                    </div>
                </div>
            </div>
            <div className="newAdForm__left newAdForm__left-sectionThree">
                <div className="newAdForm__left-inputsWrapper ">
                    {/* <NewAdSelect placeholder={"Повреждения"} /> */}
                    <div className="newAdForm__damageWrapper">
                        <div className="newAdForm__damageWrapper-content">
                            <img src="/damagePhoto.svg" alt="" />
                            <p>Отметьте на схеме окрашенные части кузова и повреждения</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="newAdForm__right newAdForm__right-sectionThree">
                <NewAdSelect placeholder={"Номер телефона"} options={[{ name: userNow.phone, value: userNow.phone }]} />
                <div className="newAdForm__right-contact">
                    <label className="radioWrapper " htmlFor="">
                        <input type="radio" id="" name="contact" className="radioWrapper__radio" />
                        <div className="contactWrapper"><span>+ номер</span></div>
                    </label>
                    <label className="radioWrapper" htmlFor="">
                        <input type="radio" id="" name="contact" className="radioWrapper__radio" />
                        <div className="contactWrapper"><span>с 9:00 до 21:00</span></div>
                    </label>
                    <label className="radioWrapper" htmlFor="">
                        <input type="radio" id="" name="contact" className="radioWrapper__radio" />
                        <div className="contactWrapper"><span>Связываться со мной только в чате</span></div>
                    </label>
                    <label className="radioWrapper" htmlFor="">
                        <input type="radio" id="" name="contact" className="radioWrapper__radio" />
                        <div className="contactWrapper"><span>Только по телефону</span></div>
                    </label>
                    <label className="radioWrapper" htmlFor="">
                        <input type="radio" id="dulicate" name="contact" className="radioWrapper__radio" />
                        <div className="contactWrapper"><span>Оба варианта</span></div>
                    </label>
                </div>
                <div className="newAdForm__right-rightLeft">
                    <div>
                        <input type="checkbox" id="spanSecure" name="spanSecure" />
                        <label htmlFor="spanSecure">Бесплатная защита от спама</label>
                    </div>
                </div>
                <div className="newAdForm__right-rightLeft">
                    <div>
                        <input type="checkbox" id="refusalToCall" name="refusalToCall" />
                        <label htmlFor="refusalToCall">Отказ от звонков партнёров</label>
                    </div>
                </div>
                <input type="text" className="newAdForm__input-primary" placeholder="Место осмотра Город / улица / район" name="address" />
                <div className="newAdForm__addImageForNewAdWrapper">
                    <div className="newAdForm__addImageForNewAdWrapper-content">
                        <p>КАРТА</p>
                    </div>
                </div>
            </div>



            <div className="newAdForm__left newAdForm__left-sectionFour">
                <div className="newAdForm__left-inputsWrapper ">
                    <div className="newAdForm__left-rightLeft">
                        <div>
                            <input type="checkbox" id="exchange" name="exchange" />
                            <label htmlFor="exchange">Возможен обмен</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="newAdForm__right newAdForm__right-sectionFour">
                {/* <input type="text" className="newAdForm__input-primary" placeholder="Место осмотра Город / улица / район" /> */}
                {/* <input type="text" className="newAdForm__input-primary" placeholder="Место осмотра Город / улица / район" /> */}
                <NewAdSelect placeholder={"Свидетельство о регистрации (СТС)"} />
                <div className="newAdForm__right-rightLeft">
                    <div>
                        <input type="checkbox" id="notRegisteredInRF" name="notRegisteredInRF" />
                        <label htmlFor="notRegisteredInRF">Авто не на учёте в РФ</label>
                    </div>
                </div>
            </div>

            <div className='newAdForm__promtSystem'>
                <img src="/promt.png" alt="" className="newAdForm__promtSystem-image" />
                <div className="newAdForm__promtSystem-body">
                    <h2>Умная сиситема промтов</h2>
                    <div className="newAdForm__promtSystem-body-promts">
                        <p>Срочно</p>
                        <p>Срочно</p>
                        <p>Срочно</p>
                        <p>Срочно</p>
                        <p>Срочно</p>
                        <p>Срочно</p>
                        <p>Срочно</p>
                        <p>Срочно</p>
                        <p>Ксенон</p>
                        <p>Ксенон</p>
                        <p>Ксенон</p>
                        <p>Ксенон</p>
                        <p>Ксенон</p>
                        <p>Ксенон</p>
                        <p>Ксенон</p>
                        <p>Ксенон</p>
                    </div>
                    <div className='newAdForm__promtSystem-body-buttons'>
                        <button className='editPromts'>Редактировать</button>
                        <button className='addPromts'>+ Промты</button>
                    </div>
                </div>
            </div>

            <h1 className="newAdForm__headerFooter">Последний шаг, воспользуйтесь подарком от CarTron
            </h1>
            <motion.div className='services  newAdForm__services' initial="hidden" whileInView="visible" variants={list}>
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


            <div className="newAdForm__publishAn">
                <button className="newAdForm__publishAn-button">Опубликовать объявление</button>
                <p>Размещая объявление, вы подтверждаете согласие с <a href="#">правилами CarTron </a></p>
            </div>
        </form>
    );
};

export default NewAdForm;