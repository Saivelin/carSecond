import { useState } from 'react';
import NewAdSelect from './UI/NewAdSelect';
import FilterBtn from './UI/FilterBtn';
import FilterSelect from './UI/FilterSelect';
import InputPrimary from './UI/InputPrimary';
import { useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Filters = () => {
    const [count, setCount] = useState(318);

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

    // const getMarksOfCars = async () => {
    //     await axios.get("https://cars-base.ru/api/cars/").then((res) => {
    //         let newMarks = []
    //         console.log(res.data)
    //         res.data.forEach((el) => {
    //             newMarks.push({ name: el.name, value: el.id })
    //         })
    //         setMarks(newMarks)
    //     })
    // }

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

    return (
        <motion.div
            className='filter'
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <NewAdSelect placeholder={"Марка"} options={marks} updateData={(value) => { setMarkNow(value) }} />
            <NewAdSelect placeholder={"Модель"} options={models} disabled={markNow === false ? true : false} updateData={(value) => { setModelNow(value) }} />
            <NewAdSelect placeholder={"Поколение"} options={generation} disabled={modelNow === false ? true : false} />
            <NewAdSelect placeholder={"Кузов"} />
            <NewAdSelect placeholder={"Коробка"} options={[{ value: "Автомат", name: "Автомат" }, { value: "Механика", name: "Механика" }]} />
            <NewAdSelect placeholder={"Двигатель"} />
            <NewAdSelect placeholder={"Привод"} options={[{ value: "Задний", name: "Задний" }, { value: "Передний", name: "Передний" }, { value: "Полный", name: "Полный" }]} />
            <div className="filter__twoInOne">
                <InputPrimary classes="input-filter" placeholder="Цена от" />
                <InputPrimary classes="input-filter" placeholder="Цена до" />
            </div>
            <div className="filter__twoInOne">
                <InputPrimary classes="input-filter" placeholder="Объем от" />
                <InputPrimary classes="input-filter" placeholder="Объем до" />
            </div>
            <div className="filter__twoInOne">
                <InputPrimary classes="input-filter" placeholder="Пробег от" />
                <InputPrimary classes="input-filter" placeholder="Пробег до" />
            </div>
            <FilterBtn>
                Показать {count} предложений
            </FilterBtn>
        </motion.div>
    );
};

export default Filters;