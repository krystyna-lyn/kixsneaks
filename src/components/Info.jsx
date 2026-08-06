import React from 'react';

const Info = ({ onClose, title, image, description }) => {

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className='mb-20' src={image} alt="empty-cart" />
            <h2>{title}</h2>
            <p className='opacity-6'>{description}</p>
            <button className="greenButton" onClick={onClose}>
                <img src="./img/arrow.svg" alt="arrow" />
                go back
            </button>
        </div>

    )
}

export default Info;
