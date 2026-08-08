import styles from "../Card/Card.module.scss";
import Loader from "../Loader";
import { useNavigate, useLocation } from "react-router-dom";
import { useShop } from "../../hooks/useShop";

function Card({
    id,
    onPlus,
    title,
    price,
    imgUrl,
    addFavorite,
    loading = false,
}) {

    const { favorite, isItemAdded, user } = useShop();

    const navigate = useNavigate();
    const location = useLocation();

    const obj = {
        id,
        title,
        price,
        imgUrl,
    };

    const isFavorite = favorite.some(
        item => String(item.productId) === String(id)
    );

    const onClickPlus = () => {
        if (!user) {
            navigate("/login", {
                state: {
                    from: location
                }
            });

            return;
        }

        onPlus(obj);
    };

    const onClickFavorite = () => {
        if (!user) {
            navigate("/login", {
                state: {
                    from: location
                }
            });

            return;
        }

        addFavorite(obj);
    };

    const itemAdded = isItemAdded(id);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <article className={styles.card}>

                    {addFavorite && (
                        <button
                            className={`${styles.favorite} ${isFavorite ? styles.favoriteActive : ""
                                }`}
                            onClick={onClickFavorite}
                            aria-label={
                                isFavorite
                                    ? "Remove from favorites"
                                    : "Add to favorites"
                            }
                        >
                            <span>
                                {isFavorite ? "♥" : "♡"}
                            </span>
                        </button>
                    )}

                    <div className={styles.imageWrapper}>
                        <img
                            className={styles.productImage}
                            src={imgUrl}
                            alt={title}
                        />
                    </div>

                    <div className={styles.info}>

                        <h3 className={styles.title}>
                            {title}
                        </h3>

                        <div className={styles.bottom}>

                            <div className={styles.priceBlock}>
                                <span>Price</span>
                                <strong>{price} €</strong>
                            </div>

                            {onPlus && (
                                <button
                                    className={`${styles.addButton} ${itemAdded ? styles.added : ""
                                        }`}
                                    onClick={onClickPlus}
                                    aria-label={
                                        itemAdded
                                            ? "Remove from cart"
                                            : "Add to cart"
                                    }
                                >
                                    <span>
                                        {itemAdded ? "✓" : "+"}
                                    </span>
                                </button>
                            )}

                        </div>

                    </div>

                </article>
            )}
        </>
    );
}

export default Card;