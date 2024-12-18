import { useState } from 'react';
import { useContext } from "react";
import styles from '../Card/Card.module.scss';
import Loader from '../Loader';
import AppContext from '../../context';


function Card({
    id,
    onPlus,
    title,
    price,
    imgUrl,
    addFavorite,
    favorited = false,
    loading = false
}) {


    const { isItemAdded } = useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(favorited);

    const obj = { id, parentId: id, title, imgUrl, price };

    const onClickPlus = () => {
        onPlus(obj);
    }

    const onClickFavorite = () => {
        addFavorite(obj);
        setIsFavorite(!isFavorite);
    }

    return (
        <>
            {loading ?
                <Loader />
                : <div className={styles.card}>
                    <div className={styles.favorite} onClick={onClickFavorite} >
                        {addFavorite &&
                            <img
                                src={isFavorite ? "./img/liked.svg" : "./img/unliked.svg"}
                                alt="heart"
                            />}
                    </div>
                    <img width='100%' height={135} src={imgUrl} alt="item" />
                    <h5>{title}</h5>
                    <div className='d-flex justify-between align-center'>
                        <div className='d-flex flex-column'>
                            <span>price:</span>
                            <b>{price} €</b>
                        </div>

                        {onPlus &&
                            <img
                                className={styles.plus}
                                onClick={onClickPlus}
                                src={isItemAdded(id) ? './img/btn-checked.svg' : './img/btn-plus.svg'}
                                alt="plus"
                            />
                        }
                    </div>
                </div>
            }

        </>
    )
}

export default Card;