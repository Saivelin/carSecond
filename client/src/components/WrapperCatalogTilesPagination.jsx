import React from 'react';
import CatalogTiles from './CatalogTiles';
import PagePagination from './PagePagination';

const WrapperCatalogTilesPagination = ({ tiles, itemsPerPage, totalItems, paginate }) => {
    return (
        <>
            <CatalogTiles tiles={tiles} />
            <PagePagination
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                paginate={paginate}
            />
        </>
    );
};

export default WrapperCatalogTilesPagination;