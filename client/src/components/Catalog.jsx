import CatalogTiles from "./CatalogTiles";
import Filters from "./Filters";

const Catalog = () => {
    return (
        <div className='catalog'>
            <Filters />
            <CatalogTiles />
        </div>
    );
};

export default Catalog;