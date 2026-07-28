import { useContext } from "react";
import styles from "../Card/Card.module.scss";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context";

function Card({
    id,
    onPlus,
    title,
    price,
    imgUrl,
    addFavorite,
    loading = false,
}) {

    const { favorite, isItemAdded, user } = useContext(AppContext);
    const navigate = useNavigate();

    // product from items collection
    const obj = {
        id,
        title,
        price,
        imgUrl,
    };

    // check if product in favoriites

    const isFavorite = favorite.some(
        item => item.productId === id
    );


    const onClickPlus = () => {
        if (!user) {
            navigate("/login");
            return;
        }

        onPlus(obj);
    }

    const onClickFavorite = () => {
        if (!user) {
            navigate("/login");
            return;
        }

        addFavorite(obj);
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className={styles.card}>

                    {addFavorite && (
                        <div
                            className={styles.favorite}
                            onClick={onClickFavorite}
                        >
                            <img
                                src={
                                    isFavorite
                                        ? "./img/liked.svg"
                                        : "./img/unliked.svg"
                                }
                                alt="heart"
                            />
                        </div>
                    )}

                    <img
                        width="100%"
                        height={135}
                        src={imgUrl}
                        alt="item"
                    />

                    <h5>{title}</h5>

                    <div className="d-flex justify-between align-center">

                        <div className="d-flex flex-column">
                            <span>price:</span>
                            <b>{price} €</b>
                        </div>

                        {onPlus && (
                            <img
                                className={styles.plus}
                                onClick={onClickPlus}
                                src={
                                    isItemAdded(id)
                                        ? "./img/btn-checked.svg"
                                        : "./img/btn-plus.svg"
                                }
                                alt="plus"
                            />
                        )}

                    </div>
                </div>
            )}
        </>
    );
}

export default Card;