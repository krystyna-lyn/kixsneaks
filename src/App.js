import 'macro-css';



function App() {
  return (
    <div className="wrapper clear">
      <div className="overlay">
        <div className='drawer'>
          <h2 className='d-flex justify-between mb-30'>Cart
            <img className='removeBtn cu-p' src="./img/btn-remove.svg" alt="remove" />
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
      <div className="content p-40">
        <div className='d-flex align-center mb-40 justify-between'>
          <h1 className=''>All sneakers</h1>
          <div className="search-block d-flex">
            <img src="./img/search.svg" alt="search" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        <div className="sneakers d-flex justify-between flex-wrap">
          <div className="card">
            <div className='favorite'>
              <img src="./img/unliked.svg" alt="heart" />
            </div>
            <img width={133} height={112} src="./img/sneakers/1.jpg" alt="item" />
            <h5>Man sneakers Nike Blazer Mid Suede</h5>
            <div className='d-flex justify-between align-center'>
              <div className='d-flex flex-column'>
                <span>price:</span>
                <b>70,99 €</b>
              </div>
              <button className='button'>
                <img width={11} height={11} src="./img/plus.svg" alt="plus" />
              </button>
            </div>
          </div>
          <div className="card">
            <div className='favorite'>
              <img src="./img/unliked.svg" alt="heart" />
            </div>
            <img width={133} height={112} src="./img/sneakers/2.jpg" alt="item" />
            <h5>Man sneakers Nike Blazer Mid Suede</h5>
            <div className='d-flex justify-between align-center'>
              <div className='d-flex flex-column'>
                <span>price:</span>
                <b>70,99 €</b>
              </div>
              <button className='button'>
                <img width={11} height={11} src="./img/plus.svg" alt="plus" />
              </button>
            </div>
          </div>
          <div className="card">
            <div className='favorite'>
              <img src="./img/unliked.svg" alt="heart" />
            </div>
            <img width={133} height={112} src="./img/sneakers/3.jpg" alt="item" />
            <h5>Man sneakers Nike Blazer Mid Suede</h5>
            <div className='d-flex justify-between align-center'>
              <div className='d-flex flex-column'>
                <span>price:</span>
                <b>70,99 €</b>
              </div>
              <button className='button'>
                <img width={11} height={11} src="./img/plus.svg" alt="plus" />
              </button>
            </div>
          </div>
          <div className="card">
            <div className='favorite'>
              <img src="./img/unliked.svg" alt="heart" />
            </div>
            <img width={133} height={112} src="./img/sneakers/4.jpg" alt="item" />
            <h5>Man sneakers Nike Blazer Mid Suede</h5>
            <div className='d-flex justify-between align-center'>
              <div className='d-flex flex-column'>
                <span>price:</span>
                <b>70,99 €</b>
              </div>
              <button className='button'>
                <img width={11} height={11} src="./img/plus.svg" alt="plus" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
