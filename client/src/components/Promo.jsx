const Promo = ({ propertyes }) => {
    return (
        <div className={propertyes.imgPosition === 1 ? "promo" : "promo promoRightImage"}>
            {propertyes.imgPosition === 1 ?
                <div className="promo__image" style={{ backgroundImage: `url('${propertyes.img}')` }}>
                    <p>{propertyes.imgText}</p>
                </div>
                :
                ""
            }
            <div className="promo__about">
                <h3>{propertyes.title}</h3>
                <ul className="promo__list">
                    {propertyes.props.map((el) => {
                        return <li className="promo__list-item">{el}</li>
                    })}
                </ul>
                <div className="promo__btnsWrapper">
                    {propertyes.btns.map((el) => {
                        if (el) {
                            return <button className="promo__btn">{el}</button>
                        }
                    })}
                </div>
            </div>
            {propertyes.imgPosition === 2 ?
                <div className="promo__image" style={{ backgroundImage: `url('${propertyes.img}')` }}>
                    <p>{propertyes.imgText}</p>
                </div>
                :
                ""
            }
        </div>
    );
};

export default Promo;