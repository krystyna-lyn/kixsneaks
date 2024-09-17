import 'macro-css';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Card from './components/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [items, setitems] = useState([])
  const [cartItems, setcartItems] = useState([])
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {

    axios.get('https://66df7092de4426916ee49649.mockapi.io/items').then((res) => {
      setitems(res.data)
    })

    axios.get('https://66df7092de4426916ee49649.mockapi.io/cart').then((res) => {
      setcartItems(res.data)
    })
  }, [])

  const addToCart = (obj) => {
    axios.post('https://66df7092de4426916ee49649.mockapi.io/cart', obj);
    setcartItems(prev => [...prev, obj])
  }

  const deleteItem = (id) => {
    axios.delete(`https://66df7092de4426916ee49649.mockapi.io/cart/${id}`);
    setcartItems(prev => prev.filter((item) => item.id !== id));

  };

  const searchItem = (event) => {
    //console.log(event.target.value)
    setSearchValue(event.target.value);
  }



  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={(id) => deleteItem(id)} />}
      <Header openCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className='d-flex align-center mb-40 justify-between'>
          <h1>{searchValue ? `search for '${searchValue}'` : 'All sneakers'}</h1>
          <div className="search-block d-flex">
            <img src="./img/search.svg" alt="search" />
            {searchValue && (
              <img className='clear cu-p'
                onClick={() => setSearchValue('')}
                src="./img/btn-remove.svg"
                alt="remove" />
            )}

            <input onChange={searchItem} value={searchValue} type="text" placeholder="Search..." />
          </div>
        </div>

        <div className="sneakers d-flex justify-between flex-wrap">

          {
            items
              .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map(item => {
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
