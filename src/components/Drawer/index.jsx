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
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}
            onClick={onClose}>
            <div
                className={styles.drawer}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className='d-flex justify-between mb-30'>Cart
                    <img onClick={onClose} className='removeBtn cu-p' src="./img/btn-remove.svg" alt="remove" />
                </h2>


                {cartItems.length > 0 ? (
                    <div className="d-flex flex-column flex">
                        <div className={styles.items}>
                            {cartItems.map((obj) => (
                                <div key={obj.id} className='cartItem d-flex align-center mb-20' >
                                    <div
                                        style={{ backgroundImage: `url(${obj.imgUrl})` }}
                                        className='cartItemImg'>
                                    </div>

                                    <div className='mr-20 flex'>
                                        <p className='mb-5'>{obj.title}</p>

                                        <b>{obj.price}€</b>

                                        <div className={styles.quantityControl}>
                                            <button
                                                onClick={() => decreaseQuantity(obj.id)}
                                                className={styles.quantityButton}
                                            >
                                                −
                                            </button>

                                            <span className={styles.quantity}>
                                                {obj.quantity || 1}
                                            </span>

                                            <button
                                                onClick={() => increaseQuantity(obj.id)}
                                                className={styles.quantityButton}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <img className='removeBtn' onClick={() => deleteItem(obj.id)} src="./img/btn-remove.svg" alt="remove" />
                                </div>
                            ))}
                        </div>
                        <div className='cartTotalBlock'>
                            <ul>
                                <li>
                                    <span>Total</span>
                                    <div></div>
                                    <b>{totalPrice}€</b>
                                </li>
                                <li>
                                    <span>Tax 5%</span>
                                    <div></div>
                                    <b>{totalPrice * 5 / 100} €</b>
                                </li>
                            </ul>
                            <button disabled={isLoading} className='greenButton' onClick={onCheckout}>
                                Check out
                                <img src='/img/arrow.svg' alt='Arrow' />
                            </button>
                        </div>

                    </div>

                ) : (
                    <Info
                        title={isOrderComplete ? "Order is completed" : "Empty cart"}
                        image={isOrderComplete ? "./img/complete-order.jpg" : "./img/empty-cart.jpg"}
                        description={isOrderComplete ? `ordered product #${orderId}` : "add some products"}
                        onClose={onClose}
                    />

                )}



            </div>
        </div>
    )

}

export default Drawer;