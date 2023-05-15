import React from 'react';

const FilterBtn = ({ children }) => {
    return (
        <button className='filter__btn'>
            {children}
        </button>
    );
};

export default FilterBtn;