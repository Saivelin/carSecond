import Link from "next/link";
import { useEffect, useState } from "react";
import { apiUrl } from "@/vars";

const CatalogTile = ({ tile, doubled, imgs }) => {
    const [imagesOfVehicle, setImagesOfVehicle] = useState(tile.photoForAdvertisements)
    useEffect(() => {
        console.log(imagesOfVehicle)
    }, [])
    console.log(tile)

    const vehicleHover = (i) => {
        let arr = imagesOfVehicle
        arr[i] = arr.splice(0, 1, arr[i])[0]
        console.log(arr)
        setImagesOfVehicle(() => [...arr])
    }

    const vehicleMouseLeave = (i) => {
        let arr = imagesOfVehicle
        arr[i] = arr.splice(0, 1, arr[i])[0]
        console.log(arr)
        setImagesOfVehicle(() => [...arr])
    }

    return (
        <div className={doubled === true ? "catalogTile catalogTile-doubled" : "catalogTile"}>
            <div className="catalogTile__mainImageWrapper">
                <img src={imagesOfVehicle ? apiUrl + imagesOfVehicle[0].url : imagesOfVehicle} alt={tile?.title} className={!doubled ? 'catalogTile__img' : "catalogTile__img-doubled"} />
            </div>
            <div className={!doubled ? "catalogTile__about" : "catalogTile__about catalogTile__about-doubled"}>
                <h5 className='catalogTile__title'><Link href={"/vehicles/" + tile?.id}>{tile?.mark} {tile?.model}</Link></h5>
                <div className=''>
                    {doubled === true ?
                        <div className='catalogTile__about-around'>
                            <p>{doubled === true && tile?.generation ? "Поколение: " + String(tile?.generation) : tile?.year}</p>
                            <p>{doubled === true && tile?.shiftBoxType ? "Коробка: " + String(tile?.shiftBoxType) : tile?.complication}</p>
                        </div>
                        :
                        ""
                    }
                    <div className='catalogTile__about-around'>
                        <p>{doubled === true ? "Год выпуска: " + String(tile?.year) : tile?.year}</p>
                        <p>{doubled === true ? "Кузов: " + String(tile?.bodyType) : tile?.bodyType}</p>
                    </div>
                    <div className='catalogTile__about-around'>
                        <p>{doubled === true ? "Пробег: " + String(tile?.mileage) : tile?.mileage}км</p>
                        <p>{doubled === true ? "Тип: " + String(tile?.type) : tile?.type}</p>
                    </div>
                    <div className='catalogTile__about-around'>
                        <p>{doubled === true ? "Расход: " + String(tile?.consumption) : tile?.consumption}</p>
                        <p>{doubled === true ? "Топливо: " + String(tile?.fuel) : tile?.fuel}</p>
                    </div>
                    <div className='catalogTile__about-around'>
                        <p>{doubled === true ? "Руль: " + String(tile?.wheel) : tile?.wheel}</p>
                        <p>{doubled === true ? "Состояние: " + String(tile?.condition) : tile?.condition}</p>
                    </div>
                </div>
                {!doubled ? <p className='catalogTile__price'>{Number(tile?.price).toLocaleString()}₽</p> : ""}
            </div>
            {doubled === true ?
                <div className="catalogTile__footer">
                    <div className="catalogTile__imgs">
                        {imagesOfVehicle.map((el, i) => {
                            if (i != 0) {
                                return <img
                                    src={el} alt=""
                                    onMouseEnter={() => {
                                        vehicleHover(i)
                                    }}
                                    onMouseLeave={() => {
                                        vehicleMouseLeave(i)
                                    }}
                                />
                            }
                        })}
                    </div>
                    <p className='catalogTile__price'>{(tile?.price).toLocaleString()}₽</p>
                </div>
                :
                ""
            }
        </div >
    );
};

export default CatalogTile;