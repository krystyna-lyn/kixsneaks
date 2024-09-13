import 'macro-css';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Card from './components/Card';
import { useEffect, useState } from 'react';


function App() {
  const [items, setitems] = useState([])
  const [cartItems, setcartItems] = useState([])

  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch('https://66df7092de4426916ee49649.mockapi.io/items').then((res) => {
      return res.json()
    }).then((json) => {
      setitems(json)
    })
  }, [])

  const addToCart = (obj) => {
    setcartItems(prev => [...prev, obj])
  }

  const deleteItem = (id) => {
    setcartItems(cartItems => cartItems.filter((item) => item.id !== id));
  };

  console.log(cartItems)

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={(id) => deleteItem(id)} />}
      <Header openCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className='d-flex align-center mb-40 justify-between'>
          <h1 className=''>All sneakers</h1>
          <div className="search-block d-flex">
            <img src="./img/search.svg" alt="search" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        <div className="sneakers d-flex justify-between flex-wrap">

          {
            items.map(item => {
              return (
                <Card
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  imgUrl={item.imgUrl}
                  price={item.price}
                  addToCart={() => console.log('added')}
                  onFavorite={() => console.log('your fav item')}
                  onPlus={(obj) => addToCart(obj)}
                />
              )
            })
          }
        </div>

      </div>
    </div>
  );
}

export default App;
