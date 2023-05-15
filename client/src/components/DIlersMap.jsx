import NewAdSelect from "./UI/NewAdSelect"

const DIlersMap = () => {
    return (
        <div className='dilersMap'>
            <form action="" className="dilersMap__form">
                <NewAdSelect placeholder='Класс авто' />
                <NewAdSelect placeholder='Марка' />
                <NewAdSelect placeholder='Модель' />
                <NewAdSelect placeholder='Поколение' />
                <NewAdSelect placeholder='Год выпуска' />
                <NewAdSelect placeholder='Двигатель' />
                <div className="dilersMap__form-twoInOne">
                    <input type="text" className="dilersMap__input" placeholder="Цена От" />
                    <input type="text" className="dilersMap__input" placeholder="До" />
                </div>
                <div className="dilersMap__form-twoInOne">
                    <input type="text" className="dilersMap__input" placeholder="Мощность От" />
                    <input type="text" className="dilersMap__input" placeholder="До" />
                </div>
            </form>
            <div className="dilersMap__map">map</div>
        </div>
    );
};

export default DIlersMap;