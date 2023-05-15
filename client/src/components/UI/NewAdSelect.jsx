import Select from 'react-select';
import { useState, useEffect } from 'react';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import { update } from '@/http/userAPI';

const FilterSelect = ({ placeholder, props, classes, options, disabled, updateData }) => {
    const [state, setState] = useState(false);

    useEffect(() => {
        if (updateData) {
            updateData(state)
        }
    }, [state])

    const optionsDefault = [
        { name: 'BMW', value: 'bmw' },
        { name: 'Audi', value: 'audi' },
        { name: 'Ford', value: 'Ford' },
    ];


    return (
        <SelectSearch
            disabled={disabled ? "disabled" : ""}
            options={options ? options : optionsDefault}
            value={state}
            onChange={(e) => { setState(e) }}
            name="m"
            placeholder={placeholder ? placeholder : ""}
            search={true}
            renderValue={(valueProps) => <input {...valueProps} />}
            className={classes ? `newAdForm__select ` + classes : `newAdForm__select`}
            closeOnSelect
            emptyMessage="Марок тс по Вашему запросу не найдено"
        />
    );
};

export default FilterSelect;