function Header() {
    return (
        <header className="d-flex justify-between align-center p-40">
            <div className='d-flex align-center'>
                <img width={40} height={40} src="./img/logo.png" alt="logo" />
                <div>
                    <h3 className='text-uppercase'>KixsSneaks</h3>
                    <p className='opacity-5'>Best sneakers ever</p>
                </div>
            </div>
            <ul className='d-flex'>
                <li className='mr-30'>
                    <img src="./img/cart.svg" alt="cart" />
                    <span>120€</span>
                </li>
                <li>
                    <img src="./img/user.svg" alt="user" />
                </li>
            </ul>
        </header>
    )
}

export default Header;