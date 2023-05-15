import Select from 'react-select';
import { useState } from 'react';

const FilterSelect = ({ placeholder }) => {
    const [options, setOptions] = useState([
        { value: "chocolate", label: "chokolad" },
        { value: "banana", label: "Banana" },
        { value: "apple", label: "Apple" },
    ])

    return (
        <Select placeholder={placeholder} options={options} className='filter__select' />
    );
};

export default FilterSelect;