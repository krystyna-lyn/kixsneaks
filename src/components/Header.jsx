import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Header(props) {
    const { totalPrice } = useCart();

    return (
        <header className="d-flex justify-between align-center p-40">
            <div className='d-flex align-center'>
                <img width={40} height={40} src="./img/logo.png" alt="logo" />

                <Link to='/'>
                    <div>
                        <h3 className='text-uppercase'>KixsSneaks</h3>
                        <p className='opacity-5'>Best sneakers ever</p>
                    </div>
                </Link>
            </div>
            <ul className='d-flex'>
                <li className='mr-30 cu-p' onClick={props.openCart}>
                    <img src="./img/cart.svg" alt="cart" />
                    <span>{totalPrice}€</span>
                </li>
                <Link to='/favorites'>
                    <li className='mr-30 cu-p'>
                        <img src="./img/heart.svg" alt="favorites" />
                    </li>
                </Link>
                <Link to='/login'>
                    <li>
                        <img src="./img/user.svg" alt="user" />
                    </li>
                </Link>
            </ul>
        </header>
    )
}

export default Header;