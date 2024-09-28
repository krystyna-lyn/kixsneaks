import { useState } from 'react';
import styles from '../Card/Card.module.scss';
import ContentLoader from "react-content-loader"


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
                <ContentLoader
                    speed={2}
                    width={210}
                    height={291}
                    viewBox="0 0 210 291"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="150" />
                    <rect x="0" y="169" rx="5" ry="5" width="150" height="15" />
                    <rect x="0" y="199" rx="5" ry="5" width="100" height="15" />
                    <rect x="0" y="232" rx="5" ry="5" width="100" height="25" />
                    <rect x="124" y="225" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
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