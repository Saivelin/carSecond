import React from 'react';

const FilterBtn = ({ children, onClick }) => {
    return (
        <button className='filter__btn' onClick={onClick}>
            {children}
        </button>
    );
};

export default FilterBtn;