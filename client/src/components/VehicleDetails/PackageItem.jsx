import React from 'react';

const PackageItem = ({ pack }) => {
    return (
        <div className='packageItem'>
            <p className='packageItem__title'>{pack.title}</p>
            <ul className='packageItem__list'>
                {pack.props.map((el) => {
                    return <li className='packageItem__list-item'>{el}</li>
                })}
            </ul>
        </div>
    );
};

export default PackageItem;