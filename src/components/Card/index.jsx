import { useEffect, useState } from 'react';
import styles from '../Card/Card.module.scss';
import axios from 'axios';

function Card({ id, onPlus, title, price, imgUrl, onFav }) {

    const [isAdded, setIsAdded] = useState(false);
    const [onFavorite, setOnFavorite] = useState(false);

    useEffect(() => {

        axios.get('http://localhost:8000/favorite').then((res) => {
            setOnFavorite(res.data)
        })
    }, [])
    console.log(onFavorite)


    const onClickPlus = () => {
        setIsAdded(!isAdded);
        onPlus({ id, title, price, imgUrl });
    }

    const onClickFav = () => {
        setOnFavorite(!onFavorite);
        onFav({ id, title, price, imgUrl });

    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFav}>
                <img
                    src={onFavorite ? "./img/liked.svg" : "./img/unliked.svg"}
                    alt="heart"
                />
            </div>
            <img width={133} height={112} src={imgUrl} alt="item" />
            <h5>{title}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>price:</span>
                    <b>{price} €</b>
                </div>

                <img
                    className={styles.plus}
                    onClick={onClickPlus}
                    src={isAdded ? './img/btn-checked.svg' : './img/btn-plus.svg'}
                    alt="plus"
                />

            </div>
        </div>
    )
}

export default Card;