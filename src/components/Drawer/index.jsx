import { useState } from "react";
import Info from "../Info";
import { useCart } from "../../hooks/useCart";
import { createOrder, clearCart } from "../../services/orderService";
import { useAuth } from "../../hooks/useAuth";

import styles from '../Drawer/Drawer.module.scss'
import { toast } from "react-toastify";
import { useShop } from "../../hooks/useShop";



function Drawer({ onClose, opened }) {

    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const { totalPrice } = useCart()
    const {
        cartItems,
        setCartItems,
        deleteItem,
        increaseQuantity,
        decreaseQuantity
    } = useShop();


    const onCheckout = async () => {
        try {

            setIsLoading(true);

            // create order


            const orderId = await createOrder({
                userId: user.uid,
                items: cartItems
            });

            setOrderId(orderId);

            // delete items from cart
            await clearCart(cartItems);

            // refresh React
            setCartItems([]);

            setIsOrderComplete(true);

        } catch (error) {

            console.error(error);
            toast.error("Something went wrong");

        } finally {

            setIsLoading(false);

        }
    };
    return (
        <div
            className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}
            onClick={onClose}
        >
            <div
                className={styles.drawer}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <div>
                        <span className={styles.eyebrow}>YOUR BAG</span>
                        <h2>Shopping cart</h2>
                    </div>

                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close cart"
                    >
                        ×
                    </button>
                </div>

                {cartItems.length > 0 ? (
                    <div className={styles.cartContent}>

                        <div className={styles.items}>
                            {cartItems.map((obj) => (
                                <div
                                    key={obj.id}
                                    className={styles.cartItem}
                                >
                                    <div
                                        style={{
                                            backgroundImage: `url(${obj.imgUrl})`
                                        }}
                                        className={styles.cartItemImg}
                                    />

                                    <div className={styles.itemInfo}>
                                        <p className={styles.itemTitle}>
                                            {obj.title}
                                        </p>

                                        <b className={styles.itemPrice}>
                                            {obj.price}€
                                        </b>

                                        <div className={styles.quantityControl}>
                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(obj.id)
                                                }
                                                className={styles.quantityButton}
                                            >
                                                −
                                            </button>

                                            <span className={styles.quantity}>
                                                {obj.quantity || 1}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    increaseQuantity(obj.id)
                                                }
                                                className={styles.quantityButton}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        className={styles.removeButton}
                                        onClick={() => deleteItem(obj.id)}
                                        aria-label={`Remove ${obj.title}`}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className={styles.totalBlock}>

                            <div className={styles.totalRow}>
                                <span>Subtotal</span>
                                <span>{totalPrice.toFixed(2)}€</span>
                            </div>

                            <div className={styles.totalRow}>
                                <span>Tax <small>5%</small></span>
                                <span>
                                    {(totalPrice * 5 / 100).toFixed(2)}€
                                </span>
                            </div>

                            <div className={styles.divider} />

                            <div className={`${styles.totalRow} ${styles.finalTotal}`}>
                                <span>Total</span>
                                <b>
                                    {(totalPrice * 1.05).toFixed(2)}€
                                </b>
                            </div>

                            <button
                                disabled={isLoading}
                                className={styles.checkoutButton}
                                onClick={onCheckout}
                            >
                                <span>
                                    {isLoading ? "Processing..." : "Checkout"}
                                </span>

                                {!isLoading && <span className={styles.arrow}>→</span>}
                            </button>
                        </div>

                    </div>

                ) : (
                    <Info
                        title={
                            isOrderComplete
                                ? "Order is completed"
                                : "Empty cart"
                        }
                        image={
                            isOrderComplete
                                ? "./img/complete-order.jpg"
                                : "./img/empty-cart.jpg"
                        }
                        description={
                            isOrderComplete
                                ? `ordered product #${orderId}`
                                : "add some products"
                        }
                        onClose={onClose}
                    />
                )}
            </div>
        </div>
    );

}

export default Drawer;