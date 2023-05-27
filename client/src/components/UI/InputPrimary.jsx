import React from 'react';

const InputPrimary = ({ classes, placeholder, setter, type }) => {
    const changeHandler = (e) => {
        if (setter) {
            if (type == "number") {
                setter(Number(e.target.value))
            }
            else {
                setter(e.target.value)
            }
            console.log(e.target.value)
        }
    }

    return (
        <input type={type ? type : "text"} onChange={changeHandler} className={!classes ? 'input-primary' : `input-primary ${classes}`} placeholder={placeholder ? placeholder : ""} />
    );
};

export default InputPrimary;