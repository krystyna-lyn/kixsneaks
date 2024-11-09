import { useContext, useState } from "react";
import Info from "../Info";
import AppContext from "../../context";
import axios from "axios";
import { useCart } from "../../hooks/useCart";

import styles from '../Drawer/Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState(null)
    const { cartItems, setCartItems } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);

    const { totalPrice } = useCart()


    const onCheckout = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('http://localhost:8000/orders', { items: cartItems });
            setOrderId(data.id)
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('http://localhost:8000/cart/' + item.id)
                await delay(1000);
            }
        }
        catch {
            alert('something wrong')
        }
        setIsLoading(false)

    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className='d-flex justify-between mb-30'>Cart
                    <img onClick={onClose} className='removeBtn cu-p' src="./img/btn-remove.svg" alt="remove" />
                </h2>


                {items.length > 0 ? (
                    <div className="d-flex flex-column flex">
                        <div className="items flex">
                            {items.map((obj) => (
                                <div key={obj.id} className='cartItem d-flex align-center mb-20' >
                                    <div
                                        style={{ backgroundImage: `url(${obj.imgUrl})` }}
                                        className='cartItemImg'>
                                    </div>

                                    <div className='mr-20 flex'>
                                        <p className='mb-5'>{obj.title}</p>
                                        <b>{obj.price}€</b>
                                    </div>
                                    <img className='removeBtn' onClick={() => onRemove(obj.id)} src="./img/btn-remove.svg" alt="remove" />
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
                        description={isOrderComplete ? `ordered product #${orderId}` : "add some products"} />
                )}



            </div>
        </div>
    )

}

export default Drawer;