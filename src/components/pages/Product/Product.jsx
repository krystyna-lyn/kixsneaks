import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../../services/productService";
import { useShop } from "../../../hooks/useShop";
import Loader from "../../Loader";
import styles from "./Product.module.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Product = ({ openCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        cartItems,
        addToCart,
        isItemAdded,
        increaseQuantity,
        decreaseQuantity
    } = useShop();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error(error);
                toast.error("Error loading product");
            } finally {
                setIsLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    if (isLoading) {
        return <Loader />;
    }

    if (!product) {
        return (
            <div className={styles.notFound}>
                <h2>Product not found</h2>

                <button onClick={() => navigate("/")}>
                    Back to shop
                </button>
            </div>
        );
    }

    const itemAdded = isItemAdded(product.id);

    const cartItem = cartItems.find(
        item => String(item.productId) === String(product.id)
    );

    const quantity = cartItem?.quantity || 0;

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <section className={styles.productPage}>

            <button
                className={styles.backButton}
                onClick={() => navigate(-1)}
            >
                ← Back to shop
            </button>

            <div className={styles.productCard}>

                <div className={styles.imageSection}>

                    <div className={styles.imageWrapper}>
                        <img
                            src={product.imgUrl}
                            alt={product.title}
                        />
                    </div>

                </div>

                <div className={styles.infoSection}>

                    <span className={styles.category}>
                        KIXSSNEAKS / COLLECTION
                    </span>

                    <h1>{product.title}</h1>

                    <div className={styles.price}>
                        {product.price} €
                    </div>

                    <p className={styles.description}>
                        Discover the perfect combination of style,
                        comfort and everyday performance.
                    </p>

                    {itemAdded && (
                        <div className={styles.quantityControl}>

                            <button
                                onClick={() =>
                                    decreaseQuantity(product.id)
                                }
                                className={styles.quantityButton}
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>

                            <span className={styles.quantity}>
                                {quantity}
                            </span>

                            <button
                                onClick={() =>
                                    increaseQuantity(product.id)
                                }
                                className={styles.quantityButton}
                                aria-label="Increase quantity"
                            >
                                +
                            </button>

                        </div>
                    )}

                    <div className={styles.divider}></div>
                    <div className={styles.cartActions}>
                        <button
                            className={`${styles.addButton} ${itemAdded ? styles.added : ""}`}
                            onClick={handleAddToCart}
                            disabled={itemAdded}
                            aria-label={itemAdded ? "Added to cart" : "Add to cart"}
                        >
                            <span>
                                {itemAdded
                                    ? "✓ Added to cart"
                                    : "Add to cart"}
                            </span>

                            {!itemAdded && (
                                <span className={styles.arrow}>
                                    →
                                </span>
                            )}
                        </button>
                        {itemAdded && (
                            <button
                                className={styles.viewCartButton}
                                onClick={openCart}
                            >
                                View cart
                                <span>→</span>
                            </button>
                        )}
                    </div>
                    <div className={styles.details}>

                        <div>
                            <span>Delivery</span>
                            <strong>Free shipping</strong>
                        </div>

                        <div>
                            <span>Returns</span>
                            <strong>30 days</strong>
                        </div>

                        <div>
                            <span>Availability</span>
                            <strong>In stock</strong>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Product;