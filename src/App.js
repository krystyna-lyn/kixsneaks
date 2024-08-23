import 'macro-css';



function App() {
  return (
    <div className="wrapper clear">
      <header className="d-flex justify-between align-center p-40">
        <div className='d-flex align-center'>
          <img width={40} height={40} src="./img/logo.png" alt="logo" />
          <div>
            <h3 className='text-uppercase'>KixsSneaks</h3>
            <p>Best sneakers ever</p>
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
        <h1>All sneakers</h1>
      </div>
    </div>
  );
}

export default App;
