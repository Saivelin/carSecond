import CatalogTile from "./CatalogTile";
import { useEffect, useState } from "react";
import { apiUrl } from "@/vars";

const CatalogTiles = ({ tiles }) => {
    const [advertisements, setAdvertisements] = useState(tiles)

    const test = [{
        id: 1,
        img: "/test.png",
        photoForAdvertisements: ["/test.png", "/test1.png", "/test2.png", "/test3.png"],
        title: "BMW M5 Competition, 2020",
        year: 2020,
        complication: "Полный",
        mileage: 15463,
        type: "Седан",
        consumption: "4.4л / 456 л.с.",
        fuel: "Бензин",
        price: 12995000,
        generation: "Поколение: vi (F90) рестайлинг",
        shiftBox: "Автомат",
        wheel: "Левый",
        condition: "Не требует ремонта",
        doubled: true
    }]

    useEffect(() => {
        let newArr = []
        // test.forEach((el, i) => {
        //     if (test[i].doubled == true) {
        //         if (test[i + 1].doubled == false) {
        //             if ((i + 1) % 3 != 0) {
        //                 newArr.push(el)
        //             }
        //         }
        //     }
        // }) !!!Сортировка массива элементов
    })

    return (
        <>
            {!tiles ?
                <div className="catalogTiles catalogTiles-three">
                    <CatalogTile tile={test[0]} doubled={true} imgs={["/test.png", "/test1.png", "/test2.png", "/test3.png",]} />
                    <CatalogTile tile={test[0]} imgs={["/test.png", "/test1.png", "/test2.png", "/test3.png",]} />
                    <CatalogTile tile={test[0]} imgs={["/test.png", "/test1.png", "/test2.png", "/test3.png",]} />
                    <CatalogTile tile={test[0]} imgs={["/test.png", "/test1.png", "/test2.png", "/test3.png",]} />
                    <CatalogTile tile={test[0]} imgs={["/test.png", "/test1.png", "/test2.png", "/test3.png",]} />
                    <CatalogTile tile={test[0]} imgs={["/test.png", "/test1.png", "/test2.png", "/test3.png",]} />
                    <CatalogTile tile={test[0]} imgs={["/test.png", "/test1.png", "/test2.png", "/test3.png",]} />
                    <CatalogTile tile={test[0]} doubled={true} imgs={["/test.png", "/test1.png", "/test2.png", "/test3.png",]} />
                    <CatalogTile tile={test[0]} imgs={["/test.png", "/test1.png", "/test2.png", "/test3.png",]} />
                </div>
                :
                <div className="catalogTiles catalogTiles-three">
                    {tiles.map((el, i) => {
                        return <CatalogTile key={i} tile={el} imgs={el.photoForAdvertisements} />
                    })}
                </div>
            }
        </>
    );
};

export default CatalogTiles;