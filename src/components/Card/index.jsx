import { useState } from 'react';
import styles from '../Card/Card.module.scss';

function Card({ onPlus, title, price, imgUrl, onFavorite }) {
    const [isAdded, setIsAdded] = useState(false);

    const onClickPlus = () => {
        setIsAdded(!isAdded);
        onPlus({ title, price, imgUrl });
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img onClick={onFavorite} src="./img/unliked.svg" alt="heart" />
            </div>
            <img width={133} height={112} src={imgUrl} alt="item" />
            <h5>{title}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>price:</span>
                    <b>{price} €</b>
                </div>

                <img className={styles.plus} onClick={onClickPlus} src={isAdded ? './img/btn-checked.svg' : './img/btn-plus.svg'} alt="plus" />

            </div>
        </div>
    )
}

export default Card;