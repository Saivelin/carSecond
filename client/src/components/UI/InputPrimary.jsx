import React from 'react';

const InputPrimary = ({ classes, placeholder }) => {
    return (
        <input type="text" className={!classes ? 'input-primary' : `input-primary ${classes}`} placeholder={placeholder ? placeholder : ""} />
    );
};

export default InputPrimary;