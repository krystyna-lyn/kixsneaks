import { useState } from 'react';
import styles from '../Card/Card.module.scss';
import Loader from '../Loader';


function Card({
    id,
    onPlus,
    title,
    price,
    imgUrl,
    addFavorite,
    favorited = false,
    added = false,
    loading = false
}) {

    const [isAdded, setIsAdded] = useState(added);
    const [isFavorite, setIsFavorite] = useState(favorited);


    const onClickPlus = () => {
        setIsAdded(!isAdded);
        onPlus({ id, title, price, imgUrl });
    }

    const onClickFavorite = () => {
        addFavorite({ id, title, price, imgUrl });
        setIsFavorite(!isFavorite);
    }

    return (
        <>
            {loading ?
                <Loader />
                : <div className={styles.card}>
                    <div className={styles.favorite} onClick={onClickFavorite} >
                        <img
                            src={isFavorite ? "./img/liked.svg" : "./img/unliked.svg"}
                            alt="heart"
                        />
                    </div>
                    <img width='100%' height={135} src={imgUrl} alt="item" />
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
            }

        </>
    )
}

export default Card;