import { Input } from "@chakra-ui/react";
import NewAdSelect from "./UI/NewAdSelect"

const NewAdForm = ({ classes }) => {
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

    return (
        <form className={classes ? "newAdForm " + classes : "newAdForm"}>
            <div className="newAdForm__left">
                <label htmlFor="addImageForNewAd">
                    <input type="file" size={"md"} id="addImageForNewAd" className="newAdForm__addImageForNewAd" />
                    <div className="newAdForm__addImageForNewAdWrapper">
                        <div className="newAdForm__addImageForNewAdWrapper-content">
                            <img src="/addPhoto.svg" alt="" />
                            <p>Добавить фото</p>
                        </div>
                    </div>
                </label>
                <div className="newAdForm__left-inputsWrapper">
                    <NewAdSelect placeholder={"Тип документа ПТС"} />
                    <input type="date" className="newAdForm__input-primary" placeholder="Когда было куплено авто" />
                    <div className="newAdForm__left-rightLeft">
                        <div>
                            <input type="checkbox" id="garant" />
                            <label htmlFor="garant">На гарантии</label>
                        </div>
                        <div>
                            <input type="checkbox" id="rastomoge" />
                            <label htmlFor="rastomoge">Не растоможено</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="newAdForm__right">
                <NewAdSelect placeholder={"Марка"} />
                <NewAdSelect placeholder={"Модель"} />
                <NewAdSelect placeholder={"Год выпуска"} />
                {/* <input type="text" className="newAdForm__input-primary" placeholder="Марка" />
                <input type="text" className="newAdForm__input-primary" placeholder="Модель" />
                <input type="text" className="newAdForm__input-primary" placeholder="Год выпуска" />
                <input type="text" className="newAdForm__input-primary" placeholder="Двигатель" /> */}
                <div className="newAdForm__right-flexAuto">
                    <label className="radioWrapper" htmlFor="autoBox">
                        <input type="radio" id="autoBox" name="transmission" className="radioWrapper__radio" />
                        <div className="transmissionWrapper"><img src="/desB.webp" alt="" /><span>Бензин</span></div>
                    </label>
                    <label className="radioWrapper" htmlFor="mechBox">
                        <input type="radio" id="mechBox" name="transmission" className="radioWrapper__radio" />
                        <div className="transmissionWrapper"><img src="/desT.webp" alt="" /><span>Дизель</span></div>
                    </label>
                </div>
                <NewAdSelect placeholder={"Тип кузова"} />
                <NewAdSelect placeholder={"Поколение"} />
                <NewAdSelect placeholder={"Привод"} />
                <NewAdSelect placeholder={"Коробка передач"} />
                <NewAdSelect placeholder={"Модификация"} />
                <input type="text" className="newAdForm__input-primary" placeholder="Другой цвет" />

            </div>
        </form>
    );
};

export default NewAdForm;