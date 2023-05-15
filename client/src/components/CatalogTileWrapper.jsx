import CatalogTile from "./CatalogTile";

const CatalogTileWrapper = () => {
    const test = [{
        img: "/test.png",
        title: "BMW M5 Competition, 2020",
        year: 2020,
        complication: "Полный",
        mileage: 15463,
        type: "Седан",
        consumption: "4.4л / 456 л.с.",
        fuel: "Бензин",
        price: 12995000
    }]
    console.log(test)
    return (
        <div className='catalogTileWrapper'>
            <CatalogTile tile={test[0]} />
            <CatalogTile tile={test[0]} />
            <CatalogTile tile={test[0]} />
        </div>
    );
};

export default CatalogTileWrapper;