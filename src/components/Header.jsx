import { Link } from "react-router-dom";

function Header(props) {
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
                    <span>120€</span>
                </li>
                <Link to='/favorites'>
                    <li className='mr-30 cu-p'>
                        <img src="./img/heart.svg" alt="favorites" />
                    </li>
                </Link>
                <li>
                    <img src="./img/user.svg" alt="user" />
                </li>
            </ul>
        </header>
    )
}

export default Header;