import { useState } from 'react';
import NewAdSelect from './UI/NewAdSelect';
import FilterBtn from './UI/FilterBtn';
import FilterSelect from './UI/FilterSelect';
import InputPrimary from './UI/InputPrimary';
import { useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { getFilteredCatalogData } from '@/http/adsAPI';
import { apiUrl } from '@/vars';

const Filters = ({ setterFilteredAds }) => {
    const [count, setCount] = useState(318);
    const [filteredAds, setFilteredAds] = useState([])

    const [marks, setMarks] = useState([{ name: "BMW", value: "BMW" }]);
    const [markNow, setMarkNow] = useState(false);

    const [models, setModels] = useState([]);
    const [modelNow, setModelNow] = useState(false);

    const [generation, setGeneration] = useState([]);
    const [generationNow, setGenerationNow] = useState(false);

    const [bodyTypes, setBodyTypes] = useState([])
    const [bodyTypeNow, setBodyTypeNow] = useState([])

    const [transmissionNow, setTransmissionNow] = useState()
    const [driveNow, setDriveNow] = useState()
    const [priceFrom, setPriceFrom] = useState(1)
    const [priceTo, setPriceTo] = useState(999999999999999)

    useEffect(() => {
        // getMarksOfCars()
        getAnyForSelect("https://cars-base.ru/api/cars/", "name", setMarks)
    }, [])

    useEffect(() => {
        if (markNow) {
            getAnyForSelect(`https://cars-base.ru/api/cars/${markNow}`, "name", setModels)
        }
    }, [markNow])

    useEffect(() => {
        if (modelNow) {
            getAnyForSelect(`https://cars-base.ru/api/cars/${markNow}/${modelNow}?key=399f98497`, "name", setGeneration)
        }
    }, [modelNow])

    useEffect(() => {
        // getMarksOfCars()
        getAnyForSelect(`${apiUrl}api/advertisement/getBodyTypes`, "title", setBodyTypes, true)
    }, [])

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

    const getAnyForSelect = async (url, titleOfVal, setter, titleIsId = false) => {
        await axios.get(url).then((res) => {
            let newAny = []
            console.log(res)
            res.data.forEach((el) => {
                if (titleIsId == false) {
                    newAny.push({ name: el[titleOfVal], value: el.id })
                }
                else {
                    newAny.push({ name: el[titleOfVal], value: el[titleOfVal] })
                }
            })
            setter(newAny)
        })
    }

    const handelSubmit = async (e) => {
        e.preventDefault()
        let postData = [undefined]
        if (markNow) {
            postData.push(markNow)
            if (modelNow) {
                postData.push(modelNow)
                if (generationNow) {
                    postData.push(generationNow)
                }
                else {
                    postData.push(undefined)
                }
            } else {
                postData.push(undefined)
                postData.push(undefined)
            }
        } else {
            postData.push(undefined)
            postData.push(undefined)
            postData.push(undefined)
        }
        if (bodyTypeNow) {
            postData.push(bodyTypeNow)
        }
        else {
            postData.push(undefined)
        }
        if (transmissionNow) {
            postData.push(transmissionNow)
        }
        else {
            postData.push(undefined)
        }
        if (driveNow) {
            postData.push(driveNow)
        }
        else {
            postData.push(undefined)
        }
        if (priceFrom) {
            postData.push(Number(priceFrom))
        }
        else {
            postData.push(undefined)
        }
        if (priceTo) {
            postData.push(Number(priceTo))
        }
        else {
            postData.push(undefined)
        }
        console.log(postData)
        const res = await getFilteredCatalogData(...postData)//useCatalogFilters(markNow)
        console.log(res)
        setFilteredAds(res)
        // setTimeout(() => {
        setterFilteredAds(res)
        // }, 1000)
        // setterFilteredAds(useCatalogFilters(markNow))
    }

    useEffect(() => { console.log(filteredAds) }, [filteredAds])

    return (
        <motion.form
            className='filter'
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <NewAdSelect placeholder={"Марка"} options={marks} updateData={(value) => { setMarkNow(value) }} />
            <NewAdSelect placeholder={"Модель"} options={models} disabled={markNow === false ? true : false} updateData={(value) => { setModelNow(value) }} />
            <NewAdSelect placeholder={"Поколение"} options={generation} disabled={modelNow === false ? true : false} updateData={(value) => { setGenerationNow(value) }} />
            <NewAdSelect placeholder={"Кузов"} options={bodyTypes} updateData={(value) => { setBodyTypeNow(value) }} />
            <NewAdSelect placeholder={"Коробка"} options={[{ value: "Автомат", name: "Автомат" }, { value: "Механика", name: "Механика" }, { value: "Робот", name: "Робот" }, { name: "Вариативная", value: "Вариативная" }]} updateData={(value) => { setTransmissionNow(value) }} />
            <NewAdSelect placeholder={"Двигатель"} />
            <NewAdSelect placeholder={"Привод"} options={[{ value: "Задний", name: "Задний" }, { value: "Передний", name: "Передний" }, { value: "Полный", name: "Полный" }]} updateData={(value) => { setDriveNow(value) }} />
            <div className="filter__twoInOne">
                <InputPrimary classes="input-filter" placeholder="Цена от" setter={setPriceFrom} type="number" />
                <InputPrimary classes="input-filter" placeholder="Цена до" setter={setPriceTo} type="number" />
            </div>
            <div className="filter__twoInOne">
                <InputPrimary classes="input-filter" placeholder="Объем от" />
                <InputPrimary classes="input-filter" placeholder="Объем до" />
            </div>
            <div className="filter__twoInOne">
                <InputPrimary classes="input-filter" placeholder="Пробег от" />
                <InputPrimary classes="input-filter" placeholder="Пробег до" />
            </div>
            <FilterBtn onClick={handelSubmit}>
                Показать {count} предложений
            </FilterBtn>
        </motion.form>
    );
};

export default Filters;