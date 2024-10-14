import { useContext, useState } from "react";
import Info from "../Info";
import AppContext from "../../context";

function Drawer({ cartItems, onClose, onRemove }) {
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const { setcartItems } = useContext(AppContext);

    const onCheckout = () => {
        setIsOrderComplete(true);
        setcartItems([]);
    }

    return (
        <div className="overlay">
            <div className='drawer'>
                <h2 className='d-flex justify-between mb-30'>Cart
                    <img onClick={onClose} className='removeBtn cu-p' src="./img/btn-remove.svg" alt="remove" />
                </h2>


                {cartItems.length > 0 ? (

                    <div className='items'>
                        {cartItems.map((obj) => (
                            <div key={obj.id} className='cartItem d-flex align-center mb-20' >
                                <div
                                    style={{ backgroundImage: `url(${obj.imgUrl})` }}
                                    className='cartItemImg'
                                ></div>

                                <div className='mr-20 flex'>
                                    <p className='mb-5'>{obj.title}</p>
                                    <b>{obj.price}€</b>
                                </div>
                                <img className='removeBtn' onClick={() => onRemove(obj.id)} src="./img/btn-remove.svg" alt="remove" />
                            </div>
                        ))}
                        <div className='cartTotalBlock'>
                            <ul>
                                <li>
                                    <span>Total</span>
                                    <div></div>
                                    <b>250€</b>
                                </li>
                                <li>
                                    <span>Tax 5%</span>
                                    <div></div>
                                    <b>12,5€</b>
                                </li>
                            </ul>
                            <button className='greenButton' onClick={onCheckout}>Check out
                                <img src='/img/arrow.svg' alt='Arrow' />
                            </button>
                        </div>

                    </div>
                ) : (
                    <Info
                        title={isOrderComplete ? "Order is completed" : "Empty cart"}
                        image={isOrderComplete ? "./img/complete-order.jpg" : "./img/empty-cart.jpg"}
                        description={isOrderComplete ? "" : "add some products"} />
                )}



            </div>
        </div>
    )

}

export default Drawer;