import React, { useContext } from 'react'
import AppContext from '../context';

const Info = ({ title, description }) => {

    const { } = useContext(AppContext);

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className='mb-20' src="./img/empty-cart.jpg" alt="empty-cart" />
            <h2>{title}</h2>
            <p className='opacity-6'>{description}</p>
            <button className="greenButton">
                <img src="./img/arrow.svg" alt="arrow" />
                go back
            </button>
        </div>
    )
}

export default Info;
