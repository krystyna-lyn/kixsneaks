
function Drawer(props) {
    return (
        <div className="overlay">
            <div className='drawer'>
                <h2 className='d-flex justify-between mb-30'>Cart
                    <img onClick={props.onClose} className='removeBtn cu-p' src="./img/btn-remove.svg" alt="remove" />
                </h2>
                <div className='items'>
                    <div className='cartItem d-flex align-center mb-20'>
                        <div
                            style={{ backgroundImage: 'url(./img/sneakers/1.jpg' }}
                            className='cartItemImg'
                        ></div>

                        <div className='mr-20 flex'>
                            <p className='mb-5'>Man sneakers Nike Blazer Mid Suede</p>
                            <b>170€</b>
                        </div>
                        <img className='removeBtn' src="./img/btn-remove.svg" alt="remove" />
                    </div>
                    <div className='cartItem d-flex align-center mb-20'>
                        <div
                            style={{ backgroundImage: 'url(./img/sneakers/1.jpg' }}
                            className='cartItemImg'
                        ></div>

                        <div className='mr-20 flex'>
                            <p className='mb-5'>Man sneakers Nike Blazer Mid Suede</p>
                            <b>170€</b>
                        </div>
                        <img className='removeBtn' src="./img/btn-remove.svg" alt="remove" />
                    </div>


                </div>

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
                    <button className='greenButton'>Check out
                        <img src='/img/arrow.svg' alt='Arrow' />
                    </button>
                </div>
            </div>
        </div>
    )

}

export default Drawer;